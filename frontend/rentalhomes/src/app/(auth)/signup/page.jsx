import Signup from "./_components/Signup";

const getData = async () => {
	const res = await fetch("http://localhost:8000/api/v1/web/locations/", {
		next: { revalidate: 3600 },
	});

	if (!res.ok) {
		throw new Error("Something went wrong while fetching house data");
	}
	const response = await res.json();
	return response;
};

const page = async () => {
	const locations = await getData();
	console.log(locations);
	return (
		<div className="py-6 bg-gray-100">
			<div className="wrapper">
				<Signup locations={locations.data} />
			</div>
		</div>
	);
};

export default page;
