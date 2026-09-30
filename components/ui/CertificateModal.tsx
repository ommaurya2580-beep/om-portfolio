'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { X, ExternalLink, Download, Award } from 'lucide-react';

export interface CertificateItem {
    title: string;
    issuer: string;
    color: string;
    icon: React.ReactNode;
    year: string;
    type?: string;
    certificateUrl?: string;
}

interface CertificateModalProps {
    item: CertificateItem | null;
    onClose: () => void;
}

export default function CertificateModal({ item, onClose }: CertificateModalProps) {
    useEffect(() => {
        if (item) {
            document.body.style.overflow = 'hidden';
            const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
            document.addEventListener('keydown', handleEsc);
            return () => {
                document.body.style.overflow = 'unset';
                document.removeEventListener('keydown', handleEsc);
            };
        }
    }, [item, onClose]);

    const isPdf = (url?: string) => url?.toLowerCase().endsWith('.pdf');
    const isImage = (url?: string) => url?.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);

    const handleOpenClick = useCallback(() => {
        if (!item?.certificateUrl) {
            toast.error('Certificate not available yet.', { id: 'no-cert' });
            return;
        }
        window.open(item.certificateUrl, '_blank', 'noopener,noreferrer');
    }, [item]);

    return (
        <AnimatePresence>
            {item && (
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
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl z-[9960] clay-card overflow-hidden flex flex-col sm:max-h-[85vh] h-full sm:h-auto"
                    >
                        {/* Header */}
                        <div className="relative p-6 sm:p-8 bg-[#E9EFF7] dark:bg-[#1e2434] border-b border-clay-highlight flex gap-4">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-clay-surface shadow-clay-pill flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-clay-pill flex-shrink-0 bg-clay-surface" style={{ color: item.color }}>
                                {item.icon || <Award className="w-6 h-6" />}
                            </div>
                            <div className="pr-10">
                                <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary leading-tight mb-2">{item.title}</h2>
                                <p className="text-sm font-bold text-text-secondary">
                                    Issued by {item.issuer} • {item.year}
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-clay-surface p-6 sm:p-8 overflow-y-auto">
                            <div className="relative w-full rounded-2xl overflow-hidden shadow-clay-input bg-[#E9EFF7] dark:bg-[#1e2434] border border-clay-highlight h-[300px] sm:h-[450px]">
                                {item.certificateUrl ? (
                                    isPdf(item.certificateUrl) ? (
                                        <iframe
                                            src={`${item.certificateUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                            className="w-full h-full border-none"
                                            title={`${item.title} Certificate`}
                                        />
                                    ) : isImage(item.certificateUrl) ? (
                                        <div className="flex items-center justify-center h-full p-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.certificateUrl}
                                                alt={`${item.title} certificate`}
                                                className="max-w-full max-h-full object-contain rounded-xl shadow-clay-floating"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-text-secondary font-bold text-sm">Preview not supported. Use the Open button below.</p>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-6">
                                        <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl bg-clay-surface shadow-clay-pill border border-clay-highlight">
                                            <Award className="w-10 h-10 text-text-muted" />
                                        </div>
                                        <p className="text-text-secondary font-bold text-center">Certificate preview coming soon</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-4 border-t border-[#E9EFF7] dark:border-[#1e2434] bg-clay-surface">
                            <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9EFF7] dark:bg-[#1e2434] text-text-secondary shadow-clay-input">
                                {item.type ?? 'Certified'}
                            </span>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleOpenClick}
                                    className="px-6 py-3 rounded-[20px] text-sm font-bold shadow-clay-btn bg-clay-surface text-text-primary hover:text-accent-blue transition-colors flex items-center gap-2"
                                >
                                    <ExternalLink className="w-4 h-4" /> Open
                                </button>

                                {item.certificateUrl && (
                                    <a
                                        href={item.certificateUrl}
                                        download
                                        className="px-6 py-3 clay-btn-primary text-sm gap-2"
                                    >
                                        <Download className="w-4 h-4" /> Download
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
