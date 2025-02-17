import React from 'react';
import { FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer className='w-full py-6 bg-gray-100 dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800'>
            <div className='max-w-4xl mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    {/* <a
                        href='/blog'
                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-2'
                    >
                        <span>Random Blog Post</span>
                        <span className='animate-pulse'>→</span>
                    </a> */}

                    <div className='flex items-center gap-6'>
                        <a
                            href='https://www.linkedin.com/in/reesechong'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='transition-opacity hover:opacity-80'
                        >
                            <FaLinkedin
                                className='text-[#0077B5] dark:text-[#0077B5]'
                                size={24}
                            />
                        </a>
                        <a
                            href='https://github.com/r-chong'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='transition-opacity hover:opacity-80'
                        >
                            <FaGithub
                                className='text-gray-900 dark:text-gray-100'
                                size={24}
                            />
                        </a>
                        <a
                            href='https://twitter.com/_reesechong'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='transition-opacity hover:opacity-80'
                        >
                            <FaXTwitter
                                className='text-gray-900 dark:text-gray-100'
                                size={24}
                            />
                        </a>
                    </div>

                    <div className='flex items-center gap-2'>
                        <a
                            href='https://cs.uwatering.com/#reesechong.com?nav=prev'
                            className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        >
                            ←
                        </a>
                        <a
                            href='https://cs.uwatering.com/#reesechong.com'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <img
                                src='https://cs.uwatering.com/icon.black.svg'
                                alt='CS Webring'
                                className='w-6 h-auto opacity-80 dark:invert'
                            />
                        </a>
                        <a
                            href='https://cs.uwatering.com/#reesechong.com?nav=next'
                            className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        >
                            →
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
