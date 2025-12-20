import { BookingForm } from "./BookingForm"; // Ensure the path is correct
import { Card } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Hotel 
} from "lucide-react";

const Contact = () => {
  const benefits = [
    { icon: CheckCircle2, text: "Best Price Guarantee" },
    { icon: Clock, text: "Instant Confirmation" },
    { icon: Phone, text: "24/7 Guest Support" }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-bg via-background to-warm-bg" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Comfort Awaits</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Make a{" "}
            <span className="relative inline-block px-6 py-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl text-white shadow-warm">
              Reservation
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to experience hospitality in the heart of Nakuru? 
            Fill out the inquiry form below and our team will contact you to confirm your stay.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left: Detailed Booking Form (Replaces the old message form) */}
            <div className="lg:col-span-3 animate-fade-in">
              <BookingForm />
            </div>

            {/* Right: Quick Info & Benefits */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 shadow-warm border-0 bg-card/80 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transform group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
                      <Hotel className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Hotel Info</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-sm">Location</p>
                        <p className="text-muted-foreground text-sm">Near Nakuru Prisons Area, Nakuru</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-sm">Phone</p>
                        <p className="text-muted-foreground text-sm">+254 729 970 201</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-sm">Email</p>
                        <p className="text-muted-foreground text-sm">info@axishotel.co.ke</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-warm border-0 bg-card/80">
                <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> Why Book With Us?
                </h4>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                      <benefit.icon className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </Card>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;