'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Award, FolderOpen, Trophy, GraduationCap, ArrowRight } from 'lucide-react';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
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
        <section id="about" className="relative py-24 sm:py-32 bg-clay-bg">
            <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-accent-cyan clay-blob" />
            <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-accent-purple clay-blob" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                >
                    {/* Section header */}
                    <motion.div variants={fadeUp} className="text-center mb-16">
                        <h2 className="section-heading">
                            About <span className="gradient-text">Me</span>
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Left: Summary & Education */}
                        <div className="flex flex-col gap-8">
                            {/* Summary Card */}
                            <motion.div variants={fadeUp} className="clay-card p-8 sm:p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-input flex items-center justify-center text-accent-purple">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-primary">
                                        Professional Summary
                                    </h3>
                                </div>
                                <p className="text-text-secondary font-medium leading-relaxed mb-4">
                                    Passionate Full Stack Developer and Cyber Security Intern with strong interest in AI,
                                    Cloud Computing, and problem-solving. Experienced in building scalable web applications
                                    and participating in hackathons and coding competitions.
                                </p>
                                <p className="text-text-secondary font-medium leading-relaxed">
                                    Currently pursuing my degree at GL Bajaj Institute of Technology and Management,
                                    Delhi NCR, where I combine academic learning with real-world project experience.
                                </p>
                            </motion.div>

                            {/* Education Card */}
                            <motion.div variants={fadeUp} className="clay-card p-8 sm:p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-input flex items-center justify-center text-accent-green">
                                            <GraduationCap className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-text-primary">
                                            Education & Experience
                                        </h3>
                                    </div>
                                </div>
                                
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 h-4 rounded-full bg-accent-blue shadow-clay-floating mt-1 z-10" />
                                        <div className="w-[2px] h-full bg-accent-blue/20 flex-1 my-2 rounded-full" />
                                    </div>
                                    <div className="pb-4">
                                        <div className="inline-block px-3 py-1 bg-[#e0f2fe] dark:bg-[#0369a1] text-accent-blue dark:text-[#e0f2fe] rounded-full text-xs font-bold mb-3 shadow-sm">
                                            2023 – Present
                                        </div>
                                        <div className="bg-[#E9EFF7] dark:bg-[#1e2434] rounded-2xl p-5 shadow-clay-input">
                                            <h4 className="text-text-primary font-bold text-lg">
                                                GL Bajaj Institute of Technology and Management
                                            </h4>
                                            <p className="text-text-secondary font-medium text-sm mt-1">Delhi NCR, Uttar Pradesh</p>
                                            <p className="text-text-muted text-sm mt-2 font-semibold">B.Tech - Computer Science & Engineering</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Certifications & Stats */}
                        <div className="flex flex-col gap-8">
                            {/* Certifications Card */}
                            <motion.div variants={fadeUp} className="clay-card p-8 sm:p-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-input flex items-center justify-center text-accent-orange">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-primary">
                                        Certifications
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {certifications.map((cert, i) => (
                                        <motion.div
                                            key={cert}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-[20px] bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-input group hover:shadow-clay-floating transition-shadow duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-clay-surface shadow-clay-pill flex items-center justify-center flex-shrink-0 text-accent-blue group-hover:scale-110 transition-transform duration-300">
                                                    <Award className="w-5 h-5" />
                                                </div>
                                                <span className="text-text-primary font-semibold text-sm leading-tight pr-4">{cert}</span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0 group-hover:text-accent-blue transition-colors" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Stats */}
                            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { value: '2+', label: 'Projects', icon: <FolderOpen className="w-5 h-5" />, color: 'text-accent-blue', bg: 'bg-[#e0f2fe] dark:bg-[#0369a1]' },
                                    { value: '5+', label: 'Certifications', icon: <Award className="w-5 h-5" />, color: 'text-accent-purple', bg: 'bg-[#f3e8ff] dark:bg-[#6b21a8]' },
                                    { value: '7+', label: 'Hackathons', icon: <Trophy className="w-5 h-5" />, color: 'text-accent-orange', bg: 'bg-[#ffedd5] dark:bg-[#c2410c]' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                        className="clay-card p-6 flex flex-col items-center justify-center text-center group hover:scale-[1.03] transition-transform duration-300"
                                    >
                                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} shadow-clay-pill flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300`}>
                                            {stat.icon}
                                        </div>
                                        <p className="text-3xl font-extrabold text-text-primary mb-1">{stat.value}</p>
                                        <p className="text-text-secondary text-xs uppercase tracking-wider font-bold">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
