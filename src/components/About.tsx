import { Hotel, Utensils, Users, MapPin } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Hotel,
      title: "Comfortable Lounges",
      description: "Clean, spacious rooms with modern amenities for your perfect stay"
    },
    {
      icon: Utensils,
      title: "Full Restaurant",
      description: "Delicious Kenyan and international cuisine prepared by our skilled chefs"
    },
    {
      icon: Users,
      title: "Event Spaces",
      description: "Host your meetings, celebrations, and gatherings in our versatile spaces"
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Conveniently located near Nakuru Prisons area with easy access"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-up">
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Welcome to Excellence</span>
          </div>
          
          {/* Modern Title with Gradient Background */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-4 py-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl text-white shadow-warm">
                Axis Hotel
              </span>
            </span>
          </h2>
          
          {/* Enhanced Description */}
          <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed max-w-3xl mx-auto">
            Nestled in the heart of <span className="font-semibold text-foreground">Nakuru</span>, Axis Hotel offers a perfect blend of 
            <span className="font-semibold text-primary"> comfort</span>, 
            <span className="font-semibold text-accent"> affordability</span>, and 
            <span className="font-semibold text-secondary"> warm Kenyan hospitality</span>. 
            Whether you're here for business or leisure, our dedicated team ensures your stay is memorable.
          </p>
        </div>

        {/* Feature Cards with Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const gradients = [
              'from-primary via-primary/90 to-accent',
              'from-secondary via-secondary/90 to-primary',
              'from-accent via-accent/90 to-secondary',
              'from-primary via-secondary to-accent'
            ];
            const bgGradients = [
              'from-primary/5 to-accent/5',
              'from-secondary/5 to-primary/5',
              'from-accent/5 to-secondary/5',
              'from-primary/5 to-secondary/5'
            ];
            return (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br ${bgGradients[index]} backdrop-blur-sm p-8 rounded-3xl shadow-soft hover:shadow-warm transition-all duration-500 animate-fade-up border border-border/50 hover:border-primary/30 overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500 rounded-3xl" />
                
                {/* Icon Container */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="relative text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="relative text-muted-foreground leading-relaxed">{feature.description}</p>
                
                {/* Decorative Corner */}
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${gradients[index]} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
