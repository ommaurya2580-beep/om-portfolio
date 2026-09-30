'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { MapPin, Briefcase, Send, Github, Linkedin, Code2 } from 'lucide-react';

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/ommaurya2580-beep', icon: <Github className="w-5 h-5" />, color: 'var(--blue)' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/om-maurya-1b9540362', icon: <Linkedin className="w-5 h-5" />, color: 'var(--cyan)' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Ommaurya07/', icon: <Code2 className="w-5 h-5" />, color: 'var(--orange)' },
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
            toast.success('Message sent! I\'ll get back to you soon 👍');
            setForm({ name: '', email: '', message: '' });
        } catch {
            toast.error('Failed to send. Please try again or email directly.');
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className="relative py-24 sm:py-32 bg-clay-bg">
            <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-accent-pink clay-blob" />
            <div className="absolute top-[20%] right-[10%] w-[250px] h-[250px] bg-accent-blue clay-blob" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-heading">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-xl mx-auto font-medium">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="clay-card p-8 sm:p-10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {[
                                { key: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                            ].map((field) => (
                                <div key={field.key}>
                                    <label className="block text-sm font-bold text-text-primary mb-2 pl-2">{field.label}</label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={form[field.key as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                        className="clay-input"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-bold text-text-primary mb-2 pl-2">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className="clay-input resize-none py-4"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={sending}
                                className="w-full py-4 clay-btn-primary gap-2 mt-4 text-base font-bold"
                            >
                                {sending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                                        />
                                        Sending...
                                    </span>
                                ) : (
                                    <>
                                        Send Message <Send className="w-4 h-4 ml-1" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="clay-card p-8 sm:p-10">
                            <h3 className="text-text-primary font-bold text-2xl mb-4">Let's Build Something</h3>
                            <p className="text-text-secondary leading-relaxed mb-8 font-medium">
                                I'm currently open to internship opportunities, freelance projects, and collaborations.
                                Whether you have a question or just want to say hi, my inbox is always open!
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-text-secondary font-medium">
                                    <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] dark:bg-[#0369a1] text-accent-blue shadow-clay-pill flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    Delhi NCR, Uttar Pradesh, India
                                </div>
                                <div className="flex items-center gap-4 text-text-secondary font-medium">
                                    <div className="w-10 h-10 rounded-xl bg-[#dcfce7] dark:bg-[#15803d] text-accent-green shadow-clay-pill flex items-center justify-center flex-shrink-0">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    Available for opportunities
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="clay-card p-8 sm:p-10">
                            <h3 className="text-text-primary font-bold text-lg mb-6 text-center">Connect With Me</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -2 }}
                                        className="flex-1 py-4 px-2 rounded-[20px] bg-[#E9EFF7] dark:bg-[#1e2434] shadow-clay-input hover:shadow-clay-pill text-center flex flex-col items-center justify-center gap-2 transition-all duration-300 group"
                                        style={{ '--hover-color': social.color } as React.CSSProperties}
                                    >
                                        <span className="text-text-secondary group-hover:text-[var(--hover-color)] transition-colors duration-300">
                                            {social.icon}
                                        </span>
                                        <span className="text-xs font-bold text-text-primary group-hover:text-[var(--hover-color)] transition-colors duration-300">
                                            {social.label}
                                        </span>
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
