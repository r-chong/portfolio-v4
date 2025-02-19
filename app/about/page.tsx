import React from 'react';
import About from '../../components/About';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'A series of blog posts.',
};

export default function AboutPage() {
    return (
        <div>
            <About />
        </div>
    );
}
