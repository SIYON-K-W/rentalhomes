import Welcome from "./unauthenticated/Welcome";

const Home = () => {
	const auth = false;
	return auth ? <h1>donw</h1> : <Welcome />;
};

export default Home;
