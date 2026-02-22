'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[9990] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #00f5ff, #bf00ff, #00ff88)',
                boxShadow: '0 0 10px rgba(0, 245, 255, 0.8)',
            }}
        />
    );
}
