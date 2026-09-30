'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 400);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-clay-bg"
                >
                    {/* Animated logo */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: 'backOut' }}
                        className="mb-8 relative"
                    >
                        <div className="w-24 h-24 rounded-3xl bg-clay-surface shadow-clay-pill flex items-center justify-center">
                            <span className="text-4xl font-extrabold gradient-text font-mono">OM</span>
                        </div>
                        {/* Rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-[-12px] rounded-[32px] border-t-[3px] border-r-[3px] border-accent-blue/30 opacity-80"
                        />
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-extrabold text-text-primary mb-2"
                    >
                        Om Maurya
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-text-secondary font-bold text-sm mb-10 tracking-widest uppercase"
                    >
                        Portfolio Loading
                    </motion.p>

                    {/* Progress bar */}
                    <div className="w-64 h-2 bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-input rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                                background: 'linear-gradient(90deg, var(--cyan), var(--blue))',
                            }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
