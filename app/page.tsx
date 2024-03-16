'use client';
import Intro from '@/components/Intro';
import SectionDivider from '@/components/Section-divider';
import About from '@/components/About';
import Projects from '@/components/Projects';
import { ToastContainer } from 'react-toast';

export default function Home() {
    return (
        <main className=''>
            <Intro />
            <SectionDivider />
            <About />
            <Projects />
            <ToastContainer delay={3000} position={'bottom-center'} />
        </main>
    );
}
