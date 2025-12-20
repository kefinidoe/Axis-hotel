import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bed, Wifi, Coffee, Tv, Wind, Shield, ChevronLeft, ChevronRight, Star } from "lucide-react";

// Import lounge images
import lounge1 from "@/assets/lounge-1.jpg";
import lounge2 from "@/assets/lounge-2.jpg";
import lounge3 from "@/assets/lounge-3.jpg";
import lounge4 from "@/assets/lounge-4.jpg";
import lounge5 from "@/assets/lounge-5.jpg";
import lounge6 from "@/assets/lounge-6.jpg";
import lounge7 from "@/assets/lounge-7.jpg";
import lounge8 from "@/assets/lounge-8.jpg";
import lounge9 from "@/assets/lounge-9.jpg";

const Lounges = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  const loungeImages = [
    { src: lounge1, alt: "Spacious lounge room with comfortable bedding at Axis Hotel Nakuru" },
    { src: lounge2, alt: "Modern lounge interior with elegant decor at Axis Hotel" },
    { src: lounge3, alt: "Cozy lounge accommodation with premium amenities in Nakuru" },
    { src: lounge4, alt: "Well-appointed lounge room with flat screen TV at Axis Hotel" },
    { src: lounge5, alt: "Comfortable lounge space with air conditioning at Axis Hotel Nakuru" },
    { src: lounge6, alt: "Relaxing lounge room with modern furnishings at Axis Hotel" },
    { src: lounge7, alt: "Premium lounge accommodation with 24/7 security in Nakuru" },
    { src: lounge8, alt: "Elegant lounge room with free WiFi at Axis Hotel Nakuru" },
    { src: lounge9, alt: "Affordable luxury lounge room at Axis Hotel near Nakuru Prisons" },
  ];

  const amenities = [
    { icon: Bed, label: "Comfortable Bedding" },
    { icon: Wifi, label: "Free WiFi" },
    { icon: Tv, label: "Flat Screen TV" },
    { icon: Coffee, label: "Hot Beverages" },
    { icon: Wind, label: "Air Conditioning" },
    { icon: Shield, label: "24/7 Security" }
  ];

  const handleBooking = () => {
    const message = encodeURIComponent("Hi! I'd like to book a lounge at Axis Hotel for KSh 2,000 per night.");
    window.open(`https://wa.me/254729970201?text=${message}`, '_blank');
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % loungeImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + loungeImages.length) % loungeImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Preload adjacent images
  useEffect(() => {
    const preloadIndexes = [
      currentIndex,
      (currentIndex + 1) % loungeImages.length,
      (currentIndex - 1 + loungeImages.length) % loungeImages.length
    ];
    
    preloadIndexes.forEach(idx => {
      if (!loadedImages.has(idx)) {
        const img = new Image();
        img.src = loungeImages[idx].src;
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, idx]));
        };
      }
    });
  }, [currentIndex, loadedImages, loungeImages]);

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "name": "Axis Hotel Lounge",
    "description": "Comfortable lounge accommodation at Axis Hotel Nakuru with modern amenities including free WiFi, air conditioning, and 24/7 security.",
    "occupancy": {
      "@type": "QuantitativeValue",
      "maxValue": 2
    },
    "amenityFeature": amenities.map(a => ({
      "@type": "LocationFeatureSpecification",
      "name": a.label,
      "value": true
    })),
    "priceRange": "KSh 2,000 per night"
  };

  return (
    <section id="lounges" className="py-20 md:py-32 relative overflow-hidden">
      {/* SEO structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-primary/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Premium Accommodation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="relative inline-block px-6 py-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-lg text-white shadow-warm">Lounges</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience comfort and tranquility in our well-appointed lounges, designed for relaxation and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Image Carousel */}
          <div className="animate-fade-in">
            <Card className="overflow-hidden shadow-warm border-2 border-primary/20 relative group">
              {/* Main Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Skeleton loader */}
                <div className={`absolute inset-0 bg-gradient-to-r from-muted via-muted/80 to-muted animate-pulse transition-opacity duration-500 z-5 ${loadedImages.has(currentIndex) ? 'opacity-0' : 'opacity-1'}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-1 transition-opacity duration-500 z-10" />
                <img
  src={loungeImages[currentIndex].src}
  alt={loungeImages[currentIndex].alt}
  loading="lazy"
  className="
    w-full
    h-full
    object-cover
    transition-transform
    duration-700
    ease-[cubic-bezier(0.22,1,0.36,1)]
    group-hover:scale-105
    group-hover:-translate-y-1
  "
/>

                
                {/* Image counter badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/50">
                  <span className="text-sm font-medium text-foreground">
                    {currentIndex + 1} / {loungeImages.length}
                  </span>
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
                  aria-label="Previous lounge image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
                  aria-label="Next lounge image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="p-4 bg-gradient-to-r from-card via-card to-primary/5 border-t border-border/50">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  {loungeImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                        currentIndex === index 
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105' 
                          : 'opacity-1 hover:opacity-1'
                      }`}
                      aria-label={`View lounge image ${index + 1}`}
                    >
                      <img 
                        src={image.src} 
                        alt={`Lounge thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Details */}
          <div className="animate-slide-in space-y-6">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-card via-card to-primary/5 p-8 rounded-2xl shadow-warm border-2 border-primary/10">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  KSh 2,000
                </span>
                <span className="text-muted-foreground">/night</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Best value accommodation in Nakuru</p>

              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                Our spacious lounges provide the perfect retreat after a long day. 
                Each room is thoughtfully designed to ensure maximum comfort and convenience, 
                featuring modern amenities and a peaceful atmosphere.
              </p>

              {/* Amenities Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {amenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 group/item">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:from-primary/30 group-hover/item:to-secondary/30 transition-all">
                        <Icon className="w-5 h-5 text-primary group-hover/item:scale-110 transition-transform" />
                      </div>
                      <span className="text-sm font-medium group-hover/item:text-primary transition-colors">{amenity.label}</span>
                    </div>
                  );
                })}
              </div>

              <Button 
                size="lg" 
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:shadow-warm transition-all duration-30 text-white font-semibold hover:scale-105"
              >
                Book This Lounge
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-6 rounded-xl border border-primary/10">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold border-2 border-background">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Loved by 500+ guests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lounges;
