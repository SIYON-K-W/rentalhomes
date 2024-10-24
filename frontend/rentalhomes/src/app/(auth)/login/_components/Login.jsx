"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookie from "js-cookie";

const Login = () => {
	const [username, SetUsername] = useState("");
	const [password, SetPassword] = useState("");
	const [message, SetMessage] = useState("");

	const router = useRouter();
	const handlesubmit = async (e) => {
		e.preventDefault();
		SetMessage("");
		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/auth/login/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username,
						password,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				if (errorData.error) {
					SetMessage(errorData.message || "Invalid credentials");
				}
			}
			if (response.ok) {
				const data = await response.json();
				Cookie.set("token", JSON.stringify(data.data), {
					expires: 7,
					secure: true,
					sameSite: "Lax",
					path: "/",
				});

				Cookie.set("userType", data.user_type, {
					expires: 7,
					secure: true,
					sameSite: "Lax",
					path: "/",
				});
				// console.log(data);
				// console.log(data.data);
				// console.log(data.user_type);
				router.push("/");
			}
		} catch (error) {
			if (error.error) {
				SetMessage(error.message);
			}
		}
	};
	return (
		<div className="h-screen bg-gray-100">
			<div className="wrapper h-full">
				<div className="flex items-center justify-center h-full">
					<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
						<h2 className="text-2xl font-bold text-center text-gray-800">
							Login
						</h2>
						<form className="space-y-4" onSubmit={handlesubmit}>
							<div>
								<label
									className="block text-base font-medium text-gray-700"
									htmlFor="username">
									Username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									required
									className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
									placeholder="Enter your username"
									onChange={(e) =>
										SetUsername(e.target.value)
									}
									value={username}
								/>
							</div>
							<div>
								<label
									className="block text-base font-medium text-gray-700"
									htmlFor="password">
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									required
									className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
									placeholder="Enter your password"
									value={password}
									onChange={(e) =>
										SetPassword(e.target.value)
									}
								/>
							</div>
							<p className="text-center text-[#ff0000]">
								{message}
							</p>
							<button
								type="submit"
								className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
								Login
							</button>
						</form>
						<p className="text-sm text-center text-gray-600">
							Don't have an account?{" "}
							<a
								href="/signup"
								className="text-blue-600 hover:underline">
								Register
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
