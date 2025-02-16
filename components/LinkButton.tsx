import { ReactNode } from 'react';

interface LinkButtonProps {
    href?: string;
    onClick?: () => void;
    children: ReactNode;
}

export default function LinkButton({
    href,
    onClick,
    children,
}: LinkButtonProps) {
    const className =
        'flex items-center justify-center gap-2 h-[3.25rem] w-full px-6 font-medium text-gray-950 transition-all bg-white rounded-xl border border-black/10 shadow-sm outline-none hover:bg-gray-50 active:bg-gray-100 dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15';

    if (href) {
        return (
            <a
                className={className}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
            >
                {children}
            </a>
        );
    }

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}
