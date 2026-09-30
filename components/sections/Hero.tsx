'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ArrowRight, Target, Award, Trophy, Code2, Users, FileText, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, GmailIcon } from '@/components/ui/BrandIcons';
import { ReactIcon, NextJsIcon, JavascriptIcon, FirebaseIcon, PythonIcon, AWSIcon } from '@/components/ui/TechIcons';
import { getProjects, getCertifications, getHackathons } from '@/lib/firestore';

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/ommaurya2580-beep', icon: <GithubIcon className="w-5 h-5 text-gray-800 dark:text-white" /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/om-maurya-1b9540362', icon: <LinkedinIcon className="w-5 h-5 text-[#0077b5]" /> },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Ommaurya07/', icon: <Code2 className="w-5 h-5 text-[#ffa116]" /> },
    { label: 'Mail', href: 'mailto:ommaurya2580@gmail.com', icon: <GmailIcon className="w-5 h-5" /> },
];

const techStack = [
    { name: 'React', icon: <ReactIcon className="w-6 h-6 text-[#61dafb]" /> },
    { name: 'Next.js', icon: <NextJsIcon className="w-6 h-6 text-black dark:text-white" /> },
    { name: 'JavaScript', icon: <JavascriptIcon className="w-6 h-6" /> },
    { name: 'Firebase', icon: <FirebaseIcon className="w-6 h-6" /> },
    { name: 'Python', icon: <PythonIcon className="w-6 h-6" /> },
    { name: 'AWS', icon: <AWSIcon className="w-6 h-6" /> },
];

export default function Hero() {
    const [counts, setCounts] = useState({ projects: 0, certs: 0, hackathons: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            try {
                const [projects, certs, hackathons] = await Promise.all([
                    getProjects(),
                    getCertifications(),
                    getHackathons()
                ]);
                setCounts({
                    projects: projects.length,
                    certs: certs.length,
                    hackathons: hackathons.length
                });
            } catch (error) {
                console.error("Failed to fetch counts", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCounts();
    }, []);

    const statsCards = [
        {
            title: 'Projects',
            value: loading ? '...' : `${counts.projects}+`,
            icon: <Target className="w-6 h-6" />,
            color: 'var(--purple)',
            bgClass: 'bg-[#f3e8ff] dark:bg-[#6b21a8]',
            sideIcon: <Code2 className="w-5 h-5 text-accent-blue opacity-50" />
        },
        {
            title: 'Certifications',
            value: loading ? '...' : `${counts.certs}+`,
            icon: <Award className="w-6 h-6" />,
            color: 'var(--orange)',
            bgClass: 'bg-[#ffedd5] dark:bg-[#c2410c]',
            sideIcon: <FileText className="w-5 h-5 text-accent-blue opacity-50" />
        },
        {
            title: 'Hackathons',
            value: loading ? '...' : `${counts.hackathons}+`,
            icon: <Trophy className="w-6 h-6" />,
            color: 'var(--yellow)',
            bgClass: 'bg-[#fef9c3] dark:bg-[#ca8a04]',
            sideIcon: <Users className="w-5 h-5 text-accent-blue opacity-50" />
        }
    ];

    return (
        <section className="relative min-h-screen pt-28 pb-12 flex items-center overflow-hidden bg-clay-bg">
            {/* Dynamic Background Blobs exactly like the image */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#fbcfe8] dark:bg-pink-900/30 rounded-full blur-[80px] opacity-70 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#bfdbfe] dark:bg-blue-900/30 rounded-full blur-[100px] opacity-70 pointer-events-none" />
            
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
                    
                    {/* LEFT COLUMN: Info & CTA */}
                    <div className="lg:col-span-4 flex flex-col justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-text-primary tracking-tight leading-tight mb-4"
                        >
                            Om <br className="hidden lg:block" />
                            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Maurya</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg sm:text-xl font-bold mb-6 text-text-secondary flex items-center gap-2"
                        >
                            <span className="text-accent-blue text-xl">{'>'}</span>
                            <TypeAnimation
                                sequence={[
                                    'Full Stack Developer |', 2000,
                                    'Cyber Security Intern |', 2000,
                                    'AI & Cloud Explorer |', 2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-text-muted text-sm sm:text-base mb-8 font-medium leading-relaxed max-w-md"
                        >
                            Passionate developer building scalable web applications, 
                            exploring AI & Cloud technologies, and competing in hackathons. 
                            Based in <span className="font-bold text-accent-blue">Delhi NCR</span>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-4 mb-10"
                        >
                            <motion.a
                                href="#projects"
                                className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold rounded-full shadow-clay-btn hover:shadow-clay-floating hover:-translate-y-1 transition-all flex items-center gap-2 text-sm"
                            >
                                View Projects <ArrowRight className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                href="/resume.pdf"
                                download
                                className="px-6 py-3 bg-clay-surface text-accent-blue font-bold rounded-full shadow-clay-input hover:shadow-clay-pill transition-all flex items-center gap-2 text-sm"
                            >
                                Download Resume <Download className="w-4 h-4" />
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex items-center gap-4 mb-12"
                        >
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white dark:bg-[#1a1f2c] rounded-2xl shadow-clay-card border border-white/50 dark:border-white/5 flex items-center justify-center hover:-translate-y-1 hover:shadow-clay-floating transition-all"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <p className="text-xs font-bold text-text-muted mb-4 uppercase tracking-wider">Trusted by modern technologies</p>
                            <div className="flex flex-wrap gap-3">
                                {techStack.map((tech) => (
                                    <div key={tech.name} className="w-12 h-12 bg-white dark:bg-[#1a1f2c] rounded-2xl shadow-clay-card border border-white/50 dark:border-white/5 flex items-center justify-center hover:scale-110 transition-transform cursor-help" title={tech.name}>
                                        {tech.icon}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* CENTER COLUMN: 3D Illustration Area */}
                    <div className="lg:col-span-5 h-[600px] relative hidden lg:flex items-center justify-center">
                        {/* Abstract floating glowing orb in place of avatar */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute w-64 h-64 bg-gradient-to-tr from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 rounded-full shadow-clay-card flex items-center justify-center pointer-events-none"
                            style={{ filter: 'drop-shadow(0 20px 30px rgba(124, 58, 237, 0.15))' }}
                        >
                            <div className="w-48 h-48 bg-white/40 dark:bg-black/20 rounded-full shadow-clay-input backdrop-blur-sm flex items-center justify-center" />
                        </motion.div>

                        {/* Floating ambient icons mimicking the reference */}
                        <motion.div 
                            animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }} 
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[20%] left-0 w-20 h-16 bg-[#a855f7] rounded-2xl shadow-clay-floating flex items-center justify-center text-white z-0 -rotate-12"
                        >
                            <span className="text-xl font-black font-mono">{'</>'}</span>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }} 
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute top-[15%] right-0 w-16 h-16 bg-[#3b82f6] rounded-2xl shadow-clay-floating flex items-center justify-center text-white z-0 rotate-12"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.3-1.8-4.2-4.1-4.5C17.4 6 13.9 3 10 3 5.6 3 2 6.6 2 11c0 4.4 3.6 8 8 8h7.5zM10 5c3 0 5.6 2.2 6.3 5.1l.3 1.2 1.3.1c1.4.1 2.6 1.3 2.6 2.8 0 1.5-1.2 2.7-2.7 2.7H10c-3.1 0-5.7-2.5-5.7-5.7 0-3.1 2.5-5.7 5.7-5.7z"/></svg>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [-10, 10, -10] }} 
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-[30%] right-[-5%] w-16 h-16 bg-[#10b981] rounded-2xl shadow-clay-floating flex items-center justify-center text-white z-0 -rotate-6"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Stacked Cards */}
                    <div className="lg:col-span-3 flex flex-col gap-6 justify-center">
                        {statsCards.map((stat, i) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                                className="bg-white dark:bg-[#1a1f2c] rounded-[32px] p-5 shadow-clay-floating flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-clay-pill flex-shrink-0 ${stat.bgClass}`} style={{ color: stat.color }}>
                                    {stat.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-extrabold text-text-primary leading-tight">{stat.value}</h3>
                                    <p className="text-xs font-bold text-text-secondary">{stat.title}</p>
                                </div>
                                <div className="pr-2">
                                    {stat.sideIcon}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-text-muted rounded-full" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
