import { cookies } from "next/headers";
import AddForm from "./_components/AddForm";
import NotOwner from "./_components/NotOwner";

const getData = async () => {
	const res = await fetch("http://localhost:8000/api/v1/auth/locations/", {
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
	const cookieStore = await cookies();
	const type = cookieStore.get("userType");
	return type.value === "owner" ? (
		<section className="py-6">
			<section className="wrapper">
				<div className="flex items-center justify-center">
					<div className="w-2/3">
						<h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
							Create a New House Listing
						</h1>
						<AddForm locations={locations.data} />
					</div>
				</div>
			</section>
		</section>
	) : (
		<NotOwner />
	);
};

export default page;
