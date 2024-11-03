"use client";

import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
	const [location, setLocation] = useState(0);

	const updateLocation = (newLocation) => {
		setLocation(newLocation);
	};

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
