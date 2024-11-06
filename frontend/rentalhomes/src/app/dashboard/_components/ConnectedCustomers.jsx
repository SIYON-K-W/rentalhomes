"use client";
import { useHouseContext } from "@/context/HouseContext";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

const ConnectedCustomers = () => {
	const [customers, setCustomers] = useState([]);
	const { selectedHouseId, clearHouseId } = useHouseContext();

	const hideOverlay = () => {
		clearHouseId();
		document.body.classList.remove("no-scroll");
	};

	useEffect(() => {
		if (selectedHouseId) {
			const tokenString = Cookies.get("token");
			const fetchData = async () => {
				try {
					if (tokenString) {
						const token = JSON.parse(tokenString);
						const res = await fetch(
							`http://127.0.0.1:8000/api/v1/profile/owner/${selectedHouseId}/connected-customers/`,
							{
								headers: {
									Authorization: `Bearer ${token.access}`,
								},
							}
						);

						if (!res.ok) {
							const errordata = await res.json();
							return;
						}
						const data = await res.json();
						setCustomers(data.data);
					}
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
		}
	}, [selectedHouseId]);
	return (
		<>
			{selectedHouseId && (
				<>
					<div
						className="background-overlay"
						onClick={hideOverlay}></div>
					<div
						className={`absolute animate-opa bg-white h-[79vh] z-20 top-[25px] left-[22%] w-[65%] max-3xl:h-[68vh] max-3xl:w-full max-3xl:left-0 py-6 flex-col gap-3 border-black border rounded-lg overflow-hidden flex max-md:py-6 px-4`}>
						<div className="flex items-end justify-end pr-3">
							<IoCloseSharp
								className="text-2xl cursor-pointer"
								onClick={hideOverlay}
							/>
						</div>
						<h4 className="font-bold text-xl text-center mb-2">
							Connected Customers
						</h4>
						{customers.length <= 0 ? (
							<div className="w-full h-full flex items-center justify-center text-center flex-1">
								<p className="text-lg text-red-500">
									no customers connected
								</p>
							</div>
						) : (
							<ul
								className={`grid grid-cols-2 max-5xl:grid-cols-1 h-full w-full gap-3 overflow-x-auto scroll-container`}>
								{customers.map((customer) => (
									<li
										className="border rounded-lg p-4 h-fit max-md:p-3 shadow-lg"
										key={customer.customer_id}>
										<div className="flex flex-col gap-4 max-md:gap-2">
											<div className="flex items-center gap-4 max-md:flex-col">
												<div className="relative w-12 h-12">
													<Image
														src={`${
															customer.profile_image ||
															"/assets/images/nonprofile.jpg"
														}`}
														fill={true}
														className="object-cover rounded-full"
														alt="profile image"
													/>
												</div>
												<h3 className="capitalize font-semibold text-lg">
													{customer.first_name}{" "}
													{customer.last_name}
												</h3>
											</div>
											<div className="flex flex-col gap-3">
												<div className="flex flex-col gap-1">
													<div className="flex gap-1 max-md:flex-col items-center">
														<h5 className="font-semibold">
															Connected at{" "}
															<span className="max-md:hidden">
																:
															</span>
														</h5>
														<div className="flex gap-1">
															<span>
																{
																	customer.connected_date
																}
															</span>
															<span>,</span>
															<span>
																{
																	customer.connected_time
																}
															</span>
														</div>
													</div>
													<div className="flex gap-1 max-md:flex-col items-center">
														<h5 className="font-semibold capitalize">
															email ID{" "}
															<span className="max-md:hidden">
																:
															</span>
														</h5>
														<Link
															href={`mailto:${customer.email}`}
															className="text-blue-600">
															{customer.email}
														</Link>
													</div>
													<div className="flex gap-1 max-md:flex-col items-center">
														<h5 className="font-semibold">
															phone number{" "}
															<span className="max-md:hidden">
																:
															</span>
														</h5>
														<Link
															href={`tel:${customer.email}`}
															className="text-blue-600">
															1234567890123
														</Link>
													</div>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default ConnectedCustomers;
