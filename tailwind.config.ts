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
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                georgia: ['Georgia', 'serif'],
                inter: [
                    'var(--font-inter)',
                    'Inter',
                    'system-ui',
                    'sans-serif',
                ],
                'source-sans-pro': [
                    'var(--font-source-sans-pro)',
                    'Source Sans Pro',
                    'Source Sans 3',
                    'system-ui',
                    'sans-serif',
                ],
            },
            typography: {
                center: {
                    css: {
                        'text-align': 'center',
                        'max-width': '100%',
                        img: {
                            'margin-left': 'auto',
                            'margin-right': 'auto',
                        },
                        h1: {
                            'text-align': 'center',
                        },
                        h2: {
                            'text-align': 'center',
                        },
                        h3: {
                            'text-align': 'center',
                        },
                        h4: {
                            'text-align': 'center',
                        },
                        p: {
                            'text-align': 'center',
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};

export default config;
