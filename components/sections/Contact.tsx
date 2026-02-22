'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/ommaurya2580-beep', color: '#00f5ff' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/om-maurya-1b9540362', color: '#0077b5' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Ommaurya07/', color: '#ffa116' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error('Please fill in all fields');
            return;
        }
        setSending(true);
        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                { from_name: form.name, from_email: form.email, message: form.message, to_name: 'Om Maurya' },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            toast.success('Message sent! I\'ll get back to you soon 🚀');
            setForm({ name: '', email: '', message: '' });
        } catch {
            toast.error('Failed to send. Please try again or email directly.');
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className="relative py-32 bg-[#060614]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#bf00ff]/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#00f5ff] font-mono text-sm mb-3">{'// 09. contact'}</p>
                    <h2 className="section-heading text-white">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {[
                                { key: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                            ].map((field) => (
                                <div key={field.key}>
                                    <label className="block text-sm text-slate-400 mb-2 font-mono">{field.label}</label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={form[field.key as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/50 focus:shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all duration-300"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2 font-mono">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/50 focus:shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all duration-300 resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={sending}
                                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-xl font-semibold text-[#020209] bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                {sending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="w-4 h-4 border-2 border-[#020209] border-t-transparent rounded-full inline-block"
                                        />
                                        Sending...
                                    </span>
                                ) : (
                                    'Send Message →'
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col justify-between"
                    >
                        <div className="glass rounded-2xl p-8 border border-white/5 mb-6">
                            <h3 className="text-white font-bold text-xl mb-2">Let's Build Something</h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                I'm currently open to internship opportunities, freelance projects, and collaborations.
                                Whether you have a question or just want to say hi, my inbox is always open!
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-400 text-sm">
                                    <span className="text-[#00f5ff]">📍</span>
                                    Delhi NCR, Uttar Pradesh, India
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 text-sm">
                                    <span className="text-[#00ff88]">✅</span>
                                    Available for opportunities
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="glass rounded-2xl p-6 border border-white/5">
                            <p className="text-slate-500 text-sm font-mono mb-4">// connect with me</p>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -4 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex-1 py-3 rounded-xl glass border border-white/10 text-center text-sm text-slate-400 hover:text-white transition-all duration-300"
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = social.color;
                                            (e.currentTarget as HTMLElement).style.color = social.color;
                                            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${social.color}30`;
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = '';
                                            (e.currentTarget as HTMLElement).style.color = '';
                                            (e.currentTarget as HTMLElement).style.boxShadow = '';
                                        }}
                                    >
                                        {social.label}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
