import React from 'react';
import VideoPitch from '@/components/Video';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pitch',
    description: 'Software Engineering Demo Reel',
};

export default function page() {
    return (
        <div>
            <VideoPitch videoId='eeTDOZHyZgY' />
        </div>
    );
}
