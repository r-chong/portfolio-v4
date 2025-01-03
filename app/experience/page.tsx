import React from 'react';
import { HiDownload } from 'react-icons/hi';

export default function ExperiencePage() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <div className='w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden'>
                <iframe
                    src='https://drive.google.com/file/d/1dpfR7P8Zod_9FjLaqR8FIglcsLAocHYo/preview'
                    className='w-full h-[50vh] sm:h-[80vh]'
                    title='Experience Document'
                />
            </div>
            <a
                className='mt-6 flex items-center px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
                href='https://drive.google.com/file/d/1dpfR7P8Zod_9FjLaqR8FIglcsLAocHYo/view?usp=sharing'
                target='_blank'
            >
                <HiDownload className='mr-2 w-5 h-5' /> Download
            </a>
        </div>
    );
}
