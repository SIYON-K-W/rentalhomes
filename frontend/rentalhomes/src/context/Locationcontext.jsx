"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
	const [location, setLocation] = useState(0);

	const updateLocation = (newLocation) => {
		setLocation(newLocation);
	};
	useEffect(() => {
		const tokenString = Cookies.get("token");
		const userType = Cookies.get("userType");
		if (userType === "owner") {
			const fetchData = async () => {
				try {
					if (tokenString) {
						const token = JSON.parse(tokenString);
						const res = await fetch(
							"http://127.0.0.1:8000/api/v1/profile/owner/location/",
							{
								headers: {
									Authorization: `Bearer ${token.access}`,
								},
							}
						);

						if (!res.ok) {
							const errordata = await res.json();
							console.log(errordata);
							return;
						}
						const data = await res.json();
						updateLocation(data.data.location);
					}
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
		} else {
			console.log("ites customer");
		}
	}, []);
	return (
		<LocationContext.Provider value={{ location, updateLocation }}>
			{children}
		</LocationContext.Provider>
	);
};

export const useLocation = () => {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error("useLocation must be used within a LocationProvider");
	}
	return context;
};
