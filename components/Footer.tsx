import React from 'react';
import {
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaGithub,
    FaRandom,
} from 'react-icons/fa';

export default function Footere() {
    return (
        <div className='w-full py-4 bg-gray-100 border-t-2 lg:flex'>
            <div className='flex justify-center lg:justify-left'>
                <p className='text-m mx-8 items-center text-[#888] hidden md:block'>
                    Reese Chong 2025
                </p>
                <div className='flex space-x-4'>
                    {/* <a
                        href='https://twitter.com/ccbuildspace'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaTwitter
                            className='text-blue-500 hover:text-blue-700'
                            size={30}
                        />
                    </a>

                    <a
                        href='https://www.instagram.com/reese.chong19/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaInstagram
                            className='text-red-500 hover:text-red-700'
                            size={30}
                        />
                    </a> */}
                    <a
                        href='https://www.linkedin.com/in/reesechong'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaLinkedin
                            className='text-blue-700 hover:text-blue-900'
                            size={30}
                        />
                    </a>
                    <a
                        href='https://github.com/r-chong'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaGithub
                            className='text-gray-900 hover:text-gray-700'
                            size={30}
                        />
                    </a>
                    {/* <a
                        href='https://github.com/r-chong'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaRandom
                            className='text-gray-900 hover:text-gray-700'
                            size={30}
                        />
                    </a> */}
                    {/* <em className='items-center'>Random blog post!</em> */}
                </div>
            </div>
        </div>
    );
}
