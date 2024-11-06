import { cookies } from "next/headers";
import Dashboard from "./_components/Dashboard";

const getData = async (isowner) => {
	const cookieStore = await cookies();
	const tokenData = cookieStore.get("token");

	if (tokenData) {
		const token = JSON.parse(tokenData.value);
		const res = await fetch(
			`http://127.0.0.1:8000/api/v1/profile/${
				isowner ? "owner" : "customer"
			}/`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token.access}`,
					"Content-Type": "application/json",
				},
				cache: "no-store",
			}
		);

		if (!res.ok) {
			throw new Error("Something went wrong while fetching house data");
		}
		const response = await res.json();
		return response;
	}
};

const page = async () => {
	const cookieStore = await cookies();
	const usertype = cookieStore.get("userType");
	if (usertype.value === "owner") {
		const data = await getData(true);
		return <Dashboard isowner={true} data={data.data} />;
	} else {
		const data = await getData(false);
		return <Dashboard isowner={false} data={data.data} />;
	}
};

export default page;
