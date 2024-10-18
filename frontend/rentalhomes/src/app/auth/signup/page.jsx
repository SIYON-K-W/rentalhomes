"use client";

import { useState, useEffect } from "react";

const SignupPage = () => {
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [userType, setUserType] = useState("owner"); // Default user type
	const [location, setLocation] = useState("");
	const [locations, setLocations] = useState([]);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await fetch(
					"http://localhost:8000/api/v1/auth/locations/"
				); // Adjust the endpoint as needed
				const data = await response.json();
				if (response.ok) {
					console.log(data.data);
					setLocations(data.data); // Assuming data is an array of location objects
				} else {
					setError(data.message || "Failed to fetch locations.");
				}
			} catch (error) {
				setError("An error occurred while fetching locations.");
			}
		};

		fetchLocations();
	}, []);
	console.log("location:", locations);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Reset error state

		const payload = {
			username,
			first_name: firstName,
			last_name: lastName,
			email,
			phone_number: phoneNumber,
			password,
			password2,
			user_type: userType,
			location,
		};

		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/auth/register/",
				{
					// Adjust the endpoint as needed
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			const data = await response.json();

			if (response.ok) {
				setSuccess(true);
			} else {
				console.log(data.message);
				const errors = data.message || {};
				const firstErrorKey = Object.keys(errors)[0];
				const firstErrorMessage = Array.isArray(errors[firstErrorKey])
					? errors[firstErrorKey][0]
					: errors[firstErrorKey];

				setError(firstErrorMessage || "Signup failed.");
			}
		} catch (error) {
			setError("An error occurred during signup.");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">Sign Up</h1>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			{success && (
				<p className="text-green-500 mb-4">Signup successful!</p>
			)}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="username"
						className="block text-sm font-medium">
						Username
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="firstName"
						className="block text-sm font-medium">
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="lastName"
						className="block text-sm font-medium">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="phoneNumber"
						className="block text-sm font-medium">
						Phone Number
					</label>
					<input
						type="text"
						id="phoneNumber"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium">
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password2"
						className="block text-sm font-medium">
						Confirm Password
					</label>
					<input
						type="password"
						id="password2"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="userType"
						className="block text-sm font-medium">
						User Type
					</label>
					<select
						id="userType"
						value={userType}
						onChange={(e) => setUserType(e.target.value)}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
						<option value="owner">Owner</option>
						<option value="customer">Customer</option>
					</select>
				</div>
				<div className="mb-4">
					<label
						htmlFor="location"
						className="block text-sm font-medium">
						Location
					</label>
					<select
						id="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
						<option value="">Select your location</option>
						{locations.length >= 1 ? (
							locations.map((loc) => (
								<option key={loc.id} value={loc.id}>
									{loc.name}
								</option> // Assuming 'name' is a property of the location
							))
						) : (
							<></>
						)}
					</select>
				</div>
				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupPage;
