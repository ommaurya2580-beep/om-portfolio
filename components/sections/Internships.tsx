'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Briefcase, GraduationCap, Building2, Cloud, Brain, ShieldAlert, Award, Trophy, FolderOpen, ArrowRight, Globe } from 'lucide-react';

const education = [
    {
        title: 'GL Bajaj Institute of Technology and Management',
        location: 'Delhi NCR, Uttar Pradesh',
        degree: 'B.Tech - Computer Science & Engineering',
        duration: '2023 - Present',
        status: 'Pursuing',
        skills: ['Computer Science', 'Data Structures', 'Web Development', 'Cyber Security', 'Cloud Computing'],
        color: 'text-blue-500',
        bg: 'bg-blue-50',
    },
    {
        title: 'Senior Secondary (12th)',
        location: 'Uttar Pradesh (State Board)',
        degree: 'Completed 12th with focus on Science stream.',
        duration: '2021 - 2023',
        status: '64%',
        skills: ['Physics', 'Chemistry', 'Mathematics'],
        color: 'text-pink-500',
        bg: 'bg-pink-50',
    },
    {
        title: 'Secondary (10th)',
        location: 'Uttar Pradesh (State Board)',
        degree: 'Completed 10th with strong academic foundation.',
        duration: '2019 - 2021',
        status: '76%',
        skills: ['Science', 'Mathematics', 'English', 'Social Science'],
        color: 'text-purple-500',
        bg: 'bg-purple-50',
    },
];

const experience = [
    {
        title: 'Oracle Cloud Virtual Internship',
        company: 'Oracle (AICTE)',
        duration: 'Jun 2025 - Aug 2025',
        type: 'Virtual Internship',
        description: 'Completed a virtual internship program focused on Oracle Cloud Infrastructure, cloud computing services, and real-world use cases.',
        skills: ['Oracle Cloud', 'Cloud Computing', 'AI/ML', 'Virtual Labs'],
        color: 'text-blue-400',
        bg: 'bg-blue-50',
        icon: <Cloud className="w-5 h-5" />,
    },
    {
        title: 'Microsoft Generative AI Internship',
        company: 'Microsoft (Virtual Program)',
        duration: 'Jan 2025 - Mar 2025',
        type: 'Virtual Internship',
        description: 'Worked on Generative AI concepts, Microsoft Copilot, and real-world applications using Microsoft tools and services.',
        skills: ['Generative AI', 'Microsoft Copilot', 'AI Tools', 'Prompt Engineering'],
        color: 'text-green-500',
        bg: 'bg-green-50',
        icon: <Brain className="w-5 h-5" />,
    },
    {
        title: 'Cyber Security Internship',
        company: 'Pantech e Learning (AICTE)',
        duration: 'Jul 2024 - Sep 2024',
        type: 'Virtual Internship',
        description: 'Learned cybersecurity fundamentals, security principles, and hands-on tools for threat detection and mitigation.',
        skills: ['Cyber Security', 'Network Security', 'Threat Analysis', 'Security Tools'],
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        icon: <ShieldAlert className="w-5 h-5" />,
    },
];

export default function Internships() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    return (
        <section id="internships" className="relative pt-[160px] pb-24 bg-[#eef5ff] dark:bg-[#0f172a] overflow-hidden">
            {/* Ambient Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-blue-300/15 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative" style={{ zIndex: 2 }}>
                
                {/* HEADER COMPOSITION */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    
                    {/* Left Decorative Space to balance avatar */}
                    <div className="hidden lg:block flex-shrink-0 w-[220px]">
                    </div>

                    {/* Center Text */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center flex-1 flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f4f7ff] dark:bg-[#1a1f2c] rounded-full shadow-[6px_6px_12px_rgba(140,160,190,0.15),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-white/70 text-[12px] font-bold text-slate-500 mb-5">
                            🎓 My Journey
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#17213c] dark:text-white leading-[1.1] mb-4 tracking-tight">
                            Education & <span className="bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Experience</span>
                        </h2>
                        <p className="text-[#64748b] dark:text-slate-400 text-[15px] font-medium max-w-xl">
                            My academic journey and professional experience that have shaped my skills, knowledge, and passion for technology.
                        </p>
                    </motion.div>

                    {/* Right 3D Avatar */}
                    <div className="hidden md:block flex-shrink-0 relative w-[220px] h-[220px]">
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            src="/hero-avatar-new.jpg"
                            alt="3D Developer Avatar"
                            className="w-full h-full object-contain mix-blend-darken dark:mix-blend-lighten"
                            style={{ 
                                maskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                            }}
                        />
                    </div>
                </div>

                {/* 2-COLUMN LAYOUT: Education (Left) | Experience (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    
                    {/* LEFT PANEL: Education */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-8 sm:p-10 border border-white/80 dark:border-white/10 flex flex-col"
                        style={{ 
                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-[16px] bg-[#eef5ff] text-blue-500 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),4px_4px_8px_rgba(140,160,190,0.2)]">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="font-extrabold text-[24px] text-[#17213c] dark:text-white">Education</h3>
                            </div>
                            <button className="text-[12px] font-bold text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-1 bg-[#f4f7ff] px-4 py-2 rounded-full shadow-sm border border-white/60">
                                View Academic Details <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-4 sm:pl-6 border-l-[3px] border-[#e2e8f0] dark:border-slate-700 space-y-12">
                            {education.map((item, idx) => (
                                <div key={idx} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[23px] sm:-left-[31px] top-1/2 -translate-y-1/2 flex items-center gap-4">
                                        <div className={`w-[14px] h-[14px] rounded-full border-4 border-white ${item.bg} ${item.color} shadow-sm z-10`} style={{ backgroundColor: 'currentColor' }} />
                                    </div>
                                    {/* Duration Line to Card */}
                                    <div className="absolute -left-12 sm:-left-[100px] top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#64748b] whitespace-nowrap bg-[#fdfdfd] px-2">
                                        {item.duration}
                                    </div>

                                    {/* Education Card */}
                                    <div className="bg-[#f4f7ff] dark:bg-[#1e2434] rounded-[24px] p-6 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),4px_4px_10px_rgba(140,160,190,0.15)] border border-white/60 ml-16 sm:ml-24">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-[14px] ${item.bg} text-current flex items-center justify-center shadow-inner flex-shrink-0`}>
                                                    <Building2 className={`w-5 h-5 ${item.color}`} />
                                                </div>
                                                <div>
                                                    <h4 className="font-extrabold text-[15px] text-[#17213c] dark:text-white leading-tight mb-1">{item.title}</h4>
                                                    <p className="text-[11px] font-bold text-[#64748b] flex items-center gap-1">
                                                        <Globe className="w-3 h-3" /> {item.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-[#dcfce7] text-[#16a34a] rounded-full text-[10px] font-bold shrink-0 shadow-sm border border-white/50">
                                                {item.status}
                                            </div>
                                        </div>
                                        <p className="text-[13px] font-medium text-[#475569] mb-4">{item.degree}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.skills.map(skill => (
                                                <span key={skill} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#eef5ff] text-[#64748b] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_3px_rgba(140,160,190,0.2)] border border-white/40">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT PANEL: Professional Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-8 sm:p-10 border border-white/80 dark:border-white/10 flex flex-col"
                        style={{ 
                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-[16px] bg-[#fff7ed] text-orange-500 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),4px_4px_8px_rgba(140,160,190,0.2)]">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <h3 className="font-extrabold text-[24px] text-[#17213c] dark:text-white">Professional Experience</h3>
                            </div>
                            <button className="text-[12px] font-bold text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-1 bg-[#f4f7ff] px-4 py-2 rounded-full shadow-sm border border-white/60">
                                View All Experience <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-4 sm:pl-6 border-l-[3px] border-[#e2e8f0] dark:border-slate-700 space-y-12">
                            {experience.map((item, idx) => (
                                <div key={idx} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[23px] sm:-left-[31px] top-1/2 -translate-y-1/2 flex items-center gap-4">
                                        <div className={`w-[14px] h-[14px] rounded-full border-4 border-white ${item.bg} ${item.color} shadow-sm z-10`} style={{ backgroundColor: 'currentColor' }} />
                                    </div>
                                    {/* Duration Line */}
                                    <div className="absolute -left-12 sm:-left-[120px] top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#64748b] whitespace-nowrap bg-[#fdfdfd] px-2">
                                        {item.duration}
                                    </div>

                                    {/* Experience Card */}
                                    <div className="bg-[#f4f7ff] dark:bg-[#1e2434] rounded-[24px] p-6 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),4px_4px_10px_rgba(140,160,190,0.15)] border border-white/60 ml-16 sm:ml-28">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-[14px] ${item.bg} flex items-center justify-center shadow-inner flex-shrink-0`}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-extrabold text-[15px] text-[#17213c] dark:text-white leading-tight mb-1">{item.title}</h4>
                                                    <p className="text-[11px] font-bold text-[#64748b] flex items-center gap-1">
                                                        <Globe className="w-3 h-3" /> {item.company}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-[#fdf2f8] text-[#db2777] rounded-full text-[10px] font-bold shrink-0 shadow-sm border border-white/50">
                                                {item.type}
                                            </div>
                                        </div>
                                        <p className="text-[13px] font-medium text-[#475569] mb-4 leading-relaxed">{item.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.skills.map(skill => (
                                                <span key={skill} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#eef5ff] text-[#64748b] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_3px_rgba(140,160,190,0.2)] border border-white/40">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* BOTTOM STATS WIDE PANEL */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-6 sm:p-8 border border-white/80 dark:border-white/10 flex flex-wrap justify-between items-center gap-6"
                    style={{ 
                        boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                    }}
                >
                    {[
                        { val: '3+', label: 'Years of Academic Journey', icon: <GraduationCap className="w-6 h-6 text-[#9333ea]" />, bg: 'bg-[#f3e8ff]' },
                        { val: '2+', label: 'Internships Completed', icon: <Briefcase className="w-6 h-6 text-[#3b82f6]" />, bg: 'bg-[#e0f2fe]' },
                        { val: '5+', label: 'Certifications', icon: <Award className="w-6 h-6 text-[#f59e0b]" />, bg: 'bg-[#fef3c7]' },
                        { val: '7+', label: 'Hackathons Participated', icon: <Trophy className="w-6 h-6 text-[#16a34a]" />, bg: 'bg-[#dcfce7]' }
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-4 flex-1 min-w-[200px]">
                            <div className={`w-14 h-14 rounded-[16px] ${stat.bg} flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),4px_4px_8px_rgba(140,160,190,0.15)] flex-shrink-0`}>
                                {stat.icon}
                            </div>
                            <div>
                                <h4 className="text-[24px] font-extrabold text-[#17213c] dark:text-white leading-tight">{stat.val}</h4>
                                <p className="text-[12px] font-bold text-[#64748b]">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
