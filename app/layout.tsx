import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Script from 'next/script';

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
            <head>
                <Script
                    async
                    src='https://www.googletagmanager.com/gtag/js?id=G-X90HCECNYD'
                />

                <Script id='google-analytics'>
                    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`});
  `}
                </Script>
            </head>
            <body
                className={`${inter.className}
bg-stone-50 relative text-gray-950 pt-28 sm:pt-36 flex flex-col`}
            >
                <Header />
                <div className='z-10 min-h-screen'>{children}</div>
                <div className='h-10'></div>
                <Footer />
            </body>
        </html>
    );
}
