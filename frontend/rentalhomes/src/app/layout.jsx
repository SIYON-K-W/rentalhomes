import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/Authcontext";
import Navbar from "@/Components/general/navbar/Navbar";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AuthProvider>
					<Navbar />
					<div className="pt-[65px]">{children}</div>
				</AuthProvider>
			</body>
		</html>
	);
}