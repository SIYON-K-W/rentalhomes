"use client";

import Cookies from "js-cookie";

const Connect = ({ isconnected, isowner, id }) => {
	const handleconnect = async (id) => {
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
				console.error("Failed to connect. Status:", res.status);
				return;
			}

			const data = await res.json();
			console.log("Connected successfully:", data);
		} catch (error) {
			console.error("Error during fetch:", error);
		}
	};

	return (
		<div>
			{isconnected ? (
				<></>
			) : (
				<button
					className="capitalize w-full py-[15px] bg-[#E41C58] text-white rounded-lg"
					onClick={() => handleconnect(id)}>
					connect
				</button>
			)}
		</div>
	);
};

export default Connect;
