import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';

export default function Button1<T extends string>({
    children,
    url,
}: {
    children: string;
    url: Route<T> | URL;
}) {
    return (
        <Link
            href={url}
            className='flex justify-center items-center gap-2 py-3 text-white transition bg-gray-900 rounded-full outline-none group px-7 focus:scale-110 hover:scale-110 active:scale-105 border-black/10'
        >
            {children}
        </Link>
    );
}
