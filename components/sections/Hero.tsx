'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ArrowRight, Target, Award, Trophy, Code2, Users, FileText, CheckCircle2, BarChart2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, GmailIcon } from '@/components/ui/BrandIcons';
import { ReactIcon, NextJsIcon, JavascriptIcon, FirebaseIcon, PythonIcon, AWSIcon, NodeJsIcon, DockerIcon, MongoDBIcon, TailwindIcon } from '@/components/ui/TechIcons';
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
    { name: 'Node.js', icon: <NodeJsIcon className="w-6 h-6" /> },
    { name: 'Python', icon: <PythonIcon className="w-6 h-6" /> },
    { name: 'Firebase', icon: <FirebaseIcon className="w-6 h-6" /> },
    { name: 'AWS', icon: <AWSIcon className="w-6 h-6 text-black dark:text-white" /> },
    { name: 'Docker', icon: <DockerIcon className="w-6 h-6" /> },
    { name: 'MongoDB', icon: <MongoDBIcon className="w-6 h-6" /> },
    { name: 'Tailwind CSS', icon: <TailwindIcon className="w-6 h-6" /> },
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
            value: loading ? '7+' : `${Math.max(7, counts.projects)}+`,
            icon: <Target className="w-6 h-6" />,
            color: 'var(--purple)',
            bgClass: 'bg-[#f3e8ff] dark:bg-[#6b21a8]',
            sideIcon: <BarChart2 className="w-5 h-5 text-accent-blue opacity-50" />
        },
        {
            title: 'Certifications',
            value: loading ? '5+' : `${Math.max(5, counts.certs)}+`,
            icon: <Award className="w-6 h-6" />,
            color: 'var(--orange)',
            bgClass: 'bg-[#ffedd5] dark:bg-[#c2410c]',
            sideIcon: <FileText className="w-5 h-5 text-accent-blue opacity-50" />
        },
        {
            title: 'Hackathons',
            value: loading ? '7+' : `${Math.max(7, counts.hackathons)}+`,
            icon: <Trophy className="w-6 h-6" />,
            color: 'var(--yellow)',
            bgClass: 'bg-[#fef9c3] dark:bg-[#ca8a04]',
            sideIcon: <Users className="w-5 h-5 text-accent-blue opacity-50" />
        }
    ];

    return (
        <section className="relative min-h-screen pt-[140px] pb-12 flex items-center overflow-hidden bg-clay-bg">
            {/* Dynamic Background Blobs exactly like the image */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#fbcfe8] dark:bg-pink-900/30 rounded-full blur-[80px] opacity-70 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#bfdbfe] dark:bg-blue-900/30 rounded-full blur-[100px] opacity-70 pointer-events-none" />
            
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="flex flex-col gap-12 w-full max-w-[1440px]">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)_minmax(260px,330px)] gap-[30px] items-center">
                        
                        {/* LEFT COLUMN: Info & CTA */}
                        <div className="flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-clay-surface rounded-full shadow-clay-input text-xs font-bold text-text-secondary w-fit mb-6"
                            >
                                <span className="w-2.5 h-2.5 bg-accent-green rounded-full animate-pulse" />
                                Available for opportunities
                            </motion.div>

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
                                className="flex flex-wrap items-center gap-4 mb-8"
                            >
                                <motion.a
                                    href="#projects"
                                    className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold rounded-full shadow-clay-btn hover:shadow-clay-floating hover:-translate-y-1 transition-all flex items-center gap-2 text-sm"
                                >
                                    🚀 View Projects <ArrowRight className="w-4 h-4" />
                                </motion.a>
                                <motion.a
                                    href="/resume.pdf"
                                    download
                                    className="px-6 py-3 bg-white dark:bg-[#1a1f2c] text-accent-blue font-bold rounded-full shadow-clay-card hover:shadow-clay-floating hover:-translate-y-1 transition-all flex items-center gap-2 text-sm"
                                >
                                    <Download className="w-4 h-4" /> Download Resume
                                </motion.a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="flex items-center gap-4"
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

                        </div>

                        {/* CENTER COLUMN: 3D Illustration Area */}
                        <div className="relative hidden lg:flex items-center justify-center z-20">
                            <motion.img 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                src="/hero-avatar.png" 
                                alt="Developer Avatar" 
                                className="w-full max-w-[560px] h-auto object-contain"
                                style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.15))' }}
                            />
                        </div>

                        {/* RIGHT COLUMN: Stacked Cards */}
                        <div className="flex flex-col gap-6 justify-center w-full max-w-[330px]">
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

                    {/* TECHNOLOGY ROW */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="w-full mt-4"
                    >
                        <p className="text-xs font-bold text-text-muted mb-4 uppercase tracking-wider">Trusted by modern technologies</p>
                        <div className="flex flex-wrap gap-4">
                            {techStack.map((tech) => (
                                <div key={tech.name} className="flex flex-col items-center gap-2 group">
                                    <div className="w-14 h-14 bg-white dark:bg-[#1a1f2c] rounded-2xl shadow-clay-card border border-white/50 dark:border-white/5 flex items-center justify-center group-hover:-translate-y-1 transition-all cursor-default">
                                        {tech.icon}
                                    </div>
                                    <span className="text-[10px] font-bold text-text-muted">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
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
