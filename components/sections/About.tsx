'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const certifications = [
    'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    'Microsoft Security Copilot',
    'Microsoft Fundamentals of Generative AI',
    'Microsoft Fundamentals of AI Security',
    'Microsoft Explore and Analyze Data with Python',
];

export default function About() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="about" className="relative py-32 bg-[#020209]">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#bf00ff]/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                >
                    {/* Section header */}
                    <motion.div variants={fadeUp} className="text-center mb-20">
                        <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 01. about_me'}</p>
                        <h2 className="section-heading text-white">
                            About <span className="gradient-text">Me</span>
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left: Summary */}
                        <div>
                            <motion.div variants={fadeUp} className="glass rounded-2xl p-8 border border-white/5 mb-8">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="text-[#00f5ff]">{'<'}</span>
                                    Professional Summary
                                    <span className="text-[#00f5ff]">{'/>'}</span>
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Passionate Full Stack Developer and Cyber Security Intern with strong interest in AI,
                                    Cloud Computing, and problem-solving. Experienced in building scalable web applications
                                    and participating in hackathons and coding competitions.
                                </p>
                                <p className="text-slate-400 leading-relaxed mt-4">
                                    Currently pursuing my degree at GL Bajaj Institute of Technology and Management,
                                    Delhi NCR, where I combine academic learning with real-world project experience.
                                </p>
                            </motion.div>

                            {/* Education */}
                            <motion.div variants={fadeUp} className="glass rounded-2xl p-8 border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="text-[#00ff88]">{'<'}</span>
                                    Education
                                    <span className="text-[#00ff88]">{'/>'}</span>
                                </h3>
                                <div className="relative pl-6 border-l-2 border-[#00f5ff]/30">
                                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#00f5ff] glow-pulse" />
                                    <div>
                                        <p className="text-[#00f5ff] text-sm font-mono mb-1">2023 – Present</p>
                                        <h4 className="text-white font-semibold text-lg">
                                            GL Bajaj Institute of Technology and Management
                                        </h4>
                                        <p className="text-slate-400 text-sm mt-1">Delhi NCR, Uttar Pradesh</p>
                                        <p className="text-slate-500 text-sm mt-1">B.Tech – Computer Science & Engineering</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Certifications */}
                        <div>
                            <motion.div variants={fadeUp} className="glass rounded-2xl p-8 border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="text-[#bf00ff]">{'<'}</span>
                                    Certifications
                                    <span className="text-[#bf00ff]">{'/>'}</span>
                                </h3>
                                <div className="space-y-3">
                                    {certifications.map((cert, i) => (
                                        <motion.div
                                            key={cert}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
                                        >
                                            <span className="mt-1 w-5 h-5 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00f5ff]/20 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]" />
                                            </span>
                                            <span className="text-slate-300 text-sm leading-relaxed">{cert}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Stats */}
                            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mt-6">
                                {[
                                    { value: '2+', label: 'Projects' },
                                    { value: '5+', label: 'Certifications' },
                                    { value: '7+', label: 'Hackathons' },
                                ].map((stat) => (
                                    <div key={stat.label} className="glass rounded-xl p-4 border border-white/5 text-center">
                                        <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                                        <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
