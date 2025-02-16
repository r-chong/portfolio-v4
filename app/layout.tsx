import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import ThemeContextProvider from '@/context/theme-context';
import ThemeSwitch from '@/components/ThemeSwitch';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                    {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
                        <GoogleAnalytics
                            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
                        />
                    )}
                </ThemeContextProvider>
            </body>
        </html>
    );
}
