import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth'; // Use the hook here

// Assume you have these components:
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";


const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Get auth state and methods
    const { user, signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Redirect authenticated users
    useEffect(() => {
        if (user) {
            navigate("/"); // Redirect to home page if logged in
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        let error: Error | null = null;

        if (isSignIn) {
            ({ error } = await signIn(email, password));
        } else {
            ({ error } = await signUp(email, password));
        }

        if (error) {
            toast({
                title: "Authentication Failed",
                description: error.message,
                variant: "destructive",
            });
        } else if (!isSignIn) {
            toast({
                title: "Sign Up Successful",
                description: "Check your email to confirm your account!",
            });
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (isSignIn ? "Signing In..." : "Signing Up...") : (isSignIn ? "Sign In" : "Sign Up")}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button 
                        variant="link" 
                        onClick={() => setIsSignIn(!isSignIn)}
                        disabled={isSubmitting}
                    >
                        {isSignIn ? "Need an account? Sign Up" : "Already have an account? Sign In"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Auth;