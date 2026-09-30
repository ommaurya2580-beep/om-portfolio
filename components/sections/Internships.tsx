'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Laptop, PenTool, ShieldAlert } from 'lucide-react';

const internships = [
    {
        role: 'Web Development Intern',
        company: 'CodSoft',
        duration: '10 Nov 2025 - 10 Dec 2025',
        description: 'Built responsive web applications and gained hands-on experience with modern frontend technologies.',
        color: 'var(--blue)',
        bgClass: 'bg-[#e0f2fe] dark:bg-[#0369a1]',
        icon: <Laptop className="w-5 h-5" />,
    },
    {
        role: 'Web Development & Designing Intern',
        company: 'Oasis Infobyte',
        duration: '1 Month',
        description: 'Worked on UI/UX design and web development projects, improving design skills and frontend proficiency.',
        color: 'var(--purple)',
        bgClass: 'bg-[#f3e8ff] dark:bg-[#6b21a8]',
        icon: <PenTool className="w-5 h-5" />,
    },
    {
        role: 'Cyber Security Intern',
        company: 'Prodigy InfoTech',
        duration: '1 Nov 2025 - 30 Nov 2025',
        description: 'Explored cybersecurity fundamentals, security tools, and threat analysis in a professional environment.',
        color: 'var(--pink)',
        bgClass: 'bg-[#fce7f3] dark:bg-[#be185d]',
        icon: <ShieldAlert className="w-5 h-5" />,
    },
];

export default function Internships() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="internships" className="relative py-24 sm:py-32 bg-clay-bg">
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-accent-blue clay-blob" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-heading">
                        Internship <span className="gradient-text">Experience</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Center soft line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 md:-ml-1 bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-input rounded-full" />

                    {internships.map((item, i) => (
                        <motion.div
                            key={item.company}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.2 }}
                            className={`relative flex items-center mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                } flex-col md:gap-8 ml-10 md:ml-0`}
                        >
                            {/* Card */}
                            <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="clay-card p-8"
                                >
                                    <div className={`flex items-center gap-4 mb-4 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-clay-pill flex-shrink-0 ${item.bgClass}`} style={{ color: item.color }}>
                                            {item.icon}
                                        </div>
                                        <div className={i % 2 === 0 ? 'md:text-right text-left' : 'text-left'}>
                                            <h3 className="text-text-primary font-bold text-lg">{item.role}</h3>
                                            <p className="font-extrabold text-sm" style={{ color: item.color }}>{item.company}</p>
                                        </div>
                                    </div>
                                    <div className={`inline-block px-3 py-1 bg-[#E9EFF7] dark:bg-[#1e2434] text-text-secondary rounded-full text-xs font-bold mb-4 shadow-sm ${i % 2 === 0 ? 'md:ml-auto md:mr-0' : ''}`}>
                                        {item.duration}
                                    </div>
                                    <p className="text-text-secondary text-sm leading-relaxed font-medium">
                                        {item.description}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Center node */}
                            <div
                                className="absolute -left-10 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-clay-surface shadow-clay-pill flex items-center justify-center z-10 top-8 md:top-auto"
                            >
                                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                            </div>

                            {/* Empty spacer */}
                            <div className="hidden md:block w-[calc(50%-2rem)]" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
