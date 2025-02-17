'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isResumePage = usePathname() === '/resume';

    return (
        <div
            className={`flex flex-col ${!isResumePage ? 'pt-28 sm:pt-36' : ''}`}
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
    );
}
