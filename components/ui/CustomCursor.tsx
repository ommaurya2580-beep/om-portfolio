'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
        };

        const animate = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
            requestAnimationFrame(animate);
        };

        const onMouseEnterLink = () => {
            cursor.style.transform += ' scale(2)';
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.borderColor = 'rgba(191, 0, 255, 0.8)';
        };

        const onMouseLeaveLink = () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.borderColor = 'rgba(0, 245, 255, 0.5)';
        };

        document.addEventListener('mousemove', onMouseMove);
        animate();

        const links = document.querySelectorAll('a, button, [role="button"]');
        links.forEach((link) => {
            link.addEventListener('mouseenter', onMouseEnterLink);
            link.addEventListener('mouseleave', onMouseLeaveLink);
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#00f5ff] z-[9999] pointer-events-none mix-blend-screen hidden md:block"
                style={{ boxShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff' }}
            />
            {/* Follower ring */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[rgba(0,245,255,0.5)] z-[9998] pointer-events-none hidden md:block transition-all duration-300"
                style={{ boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)' }}
            />
        </>
    );
}
