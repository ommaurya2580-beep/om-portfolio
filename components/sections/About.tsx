'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
    User, Award, FolderOpen, Trophy, GraduationCap, ArrowRight, 
    Download, Send, Cloud, LayoutDashboard, Brain, Shield, 
    Database, Target, Heart, Code, Gamepad, ChevronRight, Building2
} from 'lucide-react';

export default function About() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const certifications = [
        { name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', icon: <Cloud className="w-4 h-4 text-blue-500" /> },
        { name: 'Microsoft Security Copilot', icon: <LayoutDashboard className="w-4 h-4 text-blue-500" /> },
        { name: 'Microsoft Fundamentals of Generative AI', icon: <Brain className="w-4 h-4 text-purple-500" /> },
        { name: 'Microsoft Fundamentals of AI Security', icon: <Shield className="w-4 h-4 text-blue-600" /> },
        { name: 'Microsoft Explore and Analyze Data with Python', icon: <Database className="w-4 h-4 text-blue-700" /> },
    ];

    const interests = [
        { name: 'Coding', icon: <Code className="w-5 h-5 text-blue-500" /> },
        { name: 'Cloud', icon: <Cloud className="w-5 h-5 text-cyan-500" /> },
        { name: 'AI/ML', icon: <Brain className="w-5 h-5 text-purple-500" /> },
        { name: 'Cyber Security', icon: <Shield className="w-5 h-5 text-blue-700" /> },
        { name: 'Problem Solving', icon: <Gamepad className="w-5 h-5 text-indigo-500" /> },
    ];

    return (
        <section id="about" className="relative pt-[160px] pb-24 bg-[#eef5ff] dark:bg-[#0f172a] overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-400/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative" style={{ zIndex: 2 }}>
                
                {/* HEADER */}
                <div className="relative text-center mb-16">
                    {/* Handwritten Annotations */}
                    <div className="hidden lg:block absolute left-[10%] top-[20px] -rotate-12">
                        <p className="font-[cursive] text-[18px] text-[#475569] dark:text-slate-400 leading-tight">
                            Turning Ideas<br/>into Reality
                        </p>
                        <svg className="w-8 h-8 text-[#475569] ml-16 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                    <div className="hidden lg:block absolute right-[10%] top-[20px] rotate-12">
                        <p className="font-[cursive] text-[18px] text-[#475569] dark:text-slate-400 leading-tight">
                            Passionate<br/>Learner
                        </p>
                        <svg className="w-8 h-8 text-[#475569] ml-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl sm:text-6xl font-extrabold text-[#17213c] dark:text-white leading-[1.1] mb-3 tracking-tight"
                    >
                        About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
                    </motion.h2>
                    {/* Wavy underline decoration */}
                    <div className="w-16 h-2 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#64748b] dark:text-slate-400 text-[16px] font-medium"
                    >
                        Get to know more about me, my journey, and what drives me.
                    </motion.p>
                </div>

                {/* TOP ROW: Professional Summary (Left) | Certifications (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    
                    {/* Professional Summary (Spans 7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7 bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 border border-white/80 dark:border-white/10"
                        style={{ 
                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                        }}
                    >
                        {/* Avatar Image */}
                        <div className="w-[200px] shrink-0">
                            <img 
                                src="/hero-avatar-new.jpg" 
                                alt="Om Maurya" 
                                className="w-full h-auto object-contain mix-blend-darken dark:mix-blend-lighten"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f4f7ff] dark:bg-[#1e2434] rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),4px_4px_8px_rgba(140,160,190,0.15)] border border-white/60 mb-5">
                                <User className="w-4 h-4 text-purple-600" />
                                <span className="text-[13px] font-extrabold text-[#17213c] dark:text-white">Professional Summary</span>
                            </div>

                            <p className="text-[#64748b] dark:text-slate-300 text-[14px] font-medium leading-[1.7] mb-4">
                                Passionate Full Stack Developer and Cyber Security Intern with strong interest in AI, Cloud Computing, and problem-solving. Experienced in building scalable web applications and participating in hackathons and coding competitions.
                            </p>
                            <p className="text-[#64748b] dark:text-slate-300 text-[14px] font-medium leading-[1.7] mb-8">
                                Currently pursuing my degree at GL Bajaj Institute of Technology and Management, Delhi NCR, where I combine academic learning with real-world project experience.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-[13px] shadow-[4px_4px_12px_rgba(59,130,246,0.4)] flex items-center gap-2 hover:scale-105 transition-transform">
                                    <Download className="w-4 h-4" /> Download Resume
                                </button>
                                <button className="px-6 py-3 rounded-full bg-[#f4f7ff] dark:bg-[#1e2434] text-[#17213c] dark:text-white font-bold text-[13px] shadow-[4px_4px_10px_rgba(140,160,190,0.2),-4px_-4px_10px_rgba(255,255,255,0.9)] border border-white/60 flex items-center gap-2 hover:-translate-y-1 transition-transform">
                                    <Send className="w-4 h-4 text-blue-500" /> Contact Me
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Certifications (Spans 5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-5 bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-6 sm:p-8 flex flex-col border border-white/80 dark:border-white/10"
                        style={{ 
                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                        }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#fff7ed] flex items-center justify-center shadow-inner">
                                    <Award className="w-5 h-5 text-orange-500" />
                                </div>
                                <h3 className="font-extrabold text-[18px] text-[#17213c] dark:text-white">Certifications</h3>
                            </div>
                            <button className="text-[11px] font-bold text-[#64748b] bg-[#f4f7ff] dark:bg-[#1e2434] px-3 py-1.5 rounded-full shadow-sm border border-white/60 flex items-center gap-1 hover:text-[#17213c] transition-colors">
                                View All <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3 flex-1 justify-center">
                            {certifications.map((cert, idx) => (
                                <div 
                                    key={idx} 
                                    className="flex items-center justify-between p-3.5 bg-[#f8fafc] dark:bg-[#1e2434] rounded-[16px] border border-white/60"
                                    style={{ boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8), 2px 2px 8px rgba(140,160,190,0.15)' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0f172a] flex items-center justify-center shadow-sm flex-shrink-0">
                                            {cert.icon}
                                        </div>
                                        <span className="text-[12px] font-bold text-[#17213c] dark:text-slate-200 leading-tight pr-4 line-clamp-2">
                                            {cert.name}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#cbd5e1] shrink-0" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* BOTTOM ROW: Education (4) | Quick Facts (4) | Interests (4) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-6 border border-white/80 dark:border-white/10"
                        style={{ 
                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                        }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#eef5ff] flex items-center justify-center shadow-inner">
                                    <GraduationCap className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="font-extrabold text-[16px] text-[#17213c] dark:text-white">Education</h3>
                            </div>
                            <div className="px-3 py-1 bg-[#dcfce7] text-[#16a34a] rounded-full text-[10px] font-bold shadow-sm border border-white/50">
                                ◈ Pursuing
                            </div>
                        </div>

                        <div className="relative pl-4 border-l-2 border-blue-200 ml-2">
                            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_#eef5ff]" />
                            <p className="text-[11px] font-bold text-blue-600 mb-1">2023 - Present</p>
                            <h4 className="font-extrabold text-[13px] text-[#17213c] dark:text-white leading-tight mb-1">
                                GL Bajaj Institute of Technology and Management
                            </h4>
                            <p className="text-[11px] font-medium text-[#64748b] mb-2">Delhi NCR, Uttar Pradesh</p>
                            <p className="text-[11px] font-bold text-[#475569]">B.Tech - Computer Science & Engineering</p>
                        </div>
                    </motion.div>

                    {/* Quick Facts */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-6 border border-white/80 dark:border-white/10 flex flex-col"
                        style={{ 
                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                        }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#f3e8ff] flex items-center justify-center shadow-inner">
                                <Target className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="font-extrabold text-[16px] text-[#17213c] dark:text-white">Quick Facts</h3>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-auto">
                            {[
                                { val: '2+', label: 'Projects', icon: <FolderOpen className="w-5 h-5 text-amber-500" /> },
                                { val: '5+', label: 'Certifications', icon: <Award className="w-5 h-5 text-pink-500" /> },
                                { val: '7+', label: 'Hackathons', icon: <Trophy className="w-5 h-5 text-orange-500" /> },
                            ].map((fact, idx) => (
                                <div key={idx} className="bg-[#f4f7ff] dark:bg-[#1e2434] rounded-[20px] p-4 flex flex-col items-center justify-center text-center shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),4px_4px_10px_rgba(140,160,190,0.15)] border border-white/60">
                                    <div className="mb-2">{fact.icon}</div>
                                    <h4 className="font-extrabold text-[#17213c] dark:text-white text-[16px]">{fact.val}</h4>
                                    <p className="text-[9px] font-bold text-[#64748b]">{fact.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Interests */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[32px] p-6 border border-white/80 dark:border-white/10 flex flex-col"
                        style={{ 
                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                        }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#fce7f3] flex items-center justify-center shadow-inner">
                                <Heart className="w-5 h-5 text-pink-500" />
                            </div>
                            <h3 className="font-extrabold text-[16px] text-[#17213c] dark:text-white">Interests</h3>
                        </div>

                        <div className="flex justify-between items-end flex-1 mt-4">
                            {interests.map((int, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 group cursor-default">
                                    <div className="w-12 h-12 rounded-full bg-[#f4f7ff] dark:bg-[#1e2434] flex items-center justify-center shadow-[4px_4px_10px_rgba(140,160,190,0.2),-4px_-4px_10px_rgba(255,255,255,0.95)] border border-white/60 transition-transform group-hover:-translate-y-1">
                                        {int.icon}
                                    </div>
                                    <span className="text-[9px] font-bold text-[#64748b] text-center w-14 leading-tight">{int.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
