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

    const getProjectVisual = (project: Project) => {
        const title = project.title.toLowerCase();
        let imgSrc = '';

        if (title.includes('aktu')) imgSrc = '/projects/p1.jpg';
        else if (title.includes('spin')) imgSrc = '/projects/p2.jpg';
        else if (title.includes('face')) imgSrc = '/projects/p3.jpg';
        else if (title.includes('agripulse')) imgSrc = '/projects/p4.jpg';
        else if (title.includes('buynora')) imgSrc = '/projects/p5.jpg';
        else if (title.includes('parking')) imgSrc = '/projects/p6.jpg';

        return (
            <div className="w-full h-full relative overflow-hidden bg-white/50">
                {imgSrc ? (
                    <img 
                        src={imgSrc} 
                        alt={`${project.title} project preview`}
                        className="w-full h-full object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-200 animate-pulse" />
                )}
            </div>
        );
    };

    return (
        <section id="projects" className="relative pt-[160px] pb-16 bg-[#EEF4FB] dark:bg-[#0f172a] overflow-hidden">
            {/* Ambient Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />
                <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[30%] w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[120px]" />
            </div>

            {/* Floating Decorations (z-index 0) */}
            <div className="absolute top-60 right-20 w-16 h-16 bg-purple-300 dark:bg-purple-800 rounded-2xl rotate-12 blur-[1px] opacity-60 animate-bounce-slow" style={{ zIndex: 0 }} />
            <div className="absolute bottom-40 left-10 w-20 h-20 bg-blue-300 dark:bg-blue-800 rounded-full blur-[2px] opacity-50 animate-pulse-slow" style={{ zIndex: 0 }} />
            <div className="absolute top-1/2 right-10 w-12 h-12 bg-pink-300 dark:bg-pink-800 rounded-lg -rotate-12 blur-[1px] opacity-40 animate-float" style={{ zIndex: 0 }} />

            <div className="max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-10 relative" style={{ zIndex: 2 }}>
                
                {/* SECTION HEADER AREA */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between mb-10 relative gap-8">
                    
                    {/* LEFT COLUMN: Text & Filters */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F8FAFC]/90 dark:bg-[#1a1f2c]/90 rounded-full shadow-[3px_4px_8px_rgba(148,163,184,0.2),-2px_-2px_5px_rgba(255,255,255,0.8)] dark:shadow-none text-[11px] font-bold text-slate-500 mb-4"
                        >
                            🚀 My Work
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0f172a] dark:text-white leading-[1.1] mb-3 tracking-tight"
                        >
                            Featured <span className="bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Projects</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium mb-6 max-w-md"
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
                                        className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all duration-300 ${
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                                                : 'bg-[rgba(255,255,255,0.8)] dark:bg-[#1a1f2c] text-slate-500 hover:text-slate-800 shadow-[4px_4px_8px_rgba(148,163,184,0.25),-4px_-4px_8px_rgba(255,255,255,0.85)] dark:shadow-none border border-white/50'
                                        }`}
                                    >
                                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                        {cat.name}
                                    </button>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Avatar & Stats */}
                    <div className="hidden lg:flex items-center justify-end flex-1 z-10 gap-4 xl:gap-8">
                        {/* 3D AVATAR */}
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            src="/hero-avatar-new.jpg" 
                            alt="Developer" 
                            className="w-[280px] xl:w-[340px] object-contain mix-blend-darken dark:mix-blend-lighten"
                            style={{ 
                                maskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                            }}
                        />

                        {/* STATS */}
                        <div className="flex flex-col gap-3 shrink-0">
                            {[
                                { title: 'Projects', value: '2+', icon: <Layout className="w-4 h-4 text-[#f59e0b]" />, bgClass: 'bg-[#fef3c7]' },
                                { title: 'Certifications', value: '5+', icon: <BookOpen className="w-4 h-4 text-[#ef4444]" />, bgClass: 'bg-[#fee2e2]' },
                                { title: 'Hackathons', value: '7+', icon: <Star className="w-4 h-4 text-[#3b82f6]" />, bgClass: 'bg-[#dbeafe]' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="bg-[rgba(255,255,255,0.75)] dark:bg-[rgba(30,36,52,0.75)] backdrop-blur-md rounded-[20px] p-3 pr-6 shadow-[6px_8px_16px_rgba(148,163,184,0.15),-4px_-4px_10px_rgba(255,255,255,0.7)] flex items-center gap-3 border border-white/50"
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${stat.bgClass}`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-extrabold text-slate-800 dark:text-white leading-tight">{stat.value}</h3>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
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
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7"
                >
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <ProjectCardSkeleton key={`skeleton-${i}`} />
                            ))
                        ) : (
                            filtered.map((project, i) => (
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
                                    key={project.id}
                                    className="group bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(30,36,52,0.85)] backdrop-blur-md rounded-[32px] shadow-[10px_12px_25px_rgba(148,163,184,0.20),-7px_-7px_18px_rgba(255,255,255,0.85)] dark:shadow-[8px_8px_20px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
                                    style={{ boxShadow: '10px 12px 25px rgba(148,163,184,0.20), -7px -7px 18px rgba(255,255,255,0.85), inset 0 1px 0 rgba(255,255,255,0.75)' }}
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {/* VISUAL AREA */}
                                    <div className="w-full h-[240px] relative overflow-hidden bg-slate-50">
                                        {getProjectVisual(project)}
                                        
                                        {/* Category Badge on bottom left */}
                                        <div className="absolute bottom-4 left-4 z-10">
                                            <div className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-white/95 dark:bg-[#1a1f2c]/95 text-accent-blue shadow-[3px_4px_8px_rgba(148,163,184,0.2),-2px_-2px_5px_rgba(255,255,255,0.8)] flex items-center gap-1 backdrop-blur-sm border border-white/50">
                                                <Globe className="w-3 h-3" /> {project.category}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CONTENT AREA */}
                                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                        <h3 className="text-[#0f172a] dark:text-white font-bold text-lg mb-2 leading-tight">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 font-medium">
                                            {project.description}
                                        </p>

                                        {/* Tech Chips */}
                                        <div className="flex flex-wrap gap-2 mb-0">
                                            {project.techStack.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-full text-[11px] font-bold bg-[rgba(255,255,255,0.6)] dark:bg-[#1e2434] text-slate-600 shadow-[inset_1px_1px_3px_rgba(148,163,184,0.2),2px_2px_5px_rgba(148,163,184,0.1)] dark:shadow-none border border-white/40"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[rgba(255,255,255,0.6)] dark:bg-[#1e2434] text-slate-500 shadow-[inset_1px_1px_3px_rgba(148,163,184,0.2),2px_2px_5px_rgba(148,163,184,0.1)] dark:shadow-none border border-white/40">
                                                    +{project.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* ACTION ROW */}
                                        <div className="flex items-center gap-4 mt-auto pt-5">
                                            {project.isConfidential ? (
                                                <span className="text-xs text-accent-pink flex items-center gap-1.5 font-bold uppercase px-3 py-1.5 rounded-full bg-[#fce7f3] dark:bg-[#be185d]">
                                                    <Lock className="w-3.5 h-3.5" />
                                                    Confidential
                                                </span>
                                            ) : (
                                                project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
                                                    >
                                                        <GithubIcon className="w-4 h-4" />
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
                                                    className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                    Live Demo
                                                </a>
                                            )}

                                            <span className="ml-auto text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-1">
                                                View Details <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}
