'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { links } from '@/lib/data';
import Link, { LinkProps } from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className='relative z-[999]'>
            <motion.div
                className='fixed top-0 left-1/2 h-[4.5rem] hidden sm:block w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-xl'
                initial={{ y: -100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
            ></motion.div>

            {/* Hamburger Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='fixed top-[1.2rem] right-4 z-[1000] h-12 w-12 flex flex-col items-center justify-center gap-[6px] sm:hidden'
            >
                <motion.span
                    className='h-[2px] w-6 bg-gray-600 block'
                    animate={
                        isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.2 }}
                ></motion.span>
                <motion.span
                    className='h-[2px] w-6 bg-gray-600 block'
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                ></motion.span>
                <motion.span
                    className='h-[2px] w-6 bg-gray-600 block'
                    animate={
                        isMenuOpen
                            ? { rotate: -45, y: -8 }
                            : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.2 }}
                ></motion.span>
            </button>

            {/* Desktop Navigation */}
            <nav className='hidden sm:flex fixed top-[1.7rem] left-1/2 h-12 -translate-x-1/2 py-2'>
                <ul className='flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:flex-nowrap sm:gap-5'>
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

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className='fixed inset-0 bg-white z-[998] sm:hidden pt-24 px-8'
                    >
                        <ul className='flex flex-col items-center gap-6 text-lg font-medium text-gray-500'>
                            {links.map((link) => (
                                <motion.li
                                    key={link.hash}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href={link.url as LinkProps['href']}
                                        onClick={() => setIsMenuOpen(false)}
                                        className='flex items-center justify-center w-full px-3 py-3 transition hover:text-gray-950'
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
