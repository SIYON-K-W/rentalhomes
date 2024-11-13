"use client";

import { useAuth } from "@/context/Authcontext";
import Link from "next/link";
import { useEffect, useState } from "react";
import Links from "./Links";
import Location from "./Location";
import Bottomenu from "./BottoMenu";
import Logout from "./Logout";

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
				<div className="flex items-center gap-10">
					<div className="flex items-center gap-10 max-3xl:hidden">
						<Links />
					</div>
					<Bottomenu />
					{user && user.user_type === "owner" ? (
						<Location locations={locations.data} />
					) : (
						<Logout
							style={
								"px-[26px] py-[7px] text-white bg-black rounded-[10px]"
							}
						/>
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
							className="px-[26px] py-[7px] text-white bg-black rounded-[10px] capitalize">
							Register as Owner
						</Link>
						<Link
							href={{
								pathname: "/signup",
								query: { type: "customer" },
							}}
							className="px-[26px] py-[7px] text-black bg-transparent border rounded-[10px] capitalize">
							Register as Customer
						</Link>
					</div>
					<div className="3xl:hidden">
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
