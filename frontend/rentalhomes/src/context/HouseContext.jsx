"use client";
import React, { createContext, useContext, useState } from "react";

const HouseContext = createContext();

export const HouseProvider = ({ children }) => {
	const [selectedHouseId, setSelectedHouseId] = useState(null);

	const setHouseId = (houseId) => {
		setSelectedHouseId(houseId);
	};

	const clearHouseId = () => {
		setSelectedHouseId(null);
	};

	return (
		<HouseContext.Provider
			value={{
				selectedHouseId,
				setHouseId,
				clearHouseId,
			}}>
			{children}
		</HouseContext.Provider>
	);
};

export const useHouseContext = () => {
	return useContext(HouseContext);
};
