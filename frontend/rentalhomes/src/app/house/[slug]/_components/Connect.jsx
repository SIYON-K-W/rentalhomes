"use client";

import Cookies from "js-cookie";
import { useState } from "react";

const Connect = ({ isconnected, isowner, id }) => {
	const [connected, setConnected] = useState(false);
	const [error, setError] = useState("");
	const handleconnect = async (id) => {
		setError("");
		console.log(id);

		const tokenstring = Cookies.get("token");
		if (!tokenstring) {
			console.error("No token found in cookies.");
			return;
		}

		let token;
		try {
			token = JSON.parse(tokenstring);
		} catch (e) {
			console.error("Failed to parse token.");
			return;
		}

		try {
			const res = await fetch(
				`http://127.0.0.1:8000/api/v1/house/connect/${id}/`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token.access}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (!res.ok) {
				const errordata = await res.json();
				console.log(errordata);
				setError(errordata.message);
				return;
			}

			const data = await res.json();
			setConnected(true);
			console.log("Connected successfully:", data);
		} catch (error) {
			console.error("Error during fetch:", error);
		}
	};

	return (
		<div className="flex flex-col gap-2 items-center">
			{isconnected || connected ? (
				<button className="capitalize w-full py-[15px] bg-[#f59fb9] text-white rounded-lg">
					connected
				</button>
			) : (
				<button
					className="capitalize w-full py-[15px] bg-[#E41C58] text-white rounded-lg"
					onClick={() => handleconnect(id)}>
					connect
				</button>
			)}
			{error && <p className="text-red-500 text-center">{error}</p>}
		</div>
	);
};

export default Connect;
