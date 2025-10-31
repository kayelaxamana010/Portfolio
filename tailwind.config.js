/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class', // Enable dark mode with class strategy
	theme: {
		extend: {
			backdropBlur: {
				sm: '4px',
			},
			colors: {
				// Light theme colors
				'light-bg': '#ffffff',
				'light-bg-secondary': '#f8f9fa',
				'light-text': '#1a202c',
				'light-text-secondary': '#718096',
				'light-accent': '#667eea',
				'light-accent-secondary': '#764ba2',
				
				// Dark theme colors
				'dark-bg': '#0f172a',
				'dark-bg-secondary': '#1e293b',
				'dark-text': '#f1f5f9',
				'dark-text-secondary': '#cbd5e1',
				'dark-accent': '#818cf8',
				'dark-accent-secondary': '#a78bfa',
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			boxShadow: {
				'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
				'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.1)',
				'dark-soft': '0 2px 15px rgba(0, 0, 0, 0.3)',
				'dark-soft-lg': '0 10px 40px rgba(0, 0, 0, 0.5)',
			},
			borderRadius: {
				'xl': '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
			},
		},
	},
	plugins: [],
}
