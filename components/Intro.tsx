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
        navigator.clipboard.writeText(`${process.env.EMAIL_ADDRESS}`);

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        // toast('Copied Email Address! ✅', {
        //     backgroundColor: '#41a047',
        //     color: '#ffffff',
        // });
    };

    return (
        <section className='flex flex-col items-center mb-28 text-center sm:mb-0 scroll-mt-[100rem]'>
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
                            src='/Reese_C.jpg'
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
                className='mt-4 text-2xl font-medium !leading-[1.5] sm:text-4xl'
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
                className='flex flex-col items-center justify-center gap-4 px-4 text-lg font-medium sm:flex-row'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{
                    delay: 0.1,
                }}
            >
                <button
                    onClick={copyEmailAddress}
                    className='flex gap-2 px-4 py-2 text-lg font-medium text-white transition-all bg-black rounded-full shadow-md outline-none hover:bg-gray-900 focus:scale-110 hover:scale-110 active:scale-105 cursor:pointer'
                >
                    <span className='flex items-center gap-2 group'>
                        {isCopied ? (
                            <>
                                <span>Copied Email Address! ✅</span>
                            </>
                        ) : (
                            <>
                                <span>Copy email address</span>
                                <MdOutlineMail className='transition opacity-70 group-hover:translate-x-1' />
                            </>
                        )}
                    </span>
                </button>

                <a
                    className='flex items-center justify-around gap-2 py-3 px-7 transition w-full sm:w-auto bg-white rounded-full outline-none group focus:scale-110 hover:scale-110 active:scale-105 border-black/10'
                    href={process.env.NEXT_PUBLIC_RESUME_LINK}
                    target='_blank'
                >
                    <p className=''>Resume </p>
                    <HiDownload className='transition opacity-60 group m:w-auto group-hover:translate-y-1' />{' '}
                    {''}
                </a>

                <a
                    className='flex items-center justify-around p-4 text-gray-700 w-full sm:w-auto bg-white rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-[1.15] border-black/10 transition'
                    href='https://linkedin.com/in/reesechong/'
                    target='_blank'
                >
                    <p className='sm:hidden visible'>LinkedIn </p>
                    <BsLinkedin />
                </a>

                <a
                    className='flex justify-around   *:items-center p-4 text-[1.3rem] w-full sm:w-auto text-gray-700 bg-white rounded-full focus:scale-[1.15] hover:text-gray-950 hover:scale-[1.15] active:scale-105 border-black/10 transition'
                    href='https://github.com/r-chong/'
                    target='_blank'
                >
                    <p className='sm:hidden visible'>GitHub </p>
                    <BsGithub />
                </a>
            </motion.div>
        </section>
    );
}
