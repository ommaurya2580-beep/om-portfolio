'use client';

import { useEffect, useRef } from 'react';

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
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
            requestAnimationFrame(animate);
        };

        const onMouseEnterLink = () => {
            cursor.style.transform += ' scale(1.5)';
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.borderColor = 'var(--purple)';
            follower.style.backgroundColor = 'rgba(124, 58, 237, 0.05)';
        };

        const onMouseLeaveLink = () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.borderColor = 'var(--blue)';
            follower.style.backgroundColor = 'transparent';
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
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-accent-blue z-[9999] pointer-events-none hidden md:block"
                style={{ boxShadow: '0 4px 10px rgba(37,99,235,0.4)' }}
            />
            {/* Follower ring */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-accent-blue z-[9998] pointer-events-none hidden md:block transition-all duration-300 backdrop-blur-[2px]"
                style={{ boxShadow: '0 8px 20px rgba(37,99,235,0.2)' }}
            />
        </>
    );
}
