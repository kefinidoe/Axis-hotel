import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Presentation, PartyPopper, CalendarDays, Sparkles, Wifi, Wind, UtensilsCrossed, Armchair } from "lucide-react";
import eventImage from "@/assets/event-space.jpg";

const Events = () => {
  const eventTypes = [
    {
      icon: Presentation,
      title: "Business Meetings",
      description: "Professional setup for corporate meetings and presentations",
      gradient: "from-primary to-accent"
    },
    {
      icon: PartyPopper,
      title: "Private Celebrations",
      description: "Birthdays, anniversaries, and special occasions",
      gradient: "from-secondary to-primary"
    },
    {
      icon: Users,
      title: "Team Building",
      description: "Group activities and team bonding sessions",
      gradient: "from-accent to-secondary"
    },
    {
      icon: CalendarDays,
      title: "Workshops",
      description: "Training sessions and educational events",
      gradient: "from-primary via-secondary to-accent"
    }
  ];

  const features = [
    { icon: Armchair, value: "50+", label: "Seating Capacity", gradient: "from-primary to-accent" },
    { icon: Wifi, value: "Free", label: "WiFi Access", gradient: "from-secondary to-primary" },
    { icon: Wind, value: "A/C", label: "Climate Control", gradient: "from-accent to-secondary" },
    { icon: UtensilsCrossed, value: "Full", label: "Catering Service", gradient: "from-primary via-accent to-secondary" }
  ];

  const handleEventInquiry = () => {
    const message = encodeURIComponent("Hi! I'd like to inquire about booking an event space at Axis Hotel.");
    window.open(`https://wa.me/254729970201?text=${message}`, '_blank');
  };

  return (
    <section id="events" className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-secondary/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-up">
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Host Memorable Events</span>
          </div>
          
          {/* Modern Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Event{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-4 py-2 bg-gradient-to-r from-accent via-secondary to-primary rounded-xl text-white shadow-warm">
                Spaces
              </span>
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Host your special events in our <span className="font-semibold text-foreground">versatile</span> and 
            <span className="font-semibold text-accent"> elegant</span> spaces
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Details */}
            <div className="animate-slide-in">
              <h3 className="text-3xl font-bold mb-6">
                Perfect Venue for{" "}
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Every Occasion</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether you're planning a corporate meeting, family celebration, or social gathering, 
                our event spaces provide the ideal setting. Our team will work with you to ensure 
                every detail is perfect.
              </p>

              {/* Event Types with Colorful Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {eventTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <div 
                      key={index} 
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-warm"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${type.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{type.title}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button 
                size="lg" 
                onClick={handleEventInquiry}
                className="bg-gradient-to-r from-secondary via-accent to-primary hover:opacity-90 text-white shadow-warm hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-full px-8"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Inquire About Events
              </Button>
            </div>

            {/* Image */}
            <div className="animate-fade-in">
              <Card className="overflow-hidden shadow-warm rounded-3xl border-2 border-border/50 hover:border-accent/30 transition-colors duration-300 group">
                <div className="relative">
                  <img 
                    src={eventImage} 
                    alt="Elegant event space at Axis Hotel for meetings and celebrations" 
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white font-semibold text-lg">Modern Event Space</p>
                    <p className="text-white/80 text-sm">Perfect for all occasions</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Features Section - Enhanced */}
          <Card className="p-10 bg-gradient-to-br from-card via-card to-card/90 shadow-warm rounded-3xl border-2 border-border/50 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />
            
            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center relative">
              Event Space{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Features</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="group text-center p-6 rounded-2xl bg-gradient-to-br from-background/50 to-background/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-warm"
                  >
                    {/* Icon */}
                    <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Value */}
                    <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-2`}>
                      {feature.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm text-muted-foreground font-medium">{feature.label}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Events;
