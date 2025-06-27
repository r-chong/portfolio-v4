'use client';

import React from 'react';
import SectionHeading from './Section-heading';
import { motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import InlineLink from './InlineLink';

export default function About() {
    return (
        <motion.section
            // ref={ref}
            className='max-w-3xl mx-auto leading-relaxed mb-20 md:mb-28 scroll-mt-28 text-left px-6 sm:px-4'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
            id='about'
        >
            <SectionHeading>About me</SectionHeading>
            <div className='space-y-4 text-base sm:text-md'>
                <p>
                    I&apos;m a CS student at UWaterloo. Looking for w26
                    internships.
                </p>
                <p>Recent ventures:</p>
                {/* TODO: add highlights behind keywords like Warp */}
                <ul className='list-disc pl-6 space-y-2'>
                    <li>
                        <a
                            href='https://trytorial.com'
                            target='_blank'
                            className=' font-bold underline'
                        >
                            TryTorial.com
                        </a>
                    </li>
                    <li>Developing clean tech software at Elastic Energy</li>
                    <li>Campus Ambassador at Warp.dev</li>
                </ul>
                <p>
                    <a
                        href='https://x.com/_reesechong'
                        target='_blank'
                        rel='nofollow'
                        className='text-blue-500 font-bold underline'
                    >
                        twitter
                    </a>{' '}
                    +{' '}
                    <Link
                        href={'/blog' as LinkProps['href']}
                        className='text-blue-500 font-bold underline'
                    >
                        blog
                    </Link>
                </p>
                <p>Thanks for visiting!</p>
            </div>
        </motion.section>
    );
}
