'use client';
import React from 'react';
import Linktree from '@/components/Linktree';

// not linked anywhere for now
// just going to use this as a linktree
export default function ContactPage() {
    return (
        <article className='flex flex-col items-center w-full font-mono'>
            <div className='leading-relaxed mb-4'>
                reese.chong [at] uwaterloo [dot] ca <br />
            </div>
            <Linktree />
        </article>
    );
}
