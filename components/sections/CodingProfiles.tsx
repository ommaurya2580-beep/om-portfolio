'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function AnimatedCounter({ target, label, color }: { target: number; label: string; color: string }) {
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
        <div ref={ref} className="text-center">
            <p className="text-4xl font-bold font-mono mb-1" style={{ color }}>
                {count}+
            </p>
            <p className="text-slate-400 text-sm">{label}</p>
        </div>
    );
}

export default function CodingProfiles() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="coding" className="relative py-32 bg-[#020209]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00f5ff]/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 07. coding_profiles'}</p>
                    <h2 className="section-heading text-white">
                        Coding <span className="gradient-text">Profiles</span>
                    </h2>
                </motion.div>

                {/* Animated counters */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-3 gap-8 mb-16 max-w-lg mx-auto"
                >
                    <AnimatedCounter target={5} label="Projects" color="#00f5ff" />
                    <AnimatedCounter target={5} label="Certifications" color="#bf00ff" />
                    <AnimatedCounter target={7} label="Hackathons" color="#00ff88" />
                </motion.div>

                {/* GitHub Stats */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="glass rounded-2xl p-6 border border-white/5"
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00f5ff]" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub Stats
                        </h3>
                        <div className="space-y-3">
                            <img
                                src="https://github-readme-stats.vercel.app/api?username=ommaurya2580-beep&show_icons=true&theme=transparent&hide_border=true&title_color=00f5ff&icon_color=bf00ff&text_color=94a3b8&bg_color=00000000"
                                alt="GitHub Stats"
                                className="w-full rounded-xl"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="glass rounded-2xl p-6 border border-white/5"
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <span className="text-[#ffa116]">⚡</span>
                            LeetCode Profile
                        </h3>
                        <div className="flex flex-col items-center justify-center h-[150px] gap-4">
                            <div className="text-center">
                                <p className="text-slate-400 text-sm mb-4">Visit my LeetCode profile to see my problem-solving journey</p>
                                <motion.a
                                    href="https://leetcode.com/u/Ommaurya07/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
                                    style={{ background: '#ffa11620', color: '#ffa116', border: '1px solid #ffa11640' }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                                    </svg>
                                    View LeetCode Profile
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* GitHub Contribution Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-2xl p-6 border border-white/5"
                >
                    <h3 className="text-white font-bold mb-4">Contribution Graph</h3>
                    <img
                        src="https://ghchart.rshah.org/00f5ff/ommaurya2580-beep"
                        alt="GitHub Contribution Graph"
                        className="w-full rounded-xl opacity-80"
                        loading="lazy"
                    />
                </motion.div>
            </div>
        </section>
    );
}
