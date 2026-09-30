import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-manrope)', 'sans-serif'],
                mono: ['var(--font-jetbrains)', 'monospace'],
            },
            colors: {
                clay: {
                    bg: 'var(--clay-bg)',
                    surface: 'var(--clay-surface)',
                    shadow: 'var(--clay-shadow)',
                    highlight: 'var(--clay-highlight)',
                },
                accent: {
                    blue: 'var(--blue)',
                    cyan: 'var(--cyan)',
                    purple: 'var(--purple)',
                    green: 'var(--green)',
                    pink: 'var(--pink)',
                    orange: 'var(--orange)',
                    yellow: 'var(--yellow)',
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                    muted: 'var(--text-muted)',
                },
                dark: {
                    900: '#1a1f2c',
                    800: '#22283a',
                    700: '#333b4f',
                },
            },
            boxShadow: {
                'clay-card': '12px 16px 30px rgba(148,163,184,0.28), -8px -8px 20px rgba(255,255,255,0.85), inset 0 2px 0 rgba(255,255,255,0.75)',
                'clay-card-dark': '12px 16px 30px rgba(0,0,0,0.4), -8px -8px 20px rgba(255,255,255,0.05), inset 0 2px 0 rgba(255,255,255,0.1)',
                'clay-btn': '4px 6px 15px rgba(148,163,184,0.3), -4px -4px 10px rgba(255,255,255,0.9), inset 0 2px 0 rgba(255,255,255,0.8)',
                'clay-input': 'inset 4px 5px 10px rgba(148,163,184,0.25), inset -4px -4px 10px rgba(255,255,255,0.85)',
                'clay-pill': '0 5px 12px rgba(148,163,184,0.25), inset 0 2px 0 rgba(255,255,255,0.9)',
                'clay-floating': '0 12px 30px rgba(148,163,184,0.25), 0 -4px 10px rgba(255,255,255,0.8), inset 0 2px 0 rgba(255,255,255,0.75)',
            },
            animation: {
                'float-subtle': 'floatSubtle 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                'float-slow': 'floatSubtle 8s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate',
            },
            keyframes: {
                floatSubtle: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(90deg, var(--cyan), var(--blue), var(--purple))',
                'gradient-active': 'linear-gradient(135deg, #FFFFFF, #E8EEF8)',
            },
        },
    },
    plugins: [],
};

export default config;
