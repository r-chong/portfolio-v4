'use client';

import React from 'react';
import SectionHeading from './Section-heading';
import { motion } from 'framer-motion';

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
                    I&apos;m a Computer Science and Business Double Degree
                    student at UWaterloo.
                </p>
                <p className='mb-4'>
                    My two beliefs are <strong>getting started early</strong>{' '}
                    and <strong>making an impact</strong>.
                </p>
                <ul className='list-disc pl-6 mb-4'>
                    <li>
                        Getting started early: I did 2 software internships in
                        high school.
                    </li>
                    <li>
                        Making an impact: I ran a{' '}
                        <a
                            href='https://jamhacks.ca'
                            target='_blank'
                            rel='nofollow'
                            className='text-blue-500 font-bold underline'
                        >
                            hackathon
                        </a>{' '}
                        with 200+ attendees to get underrepresented youths into
                        tech.
                    </li>
                </ul>
                <p className='mb-4'>
                    In my free time, you&apos;ll find me hanging out in E7,
                    watching Avatar: The Last Airbender for the 1000th time, and
                    doing random sidequests in Waterloo.
                </p>
                <p>Thanks for visiting!</p>
            </div>
        </motion.section>
    );
}
