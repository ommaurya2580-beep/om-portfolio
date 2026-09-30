'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/firestore';
import { X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    // Simple mapping for modal colors based on category
    const getColor = (category?: string) => {
        if (category === 'Web App') return 'var(--blue)';
        if (category === 'Mobile App') return 'var(--purple)';
        return 'var(--green)';
    };

    const getBgClass = (category?: string) => {
        if (category === 'Web App') return 'bg-[#e0f2fe] dark:bg-[#0369a1] text-accent-blue';
        if (category === 'Mobile App') return 'bg-[#f3e8ff] dark:bg-[#6b21a8] text-accent-purple';
        return 'bg-[#dcfce7] dark:bg-[#15803d] text-accent-green';
    };

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9950] bg-text-primary/20 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 sm:inset-10 lg:inset-20 z-[9960] clay-card overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="relative p-8 pb-6 bg-[#E9EFF7] dark:bg-[#1e2434] border-b border-clay-highlight">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-clay-surface shadow-clay-pill flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-start gap-5">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-clay-pill ${getBgClass(project.category)}`}>
                                    {project.title.charAt(0)}
                                </div>
                                <div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold mb-3 inline-block shadow-sm ${getBgClass(project.category)}`}>
                                        {project.category}
                                    </span>
                                    <h2 className="text-3xl font-extrabold text-text-primary">{project.title}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 pt-6">
                            <div className="max-w-3xl mx-auto">
                                {/* Description */}
                                <div className="mb-10">
                                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Description</h3>
                                    <p className="text-text-secondary leading-relaxed text-lg font-medium">{project.description}</p>
                                </div>

                                {/* Tech Stack */}
                                <div className="mb-10">
                                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 rounded-[14px] text-sm font-bold bg-[#E9EFF7] dark:bg-[#1e2434] text-text-primary shadow-clay-input"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    {project.githubUrl && (
                                        <motion.a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -2 }}
                                            className="flex items-center gap-2 px-8 py-4 rounded-[20px] font-bold text-sm bg-clay-surface text-text-primary shadow-clay-btn transition-shadow"
                                        >
                                            <GithubIcon className="w-5 h-5" />
                                            View Source
                                        </motion.a>
                                    )}
                                    {project.liveUrl && (
                                        <motion.a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -2 }}
                                            className="flex items-center gap-2 px-8 py-4 clay-btn-primary text-sm font-bold"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            Live Demo
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
