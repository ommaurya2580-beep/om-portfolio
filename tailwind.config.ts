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
                sans: ['var(--font-outfit)', 'sans-serif'],
                mono: ['var(--font-jetbrains)', 'monospace'],
            },
            colors: {
                neon: {
                    cyan: '#00f5ff',
                    purple: '#bf00ff',
                    green: '#00ff88',
                    pink: '#ff0080',
                },
                dark: {
                    900: '#020209',
                    800: '#060614',
                    700: '#0a0a1f',
                    600: '#0f0f2d',
                    500: '#151540',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
                'gradient-x': 'gradientX 4s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
                    '100%': { boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 80px #00f5ff' },
                },
                pulseNeon: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                gradientX: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(135deg, #020209 0%, #0a0a1f 50%, #060614 100%)',
            },
        },
    },
    plugins: [],
};

export default config;
