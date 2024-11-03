"use client";

import { useAuth } from "@/context/Authcontext";
import Link from "next/link";
import { useEffect, useState } from "react";
import Links from "./Links";
import Location from "./Location";

const Rightpart = ({ locations }) => {
	const [loaded, SetLoaded] = useState(false);
	const { user } = useAuth();
	useEffect(() => {
		SetLoaded(true);
	}, []);
	if (!loaded) {
		return <div></div>;
	}
	return (
		<>
			{user && user.token ? (
				<div className="flex items-center gap-7">
					{/* <Links /> */}
					{user && user.user_type === "owner" ? (
						<Location locations={locations.data} />
					) : (
						<></>
					)}
				</div>
			) : (
				<>
					<div className="flex items-center gap-4 max-3xl:hidden">
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
					</div>
					<div>
						<Link
							href={{
								pathname: "/signup",
								query: { type: "customer" },
							}}
							className="px-[30px] py-[8px] text-white bg-black rounded-lg">
							Register
						</Link>
					</div>
				</>
			)}
		</>
	);
};

export default Rightpart;
