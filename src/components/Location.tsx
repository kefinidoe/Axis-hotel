import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock, Navigation, Sparkles } from "lucide-react";

const Location = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      lines: ["Near Nakuru Prisons Area", "Nakuru, Kenya"],
      gradient: "from-primary to-accent"
    },
    {
      icon: Phone,
      title: "Phone",
      lines: ["+254 729970201"],
      gradient: "from-secondary to-primary"
    },
    {
      icon: Clock,
      title: "Hours",
      lines: ["24/7 Reception", "Restaurant: 6 AM - 11 PM"],
      gradient: "from-accent to-secondary"
    }
  ];

  return (
    <section id="location" className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-primary/10" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-accent/20 to-transparent rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-up">
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 mb-6">
            <Navigation className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Easy to Find</span>
          </div>
          
          {/* Modern Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-4 py-2 bg-gradient-to-r from-secondary via-primary to-accent rounded-xl text-white shadow-warm">
                Us
              </span>
            </span>
            {" & "}
            <span className="relative inline-block">
              <span className="relative z-10 px-4 py-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl text-white shadow-warm">
                Connect
              </span>
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Conveniently located in <span className="font-semibold text-foreground">Nakuru</span> with 
            <span className="font-semibold text-primary"> easy access</span> and 
            <span className="font-semibold text-secondary"> ample parking</span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={index}
                  className="group relative p-8 bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/30 shadow-soft hover:shadow-warm transition-all duration-500 animate-fade-up overflow-hidden rounded-3xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative font-bold text-lg mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="relative space-y-1">
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground">{line}</p>
                    ))}
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className={`absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`} />
                </Card>
              );
            })}
          </div>

          {/* Map Container */}
          <Card className="overflow-hidden shadow-warm animate-fade-in rounded-3xl border-2 border-border/50 hover:border-primary/30 transition-colors duration-300">
            <div className="relative">
              {/* Map Header */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full shadow-lg border border-border/50">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Axis Hotel Location</span>
              </div>
              
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.083687428165!2d36.0614!3d-0.3031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18298e74e7eb6e5d%3A0x7a0e3b0e7f3e8c8d!2sNakuru%2C%20Kenya!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Axis Hotel Nakuru Location Map"
                className="w-full"
              />
            </div>
          </Card>

          {/* Directions CTA */}
          <div className="mt-10 text-center animate-fade-up" style={{ animationDelay: '300ms' }}>
            <p className="text-muted-foreground mb-6 text-lg">
              Easy to find near the <span className="font-semibold text-foreground">Nakuru Prisons area</span> with ample parking space available
            </p>
            <a 
              href="https://www.google.com/maps/dir//Nakuru,+Kenya/@-0.3031,36.0614"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary via-accent to-secondary text-white font-semibold rounded-full shadow-warm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
