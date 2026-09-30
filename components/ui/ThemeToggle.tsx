'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative flex items-center justify-between w-[72px] h-10 p-1 rounded-full bg-[#f1f5f9] dark:bg-[#1a1f2c] shadow-clay-input overflow-hidden transition-colors"
            aria-label="Toggle theme"
        >
            {/* The sliding toggle thumb */}
            <motion.div
                initial={false}
                animate={{
                    x: isDark ? 32 : 0,
                    backgroundColor: isDark ? '#1a1f2c' : '#FBBF24'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute left-1 w-8 h-8 rounded-full shadow-md z-0"
                style={{
                    boxShadow: isDark 
                        ? 'inset 2px 2px 4px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.5)'
                        : 'inset 2px 2px 4px rgba(255,255,255,0.8), 0 2px 4px rgba(245,158,11,0.5)'
                }}
            />
            
            <div className="relative z-10 w-full flex justify-between px-2 items-center pointer-events-none">
                <Sun className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-text-muted' : 'text-white'}`} />
                <Moon className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-text-muted'}`} />
            </div>
        </button>
    );
}
