'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CertificateItem {
    /** Display title shown in modal header */
    title: string;
    /** Optional legacy name field (same as title for hackathons) */
    name?: string;
    issuer?: string;
    org?: string;
    year?: string;
    color: string;
    icon: string;
    type?: string;
    /** Path under /public or external URL. e.g. "/certificates/oracle.pdf" */
    certificateUrl?: string;
}

interface CertificateModalProps {
    item: CertificateItem | null;
    onClose: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isPdf(url: string) {
    return url.toLowerCase().endsWith('.pdf');
}

function isImage(url: string) {
    return /\.(png|jpe?g|gif|webp|svg)$/i.test(url);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CertificateModal({ item, onClose }: CertificateModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // ESC key to close
    useEffect(() => {
        if (!item) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [item, onClose]);

    // Focus trap – auto-focus close button when modal opens
    useEffect(() => {
        if (item) {
            setTimeout(() => closeBtnRef.current?.focus(), 50);
        }
    }, [item]);

    // Lock body scroll
    useEffect(() => {
        if (item) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [item]);

    // Background click closes
    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    }, [onClose]);

    // Handle certificate click when no URL is set
    const handleOpenClick = useCallback(() => {
        if (!item?.certificateUrl) {
            toast.error('Certificate not available yet.', { id: 'no-cert' });
            return;
        }
        window.open(item.certificateUrl, '_blank', 'noopener,noreferrer');
    }, [item]);

    const accent = item?.color ?? '#00f5ff';

    return (
        <AnimatePresence>
            {item && (
                <>
                    {/* ── Backdrop ─────────────────────────────────────────── */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9950] bg-black/75 backdrop-blur-md"
                        onClick={handleBackdropClick}
                        aria-hidden="true"
                    />

                    {/* ── Modal ────────────────────────────────────────────── */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.88, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 24 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                        className="fixed inset-0 z-[9960] flex items-center justify-center p-4 sm:p-8"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Certificate: ${item.title}`}
                        onClick={handleBackdropClick}
                    >
                        <div
                            ref={modalRef}
                            className="relative w-full max-w-3xl rounded-3xl overflow-hidden flex flex-col"
                            style={{
                                background: 'linear-gradient(145deg, rgba(6,6,20,0.98), rgba(10,10,30,0.96))',
                                border: `1px solid ${accent}25`,
                                boxShadow: `0 0 80px ${accent}18, 0 25px 60px rgba(0,0,0,0.7)`,
                                backdropFilter: 'blur(30px)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* ── Header ─────────────────────────────────── */}
                            <div
                                className="flex items-center gap-4 px-6 py-5 border-b"
                                style={{ borderColor: `${accent}18` }}
                            >
                                {/* Icon badge */}
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                                    style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                                >
                                    {item.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                    {/* Issuer / Org */}
                                    <p className="text-xs font-mono mb-0.5" style={{ color: accent }}>
                                        {item.issuer ?? item.org}
                                        {item.year ? ` · ${item.year}` : ''}
                                        {item.type ? ` · ${item.type}` : ''}
                                    </p>
                                    <h2 className="text-white font-bold text-base sm:text-lg leading-snug truncate">
                                        {item.title}
                                    </h2>
                                </div>

                                {/* Close button */}
                                <button
                                    ref={closeBtnRef}
                                    onClick={onClose}
                                    aria-label="Close certificate modal"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors flex-shrink-0"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* ── Certificate Preview ────────────────────── */}
                            <div className="relative" style={{ minHeight: '420px' }}>
                                {item.certificateUrl ? (
                                    isPdf(item.certificateUrl) ? (
                                        // PDF via iframe
                                        <iframe
                                            src={`${item.certificateUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                            className="w-full"
                                            style={{ height: '460px', border: 'none', background: '#fff' }}
                                            title={`${item.title} certificate`}
                                        />
                                    ) : isImage(item.certificateUrl) ? (
                                        // Image via <img>
                                        // Using regular img tag for flexibility with external URLs
                                        <div className="flex items-center justify-center bg-white/5 p-4" style={{ minHeight: '420px' }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.certificateUrl}
                                                alt={`${item.title} certificate`}
                                                className="max-w-full max-h-[440px] object-contain rounded-lg shadow-2xl"
                                            />
                                        </div>
                                    ) : (
                                        // Fallback embed
                                        <div className="flex items-center justify-center" style={{ minHeight: '420px' }}>
                                            <p className="text-slate-400 text-sm">Preview not supported. Use the Open button below.</p>
                                        </div>
                                    )
                                ) : (
                                    // No certificate URL — placeholder
                                    <div className="flex flex-col items-center justify-center gap-6" style={{ minHeight: '420px' }}>
                                        <div
                                            className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
                                            style={{ background: `${accent}10`, border: `2px dashed ${accent}30` }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-slate-300 font-semibold mb-1">{item.title}</p>
                                            <p className="text-slate-500 text-sm">Certificate preview coming soon</p>
                                        </div>
                                    </div>
                                )}

                                {/* Subtle gradient overlay at bottom of preview */}
                                {item.certificateUrl && (
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                                        style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,6,20,0.6))' }}
                                    />
                                )}
                            </div>

                            {/* ── Footer Actions ────────────────────────── */}
                            <div
                                className="flex items-center justify-between gap-3 px-6 py-4 border-t"
                                style={{ borderColor: `${accent}18` }}
                            >
                                {/* Status badge */}
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                                    style={{
                                        background: `${accent}15`,
                                        color: accent,
                                        border: `1px solid ${accent}30`,
                                    }}
                                >
                                    ✓ {item.type ?? 'Certified'}
                                </span>

                                <div className="flex gap-3">
                                    {/* Open / View button */}
                                    <button
                                        onClick={handleOpenClick}
                                        aria-label="Open certificate in new tab"
                                        className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 hover:opacity-80 active:scale-95"
                                        style={{
                                            background: `${accent}20`,
                                            color: accent,
                                            border: `1px solid ${accent}40`,
                                        }}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Open
                                        </span>
                                    </button>

                                    {/* Download button */}
                                    {item.certificateUrl ? (
                                        <a
                                            href={item.certificateUrl}
                                            download
                                            aria-label={`Download ${item.title} certificate`}
                                            className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 hover:opacity-80 active:scale-95 flex items-center gap-1.5"
                                            style={{
                                                background: `linear-gradient(135deg, ${accent}90, ${accent}60)`,
                                                color: '#020209',
                                            }}
                                        >
                                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Download
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => toast.error('Certificate not available yet.', { id: 'no-cert-dl' })}
                                            className="px-4 py-2 rounded-xl text-xs font-mono font-bold opacity-40 cursor-not-allowed flex items-center gap-1.5"
                                            style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                                            aria-disabled="true"
                                        >
                                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Download
                                        </button>
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
