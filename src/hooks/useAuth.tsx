import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Unified function to check database for Admin role
  const checkAdminStatus = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, is_admin')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Profile fetch error:", error.message);
        return false;
      }

      // Checks both possible column types (string 'role' or boolean 'is_admin')
      const is_admin = data?.role === 'admin' || data?.is_admin === true;
      console.log("Admin Check result for", userId, ":", is_admin);
      return is_admin;
    } catch (err) {
      console.error("Auth helper error:", err);
      return false;
    }
  };

  // 2. Lifecycle & Session Handling
  useEffect(() => {
    let isMounted = true;

    const handleSession = async (currentSession: Session | null) => {
      const currentUser = currentSession?.user ?? null;
      
      setSession(currentSession);
      setUser(currentUser);

      if (currentUser) {
        const adminStatus = await checkAdminStatus(currentUser.id);
        if (isMounted) {
          setIsAdmin(adminStatus);
          setIsLoading(false);
        }
      } else {
        if (isMounted) {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    };

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // Listen for login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event);
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        setIsLoading(false);
      } else {
        handleSession(session);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthProvider;