"use client";

import { useState, useEffect, useCallback } from "react";
import { MediaImage } from "./media-image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MediaCarouselProps {
    images: {
        src: string;
        alt: string;
    }[];
    className?: string;
}

export function MediaCarousel({ images, className }: MediaCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    return (
        <div
            className={`group relative h-full w-full overflow-hidden bg-muted ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className="flex h-full w-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="h-full w-full shrink-0">
                        <MediaImage
                            src={image.src}
                            alt={image.alt}
                            gallery={images}
                            initialIndex={index}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 512px, 600px"
                            className="h-full w-full"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/40"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/40"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(index);
                        }}
                        className={`h-1.5 w-1.5 rounded-full transition-all ${currentIndex === index ? "bg-white w-4" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
