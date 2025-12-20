import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Standard UI Table component

// --- Type Definition for Booking Inquiry Record ---
interface BookingInquiry {
  id: string;
  created_at: string; // Timestamp of inquiry submission
  check_in_date: string; // ISO Date string
  check_out_date: string; // ISO Date string
  room_type: string;
  adults: number;
  children: number;
}

/**
 * @component BookingsList
 * @description Fetches and renders a list of all hotel booking inquiries. 
 * This component is intended for use in a protected Admin route.
 */
export const BookingsList: React.FC = () => {
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  /**
   * @function fetchBookings
   * @description Asynchronously retrieves all booking records from Supabase.
   * Authorization is handled implicitly by RLS policy on the 'booking_inquiries' table.
   */
  const fetchBookings = async () => {
    setIsLoading(true);
    
    try {
      // Fetching all records, ordering by creation time descending (newest first)
      const { data, error } = await supabase
        .from('booking_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Throwing the error ensures it is caught by the surrounding block
        throw new Error(error.message);
      }
      
      // Update state with fetched data
      setBookings(data || []);
      
    } catch (error) {
      // Handle authentication/authorization errors and network failures
      console.error("Failed to fetch bookings:", error);
      toast({
        title: "Data Retrieval Error",
        description: "Could not load booking data. Check RLS or network connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Execute data fetching upon initial component mount
  useEffect(() => {
    fetchBookings();
  }, []); // Empty dependency array ensures it runs only once

  // --- Conditional Rendering ---

  if (isLoading) {
    return (
        <div className="text-center py-12 text-lg font-medium text-gray-600">
            Retrieving Booking Data...
        </div>
    );
  }

  if (bookings.length === 0) {
    return (
        <div className="text-center py-12 text-lg font-medium text-gray-500">
            No active booking inquiries found in the system.
        </div>
    );
  }
  
  // --- Main Table Render ---

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[150px] font-semibold text-gray-700">Inquiry Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Check-in</TableHead>
            <TableHead className="font-semibold text-gray-700">Check-out</TableHead>
            <TableHead className="font-semibold text-gray-700">Room Type</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Guests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium">
                {new Date(booking.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{booking.check_in_date}</TableCell>
              <TableCell>{booking.check_out_date}</TableCell>
              <TableCell>{booking.room_type}</TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {booking.adults} Adults / {booking.children} Children
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};