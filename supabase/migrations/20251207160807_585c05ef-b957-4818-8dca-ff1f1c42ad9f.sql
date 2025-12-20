-- Fix: Restrict bookings SELECT to admin users only (was exposing all guest PII to any authenticated user)
DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON public.bookings;

CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also fix UPDATE policy which has the same vulnerability
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON public.bookings;

CREATE POLICY "Admins can update bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));