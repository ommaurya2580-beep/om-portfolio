'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { QRCodeSVG } from 'qrcode.react';
import { getApps, incrementDownload, type AppItem } from '@/lib/firestore';
import { AppCardSkeleton } from '@/components/ui/LoadingSkeleton';

export default function ApkDownloads() {
    const [apps, setApps] = useState<AppItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        getApps().then((data) => {
            if (data.length > 0) setApps(data);
            setLoading(false);
        });
    }, []);

    const handleDownload = async (app: AppItem) => {
        await incrementDownload(app.id);
        setApps((prev) =>
            prev.map((a) => (a.id === app.id ? { ...a, downloadCount: a.downloadCount + 1 } : a))
        );
        window.open(app.downloadUrl, '_blank');
    };

    if (!loading && apps.length === 0) return null;

    return (
        <section id="apps" className="relative py-32 bg-[#020209]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 08. apps_downloads'}</p>
                    <h2 className="section-heading text-white">
                        Apps & <span className="gradient-text">Downloads</span>
                    </h2>
                    <p className="text-slate-400 mt-4">Download my apps directly or scan the QR code</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <motion.div
                                key={`skeleton-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <AppCardSkeleton />
                            </motion.div>
                        ))
                    ) : (
                        apps.map((app, i) => (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="glass rounded-2xl border border-[#00ff88]/20 overflow-hidden card-hover"
                            >
                                {/* Header */}
                                <div className="p-6 pb-4 border-b border-white/5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold font-mono"
                                            style={{ background: '#00ff8815', color: '#00ff88', border: '1px solid #00ff8830' }}
                                        >
                                            {app.name.charAt(0)}
                                        </div>
                                        <span className="px-2 py-1 rounded-full text-xs font-mono bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
                                            v{app.version}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg">{app.name}</h3>
                                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">{app.description}</p>
                                </div>

                                {/* Stats */}
                                <div className="px-6 py-4 grid grid-cols-3 gap-3 border-b border-white/5">
                                    {[
                                        { label: 'Size', value: app.fileSize },
                                        { label: 'Downloads', value: ((app.downloadCount || 0).toLocaleString()) },
                                        {
                                            label: 'Released',
                                            value: app.releaseDate?.toDate ? app.releaseDate.toDate().toLocaleDateString() : 'Recently'
                                        },
                                    ].map((stat) => (
                                        <div key={stat.label} className="text-center">
                                            <p className="text-white text-sm font-semibold">{stat.value}</p>
                                            <p className="text-slate-500 text-xs">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* QR + Download */}
                                <div className="p-6 flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-xl flex-shrink-0">
                                        <QRCodeSVG
                                            value={app.downloadUrl}
                                            size={64}
                                            bgColor="#ffffff"
                                            fgColor="#020209"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-500 text-xs mb-3">Scan QR or click to download</p>
                                        <motion.button
                                            onClick={() => handleDownload(app)}
                                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full py-2.5 rounded-xl text-sm font-semibold text-[#020209] bg-gradient-to-r from-[#00ff88] to-[#00f5ff]"
                                        >
                                            ↓ Download APK
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )))}
                </div>
            </div>
        </section>
    );
}
