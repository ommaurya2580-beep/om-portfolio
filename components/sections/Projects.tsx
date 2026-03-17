'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Timestamp } from 'firebase/firestore';
import { getProjects, type Project } from '@/lib/firestore';
import ProjectModal from '@/components/ui/ProjectModal';
import { ProjectCardSkeleton } from '@/components/ui/LoadingSkeleton';

const categories = ['All', 'Web App', 'Mobile App', 'AI'];

const baseProjects: Partial<Project>[] = [
    {
        id: '1',
        title: "AKTU Counselling Helper",
        repo: "aktu-counselling-helper",
        description: "Web platform to search and filter AKTU counselling cutoffs with optimized performance.",
        techStack: ["Next.js", "Firebase", "Firestore", "Tailwind"],
        liveUrl: "https://aktu-counselling-helper.vercel.app",
        category: "Web App",
        badge: "Featured Project"
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
        isConfidential: true
    }
];

const categoryColors: Record<string, string> = {
    'Web App': '#00f5ff',
    'Mobile App': '#bf00ff',
    AI: '#ffa116',
};

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

    return (
        <section id="projects" className="relative py-32 bg-[#020209]">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 03. projects'}</p>
                    <h2 className="section-heading text-white">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? 'bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] text-[#020209] font-bold'
                                : 'glass border border-white/10 text-slate-400 hover:text-white hover:border-[#00f5ff]/30'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Project cards */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <motion.div
                                    key={`skeleton-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <ProjectCardSkeleton />
                                </motion.div>
                            ))
                        ) : (
                            filtered.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    whileHover={{ y: -6 }}
                                    onClick={() => setSelectedProject(project)}
                                    className="glass rounded-2xl border border-white/5 overflow-hidden cursor-pointer group card-hover"
                                    style={{ borderColor: `${categoryColors[project.category] || '#00f5ff'}20` }}
                                >
                                    {/* Card header */}
                                    <div
                                        className="h-40 relative overflow-hidden"
                                        style={{
                                            background: `linear-gradient(135deg, ${categoryColors[project.category] || '#00f5ff'}15, transparent)`,
                                        }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="text-6xl font-bold opacity-10 font-mono"
                                                style={{ color: categoryColors[project.category] || '#00f5ff' }}
                                            >
                                                {project.title.charAt(0)}
                                            </div>
                                        </div>
                                        {/* Badges container */}
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            {project.badge && (
                                                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1">
                                                    🔥 {project.badge}
                                                </span>
                                            )}
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                                                style={{
                                                    background: `${categoryColors[project.category] || '#00f5ff'}20`,
                                                    color: categoryColors[project.category] || '#00f5ff',
                                                    border: `1px solid ${categoryColors[project.category] || '#00f5ff'}40`,
                                                }}
                                            >
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="p-6">
                                        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00f5ff] transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                                            {project.description}
                                        </p>

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.techStack.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 rounded-md text-xs font-mono bg-white/5 text-slate-400 border border-white/10"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="px-2 py-1 rounded-md text-xs font-mono bg-white/5 text-slate-500">
                                                    +{project.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Links & Stats */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            {project.isConfidential ? (
                                                <span className="text-xs text-rose-400 flex items-center gap-1 font-mono uppercase font-bold border border-rose-400/20 bg-rose-400/10 px-2 py-1 rounded-md">
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                                    </svg>
                                                    Confidential
                                                </span>
                                            ) : (
                                                project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-xs text-slate-400 hover:text-[#00f5ff] transition-colors flex items-center gap-1"
                                                    >
                                                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                                        </svg>
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
                                                    className="text-xs text-slate-400 hover:text-[#00ff88] transition-colors flex items-center gap-1"
                                                >
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                                    </svg>
                                                    Live Demo
                                                </a>
                                            )}

                                            {/* Stars & Forks */}
                                            {!project.isConfidential && (project.stars !== undefined || project.forks !== undefined) && (
                                                <div className="flex items-center gap-3 ml-auto text-xs font-mono text-slate-400">
                                                    {project.stars !== undefined && project.stars > 0 && (
                                                        <span className="flex items-center gap-1 hover:text-[#00f5ff] transition-colors" title="Stars">
                                                            ⭐ {project.stars}
                                                        </span>
                                                    )}
                                                    {project.forks !== undefined && project.forks > 0 && (
                                                        <span className="flex items-center gap-1 hover:text-[#00f5ff] transition-colors" title="Forks">
                                                            🍴 {project.forks}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <span className={`${project.isConfidential || (!project.stars && !project.forks) ? 'ml-auto ' : ''}text-xs text-slate-500 group-hover:text-[#00f5ff] transition-colors`}>
                                                View Details →
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Project Modal */}
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}
