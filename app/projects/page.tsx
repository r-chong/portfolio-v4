import { Metadata } from 'next';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore my portfolio of projects and technical work.',
};

export default function ProjectsPage() {
    return (
        <div className='max-w-6xl mx-auto py-12 px-4 sm:px-6'>
            <h1 className='text-3xl font-bold mb-8'>Projects</h1>
            <Projects displayType='grid' maxIndex={-1} />
        </div>
    );
}
