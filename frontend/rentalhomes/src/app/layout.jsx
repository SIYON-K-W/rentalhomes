import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/Authcontext";
import Navbar from "@/Components/general/navbar/Navbar";
import { LocationProvider } from "@/context/Locationcontext";
import Footer from "@/Components/general/footer/Footer";
import { HouseProvider } from "@/context/HouseContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "@/Components/general/messagingapp/Message";

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
	title: "Rentalhomes",
	description: "Rentalhomes",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="/assets/logo/logo.png"
					type="image/png"
					sizes="500x500"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ToastContainer autoClose={1500} className="toast-position" />
				<AuthProvider>
					<LocationProvider>
						<HouseProvider>
							<Navbar />
							<div className="pt-[65px]">{children}</div>
							<Message />
							<Footer />
						</HouseProvider>
					</LocationProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
