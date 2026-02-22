'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { CertificateItem } from '@/components/ui/CertificateModal';

// Lazy-load the modal for better performance
const CertificateModal = dynamic(() => import('@/components/ui/CertificateModal'), { ssr: false });

const certifications: CertificateItem[] = [
    {
        title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
        issuer: 'Oracle',
        color: '#ff0080',
        icon: '☁️',
        year: '2025',
        type: 'Certification',
        certificateUrl: '/certificates/oracle-ai.pdf',
    },
    {
        title: 'Microsoft Security Copilot',
        issuer: 'Microsoft',
        color: '#00f5ff',
        icon: '🛡️',
        year: '2025',
        type: 'Certification',
        certificateUrl: '/certificates/microsoft-security-copilot.pdf',
    },
    {
        title: 'Microsoft Fundamentals of Generative AI',
        issuer: 'Microsoft',
        color: '#bf00ff',
        icon: '🤖',
        year: '2025',
        type: 'Certification',
        certificateUrl: '/certificates/microsoft-gen-ai.pdf',
    },
    {
        title: 'Microsoft Fundamentals of AI Security',
        issuer: 'Microsoft',
        color: '#00ff88',
        icon: '🔒',
        year: '2025',
        type: 'Certification',
        certificateUrl: '/certificates/microsoft-ai-security.pdf',
    },
    {
        title: 'Microsoft Explore and Analyze Data with Python',
        issuer: 'Microsoft',
        color: '#ffa116',
        icon: '🐍',
        year: '2025',
        type: 'Certification',
        certificateUrl: '/certificates/microsoft-python.pdf',
    },
];

export default function Certifications() {
    const [selected, setSelected] = useState<CertificateItem | null>(null);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const handleClose = useCallback(() => setSelected(null), []);

    return (
        <section id="certifications" className="relative py-32 bg-[#020209]">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 05. certifications'}</p>
                    <h2 className="section-heading text-white">
                        My <span className="gradient-text">Certifications</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            onClick={() => setSelected(cert)}
                            className="glass rounded-2xl p-6 border cursor-pointer group relative overflow-hidden"
                            style={{ borderColor: `${cert.color}20` }}
                            role="button"
                            tabIndex={0}
                            aria-label={`View ${cert.title} certificate`}
                            onKeyDown={(e) => e.key === 'Enter' && setSelected(cert)}
                        >
                            {/* Glow on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                style={{ background: `radial-gradient(circle at center, ${cert.color}10, transparent)` }}
                            />

                            {/* Certificate available dot */}
                            {cert.certificateUrl && (
                                <div
                                    className="absolute top-3 right-3 w-2 h-2 rounded-full"
                                    style={{ background: cert.color, boxShadow: `0 0 6px ${cert.color}` }}
                                    title="Certificate available"
                                />
                            )}

                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                                style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                            >
                                {cert.icon}
                            </div>

                            {/* Content */}
                            <p className="text-xs font-mono mb-1" style={{ color: cert.color }}>
                                {cert.issuer} · {cert.year}
                            </p>
                            <h3 className="text-white font-semibold text-sm leading-relaxed group-hover:text-white transition-colors">
                                {cert.title}
                            </h3>

                            {/* View certificate hint */}
                            <div className="mt-4 flex items-center gap-1 text-xs transition-colors"
                                style={{ color: `${cert.color}80` }}>
                                <span>View Certificate</span>
                                <span>→</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certificate Modal */}
            <CertificateModal item={selected} onClose={handleClose} />
        </section>
    );
}
