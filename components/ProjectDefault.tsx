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
                className='mb-3 group sm:mb-8 max-w-full sm:max-w-[60%] last:mb-0'
            >
                <Link
                    className='cursor-pointer'
                    href={blogLink as LinkProps['href']}
                >
                    <div className='hover:bg-gray-200 group pb-3 bg-gray-100 group-even:pl-8 rounded-lg border border-black/5 overflow-hidden sm:pr-8 relative sm:h-[20rem] sm:mb-8 mb-3 last:mb-0'>
                        {/* 2025-01-04: added SM breakpoint to the even/odd stuff. Ideally on mobile it shows image only but I don't have time rn */}
                        {/* TODO: Add desktop vs mobile differentiation */}
                        <div className='px-5 py-4 mt-4 pb-7 sm:pl-10 sm:group-even:ml-[21rem] sm:even:pl-8 sm:pr-2 sm-pt-10 sm:max-w-[50%] flex flex-col h-full'>
                            <div className='text-2xl font-semibold'>
                                {title}
                            </div>
                            <div className='mt-2 leading-relaxed text-gray-700'>
                                {description} <br />
                                {/* TODO: Figure out why this link throws hydration error */}
                                {/* <Link
                                    className=' text-gray-400 pb-3 font-semibold hover:underline cursor-pointer'
                                    href={blogLink as LinkProps['href']}
                                >
                                    Read more
                                </Link> */}
                            </div>
                            <ul className='flex flex-wrap gap-2 mt-4 sm:mt-auto'>
                                {tags.map((tag, index) => (
                                    <li
                                        key={index}
                                        className='bg-black/0.7 px-3 py-1 text-[0.7rem] uppercase tracking-wider bg-gray-700 text-white rounded-full'
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>

                            {/* sticky footer problem: solve by putting flex, flex-col, mt-auto on parent element. margin expands as much as it can */}
                        </div>
                        {/* local images don't need the height and width!! */}
                        {/* next js performs optimizations so may want to specify quality */}

                        {/* TODO: Make image show better on mobile... rn its a mess */}
                        <Image
                            src={imageUrl}
                            alt={'project I worked on'}
                            quality={95}
                            className='absolute top-8 
                    -right-40 w-[28.25rem] rounded-t-lg shadow-2xl 
                    group-hover:scale-[1.04]
                    group-hover:-rotate-2

                    group-even:group-hover:translate-x-3
                    group-even:group-hover:translate-y-3 
                    group-even:group-hover:rotate-2  

                    group-even:right-[initial] 
                    group-even:-left-40  
                    transition 
                    max-sm:hidden
                    '
                        />
                    </div>
                </Link>
            </motion.div>
        </>
    );
}
