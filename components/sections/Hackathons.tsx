'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { Trophy, Code, ExternalLink, ChevronRight, Clock, MonitorPlay, Presentation } from 'lucide-react';

interface HackathonEntry {
    title: string;
    org: string;
    type: string;
    color: string;
    bgClass: string;
    icon: React.ReactNode;
    certificateUrl?: string;
    image: string;
}

const hackathons: HackathonEntry[] = [
    {
        title: 'TechSpardha 2026',
        org: 'NIT Kurukshetra',
        type: 'Hackathon',
        color: 'text-blue-600',
        bgClass: 'bg-blue-50 text-blue-600 border-blue-200',
        icon: <Code className="w-3.5 h-3.5" />,
        certificateUrl: 'https://unstop.com/certificate-preview/d88f6f04-dc24-4f93-b6d9-ed840cd8ab04',
        image: '/hackathons/h1.jpg',
    },
    {
        title: 'Global Certifications Event',
        org: 'GDG New Delhi',
        type: 'Event',
        color: 'text-purple-600',
        bgClass: 'bg-purple-50 text-purple-600 border-purple-200',
        icon: <Trophy className="w-3.5 h-3.5" />,
        image: '/hackathons/h2.jpg',
    },
    {
        title: 'TechHack 2.0',
        org: 'Unstop',
        type: 'Coding',
        color: 'text-emerald-600',
        bgClass: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        icon: <MonitorPlay className="w-3.5 h-3.5" />,
        certificateUrl: 'https://unstop.com/certificate-preview/a78a22d9-462d-41cd-a42f-4f689dcf75f0',
        image: '/hackathons/h3.jpg',
    },
    {
        title: 'Marketwise - E-Summit 2026',
        org: 'IIT Roorkee',
        type: 'Competition',
        color: 'text-orange-500',
        bgClass: 'bg-orange-50 text-orange-500 border-orange-200',
        icon: <Trophy className="w-3.5 h-3.5" />,
        certificateUrl: 'https://unstop.com/certificate-preview/fc5af2cc-cfc2-45e5-8028-6db61883dbf8',
        image: '/hackathons/h4.jpg',
    },
    {
        title: 'Smart India Hackathon',
        org: 'Government of India',
        type: 'Competition',
        color: 'text-pink-600',
        bgClass: 'bg-pink-50 text-pink-600 border-pink-200',
        icon: <Presentation className="w-3.5 h-3.5" />,
        certificateUrl: 'https://unstop.com/certificate-preview/39a942b7-0d77-412e-b822-2abe523deaa4',
        image: '/hackathons/h5.jpg',
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
        <section id="hackathons" className="relative pt-[160px] pb-24 bg-[#eef5ff] dark:bg-[#0f172a] overflow-hidden">
            {/* Ambient Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[20%] w-[400px] h-[400px] bg-orange-300/15 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative" style={{ zIndex: 2 }}>
                
                {/* HEADER COMPOSITION */}
                <div className="relative text-center mb-16 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f4f7ff] dark:bg-[#1a1f2c] rounded-full shadow-[6px_6px_12px_rgba(140,160,190,0.15),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-white/70 text-[12px] font-bold text-blue-600 mb-5"
                    >
                        <Trophy className="w-4 h-4 text-orange-500" /> My Achievements
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#17213c] dark:text-white leading-[1.1] mb-4 tracking-tight"
                    >
                        Hackathons & <span className="bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Competitions</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#64748b] dark:text-slate-400 text-[15px] font-medium max-w-xl mx-auto"
                    >
                        Competed in 5+ hackathons and competitions, building innovative solutions under pressure.
                    </motion.p>
                </div>

                {/* GRID: 4 columns on extremely large screens, but 3 or 2 normally */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {hackathons.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            onClick={() => handleCardClick(item)}
                            className="group bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-4 flex flex-col cursor-pointer border border-white/80 dark:border-white/10 transition-transform duration-300 hover:-translate-y-2 h-full"
                            style={{ 
                                boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                            }}
                        >
                            {/* Image Container with Padding */}
                            <div className="relative w-full h-[180px] rounded-[24px] overflow-hidden mb-5 p-1 bg-[#f4f7ff] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),3px_3px_6px_rgba(140,160,190,0.15)] border border-white/50">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover rounded-[20px] transition-transform duration-500 group-hover:scale-105"
                                />
                                
                                {/* Top-Left Badge */}
                                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm bg-white/95 border ${item.bgClass}`}>
                                    {item.icon} {item.type}
                                </div>

                                {/* Top-Right Dot */}
                                <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                                    <div className={`w-2.5 h-2.5 rounded-full bg-current ${item.color}`} />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="px-2 flex flex-col flex-1">
                                <h3 className="text-[#17213c] dark:text-white font-extrabold text-[16px] leading-tight mb-1 line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-[#64748b] dark:text-slate-400 text-[12px] font-bold mb-6">
                                    {item.org}
                                </p>

                                {/* Action Buttons */}
                                <div className="mt-auto flex items-center justify-between">
                                    {item.certificateUrl ? (
                                        <div className={`px-4 py-2 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-white/60 transition-colors ${item.bgClass}`}>
                                            View Certificate <ExternalLink className="w-3.5 h-3.5" />
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-white/60 bg-[#f3e8ff] text-purple-600 border-purple-200">
                                            <Clock className="w-3.5 h-3.5" /> Coming Soon
                                        </div>
                                    )}

                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-[2px_2px_5px_rgba(140,160,190,0.15),-2px_-2px_5px_rgba(255,255,255,0.9)] border border-white/80 transition-transform group-hover:translate-x-1 ${item.color}`}>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
