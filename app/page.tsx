import Intro from '@/components/Intro';
import SectionDivider from '@/components/Section-divider';
import About from '@/components/About';
import Projects from '@/components/Projects';

export default function Home() {
    return (
        <main className=''>
            <Intro />
            <SectionDivider />
            <About />
            <Projects />
        </main>
    );
}
