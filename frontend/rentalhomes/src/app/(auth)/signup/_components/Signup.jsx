"use client";

import { useAuth } from "@/context/Authcontext";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SignupPage = ({ locations }) => {
	const [isOwner, setIsOwner] = useState(false);
	const [message, setMessage] = useState("");
	const [formData, setFormData] = useState({
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "", // Added confirm password field
		location: "", // Location field for owners
	});

	const [profileImage, setProfileImage] = useState(null);
	const [imagePreview, setImagePreview] = useState("");
	const { handleLogin } = useAuth();
	const SearchParams = useSearchParams();
	const name = SearchParams.get("type");

	useEffect(() => {
		if (name === "owner") {
			setIsOwner(true);
		} else {
			setIsOwner(false);
		}
	}, [name]);

	const changeQueryParam = (newName) => {
		const params = new URLSearchParams(window.location.search);

		if (newName) {
			params.set("type", newName); // Update query parameter
		} else {
			params.delete("type"); // Remove query parameter if newName is null
		}

		// Update the URL without reloading the page
		const newUrl = `${window.location.pathname}?${params.toString()}`;
		window.history.replaceState(null, "", newUrl);
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setProfileImage(file);
		}
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");

		// Validate password confirmation
		if (formData.password !== formData.confirmPassword) {
			setMessage("Passwords do not match.");
			return;
		}

		// Prepare FormData for submission
		const formDataToSubmit = new FormData();
		formDataToSubmit.append("first_name", formData.firstName);
		formDataToSubmit.append("last_name", formData.lastName);
		formDataToSubmit.append("username", formData.username);
		formDataToSubmit.append("email", formData.email);
		formDataToSubmit.append("phone_number", formData.phoneNumber);
		formDataToSubmit.append("password", formData.password);
		formDataToSubmit.append("password2", formData.confirmPassword);
		formDataToSubmit.append("user_type", isOwner ? "owner" : "customer");

		// Append location if the user is an owner
		if (isOwner) {
			formDataToSubmit.append("location", formData.location);
		}

		// Append profile image if it exists
		if (profileImage) {
			formDataToSubmit.append("profile_image", profileImage); // Append the file object
		}

		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/auth/register/",
				{
					method: "POST",
					body: formDataToSubmit, // Send FormData
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.log(errorData);

				const errors = errorData.message || {};
				const firstErrorKey = Object.keys(errors)[0];
				const firstErrorMessage = Array.isArray(errors[firstErrorKey])
					? errors[firstErrorKey][0]
					: errors[firstErrorKey];

				setMessage(firstErrorMessage || "Signup failed.");
				return;
			}
			const res = await response.json();
			const data = {
				token: res.data,
				user_type: res.user_type,
			};

			handleLogin({ type: "Login", payload: data });
		} catch (error) {
			console.error("Error:", error);
			alert("An unexpected error occurred. Please try again later.");
		}
	};

	return (
		<div className="flex justify-center items-center ">
			<form
				className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md"
				onSubmit={handleSubmit}>
				<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
				<div className="flex justify-center mb-4">
					<button
						type="button"
						className={`w-1/2 py-2 text-lg font-semibold rounded-l-lg ${
							!isOwner
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-500"
						}`}
						onClick={() => {
							changeQueryParam("customer"), setIsOwner(false);
						}}>
						Customer
					</button>
					<button
						type="button"
						className={`w-1/2 py-2 text-lg font-semibold rounded-r-lg ${
							isOwner
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-500"
						}`}
						onClick={() => {
							changeQueryParam("owner"), setIsOwner(true);
						}}>
						Owner
					</button>
				</div>
				<div className="flex items-center mb-6">
					<div className="relative mr-3">
						<label
							htmlFor="image-upload"
							className="cursor-pointer relative">
							<div className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4 relative">
								<Image
									src={
										imagePreview ||
										"/assets/images/nonprofile.jpg"
									}
									className="w-full h-full rounded-full object-cover"
									fill
									alt="Profile"
								/>
							</div>
							<input
								type="file"
								accept="image/*"
								id="image-upload"
								className="absolute bottom-0 right-0 opacity-0 cursor-pointer"
								onChange={handleImageChange}
							/>
							<div className="absolute bg-blue-500 text-white w-fit h-fit py-[2px] px-[11px] rounded-full text-xl bottom-1 right-[10px]">
								&#x2b;
							</div>
						</label>
					</div>

					<div className="flex flex-col flex-1">
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							className="w-full p-2 mb-2 border border-gray-300 rounded"
							value={formData.firstName}
							onChange={handleInputChange}
							required
						/>
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							className="w-full p-2 mb-4 border border-gray-300 rounded"
							value={formData.lastName}
							onChange={handleInputChange}
							required
						/>
					</div>
				</div>
				<input
					type="text"
					name="username"
					placeholder="Username"
					className="w-full p-2 mb-4 border border-gray-300 rounded"
					value={formData.username}
					onChange={handleInputChange}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="w-full p-2 mb-4 border border-gray-300 rounded"
					value={formData.email}
					onChange={handleInputChange}
					required
				/>
				<div className="flex items-center mb-4 border-gray-300 rounded border">
					<span className="ml-1 mr-2 text-gray-600">+91</span>
					<input
						type="text"
						name="phoneNumber"
						placeholder="Phone Number"
						className="w-full p-2 border-gray-300 border-l"
						value={formData.phoneNumber}
						onChange={handleInputChange}
						required
					/>
				</div>
				{isOwner && (
					<select
						name="location"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						value={formData.location}
						onChange={handleInputChange}
						required>
						<option value="" disabled>
							Select your location
						</option>
						{locations?.map((location) => (
							<option key={location.id} value={location.id}>
								{location.name}
							</option>
						))}
					</select>
				)}
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="w-full p-2 mb-4 border border-gray-300 rounded"
					value={formData.password}
					onChange={handleInputChange}
					required
				/>
				<input
					type="password"
					name="confirmPassword" // New confirm password field
					placeholder="Confirm Password"
					className="w-full p-2 mb-4 border border-gray-300 rounded"
					value={formData.confirmPassword}
					onChange={handleInputChange}
					required
				/>

				<p className="text-center text-[#ff0000]">{message}</p>
				<button
					type="submit"
					className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupPage;