/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				wiggle: {
					from: { transform: "translateY(85%)", opacity: "0" },
					to: { transform: "translateY(0%)", opacity: "1" },
				},
				opa: {
					from: { transform: "scale(0)", opacity: "0.5" },
					to: {
						transform: "scale(1)",
						opacity: "1",
					},
				},
			},
			animation: {
				wiggle: "wiggle 0.4s ease-in-out",
				opa: "opa 0.3s linear",
			},
		},
		screens: {
			sm: "330px",
			md: "361px",
			lg: "481px",
			xl: "541px",
			"2xl": "641px",
			"3xl": "769px",
			"4xl": "981px",
			"5xl": "1081px",
			"6xl": "1281px",
		},
	},
	plugins: [],
};
