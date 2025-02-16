'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { HiDownload } from 'react-icons/hi';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toast';

export default function Intro() {
    const [isCopied, setIsCopied] = useState(false);

    const copyEmailAddress = () => {
        navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`
        );

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        // toast('Copied Email Address! ✅', {
        //     backgroundColor: '#41a047',
        //     color: '#ffffff',
        // });
    };

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
                <div className='flex mb-4'>
                    <span className='font-bold'>Hi, I&apos;m Reese! </span>{' '}
                    {/* <span className=''>Waterloo</span>!{' '} */}
                    <Image
                        draggable='false'
                        alt='🇨🇦'
                        width={10}
                        height={10}
                        src='/twemoji/flag_ca.svg'
                        className='w-12'
                    />
                </div>
            </motion.h1>

            <motion.div
                className='flex flex-col w-full items-center justify-center gap-3 px-4 text-sm sm:text-base font-medium sm:flex-row sm:max-w-3xl'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{
                    delay: 0.1,
                }}
            >
                <button
                    onClick={copyEmailAddress}
                    className='flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-5 font-medium text-white dark:text-gray-950 transition-all bg-gray-900 dark:bg-white rounded-full shadow-md outline-none hover:bg-gray-800 dark:hover:bg-gray-200 focus:scale-105 hover:scale-105 active:scale-100'
                >
                    {isCopied ? (
                        <span>Copied Email Address! ✅</span>
                    ) : (
                        <>
                            <span>Copy email address</span>
                            <MdOutlineMail className='text-lg opacity-70 group-hover:translate-x-1 transition' />
                        </>
                    )}
                </button>

                <a
                    className='flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-5 transition bg-white dark:bg-gray-950 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-100 border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-900'
                    href={process.env.NEXT_PUBLIC_RESUME_LINK}
                    target='_blank'
                >
                    <span className='text-gray-900 dark:text-white'>
                        Resume
                    </span>
                    <HiDownload className='text-lg opacity-60 group-hover:translate-y-1 transition text-gray-900 dark:text-white' />
                </a>

                <a
                    className='flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-5 bg-white dark:bg-gray-950 rounded-full focus:scale-105 hover:scale-105 active:scale-100 border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-900 transition'
                    href='https://linkedin.com/in/reesechong/'
                    target='_blank'
                >
                    <span className='text-gray-900 dark:text-white'>
                        LinkedIn
                    </span>
                    <BsLinkedin className='text-lg text-gray-700 dark:text-gray-200' />
                </a>

                <a
                    className='flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-5 bg-white dark:bg-gray-950 rounded-full focus:scale-105 hover:scale-105 active:scale-100 border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-900 transition'
                    href='https://github.com/r-chong/'
                    target='_blank'
                >
                    <span className='text-gray-900 dark:text-white'>
                        GitHub
                    </span>
                    <BsGithub className='text-lg text-gray-700 dark:text-gray-200' />
                </a>
            </motion.div>
        </section>
    );
}
