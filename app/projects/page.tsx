import React from 'react';
import Projects from '../../components/Projects';
import SectionHeading from '@/components/Section-heading';

export default function ProjectsPage() {
    return (
        <div className='min-h-full flex flex-col'>
            <SectionHeading>My Projects</SectionHeading>
            <Projects displayType={'grid'} maxIndex={-1} />
        </div>
    );
}
