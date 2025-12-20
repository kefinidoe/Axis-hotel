import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  containerClassName,
  priority = false 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton loader */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-muted via-muted/80 to-muted animate-pulse transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
