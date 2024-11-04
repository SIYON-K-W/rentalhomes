"use client";
import { useHouseContext } from "@/context/HouseContext";

const ConnectingButton = ({ id }) => {
	const { setHouseId } = useHouseContext();
	const showtab = (id) => {
		setHouseId(id);
		document.body.classList.add("no-scroll");
	};

	return (
		<button
			className="py-2 px-3 bg-blue-500 rounded-lg text-white"
			onClick={() => showtab(id)}>
			customers
		</button>
	);
};

export default ConnectingButton;
