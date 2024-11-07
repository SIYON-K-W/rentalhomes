import Image from "next/image";
import Link from "next/link";

const Customer = async ({ connected_houses }) => {
	return (
		<div className="w-4/5 flex flex-col gap-6 max-6xl:w-full">
			<h4 className="font-bold text-xl text-center">Connected Houses</h4>
			{connected_houses.length >= 1 ? (
				<ul className="grid grid-cols-3 gap-4 max-3xl:grid-cols-2 max-xl:grid-cols-1">
					{connected_houses.map((house) => (
						<li className="border rounded-lg" key={house.id}>
							<div className="w-full h-auto relative aspect-video">
								<Image
									alt="house image"
									src={house.featured_image}
									layout="fill"
									className="object-cover"
								/>
							</div>
							<div className="p-3">
								<div className="flex flex-col gap-1 w-full">
									<div className="">
										<h3 className="text-lg font-semibold capitalize">
											{house.location_city},india
										</h3>
										<p className="text-gray-500">
											For {house.lease_duration}
										</p>
									</div>
									<div className="flex items-start justify-between w-full">
										<h2 className="text-lg font-semibold capitalize">
											&#8377;{house.formatted_rent_amount}
										</h2>
										<Link
											href={`house/${house.id}`}
											className="py-3 px-4 bg-blue-500 rounded-full text-white">
											view house
										</Link>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className="h-[20vh] flex items-center justify-center">
					<p className="text-lg text-red-600">
						You haven’t connected with any houses yet.
					</p>
				</div>
			)}
		</div>
	);
};

export default Customer;
