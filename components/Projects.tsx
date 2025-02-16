'use client';
import React, { useRef } from 'react';
import { projectsData } from '@/lib/data';
import ProjectDefault from './ProjectDefault';

type ProjectsProps = {
    displayType: 'grid' | 'linear';
    maxIndex: number;
};

export default function Projects({ displayType, maxIndex }: ProjectsProps) {
    return (
        <>
            <section>
                <div
                    className={`${
                        displayType === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 max-w-7xl mx-auto'
                            : 'flex flex-col space-y-8 px-4 sm:px-6 max-w-3xl mx-auto'
                    }`}
                >
                    {projectsData.slice(0, maxIndex).map((project, index) => (
                        // key would matter if shuffling or editing the list

                        // React.Fragment lets us not make another unnecessary div
                        // ...project is a spread operator (passes down everything about the object)
                        <React.Fragment key={index}>
                            {displayType == 'grid' ? (
                                <ProjectDefault {...project} />
                            ) : (
                                <ProjectDefault {...project} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </>
    );
}
