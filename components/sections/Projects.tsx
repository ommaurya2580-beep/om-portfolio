'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Timestamp } from 'firebase/firestore';
import { getProjects, type Project } from '@/lib/firestore';
import ProjectModal from '@/components/ui/ProjectModal';
import { ProjectCardSkeleton } from '@/components/ui/LoadingSkeleton';
import { ExternalLink, Lock, Layout, Star, ArrowRight, Smartphone, Brain, Globe, BookOpen } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';

const categories = [
    { name: 'All', icon: Globe },
    { name: 'Web App', icon: Globe },
    { name: 'Mobile App', icon: Smartphone },
    { name: 'AI', icon: Brain }
];

const baseProjects: Partial<Project>[] = [
    {
        id: '1',
        title: "AKTU Counselling Helper",
        repo: "aktu-counselling-helper",
        description: "Web platform to search and filter AKTU counselling cutoffs with optimized performance.",
        techStack: ["Next.js", "Firebase", "Firestore", "Tailwind"],
        liveUrl: "https://aktu-counselling-helper.vercel.app",
        category: "Web App",
        badge: "Featured"
    },
    {
        id: '2',
        title: "Spin & Earn App",
        repo: "spin_and_earn",
        description: "Flutter-based reward spinning mobile app with cross-platform support.",
        techStack: ["Flutter", "Dart"],
        category: "Mobile App"
    },
    {
        id: '3',
        title: "ID Face Sync",
        repo: "id-face-sync",
        description: "Face recognition-based identity verification system.",
        techStack: ["React", "Face API", "JavaScript"],
        category: "AI",
        isConfidential: true,
        liveUrl: "https://lovable.dev/projects/06821d87-694e-4c24-8601-eeb4350b5fc5"
    },
    {
        id: '4',
        title: "AgriPulse — AI Powered Smart Agriculture",
        repo: "agripulse",
        description: "AI-driven crop health monitoring and decision support platform using IoT sensors and ML models.",
        techStack: ["Next.js", "Node.js", "MongoDB", "YOLO"],
        category: "Web App",
        githubUrl: "https://github.com/ommaurya2580-beep"
    },
    {
        id: '5',
        title: "BuyNora — E-commerce Platform",
        repo: "buynora",
        description: "Full-featured e-commerce platform with 27 microservices and modern frontend stack.",
        techStack: ["React 19", "TypeScript", "Tailwind CSS", "Redux"],
        category: "Web App",
        githubUrl: "https://github.com/ommaurya2580-beep"
    },
    {
        id: '6',
        title: "Smart Parking Capacity Enforcement System",
        repo: "smart-parking",
        description: "AI/IoT based smart parking system for real-time monitoring and enforcement.",
        techStack: ["Flutter", "Firebase", "IoT", "Computer Vision"],
        category: "Mobile App",
        githubUrl: "https://github.com/ommaurya2580-beep"
    }
];

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const projectsData = await Promise.all(
                    baseProjects.map(async (p) => {
                        const proj = { ...p, createdAt: Timestamp.now() } as Project;
                        if (!proj.isConfidential && proj.repo) {
                            try {
                                const res = await fetch(`https://api.github.com/repos/ommaurya2580-beep/${proj.repo}`);
                                if (res.ok) {
                                    const data = await res.json();
                                    proj.stars = data.stargazers_count;
                                    proj.forks = data.forks_count;
                                    proj.githubUrl = data.html_url;
                                }
                            } catch (error) {
                                console.error(`Failed to fetch GitHub data for ${proj.repo}:`, error);
                            }
                        }
                        return proj;
                    })
                );
                setProjects(projectsData);
            } catch (error) {
                console.error("Error setting up projects:", error);
                setProjects(baseProjects.map(p => ({ ...p, createdAt: Timestamp.now() } as Project)));
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    const filtered = activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    const getProjectImage = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('aktu')) return '/projects/aktu-full.jpg';
        if (t.includes('spin')) return '/projects/spin-full.jpg';
        if (t.includes('face')) return '/projects/face-full.jpg';
        if (t.includes('agripulse')) return '/projects/agri-full.jpg';
        if (t.includes('buynora')) return '/projects/buynora-full.jpg';
        return null; // For Smart Parking, return null to show placeholder
    };

    return (
        <section id="projects" className="relative pt-[160px] pb-24 bg-[#eef5ff] dark:bg-[#0f172a] overflow-hidden">
            {/* Ambient Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />
                <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[30%] w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] bg-pink-400/15 rounded-full blur-[100px]" />
                <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[100px]" />
            </div>

            {/* Floating Decorations (z-index 0) */}
            <div className="absolute top-60 right-20 w-24 h-24 bg-[rgba(255,255,255,0.6)] dark:bg-purple-800 rounded-3xl rotate-12 backdrop-blur-md shadow-[8px_8px_16px_rgba(148,163,184,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-white/50 animate-bounce-slow" style={{ zIndex: 0 }} />
            <div className="absolute bottom-40 left-10 w-20 h-20 bg-[rgba(255,255,255,0.6)] dark:bg-blue-800 rounded-full backdrop-blur-md shadow-[8px_8px_16px_rgba(148,163,184,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-white/50 animate-pulse-slow" style={{ zIndex: 0 }} />
            <div className="absolute top-[45%] right-10 w-16 h-16 bg-[rgba(255,255,255,0.6)] dark:bg-pink-800 rounded-2xl -rotate-12 backdrop-blur-md shadow-[8px_8px_16px_rgba(148,163,184,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-white/50 animate-float" style={{ zIndex: 0 }} />

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative" style={{ zIndex: 2 }}>
                
                {/* SECTION HEADER AREA */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between mb-10 relative gap-8">
                    
                    {/* LEFT COLUMN: Text & Filters */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f4f7ff] dark:bg-[#1a1f2c] rounded-full shadow-[6px_6px_12px_rgba(140,160,190,0.15),-6px_-6px_12px_rgba(255,255,255,0.9)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] border border-white/70 text-[12px] font-bold text-slate-500 mb-5"
                        >
                            🚀 My Work
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#17213c] dark:text-white leading-[1.1] mb-4 tracking-tight"
                        >
                            Featured <span className="bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Projects</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[#64748b] dark:text-slate-400 text-base font-medium mb-8 max-w-lg"
                        >
                            A collection of my best work, built with modern technologies and a passion for solving real-world problems.
                        </motion.p>

                        {/* FILTERS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
                        >
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = activeCategory === cat.name;
                                return (
                                    <button
                                        key={cat.name}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`px-5 py-2.5 rounded-full font-bold text-[13px] flex items-center gap-2 transition-all duration-300 border border-white/75 ${
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[6px_8px_16px_rgba(59,130,246,0.3)] scale-[1.02]'
                                                : 'bg-[#f8fafc] dark:bg-[#1e2434] text-[#64748b] hover:text-[#17213c] shadow-[6px_6px_14px_rgba(140,160,190,0.15),-6px_-6px_14px_rgba(255,255,255,0.9)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)]'
                                        }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                        {cat.name}
                                    </button>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Avatar & Stats */}
                    <div className="hidden lg:flex items-center justify-end flex-1 z-10 gap-6 xl:gap-10">
                        {/* 3D AVATAR */}
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            src="/hero-avatar-new.jpg" 
                            alt="Developer" 
                            className="w-[300px] xl:w-[360px] object-contain mix-blend-darken dark:mix-blend-lighten"
                            style={{ 
                                maskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                            }}
                        />

                        {/* STATS */}
                        <div className="flex flex-col gap-4 shrink-0">
                            {[
                                { title: 'Projects', value: '2+', icon: <Layout className="w-5 h-5 text-[#f59e0b]" />, bgClass: 'bg-[#fef3c7]' },
                                { title: 'Certifications', value: '5+', icon: <BookOpen className="w-5 h-5 text-[#ef4444]" />, bgClass: 'bg-[#fee2e2]' },
                                { title: 'Hackathons', value: '7+', icon: <Star className="w-5 h-5 text-[#3b82f6]" />, bgClass: 'bg-[#dbeafe]' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="bg-[#f8fafc] dark:bg-[#1e2434] rounded-[24px] p-3.5 pr-8 shadow-[8px_8px_18px_rgba(140,160,190,0.18),-8px_-8px_18px_rgba(255,255,255,0.95)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] flex items-center gap-4 border border-white/80"
                                >
                                    <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-inner ${stat.bgClass}`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-[#17213c] dark:text-white leading-tight">{stat.value}</h3>
                                        <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mt-0.5">{stat.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* GRID */}
                <motion.div
                    ref={ref}
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mt-2"
                >
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <ProjectCardSkeleton key={`skeleton-${i}`} />
                            ))
                        ) : (
                            filtered.map((project, i) => {
                                const imgSrc = getProjectImage(project.title);
                                return (
                                    <motion.article
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                        transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
                                        key={project.id}
                                        className="group flex flex-col bg-[#fdfdfd] dark:bg-[#1a1f2c] rounded-[28px] border border-white/75 dark:border-white/10 transition-transform duration-300 hover:-translate-y-2 cursor-pointer h-full"
                                        style={{ 
                                            boxShadow: '12px 12px 28px rgba(140,160,190,0.20), -10px -10px 24px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)' 
                                        }}
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        {/* PADDED IMAGE WRAPPER (Clay Frame) */}
                                        <div 
                                            className="m-[14px] p-[10px] bg-[#f4f7ff] dark:bg-[#1e2434] rounded-[26px]"
                                            style={{
                                                boxShadow: '8px 8px 18px rgba(140,160,190,0.18), -8px -8px 18px rgba(255,255,255,0.95)'
                                            }}
                                        >
                                            <div className="w-full h-[220px] relative overflow-hidden rounded-[18px]">
                                                {imgSrc ? (
                                                    <img 
                                                        src={imgSrc} 
                                                        alt={`${project.title} project preview`}
                                                        className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center">
                                                        <div className="text-slate-400 font-medium text-sm">Image Coming Soon</div>
                                                    </div>
                                                )}
                                                
                                                {/* Category Badge on top left inside the image */}
                                                <div className="absolute top-[18px] left-[18px] flex gap-2 z-10">
                                                    {project.badge === 'Featured' && (
                                                        <div 
                                                            className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/95 dark:bg-[#1a1f2c]/95 text-amber-500 flex items-center gap-1.5 border border-white/60"
                                                            style={{ boxShadow: '4px 4px 10px rgba(140,160,190,0.25), -2px -2px 6px rgba(255,255,255,0.9)' }}
                                                        >
                                                            <Star className="w-3.5 h-3.5 fill-amber-500" /> Featured
                                                        </div>
                                                    )}
                                                    <div 
                                                        className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/95 dark:bg-[#1a1f2c]/95 text-[#3b82f6] flex items-center gap-1.5 border border-white/60"
                                                        style={{ boxShadow: '4px 4px 10px rgba(140,160,190,0.25), -2px -2px 6px rgba(255,255,255,0.9)' }}
                                                    >
                                                        <Globe className="w-3.5 h-3.5" /> {project.category}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CONTENT AREA */}
                                        <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
                                            <h3 className="text-[#17213c] dark:text-white font-bold text-[22px] mb-2 leading-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-[#64748b] dark:text-slate-400 text-[15px] leading-[1.6] line-clamp-2 mb-5">
                                                {project.description}
                                            </p>

                                            {/* Tech Chips */}
                                            <div className="flex flex-wrap gap-2.5 mb-6">
                                                {project.techStack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-[12px] py-[7px] rounded-full text-[12px] font-bold bg-[#f1f5fb] dark:bg-[#1e2434] text-[#64748b] border border-white/50"
                                                        style={{
                                                            boxShadow: 'inset 2px 2px 5px rgba(140,160,190,0.15), inset -2px -2px 5px rgba(255,255,255,0.8), 2px 2px 4px rgba(140,160,190,0.1)'
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* BOTTOM ACTION ROW */}
                                            <div className="flex justify-between items-center mt-auto pt-2">
                                                <div className="flex items-center gap-4">
                                                    {project.isConfidential ? (
                                                        <span className="text-[13px] text-pink-600 flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-full bg-[#fce7f3] dark:bg-[#be185d]">
                                                            <Lock className="w-4 h-4" />
                                                            Confidential
                                                        </span>
                                                    ) : (
                                                        project.githubUrl && (
                                                            <a
                                                                href={project.githubUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="text-[13px] font-bold text-[#64748b] hover:text-[#17213c] transition-colors flex items-center gap-1.5"
                                                            >
                                                                <GithubIcon className="w-4.5 h-4.5" />
                                                                GitHub
                                                            </a>
                                                        )
                                                    )}

                                                    {project.liveUrl && (
                                                        <a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-[13px] font-bold text-[#64748b] hover:text-[#17213c] transition-colors flex items-center gap-1.5"
                                                        >
                                                            <ExternalLink className="w-4.5 h-4.5" />
                                                            Live Demo
                                                        </a>
                                                    )}
                                                </div>

                                                <button 
                                                    className="group/btn px-4 py-2.5 rounded-full bg-[#f4f7ff] dark:bg-[#1e2434] text-[#3b82f6] font-bold text-[13px] flex items-center gap-1.5 border border-white/60 transition-all duration-300 hover:-translate-y-[2px]"
                                                    style={{ boxShadow: '4px 4px 10px rgba(140,160,190,0.2), -4px -4px 10px rgba(255,255,255,0.9)' }}
                                                >
                                                    View Details <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}
