'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────
interface HackathonEntry {
    title: string;
    org: string;
    type: string;
    color: string;
    icon: string;
    certificateUrl?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const hackathons: HackathonEntry[] = [
    {
        title: 'Kascade, Kshitij 2026',
        org: 'IIT Kharagpur',
        type: 'Hackathon',
        color: '#00f5ff',
        icon: '🏆',
        certificateUrl: 'https://unstop.com/certificate-preview/d6fdb50a-9f9a-4c7a-8dfa-6d3a73a12978',
    },
    {
        title: 'Hack4Delhi – Unstop Holiday Fest 2025',
        org: 'NSUT Delhi',
        type: 'Hackathon',
        color: '#bf00ff',
        icon: '💡',
        certificateUrl: 'https://unstop.com/certificate-preview/81740470-0985-42a1-a9a4-eef791c32b9c',
    },
    {
        title: 'GLB Hackathon 4.0',
        org: 'GL Bajaj Institute',
        type: 'Hackathon',
        color: '#00ff88',
        icon: '⚡',
        certificateUrl: 'https://unstop.com/certificate-preview/7508abbe-f215-48ab-ab3e-d9e6152337aa',
    },
    {
        title: 'NITS Hacks 8.0 – Coding Track',
        org: 'NIT Silchar',
        type: 'Hackathon',
        color: '#ffa116',
        icon: '🚀',
        certificateUrl: 'https://unstop.com/certificate-preview/cf8147b5-86af-4a53-b4c4-4f89d7637128',
    },
    {
        title: 'TATA Crucible Campus Quiz 2025',
        org: 'TATA Group',
        type: 'Competition',
        color: '#ff0080',
        icon: '🎯',
        certificateUrl: 'https://unstop.com/certificate-preview/258c3353-83a4-449c-b31a-d1dfe94d2fea',
    },
    {
        title: 'NationBuilding Case Study 2026 – Online Quiz',
        org: 'National Level',
        type: 'Competition',
        color: '#00f5ff',
        icon: '🌐',
        certificateUrl: 'https://unstop.com/certificate-preview/9e26ec77-4e0f-472c-9a68-1890fc6fef15',
    },
    {
        title: 'CodeSummit 2.0 – Online Assessment',
        org: 'RAIT ACM Student Chapter',
        type: 'Coding',
        color: '#bf00ff',
        icon: '💻',
        certificateUrl: 'https://unstop.com/certificate-preview/a78a22d9-462d-41cd-a42f-4f689dcf75f0',
    },
    {
        title: 'Marketwise – E-Summit 2026',
        org: 'IIT Roorkee',
        type: 'Competition',
        color: '#00ff88',
        icon: '📈',
        certificateUrl: 'https://unstop.com/certificate-preview/fc5af2cc-cfc2-45e5-8028-6db61883dbf8',
    },
    {
        title: 'Marketwise – Round 1 (AI & ML Fundamentals)',
        org: 'IIT Roorkee',
        type: 'Competition',
        color: '#ffa116',
        icon: '🧠',
        certificateUrl: 'https://unstop.com/certificate-preview/39a942b7-0d77-412e-b822-2abe523deaa4',
    },
];

// ─── External Link SVG Icon ────────────────────────────────────────────────────
function ExternalLinkIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hackathons() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const handleCardClick = useCallback((item: HackathonEntry) => {
        if (!item.certificateUrl) {
            toast.error('Certificate not available yet.', { id: 'no-cert' });
            return;
        }
        window.open(item.certificateUrl, '_blank', 'noopener,noreferrer');
    }, []);

    return (
        <section id="hackathons" className="relative py-32 bg-[#060614]">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── Heading ─────────────────────────────────────────────── */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 06. hackathons'}</p>
                    <h2 className="section-heading text-white">
                        Hackathons &amp; <span className="gradient-text">Competitions</span>
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                        Competed in {hackathons.length}+ hackathons and competitions, building innovative solutions under pressure.
                    </p>
                </motion.div>

                {/* ── Cards Grid ──────────────────────────────────────────── */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {hackathons.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            whileHover={{ y: -6, scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCardClick(item)}
                            className="glass rounded-2xl p-5 border group relative overflow-hidden cursor-pointer select-none"
                            style={{
                                borderColor: `${item.color}25`,
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`View certificate for ${item.title}`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleCardClick(item);
                                }
                            }}
                        >
                            {/* Hover glow background */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle at top left, ${item.color}12, transparent 70%)` }}
                            />

                            {/* Animated border glow on hover */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                    boxShadow: `inset 0 0 0 1px ${item.color}50, 0 0 20px ${item.color}15`,
                                }}
                            />

                            {/* Certificate available dot */}
                            {item.certificateUrl && (
                                <div
                                    className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
                                    style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                                    title="Certificate available"
                                />
                            )}

                            {/* Icon */}
                            <div className="text-3xl mb-3">{item.icon}</div>

                            {/* Type badge */}
                            <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold mb-3 inline-block"
                                style={{
                                    background: `${item.color}15`,
                                    color: item.color,
                                    border: `1px solid ${item.color}30`,
                                }}
                            >
                                {item.type}
                            </span>

                            <h3 className="text-white font-bold text-sm leading-snug mb-1">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 text-xs mb-4">{item.org}</p>

                            {/* View Certificate button */}
                            <div
                                className="flex items-center gap-1.5 text-xs font-mono font-semibold transition-all duration-200 group-hover:gap-2"
                                style={{ color: item.certificateUrl ? item.color : '#475569' }}
                            >
                                <span>{item.certificateUrl ? 'View Certificate' : 'Coming Soon'}</span>
                                {item.certificateUrl && (
                                    <ExternalLinkIcon className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                                )}
                            </div>

                            {/* Bottom shimmer accent on hover */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
