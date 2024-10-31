import { cookies } from "next/headers";
import Houses from "./authenticated/Houses";
import Welcome from "./unauthenticated/Welcome";

const Home = async () => {
	const cookieStore = await cookies();
	const data = cookieStore.get("token");
	return data ? <Houses /> : <Welcome />;
};

export default Home;
