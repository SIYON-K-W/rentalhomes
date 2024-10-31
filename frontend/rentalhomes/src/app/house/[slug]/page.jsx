// "use client";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ImageGallery from "./_components/ImageGallery";
// import { useEffect, useState } from "react";

const getData = async () => {
	const cookieStore = await cookies();
	const tokenData = cookieStore.get("token");

	if (tokenData) {
		const token = JSON.parse(tokenData.value);
		console.log(token);

		const res = await fetch(
			`http://127.0.0.1:8000/api/v1/houses/house/${1}/`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token.access}`,
					"Content-Type": "application/json",
				},
				next: { revalidate: 3600 },
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

const house = async () => {
	// const [houseData, setHouseData] = useState(null);
	const houseData = await getData();
	const galleryimages = houseData.data;
	console.log(galleryimages);

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
					<h3 className="text-3xl font-bold">
						Riverdale Villa Kumarakom Room 2
					</h3>
					<div>
						<ImageGallery
							featuredImage={houseData.data.featured_image}
							galleryImages={houseData.data.gallery_images}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="w-7/12 flex flex-col gap-5">
							<div>
								<h5 className="text-2xl font-semibold">
									Room in Arpookara, India
								</h5>
								<span className="text-[#494949] capitalize text-lg pl-1">
									montain views
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
										src={"/t.jpg"}
										alt="owner image"
										fill={true}
										objectFit="cover"
										className="rounded-full"
									/>
								</div>
								<div>
									<h3 className="text-lg font-semibold">
										Hosted by Binoy
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
										<p>
											Along the paddy fields and swaying
											coconut palms, one of the streams of
											river Meenachil makes her silent
											journey to the back waters of
											Kumarakam. And there awaits one best
											kept secrets of the back water
											experience.... Riverdale Villa. A
											cosy home with two bed rooms, lot of
											sun and shine to soak into, and
											above all one gets initiated into
											curative village experience of the
											back waters.
										</p>
									</li>
									<li className="capitalize">pet friendly</li>
									<li className="capitalize">
										parking available
									</li>
								</ul>
							</div>
							<div className="bg-[#e5e7eb] h-[1px] w-full"></div>
							<div className="flex flex-col gap-1 pl-1">
								<h4 className="font-semibold text-lg capitalize">
									exact location
								</h4>
								<span>irinjalakuda</span>
							</div>
						</div>
						<div className="w-1/3">
							<div className="rounded-xl p-6 border border-[#dddddd] flex flex-col gap-6">
								<h5 className="text-2xl font-semibold">
									&#8377;4000
								</h5>
								<ul className="border grid grid-cols-2 border-black rounded-lg">
									<li className="border-r p-3">
										<h6 className="capitalize font-semibold">
											bedrooms
										</h6>
										<span>2 bedroom</span>
									</li>
									<li className="p-3">
										<h6 className="capitalize font-semibold">
											guests
										</h6>
										<span>2 guests</span>
									</li>{" "}
									<li className="border-t p-3 border-r">
										<h6 className="capitalize font-semibold">
											rent duration
										</h6>
										<span>365 days</span>
									</li>{" "}
									<li className="p-3 border-t">
										<h6 className="capitalize font-semibold">
											property type
										</h6>
										<span>villa</span>
									</li>
								</ul>
								<div className="p-6 flex flex-col gap-1 rounded-lg shadow-md border">
									<div className="flex items-center mb-2">
										<h5 className="font-semibold text-base capitalize mr-2">
											Phone Number:
										</h5>
										<Link
											href={"/"}
											className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
											+911234567896
										</Link>
									</div>
									<div className="flex items-center">
										<h5 className="font-semibold text-base capitalize mr-2">
											Email ID:
										</h5>
										<Link
											href={"/"}
											className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
											owner@example.com
										</Link>
									</div>
								</div>

								<button className="capitalize w-full py-[15px] bg-[#E41C58] text-white rounded-lg">
									connect
								</button>
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
