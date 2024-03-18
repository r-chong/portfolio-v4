import React from 'react';
import Link from 'next/link';

type Button1Type = {
    children: string;
    url: string;
};

export default function Button1({ children, url }: Button1Type) {
    return (
        <Link
            href={url}
            className='flex justify-center items-center gap-2 py-3 text-white transition bg-gray-900 rounded-full outline-none group px-7 focus:scale-110 hover:scale-110 active:scale-105 border-black/10'
        >
            {children}
        </Link>
    );
}
