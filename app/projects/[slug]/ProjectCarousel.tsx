'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import styles from './carousel.module.css';
import type { ProjectFrontMatter } from '@/lib/mdx';

interface ProjectCarouselProps {
    post: ProjectFrontMatter;
}

export function ProjectCarousel({ post }: ProjectCarouselProps) {
    // Initialize Embla Carousel
    // https://www.embla-carousel.com/get-started/react/
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    // Optional: Add navigation buttons
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // If there's only one image (from imageUrl), display it without carousel
    if (!post.images && post.imageUrl) {
        return (
            <div className='relative w-full mb-6 sm:mb-8'>
                <Image
                    src={post.imageUrl}
                    width={1920}
                    height={1080}
                    className='w-full h-auto rounded-xl'
                    alt={`Image for ${post.title}`}
                    priority
                />
            </div>
        );
    }

    // For multiple images, use the carousel
    const images = post.images || (post.imageUrl ? [post.imageUrl] : []);

    if (images.length === 0) return null;

    return (
        <div className='relative w-full mb-6 sm:mb-8'>
            <div
                className={`${styles.embla} overflow-hidden rounded-xl`}
                ref={emblaRef}
            >
                <div className={styles.embla__container}>
                    {images.map((image, index) => (
                        <div key={index} className={styles.embla__slide}>
                            <Image
                                src={image}
                                width={1920}
                                height={1080}
                                className={styles.embla__slide__img}
                                alt={`${post.title} - Image ${index + 1}`}
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* UW CS webring */}
            {images.length > 1 && (
                <>
                    <button
                        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 z-10 hover:bg-white dark:hover:bg-black transition-colors'
                        onClick={scrollPrev}
                    >
                        ←
                    </button>
                    <button
                        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 z-10 hover:bg-white dark:hover:bg-black transition-colors'
                        onClick={scrollNext}
                    >
                        →
                    </button>
                </>
            )}
        </div>
    );
}
