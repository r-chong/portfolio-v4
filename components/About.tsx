'use client';

import React from 'react';
import SectionHeading from './Section-heading';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <motion.section
            // ref={ref}
            className='leading-8 text-center mb-28 sm:mb-40 scroll-mt-28'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
            id='about'
        >
            <SectionHeading>About me</SectionHeading>
            <p>
                <span>
                    Hello! I&apos;m Reese, a Computer Science and Business
                    student at the University of Waterloo who is passionate
                    about software development!{'  '}
                </span>
                <br />
                <br />
                My favourite part of programming is problem-solving. I love the
                feeling of finally figuring out a solution to a problem. My
                stack is{' '}
                <span className='font-medium'>
                    React, Next.js, Node.js, and MongoDB,{' '}
                </span>
                but I am always willing to dive into something new and
                unfamiliar and get up to speed.
                <br />
                <br />
                One thing about me is that I am a strong believer in VR apps
                (not games). I think that they&apos;re going to go mainstream
                and so I&apos;m really getting into this development space right
                now.
                {''}
            </p>

            <p>
                <br></br>
                In my free time, you&apos;ll find me exploring Downtown Toronto,
                watching Avatar: The Last Airbender for the umpteenth time and
                doing karaoke. I also enjoy self improvement; I&apos;m currently
                working on my public speaking and storytelling skills.
            </p>

            <p>
                <br />
                Thanks for visiting my blog! Feel free to reach out to me if
                you&apos;d like to connect. I love meeting new people :-)
            </p>
        </motion.section>
    );
}
