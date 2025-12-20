import { Card } from "@/components/ui/card";
import { Utensils, Coffee, Leaf } from "lucide-react";
import restaurantImage from "@/assets/restaurant-food.jpg";

const Restaurant = () => {
  const menuCategories = [
    {
      name: "Kenyan Specialties",
      icon: Utensils,
      description: "Authentic local flavors",
      items: ["Nyama Choma", "Ugali & Sukuma Wiki", "Pilau Rice", "Githeri Special", "Chapati & Beans", "Mukimo"]
    },
    {
      name: "International Dishes",
      icon: Leaf,
      description: "Global cuisine favorites",
      items: ["Grilled Chicken", "Fish & Chips", "Beef Stew", "Vegetable Rice", "Pasta Bolognese", "Garden Salad"]
    },
    {
      name: "Beverages",
      icon: Coffee,
      description: "Refreshing drinks",
      items: ["Fresh Juice", "Soft Drinks", "Tea & Coffee", "Mineral Water", "Milkshakes", "Hot Chocolate"]
    }
  ];

  return (
    <section id="restaurant" className="py-20 md:py-32 bg-gradient-to-br from-background via-warm-bg to-background overflow-hidden">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Fine Dining Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="relative inline-block px-6 py-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-lg text-white shadow-warm">Restaurant</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Savor authentic Kenyan flavors and international cuisine crafted with fresh, locally-sourced ingredients in our welcoming restaurant
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Featured Image with Overlay */}
          <div className="mb-16 animate-fade-in relative group">
            <Card className="overflow-hidden shadow-warm">
              <div className="relative">
                <img 
                  src={restaurantImage} 
                  alt="Delicious meals at Axis Hotel restaurant featuring Kenyan and international cuisine" 
                  className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">Variety of Foods</h3>
                  <p className="text-white/90 text-sm md:text-base drop-shadow-md">From traditional Kenyan dishes to international favorites</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Menu Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {menuCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 animate-fade-up hover:shadow-warm" 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Decorative gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-6 md:p-8">
                    {/* Icon and Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="grid grid-cols-2 gap-3">
                      {category.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className="flex items-center gap-2 py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span className="text-sm font-medium text-foreground/90">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '500ms' }}>
            <Card className="inline-block px-8 py-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-0 shadow-soft">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Freshly prepared daily</span> by our experienced chefs
                <span className="mx-2">•</span>
                Special dietary requirements? Just ask!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
