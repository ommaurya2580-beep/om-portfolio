'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Code2, Globe, Cloud, Shield, Wrench } from 'lucide-react';

const skillCategories = [
    {
        title: 'Programming',
        color: 'var(--blue)',
        bgClass: 'bg-[#e0f2fe] dark:bg-[#0369a1]',
        icon: <Code2 className="w-5 h-5" />,
        skills: [
            { name: 'C++', level: 75 },
            { name: 'Java', level: 70 },
            { name: 'JavaScript', level: 85 },
        ],
    },
    {
        title: 'Web Development',
        color: 'var(--purple)',
        bgClass: 'bg-[#f3e8ff] dark:bg-[#6b21a8]',
        icon: <Globe className="w-5 h-5" />,
        skills: [
            { name: 'HTML & CSS', level: 90 },
            { name: 'React.js', level: 80 },
            { name: 'Node.js', level: 70 },
        ],
    },
    {
        title: 'Cloud & AI',
        color: 'var(--green)',
        bgClass: 'bg-[#dcfce7] dark:bg-[#15803d]',
        icon: <Cloud className="w-5 h-5" />,
        skills: [
            { name: 'Oracle Cloud Infrastructure', level: 75 },
            { name: 'Generative AI', level: 70 },
            { name: 'Microsoft AI Fundamentals', level: 72 },
        ],
    },
    {
        title: 'Cyber Security',
        color: 'var(--pink)',
        bgClass: 'bg-[#fce7f3] dark:bg-[#be185d]',
        icon: <Shield className="w-5 h-5" />,
        skills: [
            { name: 'AI Security Fundamentals', level: 68 },
            { name: 'Microsoft Security Copilot', level: 65 },
            { name: 'Security Principles', level: 70 },
        ],
    },
    {
        title: 'Tools',
        color: 'var(--orange)',
        bgClass: 'bg-[#ffedd5] dark:bg-[#c2410c]',
        icon: <Wrench className="w-5 h-5" />,
        skills: [
            { name: 'Git & GitHub', level: 85 },
            { name: 'VS Code', level: 90 },
            { name: 'Firebase', level: 75 },
        ],
    },
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
        <div ref={ref} className="mb-5">
            <div className="flex justify-between items-center mb-2">
                <span className="text-text-primary font-bold text-sm">{name}</span>
                <span className="text-xs font-bold" style={{ color }}>{level}%</span>
            </div>
            <div className="h-3 bg-[#E9EFF7] dark:bg-[#1e2434] rounded-full overflow-hidden shadow-clay-input">
                <div
                    ref={barRef}
                    className="h-full rounded-full"
                    style={{
                        backgroundColor: color,
                        width: 0,
                        boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3)`
                    }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    return (
        <section id="skills" className="relative py-24 sm:py-32 bg-clay-bg">
            <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-accent-blue clay-blob" />
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-accent-orange clay-blob" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-heading">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                            className="clay-card p-8 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div
                                    className={`w-12 h-12 rounded-2xl ${category.bgClass} flex items-center justify-center shadow-clay-pill`}
                                    style={{ color: category.color }}
                                >
                                    {category.icon}
                                </div>
                                <h3 className="font-extrabold text-xl text-text-primary">{category.title}</h3>
                            </div>

                            {/* Skills */}
                            <div className="flex-1 flex flex-col justify-center">
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
                </div>
            </div>
        </section>
    );
}
