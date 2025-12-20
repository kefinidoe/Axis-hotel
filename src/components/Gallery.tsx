import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';
const galleryImages = [{
  src: gallery1,
  alt: 'Axis Hotel Nakuru - Elegant lounge interior with comfortable seating',
  title: 'Premium Lounge'
}, {
  src: gallery2,
  alt: 'Axis Hotel Nakuru - Modern restaurant dining area with ambient lighting',
  title: 'Restaurant & Dining'
}, {
  src: gallery3,
  alt: 'Axis Hotel Nakuru - Cozy accommodation room with modern amenities',
  title: 'Comfortable Rooms'
}, {
  src: gallery4,
  alt: 'Axis Hotel Nakuru - Relaxation space with serene atmosphere',
  title: 'Relaxation Area'
}, {
  src: gallery5,
  alt: 'Axis Hotel Nakuru - Event space setup for corporate meetings',
  title: 'Event Spaces'
}, {
  src: gallery6,
  alt: 'Axis Hotel Nakuru - Hotel exterior and entrance view',
  title: 'Hotel Exterior'
}];
const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  
  // Preload adjacent images
  useEffect(() => {
    const preloadIndexes = [
      currentIndex,
      (currentIndex + 1) % galleryImages.length,
      (currentIndex - 1 + galleryImages.length) % galleryImages.length
    ];
    
    preloadIndexes.forEach(idx => {
      if (!loadedImages.has(idx)) {
        const img = new Image();
        img.src = galleryImages[idx].src;
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, idx]));
        };
      }
    });
  }, [currentIndex, loadedImages]);
  
  const goToPrevious = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1);
  }, []);
  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1);
  }, []);
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);
  return <section id="gallery" className="py-20 bg-gradient-to-br from-secondary/30 via-background to-accent/20 relative overflow-hidden" aria-label="Photo Gallery">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/15 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-4">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Visual Tour</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Axis Hotel</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a visual journey through our premium facilities and discover what makes Axis Hotel your perfect destination in Nakuru
          </p>
        </div>

        {/* Main Gallery */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Image Container */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl group">
            {/* Skeleton loader */}
            <div className={`absolute inset-0 bg-gradient-to-r from-muted via-muted/80 to-muted animate-pulse transition-opacity duration-500 ${loadedImages.has(currentIndex) ? 'opacity-0' : 'opacity-100'}`} />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />
            
            {/* Image */}
            <img 
              src={galleryImages[currentIndex].src} 
              alt={galleryImages[currentIndex].alt} 
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${loadedImages.has(currentIndex) ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy" 
              decoding="async"
              onLoad={() => setLoadedImages(prev => new Set([...prev, currentIndex]))}
            />

            {/* Image Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex items-center justify-between">
                <div>
                  
                  <p className="text-white/80 text-sm md:text-base">
                    {currentIndex + 1} of {galleryImages.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button variant="ghost" size="icon" onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white border border-white/30 transition-all duration-300 hover:scale-110" aria-label="Previous image">
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button variant="ghost" size="icon" onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white border border-white/30 transition-all duration-300 hover:scale-110" aria-label="Next image">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {galleryImages.map((image, index) => <button key={index} onClick={() => goToSlide(index)} className={`relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'}`} aria-label={`View ${image.title}`} aria-current={index === currentIndex ? 'true' : 'false'}>
                <img src={image.src} alt={`Thumbnail: ${image.title}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                {index === currentIndex && <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />}
              </button>)}
          </div>

          {/* Dots Indicator (Mobile) */}
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {galleryImages.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>

        {/* Structured Data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Axis Hotel Nakuru Photo Gallery",
          "description": "Visual tour of Axis Hotel facilities including lounges, restaurant, rooms, and event spaces in Nakuru, Kenya",
          "url": "https://axishotel.co.ke/#gallery",
          "numberOfItems": galleryImages.length,
          "image": galleryImages.map(img => ({
            "@type": "ImageObject",
            "name": img.title,
            "description": img.alt
          }))
        })
      }} />
      </div>
    </section>;
};
export default Gallery;