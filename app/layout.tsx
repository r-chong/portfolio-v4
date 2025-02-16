'use client';

import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useState, useEffect } from 'react';
import ThemeContextProvider from '@/context/theme-context';
import ThemeSwitch from '@/components/ThemeSwitch';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
        }

        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <html lang='en' className='!scroll-smooth'>
            <body
                className={`${inter.className} bg-stone-50 dark:bg-gray-900 relative text-gray-950 dark:text-gray-50 pt-28 sm:pt-36 overflow-x-hidden transition-colors duration-300`}
            >
                <ThemeContextProvider>
                    <Header />
                    <div>{children}</div>
                    <Footer />
                    <ThemeSwitch />
                    <GoogleAnalytics
                        gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                </ThemeContextProvider>
            </body>
        </html>
    );
}
