'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Mail, Download, ArrowRight, Code2, Cloud, Shield, Database } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/ommaurya2580-beep', icon: <GithubIcon className="w-5 h-5" />, color: '#2563EB' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/om-maurya-1b9540362', icon: <LinkedinIcon className="w-5 h-5" />, color: '#06B6D4' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Ommaurya07/', icon: <Code2 className="w-5 h-5" />, color: '#F59E0B' },
];

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
            
            {/* Claymorphism decorative blobs */}
            <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-accent-blue clay-blob"></div>
            <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-accent-purple clay-blob"></div>
            <div className="absolute top-[40%] right-[30%] w-48 h-48 bg-accent-pink clay-blob"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* Left: Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full clay-card mb-8 text-sm font-bold text-text-secondary"
                        >
                            <span className="w-3 h-3 rounded-full bg-accent-green" />
                            Available for opportunities
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold mb-4 tracking-tight leading-tight"
                        >
                            <span className="text-text-primary">Om </span>
                            <span className="gradient-text">Maurya</span>
                        </motion.h1>

                        {/* Typing animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl sm:text-2xl font-bold mb-6 h-8 text-text-secondary flex items-center justify-center lg:justify-start gap-2"
                        >
                            <span className="text-accent-blue">{'>'}</span>
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
                            />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed"
                        >
                            Passionate developer building scalable web applications, exploring AI & Cloud technologies,
                            and competing in hackathons. Based in Delhi NCR.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
                        >
                            <motion.a
                                href="#projects"
                                className="px-8 py-4 clay-btn-primary gap-2"
                            >
                                View Projects <ArrowRight className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                href="/resume.pdf"
                                download
                                className="px-8 py-4 clay-btn-secondary gap-2"
                            >
                                Download Resume <Download className="w-4 h-4" />
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex items-center justify-center lg:justify-start gap-4"
                        >
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-[1.25rem] clay-card flex items-center justify-center text-text-secondary hover:text-[var(--hover-color)] transition-colors duration-300"
                                    style={{ '--hover-color': social.color } as React.CSSProperties}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Soft 3D Visual Concept (CSS Clay Composition) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden lg:flex relative h-[500px] w-full items-center justify-center"
                    >
                        {/* Center large soft circle */}
                        <div className="absolute w-[350px] h-[350px] bg-gradient-active rounded-full shadow-clay-card flex items-center justify-center overflow-hidden">
                            <div className="w-[80%] h-[80%] rounded-full bg-clay-surface shadow-clay-input flex items-center justify-center relative">
                                {/* Profile abstract representation / Code block abstract */}
                                <div className="w-32 h-24 bg-gradient-primary rounded-2xl shadow-clay-floating rotate-12 flex flex-col justify-center px-4 gap-2">
                                    <div className="w-1/2 h-2 bg-white/30 rounded-full" />
                                    <div className="w-3/4 h-2 bg-white/30 rounded-full" />
                                    <div className="w-1/3 h-2 bg-white/30 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Floating elements around */}
                        <motion.div 
                            animate={{ y: [-10, 10, -10] }} 
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-10 w-20 h-20 bg-clay-surface rounded-2xl shadow-clay-floating flex items-center justify-center text-accent-blue"
                        >
                            <Cloud className="w-8 h-8" />
                        </motion.div>

                        <motion.div 
                            animate={{ y: [10, -10, 10] }} 
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 right-4 w-24 h-24 bg-clay-surface rounded-[2rem] shadow-clay-floating flex items-center justify-center text-accent-purple"
                        >
                            <Code2 className="w-10 h-10" />
                        </motion.div>

                        <motion.div 
                            animate={{ y: [-15, 15, -15] }} 
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute top-32 left-4 w-16 h-16 bg-clay-surface rounded-xl shadow-clay-floating flex items-center justify-center text-accent-green"
                        >
                            <Shield className="w-7 h-7" />
                        </motion.div>

                        <motion.div 
                            animate={{ y: [15, -15, 15] }} 
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-10 left-16 w-20 h-20 bg-clay-surface rounded-[1.5rem] shadow-clay-floating flex items-center justify-center text-accent-pink"
                        >
                            <Database className="w-8 h-8" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
