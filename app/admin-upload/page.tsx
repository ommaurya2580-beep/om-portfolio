'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
// Removed addAppMetadata import as writes are now server-side only
import toast from 'react-hot-toast';

export default function AdminUploadPage() {
    const [adminKey, setAdminKey] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        version: '',
        description: '',
        fileSize: '',
        releaseDate: '',
    });
    const [apkFile, setApkFile] = useState<File | null>(null);
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

    const handleAuth = async () => {
        const res = await fetch('/api/admin/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey}` },
            body: JSON.stringify({ action: 'verify' }),
        });
        if (res.ok) {
            setAuthenticated(true);
            toast.success('Admin access granted');
        } else {
            toast.error('Invalid admin key');
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apkFile) { toast.error('Please select an APK file'); return; }
        if (!form.name || !form.version) { toast.error('Name and version are required'); return; }

        setLoading(true);
        try {
            // Upload APK
            const apkRef = storageRef(storage, `apks/${Date.now()}_${apkFile.name}`);
            await uploadBytes(apkRef, apkFile);
            const downloadUrl = await getDownloadURL(apkRef);

            // Upload screenshot if provided
            let screenshotUrl = '';
            if (screenshotFile) {
                const ssRef = storageRef(storage, `screenshots/${Date.now()}_${screenshotFile.name}`);
                await uploadBytes(ssRef, screenshotFile);
                screenshotUrl = await getDownloadURL(ssRef);
            }

            // Save metadata via Admin API
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminKey}`
                },
                body: JSON.stringify({
                    collection: 'apps',
                    name: form.name,
                    version: form.version,
                    description: form.description,
                    fileSize: form.fileSize || `${(apkFile.size / 1024 / 1024).toFixed(1)} MB`,
                    releaseDate: form.releaseDate || new Date().toISOString().split('T')[0],
                    downloadCount: 0,
                    downloadUrl,
                    screenshotUrl,
                }),
            });

            if (!response.ok) throw new Error('Failed to save metadata');

            toast.success('App uploaded successfully!');
            setForm({ name: '', version: '', description: '', fileSize: '', releaseDate: '' });
            setApkFile(null);
            setScreenshotFile(null);
        } catch (err) {
            toast.error('Upload failed. Check console.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020209] flex items-center justify-center p-8">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#00f5ff] flex items-center justify-center mx-auto mb-4"
                        style={{ boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)' }}>
                        <span className="text-2xl font-bold gradient-text font-mono">🔐</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Upload</h1>
                    <p className="text-slate-500 text-sm mt-1">Protected APK upload portal</p>
                </div>

                {!authenticated ? (
                    /* Auth gate */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-2xl p-8 border border-[#00f5ff]/20"
                    >
                        <label className="block text-sm text-slate-400 mb-2 font-mono">Admin Secret Key</label>
                        <input
                            type="password"
                            value={adminKey}
                            onChange={(e) => setAdminKey(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                            placeholder="Enter admin key..."
                            className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/50 transition-all mb-4"
                        />
                        <motion.button
                            onClick={handleAuth}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 rounded-xl font-semibold text-[#020209] bg-gradient-to-r from-[#00f5ff] to-[#bf00ff]"
                        >
                            Authenticate →
                        </motion.button>
                    </motion.div>
                ) : (
                    /* Upload form */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-2xl p-8 border border-[#00ff88]/20"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                            <span className="text-[#00ff88] text-sm font-mono">Admin Access Granted</span>
                        </div>
                        <form onSubmit={handleUpload} className="space-y-4">
                            {[
                                { key: 'name', label: 'App Name', placeholder: 'My Awesome App' },
                                { key: 'version', label: 'Version', placeholder: '1.0.0' },
                                { key: 'description', label: 'Description', placeholder: 'App description...' },
                                { key: 'fileSize', label: 'File Size (optional)', placeholder: 'Auto-detected' },
                                { key: 'releaseDate', label: 'Release Date (optional)', placeholder: '2025-01-01' },
                            ].map((field) => (
                                <div key={field.key}>
                                    <label className="block text-xs text-slate-400 mb-1 font-mono">{field.label}</label>
                                    <input
                                        type="text"
                                        placeholder={field.placeholder}
                                        value={form[field.key as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/50 transition-all text-sm"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-xs text-slate-400 mb-1 font-mono">APK File *</label>
                                <input
                                    type="file"
                                    accept=".apk"
                                    onChange={(e) => setApkFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#00f5ff]/10 file:text-[#00f5ff] hover:file:bg-[#00f5ff]/20 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-400 mb-1 font-mono">Screenshot (optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#bf00ff]/10 file:text-[#bf00ff] hover:file:bg-[#bf00ff]/20 transition-all"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-xl font-semibold text-[#020209] bg-gradient-to-r from-[#00ff88] to-[#00f5ff] disabled:opacity-50 mt-2"
                            >
                                {loading ? 'Uploading...' : '↑ Upload App'}
                            </motion.button>
                        </form>
                    </motion.div>
                )}

                <p className="text-center text-slate-600 text-xs mt-6">
                    <a href="/" className="hover:text-[#00f5ff] transition-colors">← Back to Portfolio</a>
                </p>
            </div>
        </div>
    );
}
