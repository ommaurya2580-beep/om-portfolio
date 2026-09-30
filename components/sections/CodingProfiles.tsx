'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Code2, FolderOpen, Award, Trophy } from 'lucide-react';

function AnimatedCounter({ target, label, color, icon }: { target: number; label: string; color: string; icon: React.ReactNode }) {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);

    return (
        <div ref={ref} className="clay-card p-6 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-pill flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ color }}>
                {icon}
            </div>
            <p className="text-4xl font-extrabold mb-1 text-text-primary">
                {count}+
            </p>
            <p className="text-text-secondary text-xs uppercase tracking-wider font-bold">{label}</p>
        </div>
    );
}

export default function CodingProfiles() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="coding" className="relative py-24 sm:py-32 bg-clay-surface">
            <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-accent-purple clay-blob" />
            <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-accent-cyan clay-blob" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-heading">
                        Coding <span className="gradient-text">Profiles</span>
                    </h2>
                </motion.div>

                {/* Animated counters */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto"
                >
                    <AnimatedCounter target={5} label="Projects" color="var(--blue)" icon={<FolderOpen className="w-5 h-5" />} />
                    <AnimatedCounter target={5} label="Certifications" color="var(--purple)" icon={<Award className="w-5 h-5" />} />
                    <AnimatedCounter target={7} label="Hackathons" color="var(--green)" icon={<Trophy className="w-5 h-5" />} />
                </motion.div>

                {/* GitHub Stats */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="clay-card p-8 sm:p-10"
                    >
                        <h3 className="text-text-primary font-bold text-xl mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] dark:bg-[#0369a1] text-accent-blue shadow-clay-pill flex items-center justify-center">
                                <Github className="w-5 h-5" />
                            </div>
                            GitHub Stats
                        </h3>
                        <div className="bg-[#E9EFF7] dark:bg-[#1e2434] rounded-2xl p-4 shadow-clay-input overflow-hidden">
                            <img
                                src="https://github-readme-stats-eight-theta.vercel.app/api?username=ommaurya2580-beep&show_icons=true&theme=transparent&hide_border=true&title_color=2563EB&icon_color=7C3AED&text_color=64748B&bg_color=00000000"
                                alt="GitHub Stats"
                                className="w-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="clay-card p-8 sm:p-10"
                    >
                        <h3 className="text-text-primary font-bold text-xl mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#ffedd5] dark:bg-[#c2410c] text-accent-orange shadow-clay-pill flex items-center justify-center">
                                <Code2 className="w-5 h-5" />
                            </div>
                            LeetCode Profile
                        </h3>
                        <div className="flex flex-col items-center justify-center h-full min-h-[180px] bg-[#E9EFF7] dark:bg-[#1e2434] rounded-2xl p-6 shadow-clay-input text-center">
                            <p className="text-text-secondary font-medium mb-6">Visit my LeetCode profile to see my problem-solving journey and latest algorithm challenges.</p>
                            <motion.a
                                href="https://leetcode.com/u/Ommaurya07/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -2 }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-[20px] font-bold shadow-clay-floating bg-white dark:bg-[#22283a] text-accent-orange hover:shadow-clay-pill transition-all"
                            >
                                <Code2 className="w-4 h-4" />
                                View LeetCode Profile
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* GitHub Contribution Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="clay-card p-8 sm:p-10"
                >
                    <h3 className="text-text-primary font-bold text-xl mb-6">Contribution Graph</h3>
                    <div className="bg-[#E9EFF7] dark:bg-[#1e2434] rounded-2xl p-4 sm:p-6 shadow-clay-input overflow-x-auto">
                        <img
                            src="https://ghchart.rshah.org/2563EB/ommaurya2580-beep"
                            alt="GitHub Contribution Graph"
                            className="min-w-[700px] w-full"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
