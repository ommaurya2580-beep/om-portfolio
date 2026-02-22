'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Internships', href: '#internships' },
    { label: 'Certs', href: '#certifications' },
    { label: 'Hackathons', href: '#hackathons' },
    { label: 'Apps', href: '#apps' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className={`fixed top-0 left-0 right-0 z-[9980] transition-all duration-500 ${scrolled ? 'glass-dark border-b border-[#00f5ff]/10 py-3' : 'py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        className="text-xl font-bold font-mono gradient-text"
                    >
                        {'<OM />'}
                    </motion.a>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                whileHover={{ y: -2 }}
                                className="px-3 py-2 text-sm text-slate-400 hover:text-[#00f5ff] transition-colors duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00f5ff] group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] glass rounded-lg border border-white/10"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="w-5 h-[1.5px] bg-[#00f5ff] block transition-all"
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-5 h-[1.5px] bg-[#00f5ff] block"
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="w-5 h-[1.5px] bg-[#00f5ff] block transition-all"
                            />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-[60px] left-0 right-0 z-[9970] glass-dark border-b border-[#00f5ff]/10 lg:hidden"
                    >
                        <div className="flex flex-col p-4 gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-3 text-slate-300 hover:text-[#00f5ff] hover:bg-white/5 rounded-lg transition-all duration-200 text-sm"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
