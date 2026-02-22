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
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020209]"
                >
                    {/* Animated logo */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: 'backOut' }}
                        className="mb-8 relative"
                    >
                        <div className="w-24 h-24 rounded-2xl border-2 border-[#00f5ff] flex items-center justify-center"
                            style={{ boxShadow: '0 0 30px rgba(0, 245, 255, 0.4), inset 0 0 30px rgba(0, 245, 255, 0.05)' }}>
                            <span className="text-4xl font-bold gradient-text font-mono">OM</span>
                        </div>
                        {/* Rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-[-8px] rounded-2xl border-t-2 border-r-2 border-[#bf00ff] opacity-60"
                        />
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-bold text-white mb-2"
                    >
                        Om Maurya
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-[#00f5ff] text-sm font-mono mb-10"
                    >
                        Full Stack Developer
                    </motion.p>

                    {/* Progress bar */}
                    <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                                background: 'linear-gradient(90deg, #00f5ff, #bf00ff)',
                                boxShadow: '0 0 10px #00f5ff',
                            }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                    <motion.p
                        className="text-white/30 text-xs font-mono mt-3"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {Math.min(Math.round(progress), 100)}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
