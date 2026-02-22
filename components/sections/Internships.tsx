'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const internships = [
    {
        role: 'Web Development Intern',
        company: 'CodSoft',
        duration: '10 Nov 2025 – 10 Dec 2025',
        description: 'Built responsive web applications and gained hands-on experience with modern frontend technologies.',
        color: '#00f5ff',
        icon: '💻',
    },
    {
        role: 'Web Development & Designing Intern',
        company: 'Oasis Infobyte',
        duration: '1 Month',
        description: 'Worked on UI/UX design and web development projects, improving design skills and frontend proficiency.',
        color: '#bf00ff',
        icon: '🎨',
    },
    {
        role: 'Cyber Security Intern',
        company: 'Prodigy InfoTech',
        duration: '1 Nov 2025 – 30 Nov 2025',
        description: 'Explored cybersecurity fundamentals, security tools, and threat analysis in a professional environment.',
        color: '#ff0080',
        icon: '🔐',
    },
];

export default function Internships() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="internships" className="relative py-32 bg-[#060614]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0080]/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 04. experience'}</p>
                    <h2 className="section-heading text-white">
                        Internship <span className="gradient-text">Experience</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00f5ff]/50 via-[#bf00ff]/50 to-[#ff0080]/50 hidden md:block" />

                    {internships.map((item, i) => (
                        <motion.div
                            key={item.company}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.2 }}
                            className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                } flex-col md:gap-8`}
                        >
                            {/* Card */}
                            <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass rounded-2xl p-6 border card-hover"
                                    style={{ borderColor: `${item.color}20` }}
                                >
                                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <span className="text-2xl">{item.icon}</span>
                                        <div className={i % 2 === 0 ? 'md:text-right' : ''}>
                                            <h3 className="text-white font-bold">{item.role}</h3>
                                            <p className="font-semibold text-sm" style={{ color: item.color }}>{item.company}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-xs font-mono mb-3">{item.duration}</p>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            </div>

                            {/* Center dot */}
                            <div
                                className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 items-center justify-center"
                                style={{ borderColor: item.color, background: '#020209', boxShadow: `0 0 15px ${item.color}60` }}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
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
