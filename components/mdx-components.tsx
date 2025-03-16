import Image from 'next/image';
import Link from 'next/link';

// Define custom MDX components
const components = {
    // Override default elements with custom styling
    h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className='text-3xl font-bold mt-8 mb-4'>{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className='text-2xl font-semibold mt-6 mb-3'>{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className='text-xl font-medium mt-4 mb-2'>{children}</h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
        <p className='my-4 text-gray-800 dark:text-gray-200'>{children}</p>
    ),
    a: ({ href, children }: { href: string; children: React.ReactNode }) => {
        const isInternal = href.startsWith('/');
        if (isInternal) {
            return (
                <Link
                    href={href}
                    className='text-blue-600 dark:text-blue-400 hover:underline'
                >
                    {children}
                </Link>
            );
        }
        return (
            <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 dark:text-blue-400 hover:underline'
            >
                {children}
            </a>
        );
    },
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className='list-disc pl-6 my-4'>{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <ol className='list-decimal pl-6 my-4'>{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className='mb-1'>{children}</li>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className='border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4'>
            {children}
        </blockquote>
    ),
    img: ({ src, alt }: { src: string; alt: string }) => (
        <div className='my-6'>
            <Image
                src={src || ''}
                alt={alt || ''}
                width={800}
                height={500}
                className='rounded-lg'
            />
        </div>
    ),
    // Add more custom components as needed
};

export default components;
