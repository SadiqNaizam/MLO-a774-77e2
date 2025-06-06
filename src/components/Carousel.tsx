import React from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Using shadcn Card for slide items
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  slides: Array<{
    id: string | number;
    content?: React.ReactNode; // Custom content
    imageUrl?: string;
    title?: string;
    altText?: string;
  }>;
  options?: EmblaOptionsType;
  slideClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({ slides, options, slideClassName }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, [Autoplay({ delay: 4000 })]);

  console.log("Rendering Carousel with slides:", slides.length);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!slides || slides.length === 0) {
    return <p className="text-center text-slate-500">No items to display in carousel.</p>;
  }

  return (
    <div className="embla relative overflow-hidden group">
      <div className="embla__viewport rounded-lg" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => (
            <div className={cn("embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 p-2", slideClassName)} key={slide.id}>
              <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white">
                <CardContent className="flex flex-col items-center justify-center p-0 aspect-video">
                  {slide.imageUrl ? (
                    <img src={slide.imageUrl} alt={slide.altText || slide.title || `Slide ${slide.id}`} className="w-full h-full object-cover" />
                  ) : slide.content ? (
                    slide.content
                  ) : (
                    <span className="text-slate-700">{slide.title || `Slide ${slide.id}`}</span>
                  )}
                </CardContent>
                {/* Optionally add a CardFooter for titles or actions */}
              </Card>
            </div>
          ))}
        </div>
      </div>
      {emblaApi && (
        <>
          <button
            className="embla__prev absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-white/70 hover:bg-white rounded-full shadow-md transition-opacity opacity-0 group-hover:opacity-100 z-10"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-sky-600" />
          </button>
          <button
            className="embla__next absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-white/70 hover:bg-white rounded-full shadow-md transition-opacity opacity-0 group-hover:opacity-100 z-10"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-sky-600" />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;