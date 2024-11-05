import { cookies } from "next/headers";
import Houses from "./authenticated/Houses";
import Welcome from "./unauthenticated/Welcome";

const Home = async () => {
	const cookieStore = await cookies();
	const user = cookieStore.get("token");
	return user ? <Houses /> : <Welcome />;
};

export default Home;
