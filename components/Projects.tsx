'use client';
import React, { useRef } from 'react';
import SectionHeading from './Section-heading';
import { projectsData } from '@/lib/data';
import Project from './Project';

export default function Projects() {
    return (
        <section>
            <SectionHeading>My Projects</SectionHeading>
            <div>
                {projectsData.slice(0, 3).map((project, index) => (
                    // key would matter if shuffling or editing the list

                    // React.Fragment lets us not make another unnecessary div
                    // ...project is a spread operator (passes down everything about the object)
                    <React.Fragment key={index}>
                        <Project {...project} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
