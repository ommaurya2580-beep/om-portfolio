'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { QRCodeSVG } from 'qrcode.react';
import { getApps, incrementDownload, type AppItem } from '@/lib/firestore';
import { AppCardSkeleton } from '@/components/ui/LoadingSkeleton';
import { Download, Smartphone } from 'lucide-react';

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
        <section id="apps" className="relative py-24 sm:py-32 bg-clay-bg">
            <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-accent-green clay-blob" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-heading">
                        Apps & <span className="gradient-text">Downloads</span>
                    </h2>
                    <p className="text-text-secondary mt-4 font-medium max-w-xl mx-auto">
                        Download my apps directly or scan the QR code to install them on your mobile device.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
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
                                className="clay-card p-6 flex flex-col group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] dark:bg-[#15803d] text-accent-green shadow-clay-pill flex items-center justify-center flex-shrink-0 group-hover:-translate-y-1 transition-transform duration-300">
                                        {app.name.charAt(0) ? (
                                            <span className="text-2xl font-extrabold">{app.name.charAt(0)}</span>
                                        ) : (
                                            <Smartphone className="w-6 h-6" />
                                        )}
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E9EFF7] dark:bg-[#1e2434] text-text-secondary shadow-clay-input">
                                        v{app.version}
                                    </span>
                                </div>
                                <h3 className="text-text-primary font-extrabold text-xl mb-2 group-hover:text-accent-green transition-colors">{app.name}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow font-medium">{app.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3 mb-6 bg-[#E9EFF7] dark:bg-[#1e2434] p-4 rounded-[20px] shadow-clay-input">
                                    {[
                                        { label: 'Size', value: app.fileSize },
                                        { label: 'Downs', value: ((app.downloadCount || 0).toLocaleString()) },
                                        {
                                            label: 'Released',
                                            value: app.releaseDate?.toDate ? app.releaseDate.toDate().toLocaleDateString() : 'New'
                                        },
                                    ].map((stat) => (
                                        <div key={stat.label} className="text-center">
                                            <p className="text-text-primary text-sm font-bold">{stat.value}</p>
                                            <p className="text-text-muted text-[10px] uppercase tracking-wider font-bold mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* QR + Download */}
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="p-3 bg-white rounded-2xl shadow-clay-floating flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                        <QRCodeSVG
                                            value={app.downloadUrl}
                                            size={60}
                                            bgColor="#ffffff"
                                            fgColor="#172033"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <motion.button
                                            onClick={() => handleDownload(app)}
                                            className="w-full py-3 clay-btn-primary gap-2 text-sm"
                                        >
                                            Download <Download className="w-4 h-4" />
                                        </motion.button>
                                        <p className="text-text-muted text-[10px] text-center font-bold uppercase tracking-wider">Scan or Click</p>
                                    </div>
                                </div>
                            </motion.div>
                        )))}
                </div>
            </div>
        </section>
    );
}
