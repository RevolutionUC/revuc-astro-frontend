/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		// Safe list the background classes used in the form notification
    'bg-red-400',
    'bg-green-400',
  ],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
				mono: ["Space Mono", ...defaultTheme.fontFamily.mono],
				exo2: ['Exo 2', ...defaultTheme.fontFamily.sans],
				poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
				quicksand: ['Quicksand', ...defaultTheme.fontFamily.sans],
				rajdhani: ['Rajdhani', ...defaultTheme.fontFamily.sans],
				robotoMono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
				openSans: ['Open Sans', ...defaultTheme.fontFamily.sans],
				nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
				pacifico: ['Pacifico', ...defaultTheme.fontFamily.sans],
				dmSerifDisplay: ['DM Serif Display', ...defaultTheme.fontFamily.serif],
				teko: ['Teko', ...defaultTheme.fontFamily.sans],
			},
			gridTemplateColumns: {
				'22': 'repeat(22, minmax(0, 1fr))',
			},
			colors: {
				'theme-teal': '#1BAFAF',
				'theme-dark-blue': '#20385E',
				'theme-coral': '#E48279',
				'theme-pastel-green': '#9DD9BD',
				'theme-cream': '#FDF9F6',
				'theme-light-teal': '#CAF1F1',
				'theme-light-coral': '#F8DBD8',
			},
		},
	},
	plugins: [],
}
