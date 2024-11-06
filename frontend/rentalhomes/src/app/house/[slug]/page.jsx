import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ImageGallery from "./_components/ImageGallery";
import Connect from "./_components/Connect";
import { IoStar } from "react-icons/io5";

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

const house = async ({ params }) => {
	const data = await getData(params.slug);
	const house = data.data;
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
					<div className="flex items-center justify-between max-5xl:flex-col max-5xl:gap-8">
						<div className="w-7/12 flex flex-col gap-5 max-5xl:w-full">
							<div>
								<h5 className="text-2xl font-semibold capitalize">
									{house.sub_title} in {house.location_city}
									,india
								</h5>
								<span className="text-[#494949] capitalize text-lg pl-1">
									{house.special_about_place}
								</span>
								<div className="flex items-center gap-1 pl-1">
									<div className="flex items-baseline gap-1">
										<IoStar />
										<span className="text-lg font-semibold">
											4.5
										</span>
									</div>
									<span>&</span>
									<span className="font-semibold text-lg ">
										56 reviews
									</span>
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
						<div className="w-1/3 max-5xl:w-full">
							<div className="rounded-xl p-6 border border-[#dddddd] flex flex-col gap-6">
								<h5 className="text-2xl font-semibold">
									&#8377;{house.rent_amount}
								</h5>
								<ul className="border grid grid-cols-2 max-md:grid-cols-1 border-black rounded-lg">
									<li className="md:border-r max-md:border-b p-3">
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
								<div className="flex flex-col gap-6 max-5xl:flex-row max-5xl:items-end max-3xl:flex-col">
									<div className="p-6 flex flex-col gap-1 rounded-lg shadow-md border max-5xl:w-[50%] max-3xl:w-full">
										<div className="flex items-center mb-2 max-md:flex-col">
											<h5 className="font-semibold text-base capitalize mr-2">
												Phone Number:
											</h5>
											<Link
												href={`tel:${house.phone_number}`}
												className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
												{house.phone_number}
											</Link>
										</div>
										<div className="flex items-center max-md:flex-col">
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
					</div>
				</section>
			</section>
		</section>
	);
};

export default house;
