import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Script from 'next/script';
import ClientLayout from '@/components/ClientLayout';
import 'katex/dist/katex.min.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='light'>
            <head>
                <Script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                />
                <Script id='google-analytics'>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                    `}
                </Script>
            </head>
            <body
                className={`${inter.className} bg-stone-50 dark:bg-gray-900 relative text-gray-950 dark:text-gray-50`}
            >
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
