'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
    children: React.ReactNode;
};

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
    children,
}: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<Theme>('light');

    // Initialize theme
    useEffect(() => {
        // On mount, read from localStorage or system preference
        if (
            localStorage.theme === 'dark' ||
            (!localStorage.theme &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeContextProvider');
    }
    return context;
}
