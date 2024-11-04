import { cookies } from "next/headers";
import Houses from "./authenticated/Houses";
import Welcome from "./unauthenticated/Welcome";

const getData = async () => {
	const cookieStore = await cookies();
	const tokenData = cookieStore.get("token");

	if (tokenData) {
		const token = JSON.parse(tokenData.value);
		console.log(token);

		const res = await fetch(
			"http://127.0.0.1:8000/api/v1/profile/owner/location/",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token.access}`,
					"Content-Type": "application/json",
				},
				next: { revalidate: 1000 },
			}
		);

		if (!res.ok) {
			throw new Error("Something went wrong while fetching house data");
		}
		const response = await res.json();
		return response;
	}
};
const Home = async () => {
	const cookieStore = await cookies();
	const user = cookieStore.get("token");
	const userType = cookieStore.get("userType");
	if (userType) {
		if (userType.value === "owner") {
			const data = await getData();
			console.log(data);
			return user ? (
				<Houses userlocation={data.data.location} />
			) : (
				<Welcome />
			);
		}
	}
	return user ? <Houses /> : <Welcome />;
};

export default Home;
