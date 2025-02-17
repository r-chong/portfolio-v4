import { createContext, useContext, useEffect, useState } from 'react';

interface CompactModeContextType {
    isCompact: boolean;
    toggleCompactMode: () => void;
}

const CompactModeContext = createContext<CompactModeContextType | undefined>(
    undefined
);

export function CompactModeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        // Load the saved preference from localStorage
        const savedPreference = localStorage.getItem('blogCompactMode');
        if (savedPreference !== null) {
            setIsCompact(JSON.parse(savedPreference));
        }
    }, []);

    const toggleCompactMode = () => {
        setIsCompact((prev) => {
            const newValue = !prev;
            // Save to localStorage
            localStorage.setItem('blogCompactMode', JSON.stringify(newValue));
            return newValue;
        });
    };

    return (
        <CompactModeContext.Provider value={{ isCompact, toggleCompactMode }}>
            {children}
        </CompactModeContext.Provider>
    );
}

export function useCompactMode() {
    const context = useContext(CompactModeContext);
    if (context === undefined) {
        throw new Error(
            'useCompactMode must be used within a CompactModeProvider'
        );
    }
    return context;
}
