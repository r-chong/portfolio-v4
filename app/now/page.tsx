import React from 'react';

export default function NowPage() {
    return (
        <article className='flex flex-col items-center w-full'>
            <div className='container max-w-2xl px-4 mx-auto mt-8 sm:px-6 md:mt-12'>
                <h1 className='mb-8 text-3xl font-bold'>Now</h1>
                <div className='prose dark:prose-invert prose-quoteless prose-neutral'>
                    <p className='text-gray-700 dark:text-gray-300'>
                        This is what I'm currently focused on.{' '}
                        <a
                            href='https://nownownow.com/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 dark:text-blue-400 no-underline hover:underline'
                        >
                            Inspired by nownownow.com
                        </a>
                    </p>
                </div>
            </div>
        </article>
    );
}
