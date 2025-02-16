'use client';

import { useTheme } from '@/context/theme-context';
import { BsSun, BsMoon } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className='fixed bottom-5 right-5 w-[3rem] h-[3rem] bg-white dark:bg-gray-950 bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-110 active:scale-105 transition-all'
            onClick={toggleTheme}
            aria-label={`Switch to ${
                theme === 'light' ? 'dark' : 'light'
            } mode`}
        >
            {theme === 'light' ? (
                <BsMoon className='w-5 h-5 text-gray-900' />
            ) : (
                <BsSun className='w-5 h-5 text-gray-50' />
            )}
        </button>
    );
}
