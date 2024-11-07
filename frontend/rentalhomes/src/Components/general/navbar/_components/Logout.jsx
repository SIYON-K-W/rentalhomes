"use client";

import { useAuth } from "@/context/Authcontext";

import { toast } from "react-toastify";

const Logout = ({ style }) => {
	const { user, handleLogin } = useAuth();
	console.log(user);

	const handleLogout = async () => {
		if (user && user.token) {
			try {
				const response = await fetch(
					"http://127.0.0.1:8000/api/v1/auth/logout/",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${user.token.access}`,
						},
						body: JSON.stringify({ refresh: user.token.refresh }),
					}
				);

				const data = await response.json();

				if (response.ok) {
					handleLogin({ type: "Logout" });
					toast.success("Logout Succesfully done");
					console.log(data.message);
				} else {
					console.error(data.message);
				}
			} catch (error) {
				console.error("Logout error:", error);
			}
		}
	};
	return (
		<button onClick={handleLogout} className={`${style}`}>
			Logout
		</button>
	);
};

export default Logout;
