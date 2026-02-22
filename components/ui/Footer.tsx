'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative py-12 bg-[#020209] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-xl font-bold font-mono gradient-text"
                    >
                        {'<OM />'}
                    </motion.div>

                    {/* Copyright */}
                    <p className="text-slate-500 text-sm text-center">
                        © {year} Om Maurya. Built with{' '}
                        <span className="text-[#00f5ff]">Next.js</span>,{' '}
                        <span className="text-[#bf00ff]">Framer Motion</span> &{' '}
                        <span className="text-[#00ff88]">Firebase</span>
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
                                whileHover={{ y: -2, color: '#00f5ff' }}
                                className="text-slate-500 text-sm hover:text-[#00f5ff] transition-colors duration-200"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Bottom line */}
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-slate-600 text-xs font-mono">
                        Designed & Developed by Om Maurya · Full Stack Developer
                    </p>
                </div>
            </div>
        </footer>
    );
}
