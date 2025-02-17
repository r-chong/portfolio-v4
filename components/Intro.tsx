'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toast';
import LinkButton from './LinkButton';

export default function Intro() {
    return (
        <section className='flex flex-col items-center mb-8 md:mb-12 text-center scroll-mt-28 px-4'>
            <div className='flex items-center justify-center'>
                <div className='relative'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: 'tween',
                            duration: 0.2,
                        }}
                    >
                        <Image
                            src='/xmas_247.jpeg'
                            alt='Image of Reese Chong'
                            width={192}
                            height={192}
                            quality={95}
                            draggable='false'
                            priority={true}
                            className='w-36 h-36 rounded-full object-cover border-[0.35rem] border-white shadow-xl'
                        />
                    </motion.div>
                    {/* TODO: Make it wave */}
                    <motion.span
                        className='absolute bottom-0 right-0 text-4xl'
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: 'spring',
                            delay: 0.1,
                            stiffness: 125,
                            duration: 0.7,
                        }}
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 1 },
                        }}
                    >
                        <Image
                            draggable='false'
                            alt='👋'
                            width={50}
                            height={50}
                            src='/twemoji/wave.svg'
                        />
                    </motion.span>
                </div>
            </div>

            {/* overriding the line height rule*/}
            <motion.h1
                className='mt-4 px-4 text-xl font-medium !leading-[1.5] sm:text-4xl'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className='flex items-center justify-center gap-2 mb-4 sm:gap-4'>
                    <span className='font-bold'>Hi, I&apos;m Reese!</span>
                    <Image
                        draggable='false'
                        alt='🇨🇦'
                        width={32}
                        height={32}
                        src='/twemoji/flag_ca.svg'
                        className='w-8 sm:w-10 h-auto'
                    />
                </div>
            </motion.h1>

            <motion.div
                className='flex flex-col w-full items-center justify-center gap-3 px-4 text-[15px] font-medium sm:max-w-[24rem]'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{
                    delay: 0.1,
                }}
            ></motion.div>
        </section>
    );
}
