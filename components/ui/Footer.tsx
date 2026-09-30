'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative py-12 bg-clay-surface border-t border-clay-highlight">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-xl font-bold font-mono gradient-text px-4 py-2 bg-clay-bg rounded-full shadow-clay-input"
                    >
                        {'<OM />'}
                    </motion.div>

                    {/* Copyright */}
                    <p className="text-text-secondary font-bold text-sm text-center">
                        © {year} Om Maurya. Built with{' '}
                        <span className="text-accent-blue">Next.js</span>,{' '}
                        <span className="text-accent-purple">Tailwind</span> &{' '}
                        <span className="text-accent-green">Framer Motion</span>
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                        {[
                            { label: 'GitHub', href: 'https://github.com/ommaurya2580-beep' },
                            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/om-maurya-1b9540362' },
                            { label: 'LeetCode', href: 'https://leetcode.com/u/Ommaurya07/' },
                        ].map((link) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -2 }}
                                className="px-4 py-2 rounded-full bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-input text-text-secondary text-sm font-bold hover:text-accent-blue hover:shadow-clay-pill transition-all duration-300"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Bottom line */}
                <div className="mt-8 pt-6 border-t border-[#E9EFF7] dark:border-[#1e2434] text-center">
                    <p className="text-text-muted text-xs font-bold">
                        Designed & Developed by Om Maurya • Full Stack Developer
                    </p>
                </div>
            </div>
        </footer>
    );
}
