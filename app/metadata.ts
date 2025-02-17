export const metadata = {
    title: {
        default: 'Reese Chong | Portfolio',
        template: 'Reese Chong | %s',
    },
    description:
        'Reese Chong - Software Engineer Studying at the University of Waterloo.',
    keywords: [
        'Portfolio',
        'Software Engineer',
        'Waterloo',
        'Toronto',
        'React',
    ],
    authors: [{ name: 'Reese Chong', url: 'https://reesechong.com' }],
    generator: 'Next.js',
    applicationName: 'Reese Chong Portfolio',
    referrer: 'origin',
    colorScheme: 'light',
    viewport: 'width=device-width, initial-scale=1',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
    appleWebApp: {
        capable: true,
        title: 'Reese Chong Portfolio',
        startupImage: '/logo.png',
    },
    manifest: '/site.webmanifest',
    alternates: {
        canonical: 'https://reesechong.com',
        languages: {
            'en-US': 'https://reesechong.com/en-US',
            'fr-FR': 'https://reesechong.com/fr-FR',
        },
    },
    openGraph: {
        title: 'Reese Chong | Portfolio',
        description:
            'Reese Chong - Software Engineer Studying at the University of Waterloo.',
        url: 'https://reesechong.com',
        siteName: 'Reese Chong Portfolio',
        images: [
            {
                url: '/icon.jpg',
                width: 630,
                height: 630,
                alt: 'Peanut Butter Cups',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};
