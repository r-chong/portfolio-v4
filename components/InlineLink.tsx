import Link, { LinkProps } from 'next/link';

interface InlineLinkProps {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}

export default function InlineLink({
    href,
    children,
    external = false,
}: InlineLinkProps) {
    const commonClasses = 'text-blue-500 font-bold underline';

    if (external) {
        return (
            <a
                href={href}
                target='_blank'
                rel='nofollow'
                className={commonClasses}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href as LinkProps['href']} className={commonClasses}>
            {children}
        </Link>
    );
}
