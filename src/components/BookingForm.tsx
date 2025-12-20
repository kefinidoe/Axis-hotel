import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface BookingData {
  fullName: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  adults: number;
  children: number;
}

const initialBookingData: BookingData = {
  fullName: "",
  email: "",
  checkInDate: "",
  checkOutDate: "",
  roomType: "Standard",
  adults: 1,
  children: 0,
};

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingData>(initialBookingData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Success state
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, roomType: value }));
  };

  const validateForm = (data: BookingData) => {
    const newErrors: Record<string, string> = {};
    const today = new Date().toISOString().split("T")[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!emailRegex.test(data.email)) newErrors.email = "Enter a valid email.";
    if (!data.checkInDate) newErrors.checkInDate = "Required.";
    if (data.checkInDate < today) newErrors.checkInDate = "Date cannot be in the past.";

    if (data.checkInDate && data.checkOutDate) {
      if (new Date(data.checkInDate) >= new Date(data.checkOutDate))
        newErrors.checkOutDate = "Must be after check-in.";
    }

    if (data.adults < 1) newErrors.adults = "At least one adult.";
    return newErrors;
  };
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("booking_inquiries").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          check_in_date: formData.checkInDate,
          check_out_date: formData.checkOutDate,
          room_type: formData.roomType,
          adults: formData.adults,
          children: formData.children,
          status: 'pending'
        },
      ]);

      if (error) throw error;

      // Only set success state and show toast - No window.open redirect!
      setIsSubmitted(true);
      toast({ 
        title: "Inquiry Sent Successfully",
        description: "Check your email for a copy of your request." 
      });

    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.message ?? "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // The Success View remains on your site
  if (isSubmitted) {
    return (
      <Card className="max-w-xl mx-auto shadow-xl bg-white border-0 py-16 px-6">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
          </div>
          <h3 className="text-3xl font-bold mb-3 text-foreground">All Set!</h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto">
            Thank you, {formData.fullName}. Your reservation inquiry for a {formData.roomType} has been recorded. Our team will contact you via email shortly.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
                setIsSubmitted(false);
                setFormData(initialBookingData); // Reset form for next time
            }}
            className="border-primary text-primary hover:bg-primary/5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Booking
          </Button>
        </div>
      </Card>
    );
  }
  return (
    <Card className="max-w-xl mx-auto shadow-md bg-white/95 border relative overflow-hidden">
       {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
      
      <CardHeader className="pb-3 pt-6">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Hotel className="h-5 w-5 text-primary" />
          Check Availability
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <Label className="text-xs">Full Name</Label>
                  <Input name="fullName" value={formData.fullName} onChange={handleInputChange} className="h-9" />
                  <p className="text-[10px] text-destructive mt-1">{errors.fullName}</p>
               </div>
               <div>
                  <Label className="text-xs">Email Address</Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} className="h-9" />
                  <p className="text-[10px] text-destructive mt-1">{errors.email}</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t pt-3">
              <div>
                <Label className="text-xs">Check-in</Label>
                <Input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleInputChange} className="h-9" />
                <p className="text-[10px] text-destructive mt-1">{errors.checkInDate}</p>
              </div>
              <div>
                <Label className="text-xs">Check-out</Label>
                <Input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleInputChange} className="h-9" />
                <p className="text-[10px] text-destructive mt-1">{errors.checkOutDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Adults</Label>
                <Input type="number" name="adults" min={1} value={formData.adults} onChange={handleInputChange} className="h-9" />
              </div>
              <div>
                <Label className="text-xs">Children</Label>
                <Input type="number" name="children" min={0} value={formData.children} onChange={handleInputChange} className="h-9" />
              </div>
            </div>

            <div>
              <Label className="text-xs">Room Choice</Label>
              <Select value={formData.roomType} onValueChange={handleSelectChange}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard Room</SelectItem>
                  <SelectItem value="Deluxe">Deluxe Suite</SelectItem>
                  <SelectItem value="Executive">Executive Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-gradient-to-r from-primary via-accent to-secondary text-white font-semibold mt-4">
            {isSubmitting ? "Processing..." : <>Book Now <ArrowRight className="h-4 w-4 ml-2" /></>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};