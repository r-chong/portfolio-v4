'use client';
import Intro from '@/components/Intro';
import SectionDivider from '@/components/Section-divider';
import SectionHeading from '@/components/Section-heading';
import About from '@/components/About';
import Projects from '@/components/Projects';
import { ToastContainer } from 'react-toast';
import Button1 from '@/components/Button1';
import Linktree from '@/components/Linktree';

export default function Home() {
    return (
        <main className=''>
            <Intro />
            {/* <SectionDivider /> */}
            <About />

            {/* <div className='flex justify-center mb-8'>
                <Linktree />
            </div> */}
            {/* <SectionDivider /> */}

            <SectionHeading>Featured Projects</SectionHeading>
            <div className='max-w-2xl mx-auto'>
                <Projects displayType={'linear'} maxIndex={3} />
            </div>
            <ToastContainer delay={3000} position={'bottom-center'} />

            <div className='flex justify-center'>
                <div className='w-[3/7] my-10'>
                    <Button1 url={'/projects'}>See More Projects</Button1>
                </div>
            </div>
        </main>
    );
}
