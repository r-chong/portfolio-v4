'use client';

import { useTheme } from '@/context/theme-context';
import { BsSun, BsMoon } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className='fixed bottom-4 right-4 w-10 h-10 bg-opacity-90 dark:bg-opacity-90 bg-white dark:bg-gray-800 backdrop-blur-[0.5rem] border border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all duration-200 ease-in-out z-[49] sm:bottom-8 sm:right-8 sm:w-12 sm:h-12 select-none'
            onClick={toggleTheme}
            aria-label={`Switch to ${
                theme === 'light' ? 'dark' : 'light'
            } mode`}
        >
            {theme === 'light' ? (
                <BsMoon className='w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-400 transition-colors duration-200' />
            ) : (
                <BsSun className='w-4 h-4 sm:w-5 sm:h-5 text-amber-300 transition-colors duration-200' />
            )}
        </button>
    );
}
