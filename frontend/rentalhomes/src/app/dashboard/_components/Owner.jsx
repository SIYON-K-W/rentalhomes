import Image from "next/image";
import Link from "next/link";
import ConnectedCustomers from "./ConnectedCustomers";

const Owner = async () => {
	return (
		<div className="w-4/5 flex flex-col gap-6">
			<h4 className="font-bold text-xl text-center">Owned Houses</h4>
			<ul className="grid grid-cols-3 gap-4 relative">
				<li className="border rounded-lg">
					<div>
						<Image
							alt="huses image"
							src={"/t.jpg"}
							width={500}
							height={400}
						/>
					</div>
					<div className="p-4 flex justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<div className="flex flex-col gap-3">
							<button className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								customers
							</button>
							<Link
								href={"/"}
								className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								view house
							</Link>
						</div>
					</div>
				</li>
				<li className="border rounded-lg">
					<div>
						<Image
							alt="huses image"
							src={"/t.jpg"}
							width={500}
							height={400}
						/>
					</div>
					<div className="p-4 flex justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<div className="flex flex-col gap-3">
							<button className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								customers
							</button>
							<Link
								href={"/"}
								className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								view house
							</Link>
						</div>
					</div>
				</li>{" "}
				<li className="border rounded-lg">
					<div>
						<Image
							alt="huses image"
							src={"/t.jpg"}
							width={500}
							height={400}
						/>
					</div>
					<div className="p-4 flex justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<div className="flex flex-col gap-3">
							<button className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								customers
							</button>
							<Link
								href={"/"}
								className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								view house
							</Link>
						</div>
					</div>
				</li>{" "}
				<li className="border rounded-lg">
					<div>
						<Image
							alt="huses image"
							src={"/t.jpg"}
							width={500}
							height={400}
						/>
					</div>
					<div className="p-4 flex justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<div className="flex flex-col gap-3">
							<button className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								customers
							</button>
							<Link
								href={"/"}
								className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								view house
							</Link>
						</div>
					</div>
				</li>{" "}
				<li className="border rounded-lg">
					<div>
						<Image
							alt="huses image"
							src={"/t.jpg"}
							width={500}
							height={400}
						/>
					</div>
					<div className="p-4 flex justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<div className="flex flex-col gap-3">
							<button className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								customers
							</button>
							<Link
								href={"/"}
								className="py-2 px-3 bg-blue-500 rounded-lg text-white">
								view house
							</Link>
						</div>
					</div>
				</li>
				<ConnectedCustomers />
			</ul>
		</div>
	);
};

export default Owner;
