import React from 'react';

// Tech Icons as simple SVGs to avoid heavy dependencies
export const ReactIcon = ({ className }: { className?: string }) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" className={className}>
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

export const NextJsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 180 180" fill="currentColor" className={className}>
        <mask id="mask0_408_134" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0_408_134)">
            <circle cx="90" cy="90" r="90" fill="black" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)" />
            <path d="M115.012 54H127.125V125.97H115.012V54Z" fill="url(#paint1_linear_408_134)" />
        </g>
        <defs>
            <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_408_134" x1="121.068" y1="54" x2="120.739" y2="106.875" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

export const JavascriptIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path fill="#F7DF1E" d="M1.5 1.5h21v21h-21z" />
        <path d="M11.69 17.58c-.3-.89-.92-1.2-1.95-1.2-1.12 0-1.78.5-1.78 1.4 0 .97.74 1.3 2.05 1.83l.53.22c1.7.72 2.67 1.63 2.67 3.2 0 2.1-1.63 3.32-3.77 3.32-2.3 0-3.66-1.32-4-3.1h2.52c.2.82.78 1.25 1.5 1.25.9 0 1.54-.43 1.54-1.26 0-.82-.57-1.16-1.8-1.7l-.53-.22c-1.84-.77-2.9-1.68-2.9-3.26 0-2 1.66-3.15 3.6-3.15 2.1 0 3.33 1 3.75 2.68h-2.43zm9.64 5.37c-.15 2.17-1.7 3.4-4.04 3.4-2.48 0-4-1.57-4-4.13V11.5h2.64v10.63c0 1.34.62 1.95 1.53 1.95 1.05 0 1.68-.66 1.68-2.12V11.5h2.64v11.45z" />
    </svg>
);

export const FirebaseIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3.708 19.167l6.096-18.775a.8.8 0 011.532.023l1.82 5.09-9.448 13.662z" fill="#FFC24A"/>
        <path d="M12.923 5.922l1.966-2.036a.8.8 0 011.36.425l2.42 14.856-5.746-13.245z" fill="#FFA000"/>
        <path d="M12.637 19.333l-8.929-6.398a.8.8 0 01.127-1.428l15.228-3.085-6.426 10.91z" fill="#F6820C"/>
    </svg>
);

export const PythonIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 110 110" fill="currentColor" className={className}>
        <path fill="#3776AB" d="M54.1.8c-26 0-25 11.2-25 11.2l.2 11.4h25.8v3.6H21c-14.8 0-15.3 14-15.3 14s-2 11.6-2 21.5c0 10 2.7 20 2.7 20s2 11 14.6 11h6.6v-15.5s0-13.3 13.5-13.3h22.2s11.5 0 11.5-11.2V32.3s.2-12-10.7-12H54.1zM42.4 9.1c2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8z"/>
        <path fill="#FFD43B" d="M55.1 109.2c26 0 25-11.2 25-11.2l-.2-11.4H54.2v-3.6H89c14.8 0 15.3-14 15.3-14s2-11.6 2-21.5c0-10-2.7-20-2.7-20s-2-11-14.6-11h-6.6v15.5s0 13.3-13.5 13.3H46.8s-11.5 0-11.5 11.2v21.2s-.2 12 10.7 12H55.1zM66.8 100.9c-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8 2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8z"/>
    </svg>
);

export const AWSIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className}>
        <path fill="#232F3E" d="M136.21 161.76c-13.16 0-23.78-8.15-23.78-20.73 0-11.62 9.07-20.08 23.44-20.08h15.93v-4.17c0-7.39-3.95-12.76-13.3-12.76-7.39 0-14.34 3.03-18.49 5.34l-3.32-9.4c5.15-3.04 14.22-5.46 24.31-5.46 17.51 0 25 9.77 25 25v30.5c0 5.4 1.25 10.28 2.97 12.33v.64h-13.31c-1.39-2.05-2.22-5.59-2.64-9.13l-.26.06c-3.6 5.86-10.32 7.86-16.55 7.86zm19.65-27.42v-5.27h-14.15c-6.86 0-10.87 3.28-10.87 8.56 0 5.15 3.96 8.5 10.42 8.5 7.39 0 13.43-5.22 14.6-11.79zM192.36 122.9l-11.19-32.96h14.77l5.47 19.31c.85 3.03 1.51 6.13 2.05 9.3h.27c.45-3.1 1.2-6.26 2.04-9.23l5.8-19.38h14.5l5.22 19.38c.78 3 1.5 6.13 1.97 9.23h.27c.52-3.17 1.31-6.27 2.15-9.3l5.54-19.31h13.91l-11.37 32.96c-4.43 12.75-9.84 19.46-17.7 19.46-5.86 0-10.33-4.24-12.91-10.04-2.58 5.8-7.32 10.04-12.92 10.04-7.85 0-13.44-6.71-17.88-19.46zM26.96 116.48c.19 12.56 7.6 19.8 17.9 19.8 8.1 0 13.2-3.87 16.5-7.91l6.78 8.86c-5.5 6.27-14 10.7-25.26 10.7-19.16 0-31.96-12.92-31.96-30.82 0-19 12.56-31.33 30.06-31.33 17 0 26.65 11.27 26.65 27 0 1.65-.2 2.92-.33 3.7h-40.34zm27-8.11c-.51-8.5-4.88-14.7-13.3-14.7-7.73 0-12.62 6.2-13.43 14.7H53.96z"/>
        <path fill="#FF9900" d="M141.44 194.51c-32.74 15.65-71.18 20.3-107.5 13.06-11.64-2.32-23.01-5.91-33.94-10.74l-.94-5.26c26.79 17.65 67.24 23.33 103.71 13.99 13.37-3.42 26.17-8.79 37.89-15.93l.78 4.88zm3.62-12.96c-1.32.75-6.52.82-7.5-.12-.99-.95.84-5.46 1.87-6.59l8.6-9.5c.95-.91 1.76-.87 2.37.1 1.09 1.73 4.29 8.78 4.54 10.05.25 1.28-1.57 1.6-2.6 1.15l-7.28-3.41c2.19 2.5 3.76 5.8 0 8.32z"/>
    </svg>
);
