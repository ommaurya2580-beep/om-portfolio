'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Code2, Globe, Cloud, Shield, Wrench, GraduationCap, FolderOpen, Award, Trophy, ChevronRight } from 'lucide-react';

const skillCategories = [
    {
        title: 'Programming',
        badge: 'Core Skills',
        color: 'var(--blue)',
        bgClass: 'bg-[#e0f2fe] dark:bg-[#0369a1]',
        badgeColor: 'text-[#3b82f6] bg-[#eff6ff]',
        icon: <Code2 className="w-5 h-5" />,
        skills: [
            { name: 'C++', level: 75 },
            { name: 'Java', level: 70 },
            { name: 'JavaScript', level: 85 },
        ],
    },
    {
        title: 'Web Development',
        badge: 'Frontend & Backend',
        color: 'var(--purple)',
        bgClass: 'bg-[#f3e8ff] dark:bg-[#6b21a8]',
        badgeColor: 'text-[#9333ea] bg-[#faf5ff]',
        icon: <Globe className="w-5 h-5" />,
        skills: [
            { name: 'HTML & CSS', level: 90 },
            { name: 'React.js', level: 80 },
            { name: 'Node.js', level: 70 },
        ],
    },
    {
        title: 'Cloud & AI',
        badge: 'Emerging Tech',
        color: 'var(--green)',
        bgClass: 'bg-[#dcfce7] dark:bg-[#15803d]',
        badgeColor: 'text-[#16a34a] bg-[#f0fdf4]',
        icon: <Cloud className="w-5 h-5" />,
        skills: [
            { name: 'Oracle Cloud Infrastructure', level: 75 },
            { name: 'Generative AI', level: 70 },
            { name: 'Microsoft AI Fundamentals', level: 72 },
        ],
    },
    {
        title: 'Cyber Security',
        badge: 'Security Focus',
        color: 'var(--pink)',
        bgClass: 'bg-[#fce7f3] dark:bg-[#be185d]',
        badgeColor: 'text-[#db2777] bg-[#fdf2f8]',
        icon: <Shield className="w-5 h-5" />,
        skills: [
            { name: 'AI Security Fundamentals', level: 68 },
            { name: 'Microsoft Security Copilot', level: 65 },
            { name: 'Security Principles', level: 70 },
        ],
    },
    {
        title: 'Tools',
        badge: 'Developer Tools',
        color: 'var(--orange)',
        bgClass: 'bg-[#ffedd5] dark:bg-[#c2410c]',
        badgeColor: 'text-[#d97706] bg-[#fffbeb]',
        icon: <Wrench className="w-5 h-5" />,
        skills: [
            { name: 'Git & GitHub', level: 85 },
            { name: 'VS Code', level: 90 },
            { name: 'Firebase', level: 75 },
        ],
    },
];

const technologies = [
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Firebase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Oracle', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
    { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Linux', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
    const barRef = useRef<HTMLDivElement>(null);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView && barRef.current) {
            gsap.fromTo(
                barRef.current,
                { width: '0%' },
                { width: `${level}%`, duration: 1.2, delay: index * 0.1, ease: 'power2.out' }
            );
        }
    }, [inView, level, index]);

    return (
        <div ref={ref} className="mb-4 group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[#17213c] dark:text-white font-bold text-[13px]">{name}</span>
                <span className="text-[12px] font-bold" style={{ color }}>{level}%</span>
            </div>
            <div className="h-2.5 bg-[#f1f5fb] dark:bg-[#1e2434] rounded-full overflow-hidden"
                 style={{ boxShadow: 'inset 2px 2px 4px rgba(140,160,190,0.15), inset -2px -2px 4px rgba(255,255,255,0.7)' }}>
                <div
                    ref={barRef}
                    className="h-full rounded-full relative"
                    style={{
                        backgroundColor: color,
                        width: 0,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default function Skills() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    return (
        <section id="skills" className="relative pt-[160px] pb-24 bg-[#eef5ff] dark:bg-[#0f172a] overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-purple-300/15 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative" style={{ zIndex: 2 }}>
                
                {/* HEADER COMPOSITION */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    {/* Left 3D Avatar */}
                    <div className="hidden md:block flex-shrink-0 relative w-[220px] h-[220px]">
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.9, x: -20 }}
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
                    
                    {/* Center Text */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center flex-1 flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f4f7ff] dark:bg-[#1a1f2c] rounded-full shadow-[6px_6px_12px_rgba(140,160,190,0.15),-6px_-6px_12px_rgba(255,255,255,0.9)] dark:shadow-none border border-white/70 text-[12px] font-bold text-slate-500 mb-5">
                            ⚡ My Skills
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#17213c] dark:text-white leading-[1.1] mb-4 tracking-tight">
                            Skills & <span className="bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Technologies</span>
                        </h2>
                        <p className="text-[#64748b] dark:text-slate-400 text-[15px] font-medium max-w-lg">
                            Technologies I work with to build scalable web applications, explore AI & Cloud, and solve real-world problems.
                        </p>
                    </motion.div>

                    {/* Right Decorative Space */}
                    <div className="hidden lg:block flex-shrink-0 w-[220px]">
                        {/* Placeholder for visual balance matching the avatar */}
                    </div>
                </div>

                {/* SKILLS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                            className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-8 border border-white/80 dark:border-white/10 flex flex-col transition-transform hover:-translate-y-1"
                            style={{ 
                                boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-[16px] ${category.bgClass} flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),4px_4px_8px_rgba(140,160,190,0.2)]`}
                                        style={{ color: category.color }}
                                    >
                                        {category.icon}
                                    </div>
                                    <h3 className="font-extrabold text-[18px] text-[#17213c] dark:text-white">{category.title}</h3>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${category.badgeColor} shadow-sm border border-white/50`}>
                                    {category.badge}
                                </div>
                            </div>

                            {/* Skills list */}
                            <div className="flex-1 flex flex-col justify-center gap-1">
                                {category.skills.map((skill, skillIdx) => (
                                    <SkillBar
                                        key={skill.name}
                                        name={skill.name}
                                        level={skill.level}
                                        color={category.color}
                                        index={skillIdx}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* Continuous Learning Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-8 border border-white/80 dark:border-white/10 flex flex-col relative overflow-hidden"
                        style={{ 
                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                        }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-[16px] bg-[#f3e8ff] dark:bg-[#6b21a8] text-[#9333ea] flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),4px_4px_8px_rgba(140,160,190,0.2)]">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <h3 className="font-extrabold text-[18px] text-[#17213c] dark:text-white">Continuous Learning</h3>
                        </div>
                        
                        <p className="text-[#64748b] text-[13px] font-medium leading-[1.6] mb-6">
                            I love exploring new technologies and constantly improving my skills to build better solutions.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mt-auto">
                            {[
                                { val: '2+', label: 'Projects', icon: <FolderOpen className="w-3.5 h-3.5 text-blue-500"/> },
                                { val: '5+', label: 'Certifications', icon: <Award className="w-3.5 h-3.5 text-red-500"/> },
                                { val: '7+', label: 'Hackathons', icon: <Trophy className="w-3.5 h-3.5 text-orange-500"/> },
                            ].map(s => (
                                <div key={s.label} className="bg-[#f4f7ff] dark:bg-[#1e2434] rounded-2xl p-3 flex flex-col items-center text-center shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),3px_3px_6px_rgba(140,160,190,0.15)] border border-white/60">
                                    <div className="mb-1">{s.icon}</div>
                                    <div className="font-extrabold text-[#17213c] dark:text-white text-[15px] leading-tight">{s.val}</div>
                                    <div className="text-[9px] font-bold text-[#64748b] uppercase">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* TECHNOLOGIES I USE WIDE BAR */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-6 sm:p-8 border border-white/80 dark:border-white/10 flex flex-col md:flex-row items-center gap-6"
                    style={{ 
                        boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                    }}
                >
                    <div className="flex items-center gap-3 shrink-0 mb-4 md:mb-0">
                        <div className="w-10 h-10 rounded-xl bg-[#eef5ff] text-blue-500 flex items-center justify-center shadow-inner">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <h3 className="font-extrabold text-[18px] text-[#17213c] dark:text-white">Technologies I Use</h3>
                    </div>

                    <div className="flex-1 flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
                        {technologies.map(tech => (
                            <div key={tech.name} className="flex flex-col items-center gap-2 group">
                                <div className="w-[52px] h-[52px] rounded-[18px] bg-[#f4f7ff] dark:bg-[#1e2434] flex items-center justify-center shadow-[6px_6px_12px_rgba(140,160,190,0.15),-6px_-6px_12px_rgba(255,255,255,0.95)] border border-white/60 transition-transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_16px_rgba(140,160,190,0.2),-8px_-8px_16px_rgba(255,255,255,0.95)]">
                                    <img src={tech.src} alt={tech.name} className="w-6 h-6 object-contain" />
                                </div>
                                <span className="text-[10px] font-bold text-[#64748b]">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
