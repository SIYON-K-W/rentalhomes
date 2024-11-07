"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const router = useRouter();

	const handleLogin = (action) => {
		switch (action.type) {
			case "Login":
				const { token, user_type } = action.payload;
				Cookies.set("token", JSON.stringify(token), {
					expires: 7,
					secure: true,
					sameSite: "Lax",
					path: "/",
				});
				Cookies.set("userType", user_type, {
					expires: 7,
					secure: true,
					sameSite: "Lax",
					path: "/",
				});
				setUser(action.payload);
				if (user_type === "owner") {
					router.push("/dashboard");
				} else {
					router.push("/");
				}
				break;
			case "Logout":
				setUser(null);
				Cookies.remove("token");
				Cookies.remove("userType");
				router.push("/login");
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		const tokenString = Cookies.get("token");
		const userType = Cookies.get("userType");
		if (tokenString && userType) {
			const token = JSON.parse(tokenString);
			setUser({ token, user_type: userType });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, handleLogin }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
