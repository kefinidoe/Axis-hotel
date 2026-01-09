import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, LogOut, User, Phone, Mail, Trash2, CheckCircle, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import axisLogo from '@/assets/axis-hotel-logo.png';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

interface Booking {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  message: string;
  status: BookingStatus;
}

const statusStyles: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function Admin() {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  /* -------------------- AUTH GUARD -------------------- */
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate('/');
      return;
    }

    const isMasterAdmin = isAdmin && user.email === 'nakuruaxishotel@gmail.com';
    
    if (!isMasterAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to view the Admin Dashboard.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  /* -------------------- DATA ACTIONS -------------------- */
  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('booking_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setBookings(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const changeStatus = async (id: string, status: BookingStatus) => {
    const { error } = await supabase.from('booking_inquiries').update({ status }).eq('id', id);
    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      toast({ title: 'Status updated' });
    }
  };

  const deleteInquiry = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to permanently delete this inquiry?");
    if (!confirmed) return;

    const { error } = await supabase.from('booking_inquiries').delete().eq('id', id);

    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      setBookings(prev => prev.filter(b => b.id !== id));
      toast({ title: 'Inquiry deleted' });
    }
  };

  /* -------------------- EXPORT LOGIC -------------------- */
  const downloadCSV = () => {
  if (bookings.length === 0) {
    toast({ title: "No data to export", variant: "destructive" });
    return;
  }

  const headers = ["Date", "Guest Name", "Email", "Phone", "Status", "Message"];
  const rows = bookings.map(b => [
    new Date(b.created_at).toLocaleDateString(),
    b.full_name || "N/A",
    b.email || "N/A",
    b.phone || "N/A",
    b.status,
    // The fix is right here:
    `"${(b.message || "").replace(/"/g, '""')}"` 
  ]);

  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `axis_hotel_bookings_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  if (isLoading) return <div className="flex justify-center p-20"><RefreshCw className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <img src={axisLogo} className="h-10" alt="Logo" />
          <div>
            <h1 className="font-bold text-lg leading-none">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => signOut()}> 
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b mb-4 pb-4 gap-4">
            <div>
              <CardTitle>Inquiries & Bookings</CardTitle>
              <CardDescription>Manage incoming messages from guests</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={downloadCSV} variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={fetchBookings} disabled={loading} size="sm" variant="outline" className="flex-1 sm:flex-none">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-white overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        No inquiries found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground"/> {b.full_name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="text-xs flex items-center gap-1"><Mail className="w-3 h-3"/> {b.email}</div>
                            <div className="text-xs flex items-center gap-1"><Phone className="w-3 h-3"/> {b.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] text-sm italic text-muted-foreground truncate">
                          "{b.message}"
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={statusStyles[b.status]}>
                            {b.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => changeStatus(b.id, 'confirmed')}
                              disabled={b.status === 'confirmed'}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" /> Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => deleteInquiry(b.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}