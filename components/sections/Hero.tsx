'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false });

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/ommaurya2580-beep',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        color: '#00f5ff',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/om-maurya-1b9540362',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: '#0077b5',
    },
    {
        label: 'LeetCode',
        href: 'https://leetcode.com/u/Ommaurya07/',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
        ),
        color: '#ffa116',
    },
];

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020209]">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <ParticleField />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#020209]/20 to-[#020209]" />
            <div className="absolute inset-0 z-[1] bg-gradient-radial from-[#00f5ff]/5 via-transparent to-transparent" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 z-[1] opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,245,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00f5ff]/20 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                    <span className="text-sm text-slate-400 font-mono">Available for opportunities</span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.7 }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
                >
                    <span className="text-white">Om </span>
                    <span className="gradient-text">Maurya</span>
                </motion.h1>

                {/* Typing animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-xl sm:text-2xl lg:text-3xl font-mono mb-10 h-10"
                >
                    <span className="text-[#00f5ff]">{'> '}</span>
                    <TypeAnimation
                        sequence={[
                            'Full Stack Developer',
                            2000,
                            'Cyber Security Intern',
                            2000,
                            'AI & Cloud Certified',
                            2000,
                            'Problem Solver',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="text-slate-200"
                    />
                    <span className="text-[#00f5ff] animate-pulse">_</span>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Passionate developer building scalable web applications, exploring AI & Cloud technologies,
                    and competing in hackathons. Based in Delhi NCR.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-16"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 245, 255, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] text-[#020209] transition-all duration-300"
                    >
                        View Projects
                    </motion.a>
                    <motion.a
                        href="/resume.pdf"
                        download
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-full font-semibold text-sm btn-neon"
                    >
                        Download Resume ↓
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="flex items-center justify-center gap-4"
                >
                    {socialLinks.map((social) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                            style={{ '--hover-color': social.color } as React.CSSProperties}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = social.color;
                                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${social.color}40`;
                                (e.currentTarget as HTMLElement).style.color = social.color;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = '';
                                (e.currentTarget as HTMLElement).style.boxShadow = '';
                                (e.currentTarget as HTMLElement).style.color = '';
                            }}
                            aria-label={social.label}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2 text-slate-500"
                    >
                        <span className="text-xs font-mono">scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00f5ff] to-transparent" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
