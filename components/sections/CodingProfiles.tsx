'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, FolderOpen, Award, Trophy, Star, BookOpen, Users, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';

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
        <div ref={ref} className="bg-white rounded-[32px] p-6 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300 shadow-[12px_12px_28px_rgba(140,160,190,0.20),-10px_-10px_24px_rgba(255,255,255,0.90)] border border-white/80">
            <div className="w-12 h-12 rounded-2xl bg-[#f4f7ff] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),3px_3px_6px_rgba(140,160,190,0.15)] border border-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ color }}>
                {icon}
            </div>
            <p className="text-4xl font-extrabold mb-1 text-[#17213c]">
                {count}+
            </p>
            <p className="text-[#64748b] text-xs uppercase tracking-wider font-bold">{label}</p>
        </div>
    );
}

function RealTimeGithubStats() {
    const [stats, setStats] = useState({ repos: 0, stars: 0, followers: 0, loading: true });

    useEffect(() => {
        async function fetchGithub() {
            try {
                const userRes = await fetch('https://api.github.com/users/ommaurya2580-beep');
                const userData = await userRes.json();
                
                const reposRes = await fetch('https://api.github.com/users/ommaurya2580-beep/repos?per_page=100');
                const reposData = await reposRes.json();
                
                let totalStars = 0;
                if (Array.isArray(reposData)) {
                    totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                }

                setStats({
                    repos: userData.public_repos || 0,
                    stars: totalStars,
                    followers: userData.followers || 0,
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching github stats:", error);
                setStats(s => ({ ...s, loading: false }));
            }
        }
        fetchGithub();
    }, []);

    if (stats.loading) return <div className="animate-pulse h-[160px] bg-[#E9EFF7] rounded-2xl"></div>;

    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#f4f7ff] rounded-[24px] p-4 flex flex-col items-center justify-center border border-white/60 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),4px_4px_10px_rgba(140,160,190,0.15)]">
                <BookOpen className="w-5 h-5 text-blue-500 mb-2" />
                <span className="text-2xl font-extrabold text-[#17213c]">{stats.repos}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Repos</span>
            </div>
            <div className="bg-[#f4f7ff] rounded-[24px] p-4 flex flex-col items-center justify-center border border-white/60 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),4px_4px_10px_rgba(140,160,190,0.15)]">
                <Star className="w-5 h-5 text-amber-500 mb-2" />
                <span className="text-2xl font-extrabold text-[#17213c]">{stats.stars}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Stars</span>
            </div>
            <div className="bg-[#f4f7ff] rounded-[24px] p-4 flex flex-col items-center justify-center border border-white/60 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),4px_4px_10px_rgba(140,160,190,0.15)]">
                <Users className="w-5 h-5 text-purple-500 mb-2" />
                <span className="text-2xl font-extrabold text-[#17213c]">{stats.followers}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Followers</span>
            </div>
        </div>
    );
}

function RealTimeLeetCodeStats() {
    const [stats, setStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0, loading: true });

    useEffect(() => {
        async function fetchLeetCode() {
            try {
                const res = await fetch('https://alfa-leetcode-api.onrender.com/Ommaurya07/solved');
                const data = await res.json();
                if (data && data.solvedProblem !== undefined) {
                    setStats({
                        total: data.solvedProblem,
                        easy: data.easySolved,
                        medium: data.mediumSolved,
                        hard: data.hardSolved,
                        loading: false
                    });
                } else {
                    setStats(s => ({ ...s, loading: false }));
                }
            } catch (error) {
                console.error("Error fetching leetcode stats:", error);
                setStats(s => ({ ...s, loading: false }));
            }
        }
        fetchLeetCode();
    }, []);

    if (stats.loading) return <div className="animate-pulse h-[160px] bg-[#E9EFF7] rounded-2xl"></div>;

    const totalStr = stats.total > 0 ? stats.total.toString() : "-";
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-6 py-4 bg-[#f4f7ff] rounded-[24px] border border-white/60 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),4px_4px_10px_rgba(140,160,190,0.15)]">
                <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Total Solved</span>
                    <span className="text-3xl font-extrabold text-[#17213c]">{totalStr}</span>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Easy</span>
                        <span className="text-sm font-extrabold text-[#17213c]">{stats.easy}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-amber-500 uppercase">Med</span>
                        <span className="text-sm font-extrabold text-[#17213c]">{stats.medium}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-red-500 uppercase">Hard</span>
                        <span className="text-sm font-extrabold text-[#17213c]">{stats.hard}</span>
                    </div>
                </div>
            </div>
            
            <a
                href="https://leetcode.com/u/Ommaurya07/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full font-bold text-sm shadow-[4px_4px_10px_rgba(249,115,22,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] hover:scale-[1.02] transition-transform"
            >
                <Code2 className="w-4 h-4" /> View Full Profile <ArrowRight className="w-4 h-4" />
            </a>
        </div>
    );
}

export default function CodingProfiles() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="coding" className="relative py-24 sm:py-32 bg-[#eef5ff] overflow-hidden">
            {/* Ambient Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-purple-300/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-cyan-300/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f4f7ff] rounded-full shadow-[6px_6px_12px_rgba(140,160,190,0.15),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-white/70 text-[12px] font-bold text-blue-600 mb-5">
                        <Code2 className="w-4 h-4 text-purple-500" /> Stats & Metrics
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#17213c] leading-[1.1] mb-4 tracking-tight">
                        Coding <span className="bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Profiles</span>
                    </h2>
                </motion.div>

                {/* Animated counters */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
                >
                    <AnimatedCounter target={5} label="Projects" color="#3b82f6" icon={<FolderOpen className="w-5 h-5" />} />
                    <AnimatedCounter target={5} label="Certifications" color="#a855f7" icon={<Award className="w-5 h-5" />} />
                    <AnimatedCounter target={7} label="Hackathons" color="#10b981" icon={<Trophy className="w-5 h-5" />} />
                </motion.div>

                {/* GitHub & LeetCode Stats */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-[40px] p-8 sm:p-10 shadow-[12px_12px_28px_rgba(140,160,190,0.20),-10px_-10px_24px_rgba(255,255,255,0.90)] border border-white/80"
                    >
                        <h3 className="text-[#17213c] font-extrabold text-2xl mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-[18px] bg-[#f0f9ff] text-blue-600 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),3px_3px_6px_rgba(140,160,190,0.15)] flex items-center justify-center">
                                <GithubIcon className="w-6 h-6" />
                            </div>
                            GitHub Stats
                        </h3>
                        <RealTimeGithubStats />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-[40px] p-8 sm:p-10 shadow-[12px_12px_28px_rgba(140,160,190,0.20),-10px_-10px_24px_rgba(255,255,255,0.90)] border border-white/80"
                    >
                        <h3 className="text-[#17213c] font-extrabold text-2xl mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-[18px] bg-[#fff7ed] text-orange-500 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),3px_3px_6px_rgba(140,160,190,0.15)] flex items-center justify-center">
                                <Code2 className="w-6 h-6" />
                            </div>
                            LeetCode Activity
                        </h3>
                        <RealTimeLeetCodeStats />
                    </motion.div>
                </div>

                {/* GitHub Contribution Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-[40px] p-8 sm:p-10 shadow-[12px_12px_28px_rgba(140,160,190,0.20),-10px_-10px_24px_rgba(255,255,255,0.90)] border border-white/80 max-w-5xl mx-auto"
                >
                    <h3 className="text-[#17213c] font-extrabold text-2xl mb-8">Contribution Graph</h3>
                    <div className="bg-[#f4f7ff] rounded-3xl p-6 border border-white/60 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),4px_4px_10px_rgba(140,160,190,0.15)] overflow-x-auto">
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
