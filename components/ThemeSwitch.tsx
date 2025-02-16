'use client';

import { useTheme } from '@/context/theme-context';
import { BsSun, BsMoon } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            className='fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950'
            onClick={toggleTheme}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {theme === 'light' ? <BsSun /> : <BsMoon />}
        </motion.button>
    );
}
