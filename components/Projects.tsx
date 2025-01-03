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
        <section>
            <div
                // TODO: Add grid logic
                className={`${
                    displayType === 'grid'
                        ? 'flex flex-wrap -m-2 justify-center'
                        : 'flex flex-wrap -m-2 justify-center'
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
    );
}
