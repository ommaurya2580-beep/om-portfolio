'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
    {
        title: 'Programming',
        color: '#00f5ff',
        icon: '{ }',
        skills: [
            { name: 'C++', level: 75 },
            { name: 'Java', level: 70 },
            { name: 'JavaScript', level: 85 },
        ],
    },
    {
        title: 'Web Development',
        color: '#bf00ff',
        icon: '</>',
        skills: [
            { name: 'HTML & CSS', level: 90 },
            { name: 'React.js', level: 80 },
            { name: 'Node.js', level: 70 },
        ],
    },
    {
        title: 'Cloud & AI',
        color: '#00ff88',
        icon: '☁',
        skills: [
            { name: 'Oracle Cloud Infrastructure', level: 75 },
            { name: 'Generative AI', level: 70 },
            { name: 'Microsoft AI Fundamentals', level: 72 },
        ],
    },
    {
        title: 'Cyber Security',
        color: '#ff0080',
        icon: '🔒',
        skills: [
            { name: 'AI Security Fundamentals', level: 68 },
            { name: 'Microsoft Security Copilot', level: 65 },
            { name: 'Security Principles', level: 70 },
        ],
    },
    {
        title: 'Tools',
        color: '#ffa116',
        icon: '⚙',
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
        <div ref={ref} className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 text-sm">{name}</span>
                <span className="text-xs font-mono" style={{ color }}>{level}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                    ref={barRef}
                    className="h-full rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${color}, ${color}80)`,
                        boxShadow: `0 0 8px ${color}60`,
                        width: 0,
                    }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    return (
        <section id="skills" className="relative py-32 bg-[#060614]">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#bf00ff]/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 02. tech_stack'}</p>
                    <h2 className="section-heading text-white">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                            whileHover={{ y: -4, boxShadow: `0 20px 60px ${category.color}15` }}
                            className="glass rounded-2xl p-6 border border-white/5 card-hover"
                            style={{ borderColor: inView ? `${category.color}20` : 'rgba(255,255,255,0.05)' }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold"
                                    style={{ background: `${category.color}15`, color: category.color, border: `1px solid ${category.color}30` }}
                                >
                                    {category.icon}
                                </div>
                                <h3 className="font-bold text-white">{category.title}</h3>
                            </div>

                            {/* Skills */}
                            {category.skills.map((skill, skillIdx) => (
                                <SkillBar
                                    key={skill.name}
                                    name={skill.name}
                                    level={skill.level}
                                    color={category.color}
                                    index={skillIdx}
                                />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
