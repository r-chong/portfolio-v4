import React from 'react';
import Projects from '../../components/Projects';
import SectionHeading from '@/components/Section-heading';

export const metadata = {
    title: 'Projects', // This should trigger the template.
    description: 'Writeups for each of my projects.',
};

export default function ProjectsPage() {
    return (
        <div className='min-h-full flex flex-col'>
            <SectionHeading>My Projects</SectionHeading>
            <Projects displayType={'grid'} maxIndex={-1} />
        </div>
    );
}
