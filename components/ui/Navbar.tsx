'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';


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
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            
            // Basic scroll spy
            const sections = navLinks.map(link => link.href.substring(1));
            let current = '';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = section;
                        break;
                    }
                }
            }
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="fixed top-4 left-0 right-0 z-[9980] flex justify-center px-4"
            >
                <nav className={`transition-all duration-500 rounded-full flex items-center justify-between px-4 sm:px-6 py-2.5 w-full max-w-[1100px]
                    ${scrolled 
                        ? 'bg-clay-surface/90 backdrop-blur-xl shadow-clay-floating border border-white/50 dark:border-white/5' 
                        : 'bg-clay-surface shadow-clay-floating'
                    }`}
                >
                    {/* Logo */}
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        className="text-xl sm:text-2xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple whitespace-nowrap"
                    >
                        {'<0M />'}
                    </motion.a>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    whileHover={{ y: -2 }}
                                    className={`px-4 py-2 text-xs xl:text-sm font-extrabold rounded-full transition-all duration-300 relative group tracking-wide whitespace-nowrap
                                        ${isActive 
                                            ? 'text-accent-blue bg-[#E9EFF7] shadow-clay-pill dark:bg-[#1a1f2c] dark:text-accent-cyan' 
                                            : 'text-text-secondary hover:text-text-primary'
                                        }`}
                                >
                                    {link.label}
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        
                        <a
                            href="/resume.pdf"
                            download
                            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold rounded-full shadow-clay-btn hover:shadow-clay-floating hover:-translate-y-0.5 transition-all text-sm"
                        >
                            <Download className="w-4 h-4" /> Download Resume
                        </a>

                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-clay-surface shadow-clay-pill text-accent-blue"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="w-5 h-[2px] bg-current block transition-all rounded-full"
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-5 h-[2px] bg-current block rounded-full"
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="w-5 h-[2px] bg-current block transition-all rounded-full"
                            />
                        </button>
                    </div>
                </nav>
            </motion.div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-[80px] left-4 right-4 z-[9970] bg-clay-surface rounded-3xl shadow-clay-floating border border-clay-highlight p-4 lg:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setMenuOpen(false)}
                                    className={`px-4 py-3 rounded-2xl transition-all duration-200 text-sm font-extrabold
                                        ${activeSection === link.href.substring(1)
                                            ? 'bg-[#E9EFF7] text-accent-blue shadow-clay-pill dark:bg-[#1a1f2c]'
                                            : 'text-text-secondary hover:text-text-primary hover:bg-[#E9EFF7]/50 dark:hover:bg-[#1a1f2c]'
                                        }`}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <a
                                href="/resume.pdf"
                                download
                                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold rounded-2xl shadow-clay-btn"
                            >
                                <Download className="w-4 h-4" /> Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
