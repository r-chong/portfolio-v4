import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import LinkButton from '@/components/LinkButton';

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'Oops! This page does not exist',
};

export default function NotFound() {
    const SpotifyMiniEmbed = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '2rem 0',
                }}
            >
                <iframe
                    src='https://open.spotify.com/embed/track/3GZD6HmiNUhxXYf8Gch723?utm_source=generator'
                    width='300'
                    height='80' // Reduced height for a mini player
                    frameBorder='0'
                    allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                    loading='lazy'
                ></iframe>
            </div>
        );
    };

    return (
        <main className='w-full flex flex-col items-center justify-start bg-slate-900'>
            <h1 className='text-xl font-bold p-4'>It seems like you&apos;re</h1>
            <SpotifyMiniEmbed />
            <h1 className='text-md font-light p-4'>
                Let&apos;s connect on{' '}
                <a
                    href='https://linkedin.com/in/reesechong'
                    rel='noopener noreferrer'
                    className='text-blue-400'
                >
                    LinkedIn
                </a>
            </h1>
        </main>
    );
}
