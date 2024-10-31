"use client";

import { useAuth } from "@/context/Authcontext";
import Logout from "./Logout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Rightpart = () => {
	const [loaded, SetLoaded] = useState(false);
	const { user, handleLogin } = useAuth();
	useEffect(() => {
		SetLoaded(true);
	}, []);
	if (!loaded) {
		return <></>;
	}
	return (
		<>
			{user ? (
				<>
					<div className="flex items-center gap-4">
						<h2 className="capitalize font-semibold">
							siyon wilson
						</h2>
						<div className="relative w-11 h-11">
							<Image
								src={"/assets/spotlight/spotlight.jpg"}
								alt="userimage"
								className="object-cover rounded-full"
								fill={true}
							/>
						</div>
					</div>
					<Logout />
				</>
			) : (
				<>
					<Link
						href={{
							pathname: "/signup",
							query: { type: "owner" },
						}}
						className="px-[26px] py-[7px] text-white bg-black rounded-[10px]">
						Register as Owner
					</Link>
					<Link
						href={{
							pathname: "/signup",
							query: { type: "customer" },
						}}
						className="px-[26px] py-[7px] text-black bg-transparent border rounded-[10px]">
						Register as Customer
					</Link>
				</>
			)}
		</>
	);
};

export default Rightpart;
