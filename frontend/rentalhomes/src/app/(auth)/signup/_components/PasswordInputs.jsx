import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const PasswordInputs = ({ handleInputChange, password, confirmPassword }) => {
	const [showpassword, setShowpassword] = useState(false);
	const [showconfirmPassword, setShowConfirmPassword] = useState(false);
	return (
		<>
			<div className="relative">
				<input
					type={`${showpassword ? "text" : "password"}`}
					name="password"
					placeholder="Password"
					className="w-full p-2 mb-4 border border-gray-300 rounded"
					value={password}
					onChange={handleInputChange}
					required
				/>
				<div
					className="absolute top-[38%] -translate-y-2/4 right-[3%] cursor-pointer"
					onClick={() => {
						setShowpassword(!showpassword);
					}}>
					{showpassword ? <FiEye /> : <FiEyeOff />}
				</div>
			</div>
			<div className="relative">
				<input
					type={`${showconfirmPassword ? "text" : "password"}`}
					name="confirmPassword"
					placeholder="Confirm Password"
					className="w-full p-2 mb-4 border border-gray-300 rounded"
					value={confirmPassword}
					onChange={handleInputChange}
					required
				/>
				<div
					className="absolute top-[35%] -translate-y-2/4 right-[3%] cursor-pointer"
					onClick={() => {
						setShowConfirmPassword(!showconfirmPassword);
					}}>
					{showconfirmPassword ? <FiEye /> : <FiEyeOff />}
				</div>
			</div>
		</>
	);
};

export default PasswordInputs;
