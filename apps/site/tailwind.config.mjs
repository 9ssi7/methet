/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundColor: {
				first: "#090909",
				second: "#121212"
			},
			borderColor: {
				DEFAULT: "#2a2a2a"
			}
		},
	},
	plugins: [],
}
