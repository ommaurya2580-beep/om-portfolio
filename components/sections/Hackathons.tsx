'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { Trophy, Terminal, Code, ExternalLink } from 'lucide-react';

interface HackathonEntry {
    title: string;
    org: string;
    type: string;
    color: string;
    bgClass: string;
    icon: React.ReactNode;
    certificateUrl?: string;
}

const hackathons: HackathonEntry[] = [
    {
        title: 'TechSpardha 2026',
        org: 'NIT Kurukshetra',
        type: 'Hackathon',
        color: 'var(--blue)',
        bgClass: 'bg-[#e0f2fe] dark:bg-[#0369a1]',
        icon: <Code className="w-5 h-5" />,
        certificateUrl: 'https://unstop.com/certificate-preview/d88f6f04-dc24-4f93-b6d9-ed840cd8ab04',
    },
    {
        title: 'Global Certifications Event',
        org: 'GDG New Delhi',
        type: 'Event',
        color: 'var(--purple)',
        bgClass: 'bg-[#f3e8ff] dark:bg-[#6b21a8]',
        icon: <Trophy className="w-5 h-5" />,
    },
    {
        title: 'TechHack 2.0',
        org: 'Unstop',
        type: 'Coding',
        color: 'var(--green)',
        bgClass: 'bg-[#dcfce7] dark:bg-[#15803d]',
        icon: <Terminal className="w-5 h-5" />,
        certificateUrl: 'https://unstop.com/certificate-preview/a78a22d9-462d-41cd-a42f-4f689dcf75f0',
    },
    {
        title: 'Marketwise - E-Summit 2026',
        org: 'IIT Roorkee',
        type: 'Competition',
        color: 'var(--orange)',
        bgClass: 'bg-[#ffedd5] dark:bg-[#c2410c]',
        icon: <Trophy className="w-5 h-5" />,
        certificateUrl: 'https://unstop.com/certificate-preview/fc5af2cc-cfc2-45e5-8028-6db61883dbf8',
    },
    {
        title: 'Marketwise - Round 1 (AI & ML Fundamentals)',
        org: 'IIT Roorkee',
        type: 'Competition',
        color: 'var(--pink)',
        bgClass: 'bg-[#fce7f3] dark:bg-[#be185d]',
        icon: <Trophy className="w-5 h-5" />,
        certificateUrl: 'https://unstop.com/certificate-preview/39a942b7-0d77-412e-b822-2abe523deaa4',
    },
];

export default function Hackathons() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const handleCardClick = useCallback((item: HackathonEntry) => {
        if (!item.certificateUrl) {
            toast.error('Certificate not available yet.', { id: 'no-cert' });
            return;
        }
        window.open(item.certificateUrl, '_blank', 'noopener,noreferrer');
    }, []);

    return (
        <section id="hackathons" className="relative py-24 sm:py-32 bg-clay-surface">
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-accent-blue clay-blob" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-heading">
                        Hackathons &amp; <span className="gradient-text">Competitions</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-xl mx-auto font-medium">
                        Competed in {hackathons.length}+ hackathons and competitions, building innovative solutions under pressure.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {hackathons.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCardClick(item)}
                            className="clay-card p-6 flex flex-col group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-clay-pill flex-shrink-0 ${item.bgClass}`} style={{ color: item.color }}>
                                    {item.icon}
                                </div>
                                {item.certificateUrl && (
                                    <span className="flex h-3 w-3 relative mt-1">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: item.color }}></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: item.color }}></span>
                                    </span>
                                )}
                            </div>

                            <div className="mb-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold shadow-clay-input ${item.bgClass}`} style={{ color: item.color }}>
                                    {item.type}
                                </span>
                            </div>

                            <h3 className="text-text-primary font-bold text-base leading-tight mb-2 flex-grow">
                                {item.title}
                            </h3>
                            <p className="text-text-secondary text-xs font-semibold mb-6">
                                {item.org}
                            </p>

                            <div className={`mt-auto pt-4 border-t border-[#E9EFF7] dark:border-[#1e2434] flex items-center gap-2 text-sm font-bold transition-colors ${item.certificateUrl ? '' : 'text-text-muted cursor-not-allowed'}`} style={{ color: item.certificateUrl ? item.color : undefined }}>
                                <span>{item.certificateUrl ? 'View Certificate' : 'Coming Soon'}</span>
                                {item.certificateUrl && (
                                    <ExternalLink className="w-4 h-4" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
