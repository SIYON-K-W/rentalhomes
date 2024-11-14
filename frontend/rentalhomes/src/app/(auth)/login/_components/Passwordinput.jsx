import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Passwordinput = ({ SetPassword, password }) => {
	const [showpassword, setShowpassword] = useState(false);
	return (
		<div className="relative">
			<input
				type={`${showpassword ? "text" : "password"}`}
				id="password"
				name="password"
				required
				className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
				placeholder="Enter your password"
				value={password}
				onChange={(e) => SetPassword(e.target.value)}
			/>
			<div
				className="absolute bottom-1/2 translate-y-2/4 right-[3%] cursor-pointer"
				onClick={() => {
					setShowpassword(!showpassword);
				}}>
				{showpassword ? <FiEye /> : <FiEyeOff />}
			</div>
		</div>
	);
};

export default Passwordinput;
