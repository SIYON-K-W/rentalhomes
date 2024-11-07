"use client";

import { useLocation } from "@/context/Locationcontext";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

const Houses = () => {
	const [houses, setHouses] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const { location } = useLocation();

	useEffect(() => {
		setError(null);
		const tokenString = Cookies.get("token");
		const fetchData = async () => {
			try {
				if (tokenString) {
					const token = JSON.parse(tokenString);

					const locationId = location;

					const res = await fetch(
						`http://127.0.0.1:8000/api/v1/houses?location_id=${locationId}`,
						{
							headers: {
								Authorization: `Bearer ${token.access}`,
							},
						}
					);

					if (!res.ok) {
						const errordata = await res.json();
						setError(errordata.message);
						return;
					}
					const data = await res.json();
					setHouses(data.data);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [location]);
	if (loading) {
		return (
			<section className="py-12">
				<section className="wrapper">
					{loading && (
						<div className="flex items-center justify-center min-h-[80vh]">
							<p className="text-2xl font-semibold">
								Loading....
							</p>
						</div>
					)}
				</section>
			</section>
		);
	}
	return (
		<section className="py-12">
			<section className="wrapper">
				{error ? (
					<div className="flex items-center justify-center min-h-[80vh]">
						<p className="text-red-500">{error}</p>
					</div>
				) : houses.length === 0 ? (
					<div className="flex items-center justify-center min-h-[80vh]">
						<p className="text-gray-500">No houses found.</p>
					</div>
				) : (
					<section className="max-2xl:grid-cols-1 grid max-4xl:grid-cols-2 grid-cols-3 gap-6 min-h-[80vh]">
						{houses.map((house) => (
							<div
								className="border rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-fit"
								key={house.id}>
								<Link href={`house/${house.id}`}>
									<div
										className="w-full h-auto relative"
										style={{ aspectRatio: "16/9" }}>
										<Image
											src={house.featured_image}
											alt="house image"
											layout="fill"
											objectFit="cover"
											className="object-cover"
										/>
									</div>

									<div className="p-4 flex items-start justify-between">
										<div>
											<h3 className="text-lg font-semibold capitalize">
												{house.location_city},india
											</h3>
											<span className="text-gray-500 capitalize">
												{house.special_about_place}
											</span>
											<p className="text-gray-500">
												For {house.lease_duration}
											</p>
											<h2 className="text-lg font-semibold capitalize">
												&#8377;
												{house.formatted_rent_amount}
											</h2>
										</div>
										<div className="flex items-baseline gap-1">
											<IoStar />
											<span className="text-lg">4.5</span>
										</div>
									</div>
								</Link>
							</div>
						))}
					</section>
				)}
			</section>
		</section>
	);
};

export default Houses;
