import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Reese Chong | Portfolio',
    description: 'Reese Chong is a software engineer based in Toronto.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${inter.className}
bg-stone-50 relative text-gray-950 pt-28 sm:pt-36 flex flex-col items-center`}
            >
                <Header />
                <div className='z-10 flex justify-center min-h-screen lg:w-[30em] xl:w-[45em] w-[15em]'>
                    {children}
                </div>
                <div className='h-10'></div>
                <Footer />
            </body>
        </html>
    );
}
