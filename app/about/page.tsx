import React from 'react';
import About from '../../components/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'A series of blog posts.',
};

export default function AboutPage() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <About />
            <div className='select-none pointer-events-none'>
                <img
                    src='/puffs.gif' // Put your GIF in the public folder
                    alt='404 - Page Not Found'
                    className='rounded-lg'
                />
            </div>
        </div>
    );
}
