'use client';

import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <html lang='en' className='!scroll-smooth'>
            <body
                className={`${inter.className} bg-stone-50 relative text-gray-950 pt-28 sm:pt-36 overflow-x-hidden`}
            >
                <Header />
                <div>{children}</div>
                <Footer />
                <GoogleAnalytics
                    gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                />
            </body>
        </html>
    );
}
