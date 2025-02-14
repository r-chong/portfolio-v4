import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Reese Chong | Portfolio',
    description:
        'Reese Chong - Software Developer Studying at the University of Waterloo.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <head></head>
            <body
                className={`${inter.className}
bg-stone-50 relative text-gray-950 pt-28 sm:pt-36 flex flex-col`}
            >
                <Header />
                <div className='z-10 min-h-screen'>{children}</div>
                <Footer />
            </body>
            <GoogleAnalytics
                gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
        </html>
    );
}
