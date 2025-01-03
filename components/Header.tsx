'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { links } from '@/lib/data';
import Link, { LinkProps } from 'next/link';

export default function Header() {
    return (
        <header className='relative z-[999]'>
            {/* why do we do left-1/2 and -translate-x-1 */}
            <motion.div
                className='fixed top-0 left-1/2 h-[4.5rem] min-w-full sm:min-w-[30%] rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:rounded-xl'
                initial={{ y: -100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
            ></motion.div>

            <nav className='flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h[initial] sm:py-0'>
                <ul className='flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:flex-nowrap sm:gap-5'>
                    {/* takes in link objects and maps over it */}
                    {links.map((link) => (
                        <motion.li
                            key={link.hash}
                            className='flex items-center justify-center h-3/4'
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            whileHover={{ scale: 1.015 }}
                        >
                            <Link
                                href={link.url as LinkProps['href']}
                                className='flex items-center justify-center w-full px-3 py-3 transition hover:text-gray-950'
                            >
                                {link.name}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
