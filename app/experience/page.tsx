import React from 'react';
import Experience from '../../components/Experience';
import { HiDownload } from 'react-icons/hi';

export default function ExperiencePage() {
    return (
        <div>
            <a
                className='flex items-center gap-2 py-3 text-white transition bg-gray-900 rounded-full outline-none group px-7 focus:scale-110 hover:scale-110 active:scale-105 border-black/10'
                href='/Reese_Chong_Resume.pdf'
                download
            >
                Download CV{' '}
                <HiDownload className='transition opacity-60 group group-hover:translate-y-1' />{' '}
                {''}
            </a>
        </div>
    );
}
