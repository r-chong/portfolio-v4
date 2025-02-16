'use client';
import React from 'react';
import { projectsData } from '@/lib/data';
import ProjectDefault from './ProjectDefault';

type ProjectsProps = {
    displayType: 'grid' | 'linear';
    maxIndex: number;
};

export default function Projects({ displayType, maxIndex }: ProjectsProps) {
    return (
        <section className='container mx-auto px-4'>
            <div
                className={`${
                    displayType === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'
                        : 'flex flex-col space-y-8 max-w-3xl mx-auto'
                }`}
            >
                {projectsData.slice(0, maxIndex).map((project, index) => (
                    <ProjectDefault key={index} {...project} />
                ))}
            </div>
        </section>
    );
}
