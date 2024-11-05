import Image from "next/image";
import Link from "next/link";
import ConnectingButton from "./ConnectingButton";

const Owner = async ({ owned_houses }) => {
	return (
		<div className="w-4/5 flex flex-col gap-6 max-6xl:w-full">
			<h4 className="font-bold text-xl text-center">Owned Houses</h4>
			<ul className="grid grid-cols-3 gap-4 relative max-4xl:grid-cols-2 max-2xl:grid-cols-1">
				{owned_houses.map((house) => (
					<li className="border rounded-lg" key={house.id}>
						<div className="w-full h-auto relative aspect-video">
							<Image
								alt="house image"
								src={house.featured_image}
								layout="fill"
								className="object-cover"
							/>
						</div>
						<div className="p-4 flex justify-between">
							<div>
								<h3 className="text-lg font-semibold capitalize">
									{house.location_city},india
								</h3>
								<p className="text-gray-500">
									For {house.lease_duration}
								</p>
								<h2 className="text-lg font-semibold capitalize">
									&#8377;{house.rent_amount}
								</h2>
							</div>
							<div className="flex flex-col gap-3">
								<ConnectingButton id={house.id} />
								<Link
									href={`house/${house.id}`}
									className="py-2 px-3 bg-blue-500 rounded-lg text-white">
									view house
								</Link>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Owner;
