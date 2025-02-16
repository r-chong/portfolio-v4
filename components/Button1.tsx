import React from 'react';
import Link, { LinkProps } from 'next/link';
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
            href={url as LinkProps['href']}
            className='flex justify-center items-center gap-2 py-3 text-white transition bg-gray-900 dark:bg-gray-50 dark:text-gray-900 rounded-full outline-none group px-7 focus:scale-110 hover:scale-110 hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-105 border-black/10'
        >
            {children}
        </Link>
    );
}
