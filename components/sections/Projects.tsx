'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Timestamp } from 'firebase/firestore';
import { getProjects, type Project } from '@/lib/firestore';
import ProjectModal from '@/components/ui/ProjectModal';
import { ProjectCardSkeleton } from '@/components/ui/LoadingSkeleton';
import { ExternalLink, Github, Lock, Layout, Star, GitFork, ArrowRight, Smartphone, Brain } from 'lucide-react';

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
        isConfidential: true,
        liveUrl: "https://lovable.dev/projects/06821d87-694e-4c24-8601-eeb4350b5fc5"
    },
    {
        id: '4',
        title: "Weather Web App",
        description: "A real-time weather forecasting web application using external weather APIs. Allows city-based search and displays temperature, humidity, and wind data in a clean responsive UI.",
        techStack: ["HTML", "CSS", "JavaScript", "Weather API"],
        githubUrl: "https://github.com/ommaurya2580-beep",
        category: "Web App",
        liveUrl: "https://weather-app-five-dun-93.vercel.app"
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

    // Get placeholder abstract visual based on category
    const getCategoryVisual = (category: string) => {
        if (category === 'Web App') {
            return (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_60%)]" />
                    <div className="w-24 h-16 bg-white dark:bg-[#22283a] rounded-xl shadow-clay-floating rotate-[-5deg] absolute flex items-start px-2 py-2">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                    </div>
                    <div className="w-24 h-16 bg-[#e0f2fe] dark:bg-[#0369a1] rounded-xl shadow-clay-pill rotate-[10deg] absolute ml-10 mt-10 flex items-center justify-center">
                        <Layout className="text-accent-blue w-6 h-6" />
                    </div>
                </div>
            );
        } else if (category === 'Mobile App') {
            return (
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_60%)]" />
                    <div className="w-16 h-28 bg-white dark:bg-[#22283a] rounded-[18px] shadow-clay-floating flex flex-col items-center justify-between p-2 z-10">
                        <div className="w-6 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <div className="w-full h-20 bg-[#f3e8ff] dark:bg-[#6b21a8] rounded-xl flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-accent-purple" />
                        </div>
                    </div>
                </div>
            );
        } else {
            // AI
            return (
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_60%)]" />
                    <div className="w-20 h-20 bg-white dark:bg-[#22283a] rounded-full shadow-clay-floating flex items-center justify-center z-10">
                        <Brain className="w-8 h-8 text-accent-green" />
                    </div>
                    <div className="absolute w-24 h-24 border-2 border-dashed border-accent-green/30 rounded-full animate-spin-slow" />
                </div>
            );
        }
    };

    return (
        <section id="projects" className="relative py-24 sm:py-32 bg-clay-surface">
            <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-accent-pink clay-blob" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-heading">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                                ? 'bg-gradient-primary text-white shadow-clay-pill translate-y-[-2px]'
                                : 'bg-[#E9EFF7] dark:bg-[#1e2434] text-text-secondary hover:text-text-primary shadow-clay-input hover:shadow-clay-pill'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Project cards */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    onClick={() => setSelectedProject(project)}
                                    className="h-full cursor-pointer group"
                                >
                                    <div className="clay-card h-full flex flex-col overflow-hidden">
                                        {/* Card header / Visual */}
                                        <div className="h-48 relative overflow-hidden flex-shrink-0 bg-[#E9EFF7] dark:bg-[#1e2434]">
                                            {getCategoryVisual(project.category || 'Web App')}
                                            
                                            {/* Badges container */}
                                            <div className="absolute top-4 right-4 flex gap-2 z-20">
                                                {project.badge && (
                                                    <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#ffedd5] text-accent-orange shadow-sm flex items-center gap-1 uppercase tracking-wider">
                                                        🔥 {project.badge}
                                                    </span>
                                                )}
                                                <span
                                                    className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-accent-blue shadow-sm"
                                                >
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card body */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-text-primary font-extrabold text-xl mb-3 group-hover:text-accent-blue transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
                                                {project.description}
                                            </p>

                                            {/* Tech stack */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.techStack.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#E9EFF7] dark:bg-[#1e2434] text-text-secondary shadow-clay-input"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#E9EFF7] dark:bg-[#1e2434] text-text-muted shadow-clay-input">
                                                        +{project.techStack.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Links & Stats */}
                                            <div className="flex flex-wrap items-center gap-4 mt-auto pt-5 border-t border-[#E9EFF7] dark:border-[#1e2434]">
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
                                                            className="text-sm font-bold text-text-secondary hover:text-accent-blue transition-colors flex items-center gap-1.5"
                                                        >
                                                            <Github className="w-4 h-4" />
                                                            Code
                                                        </a>
                                                    )
                                                )}

                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-sm font-bold text-text-secondary hover:text-accent-green transition-colors flex items-center gap-1.5"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Live
                                                    </a>
                                                )}

                                                {/* Stats */}
                                                {!project.isConfidential && (project.stars !== undefined || project.forks !== undefined) && (
                                                    <div className="flex items-center gap-3 ml-auto text-xs font-bold text-text-muted">
                                                        {project.stars !== undefined && project.stars > 0 && (
                                                            <span className="flex items-center gap-1">
                                                                <Star className="w-3.5 h-3.5 text-accent-yellow" /> {project.stars}
                                                            </span>
                                                        )}
                                                        {project.forks !== undefined && project.forks > 0 && (
                                                            <span className="flex items-center gap-1">
                                                                <GitFork className="w-3.5 h-3.5 text-text-muted" /> {project.forks}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                <span className={`${project.isConfidential || (!project.stars && !project.forks) ? 'ml-auto ' : ''}text-sm font-bold text-text-muted group-hover:text-accent-blue transition-colors flex items-center gap-1`}>
                                                    Details <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
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
