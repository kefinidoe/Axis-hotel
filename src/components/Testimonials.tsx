import { Card } from "@/components/ui/card";
import { Star, Quote, Award } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "James Kimani",
      location: "Nairobi",
      rating: 5,
      text: "Excellent service and very comfortable rooms! The staff at Axis Hotel were incredibly welcoming. Great value for money at KSh 2,000 per night.",
      date: "March 2024"
    },
    {
      name: "Mary Wanjiku",
      location: "Nakuru",
      rating: 5,
      text: "The restaurant food was delicious! I hosted a small family gathering here and everything was perfect. Highly recommend the nyama choma.",
      date: "February 2024"
    },
    {
      name: "David Omondi",
      location: "Eldoret",
      rating: 5,
      text: "Perfect location and clean facilities. The lounge was spacious and peaceful. Will definitely be returning on my next visit to Nakuru.",
      date: "March 2024"
    },
    {
      name: "Grace Akinyi",
      location: "Kisumu",
      rating: 5,
      text: "We held our team meeting in their event space and it was wonderful. Professional setup and the catering was excellent. Thank you Axis Hotel!",
      date: "January 2024"
    }
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-br from-warm-bg via-background to-secondary/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-secondary/15 to-primary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6 border border-primary/20">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trusted by Hundreds</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Guest{" "}
            <span className="relative">
              <span className="relative z-10 px-4 py-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl text-white shadow-warm">
                Reviews
              </span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear from our valued guests who have experienced our exceptional hospitality
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group relative p-8 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-warm transition-all duration-500 animate-fade-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Gradient Border Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 bg-gradient-to-br from-accent to-primary/80 rounded-lg flex items-center justify-center shadow-sm"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <Star className="w-4 h-4 fill-white text-white" />
                    </div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg mb-6 text-foreground/90 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gradient-to-r from-primary/20 to-accent/20">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-white font-bold text-lg shadow-warm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full text-xs font-medium text-primary">
                    {testimonial.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-r from-card via-card to-card rounded-2xl shadow-soft border border-primary/10">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["J", "M", "D", "G"].map((initial, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-white text-xs font-bold border-2 border-background"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">+200 happy guests</span>
            </div>
            <p className="text-foreground font-medium">
              Join hundreds of satisfied guests who have experienced our hospitality
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <span className="ml-2 text-sm font-semibold text-foreground">5.0 Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
