import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Info, MapPin } from "lucide-react"; // Swapped MessageCircle for CalendarCheck
import heroImage from "@/assets/hero-hotel.jpg";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {/* Skeleton loader overlay */}
        <div className="absolute inset-0 z-0">
  {/* Professional Skeleton Loader (Flat color, no blur) */}
  {!imageLoaded && (
    <div className="absolute inset-0 bg-slate-900 animate-pulse z-10" />
  )}

  <img 
    src={heroImage}
    alt="Axis Hotel Nakuru - Modern comfortable hotel exterior"
    onLoad={() => setImageLoaded(true)}
    fetchpriority="high"
    decoding="async"
    className={`
      w-full
      h-full
      object-cover
      object-center
      transition-opacity
      duration-500
      ${imageLoaded ? 'opacity-100' : 'opacity-0'}
    `}
  />

  {/* High-End Design Overlay */}
  {/* We use a subtle gradient instead of a full tint to keep the photo sharp */}
  <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
</div>

        {/* Dynamic Dark Overlay */}
        <div className="absolute inset-0 z-20 bg-foreground/50 md:bg-gradient-to-r md:from-foreground/70 md:via-foreground/40 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-30 px-4 py-20 md:py-32 flex items-center justify-center">
        <div className="max-w-3xl animate-fade-up text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-accent" />
            <p className="text-accent font-medium tracking-wide">Near Nakuru Prisons Area, Nakuru</p>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance drop-shadow-lg">
            Welcome to <span className="text-accent">Axis Hotel</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 text-balance px-4 font-light">
            Experience premium comfort and hospitality in the heart of Nakuru. 
            Luxury lounges starting from <span className="font-bold text-accent italic">KSh 2,000</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-8 py-7 shadow-warm rounded-full transition-transform hover:scale-105"
            >
              <CalendarCheck className="mr-2 h-5 w-5" />
              Reserve Your Stay
            </Button>

            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 backdrop-blur-md border-white/30 text-white hover:bg-white/20 text-base md:text-lg px-8 py-7 rounded-full"
            >
              <Info className="mr-2 h-5 w-5" />
              Explore Hotel
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-30 opacity-70">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default Hero;