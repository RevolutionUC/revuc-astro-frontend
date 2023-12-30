/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Raleway', ...defaultTheme.fontFamily.sans],
				mono: ['"Space Mono"', ...defaultTheme.fontFamily.mono]
			},
			gridTemplateColumns: {
				'22': 'repeat(22, minmax(0, 1fr))',
			},
		},
	},
	plugins: [],
}
