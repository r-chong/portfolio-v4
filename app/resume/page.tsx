'use client';

import React, { useEffect } from 'react';
import { HiDownload } from 'react-icons/hi';

// export const metadata = {
//     title: 'Resume', // This should trigger the template.
//     description: 'Curriculum vitae.',
// };

// not sure why I made a custom resume page vs. linking the file directly
export default function ResumePage() {
    const resumePath = process.env.NEXT_PUBLIC_RESUME_PATH || '';

    useEffect(() => {
        document.body.classList.add('resume-page');
        return () => document.body.classList.remove('resume-page');
    }, []);

    return (
        <main className='min-h-screen h-[100dvh] bg-gray-50 relative'>
            <div className='h-full w-full'>
                <iframe
                    src={resumePath}
                    className='w-full h-full absolute inset-0'
                    title='Resume'
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        margin: 0,
                        padding: 0,
                        overflow: 'hidden',
                        zIndex: 0,
                    }}
                />

                <a
                    className='fixed bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-black/90 backdrop-blur-sm text-white text-sm sm:text-base font-medium rounded-full shadow-lg hover:bg-blue-500/90 transition-all duration-300 hover:scale-105 z-10'
                    href={resumePath}
                    download
                >
                    <HiDownload className='w-4 h-4 sm:w-5 sm:h-5' />
                    <span>Download</span>
                </a>
            </div>
        </main>
    );
}
