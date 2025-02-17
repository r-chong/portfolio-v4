'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import ThemeContextProvider from '@/context/theme-context';
import ThemeSwitch from './ThemeSwitch';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isResumePage = usePathname() === '/resume';

    return (
        <ThemeContextProvider>
            <div className='relative'>
                <div
                    className={`flex flex-col ${
                        !isResumePage ? 'pt-28 sm:pt-36' : ''
                    }`}
                >
                    <Header />
                    <div className='z-10 min-h-screen'>{children}</div>
                    {!isResumePage && (
                        <>
                            <div className='h-10' />
                            <Footer />
                        </>
                    )}
                </div>
                <ThemeSwitch />
            </div>
        </ThemeContextProvider>
    );
}
