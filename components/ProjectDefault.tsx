import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '@/lib/data';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

// since projectData is constant...
type ProjectProps = (typeof projectsData)[number];

// if it's changing (not const we could do it like this:)

// passing down key technically allowed but not recommended
export default function ProjectDefault({
    title,
    description,
    tags,
    imageUrl,
    blogLink,
}: ProjectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['0 1', '1.33 1'],
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <>
            <motion.div
                ref={ref}
                style={{
                    scale: scaleProgress,
                    opacity: opacityProgress,
                }}
                className='group w-full'
            >
                <Link
                    className='cursor-pointer block'
                    href={blogLink as LinkProps['href']}
                >
                    <div className='hover:bg-gray-200 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-900 rounded-lg border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-300'>
                        <div className='relative aspect-video w-full overflow-hidden'>
                            <Image
                                src={imageUrl}
                                alt={'Project preview image'}
                                quality={95}
                                fill
                                className='object-cover transition group-hover:scale-105 duration-300'
                            />
                        </div>

                        <div className='p-4 space-y-3'>
                            <h3 className='text-xl font-semibold dark:text-gray-100'>
                                {title}
                            </h3>

                            <p className='text-gray-700 dark:text-gray-300 line-clamp-3 text-sm sm:text-base'>
                                {description}
                            </p>

                            <ul className='flex flex-wrap gap-2'>
                                {tags.map((tag, index) => (
                                    <li
                                        key={index}
                                        className='bg-black/70 dark:bg-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full'
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </>
    );
}
