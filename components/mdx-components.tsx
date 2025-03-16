import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import 'katex/dist/katex.min.css';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, AnchorHTMLAttributes } from 'react';

// Define custom MDX components
const components: MDXComponents = {
    // Override default elements with custom styling
    h1: (props) => (
        <h1
            className='text-2xl md:text-3xl font-bold mt-8 mb-4 font-source-sans-pro'
            {...props}
        />
    ),
    h2: (props) => (
        <h2
            className='text-xl md:text-2xl font-semibold mt-6 mb-3 font-source-sans-pro'
            {...props}
        />
    ),
    h3: (props) => (
        <h3
            className='text-lg md:text-xl font-medium mt-4 mb-2 font-source-sans-pro'
            {...props}
        />
    ),
    p: (props) => (
        <p
            className='my-4 text-gray-800 dark:text-gray-200 font-georgia text-base md:text-lg leading-7'
            {...props}
        />
    ),
    a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const href = props.href || '';
        const isInternal = href.startsWith('/');

        if (isInternal) {
            // Extract href and other props
            const { href: linkHref, ...restProps } = props;

            return (
                <Link
                    href={linkHref as any}
                    className='text-blue-600 dark:text-blue-400 hover:underline font-source-sans-pro transition-colors duration-200'
                    {...restProps}
                />
            );
        }

        return (
            <a
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 dark:text-blue-400 hover:underline font-source-sans-pro transition-colors duration-200'
                {...props}
            />
        );
    },
    ul: (props) => (
        <ul
            className='list-disc pl-4 md:pl-6 my-4 font-source-sans-pro mx-auto w-full md:max-w-xl text-base md:text-lg'
            {...props}
        />
    ),
    ol: (props) => (
        <ol
            className='list-decimal pl-4 md:pl-6 my-4 font-source-sans-pro mx-auto w-full md:max-w-xl text-base md:text-lg'
            {...props}
        />
    ),
    li: (props) => <li className='mb-2 font-source-sans-pro' {...props} />,
    blockquote: (props) => (
        <blockquote
            className='border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-6 font-source-sans-pro mx-auto w-full md:max-w-xl text-base md:text-lg'
            {...props}
        />
    ),
    img: ({ src, alt, width, height, ...props }: ComponentProps<'img'>) => (
        <div className='my-8 flex justify-center'>
            <Image
                src={src || ''}
                alt={alt || ''}
                width={800}
                height={500}
                className='rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-full h-auto'
                {...props}
            />
        </div>
    ),
    // Add support for code blocks with better styling
    code: (props) => (
        <code
            className='bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400'
            {...props}
        />
    ),
    pre: (props) => (
        <pre
            className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6 text-sm md:text-base'
            {...props}
        />
    ),
    // Add support for horizontal rule
    hr: () => <hr className='my-8 border-gray-300 dark:border-gray-700' />,
    // Add support for tables
    table: (props) => (
        <div className='overflow-x-auto my-6'>
            <table
                className='w-full border-collapse font-source-sans-pro text-base'
                {...props}
            />
        </div>
    ),
    thead: (props) => (
        <thead className='bg-gray-100 dark:bg-gray-800' {...props} />
    ),
    tbody: (props) => <tbody {...props} />,
    tr: (props) => (
        <tr
            className='border-b border-gray-200 dark:border-gray-700'
            {...props}
        />
    ),
    th: (props) => (
        <th
            className='px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300'
            {...props}
        />
    ),
    td: (props) => <td className='px-4 py-2' {...props} />,
};

export default components;
