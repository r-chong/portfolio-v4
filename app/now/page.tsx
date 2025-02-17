import React from 'react';

// formatting is not great
// TODO: streamline formatting for nownownow
export default function NowPage() {
    return (
        <article className='flex flex-col items-center w-full font-mono'>
            <div className='container max-w-2xl px-4 mx-auto mt-8 sm:px-6 md:mt-12'>
                <h1 className='mb-8 text-3xl font-bold'>Now</h1>
                <p>last updated 2025-02-16</p>
                <div className='prose dark:prose-invert prose-quoteless prose-neutral'>
                    <p className='text-gray-700 dark:text-gray-300'>
                        <ul className='space-y-0.5 text-sm list-none'>
                            currently:{' '}
                            <li className='before:content-["-"] before:mr-2'>
                                heads down, applying to jobs
                            </li>
                            <li className='before:content-["-"] before:mr-2'>
                                honing consistency in my habits
                                <ul className='mt-0.5 ml-4 list-none space-y-0.5'>
                                    <li className='before:content-["-"] before:mr-2'>
                                        leetcode
                                    </li>
                                    <li className='before:content-["-"] before:mr-2'>
                                        shipping
                                    </li>
                                    <li className='before:content-["-"] before:mr-2'>
                                        building up my online presence on x
                                    </li>
                                </ul>
                            </li>
                            <li className='before:content-["-"] before:mr-2'>
                                chasing the holy grail of flow state
                            </li>
                            <li className='before:content-["-"] before:mr-2'>
                                rock climbing @ pac
                            </li>
                            <li className='before:content-["-"] before:mr-2'>
                                dressing better every day
                            </li>
                            <li className='before:content-["-"] before:mr-2'>
                                I will get a lot done this reading week, or else
                            </li>
                        </ul>
                        <p>
                            &#34;the world needs more players, it has enough
                            fans&#34;
                        </p>
                        <p>
                            I&apos;ve been kind of a fan ngl, time to change
                            that
                        </p>
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
