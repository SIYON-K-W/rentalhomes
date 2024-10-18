"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Reset error state

		const credentials = {
			username,
			password,
		};

		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/auth/login/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(credentials),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.data.message);
			}

			const data = await response.json();
			localStorage.setItem("token", data.data.token);
			router.push("/");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center">Login</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700">
							Username
						</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<button
						type="submit"
						className="w-full mt-6 bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
