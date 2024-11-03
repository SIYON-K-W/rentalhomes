/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
		screens: {
			sm: "330px",
			md: "361px",
			lg: "481px",
			xl: "541px",
			"2xl": "641px",
			"3xl": "769px",
			"4xl": "981px",
			"5xl": "1081px",
		},
	},
	plugins: [],
};
