// "use client";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ImageGallery from "./_components/ImageGallery";
import Connect from "./_components/Connect";
// import { useEffect, useState } from "react";

const getData = async (id) => {
	const cookieStore = await cookies();
	const tokenData = cookieStore.get("token");

	if (tokenData) {
		const token = JSON.parse(tokenData.value);
		console.log(token);

		const res = await fetch(
			`http://127.0.0.1:8000/api/v1/houses/house/${id}/`,
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

		// Parse the response JSON
		const response = await res.json();
		return response; // Return the parsed response
	}
};

const house = async ({ params }) => {
	console.log(params);

	// const [houseData, setHouseData] = useState(null);
	const data = await getData(params.slug);
	const house = data.data;
	console.log(data);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const response = await fetch(
	// 			`http://127.0.0.1:8000/api/v1/houses/house/${1}/`
	// 		);
	// 		const result = await response.json();
	// 		setHouseData(result.data);
	// 	};
	// 	fetchData();
	// }, []);
	// console.log(houseData);

	return (
		<section className="py-12">
			<section className="wrapper">
				<section className="flex flex-col gap-4">
					<h3 className="text-3xl font-bold">{house.title}</h3>
					<div>
						<ImageGallery
							featuredImage={house.featured_image}
							galleryImages={house.gallery_images}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="w-7/12 flex flex-col gap-5">
							<div>
								<h5 className="text-2xl font-semibold capitalize">
									{house.sub_title} in {house.location_city}
									,india
								</h5>
								<span className="text-[#494949] capitalize text-lg pl-1">
									{house.special_about_place}
								</span>
								<div className="font-semibold text-lg flex items-center gap-1 pl-1">
									<span>4.5</span>
									<span>&</span>
									<span>56 reviews</span>
								</div>
							</div>
							<div className="bg-[#e5e7eb] h-[1px] w-full"></div>
							<div className="flex items-center gap-4 pl-1">
								<div className="relative h-11 w-11">
									<Image
										src={
											house.owner_profile_image ||
											"/assets/images/nonprofile.jpg"
										}
										alt="owner image"
										fill={true}
										objectFit="cover"
										className="rounded-full"
									/>
								</div>
								<div>
									<h3 className="text-lg font-semibold">
										Hosted by {house.owner_first_name}{" "}
										{house.owner_last_name}
									</h3>
									<span>4 years hosting</span>
								</div>
							</div>
							<div className="bg-[#e5e7eb] h-[1px] w-full"></div>
							<div className="flex flex-col gap-2 pl-1">
								<h4 className="font-semibold text-lg capitalize">
									special about this place
								</h4>
								<ul className="flex flex-col gap-1 list-disc pl-6">
									<li>
										<p>{house.extra_features}</p>
									</li>
									{house.pet_friendly && (
										<li className="capitalize">
											pet friendly
										</li>
									)}
									{house.parking_available && (
										<li className="capitalize">
											parking available
										</li>
									)}
								</ul>
							</div>
							<div className="bg-[#e5e7eb] h-[1px] w-full"></div>
							<div className="flex flex-col gap-1 pl-1">
								<h4 className="font-semibold text-lg capitalize">
									exact location
								</h4>
								<h6>
									{house.exact_location},{house.location_city}
								</h6>
							</div>
						</div>
						<div className="w-1/3">
							<div className="rounded-xl p-6 border border-[#dddddd] flex flex-col gap-6">
								<h5 className="text-2xl font-semibold">
									&#8377;{house.rent_amount}
								</h5>
								<ul className="border grid grid-cols-2 border-black rounded-lg">
									<li className="border-r p-3">
										<h6 className="capitalize font-semibold">
											bedrooms
										</h6>
										<span>
											{house.number_of_bedrooms} bedroom
										</span>
									</li>
									<li className="p-3">
										<h6 className="capitalize font-semibold">
											guests
										</h6>
										<span>
											{house.number_of_guests} guests
										</span>
									</li>{" "}
									<li className="border-t p-3 border-r">
										<h6 className="capitalize font-semibold">
											rent duration
										</h6>
										<span>{house.lease_duration}</span>
									</li>{" "}
									<li className="p-3 border-t">
										<h6 className="capitalize font-semibold">
											property type
										</h6>
										<span>{house.property_type}</span>
									</li>
								</ul>
								<div className="p-6 flex flex-col gap-1 rounded-lg shadow-md border">
									<div className="flex items-center mb-2">
										<h5 className="font-semibold text-base capitalize mr-2">
											Phone Number:
										</h5>
										<Link
											href={`tel:${house.phone_number}`}
											className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
											{house.phone_number}
										</Link>
									</div>
									<div className="flex items-center">
										<h5 className="font-semibold text-base capitalize mr-2">
											Email ID:
										</h5>
										<Link
											href={`mailto:${house.contact_email}`}
											className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
											{house.contact_email}
										</Link>
									</div>
								</div>
								<Connect
									isconnected={house.is_connected}
									isowner={house.is_owner}
									id={house.id}
								/>
							</div>
						</div>
					</div>
				</section>
			</section>
		</section>
	);
};

export default house;
{
	/* <div className="bg-[#e5e7eb] h-[1px] w-full"></div>
							<div className="pb-3 flex flex-col gap-2">
								<h4 className="font-semibold text-lg capitalize">
									Contact details
								</h4>
								<div className="pl-2">
									<div>
										<h5 className="font-semibold text-base capitalize">
											phone number:
										</h5>
										<Link href={"/"} className="pl-2">
											+911234567896
										</Link>
									</div>
									<div>
										<h5 className="font-semibold text-base capitalize">
											email ID:
										</h5>
										<Link href={"/"} className="pl-2">
											owner@example.com
										</Link>
									</div>
								</div>
							</div> */
}
