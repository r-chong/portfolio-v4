import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import 'katex/dist/katex.min.css';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, AnchorHTMLAttributes } from 'react';

// Define custom MDX components
const components: MDXComponents = {
    // Override default elements with custom styling
    h1: (props) => <h1 className='text-3xl font-bold mt-8 mb-4' {...props} />,
    h2: (props) => (
        <h2 className='text-2xl font-semibold mt-6 mb-3' {...props} />
    ),
    h3: (props) => <h3 className='text-xl font-medium mt-4 mb-2' {...props} />,
    p: (props) => (
        <p className='my-4 text-gray-800 dark:text-gray-200' {...props} />
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
                    className='text-blue-600 dark:text-blue-400 hover:underline'
                    {...restProps}
                />
            );
        }

        return (
            <a
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 dark:text-blue-400 hover:underline'
                {...props}
            />
        );
    },
    ul: (props) => <ul className='list-disc pl-6 my-4' {...props} />,
    ol: (props) => <ol className='list-decimal pl-6 my-4' {...props} />,
    li: (props) => <li className='mb-1' {...props} />,
    blockquote: (props) => (
        <blockquote
            className='border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4'
            {...props}
        />
    ),
    img: ({ src, alt, width, height, ...props }: ComponentProps<'img'>) => (
        <div className='my-6'>
            <Image
                src={src || ''}
                alt={alt || ''}
                width={800}
                height={500}
                className='rounded-lg'
                {...props}
            />
        </div>
    ),
};

export default components;
