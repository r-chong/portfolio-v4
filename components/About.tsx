'use client';

import React from 'react';
import SectionHeading from './Section-heading';
import { motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';

export default function About() {
    return (
        <motion.section
            // ref={ref}
            className='max-w-3xl mx-auto leading-relaxed mb-28 sm:mb-40 scroll-mt-28 text-left px-4'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
            id='about'
        >
            <SectionHeading>About me</SectionHeading>
            <div>
                <p className='mb-4'>
                    I&apos;m a CS and Business Double Degree student at
                    UWaterloo. Looking for s25 internships.
                </p>
                <p className='mb-4'>Recent ventures:</p>
                <ul className='list-disc pl-6 mb-4'>
                    <li>Campus Ambassador at Warp.dev</li>
                    <li>Developing a RAG solution for a small-sized company</li>
                    <li>
                        Running a{' '}
                        <a
                            href='https://jamhacks.ca'
                            target='_blank'
                            rel='nofollow'
                            className='text-blue-500 font-bold underline'
                        >
                            hackathon
                        </a>{' '}
                        getting 200+ underrepresented youths into tech.
                    </li>
                    <li>Next.js full-stack at SlaySchool</li>
                    <li>
                        Drone research project under masters&apos; students at
                        UofT Aerospace (UTIAS)
                    </li>
                </ul>
                <p className='mb-4'>
                    In my free time, you&apos;ll find me rock climbing, staying
                    up in E7 until 4am, and doing random sidequests in Waterloo.
                    I also{' '}
                    <a
                        href='https://x.com/_reesechong'
                        target='_blank'
                        rel='nofollow'
                        className='text-blue-500 font-bold underline'
                    >
                        tweet
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
