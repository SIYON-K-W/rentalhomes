import Image from "next/image";
import Link from "next/link";

const Customer = async () => {
	return (
		<div className="w-4/5 flex flex-col gap-6">
			<h4 className="font-bold text-xl text-center">Connected Houses</h4>
			<ul className="grid grid-cols-3 gap-4">
				<li className="border rounded-lg">
					<div>
						<Image
							alt="huses image"
							src={"/t.jpg"}
							width={500}
							height={400}
						/>
					</div>
					<div className="p-4 flex items-end justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							{/* <span className="text-gray-500 capitalize">
							beaches and views
                            </span> */}
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<Link
							href={"/"}
							className="py-3 px-4 bg-blue-500 rounded-full text-white">
							view house
						</Link>
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
					<div className="p-4 flex items-end justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							{/* <span className="text-gray-500 capitalize">
							beaches and views
                            </span> */}
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<Link
							href={"/"}
							className="py-3 px-4 bg-blue-500 rounded-full text-white">
							view house
						</Link>
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
					<div className="p-4 flex items-end justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							{/* <span className="text-gray-500 capitalize">
							beaches and views
                            </span> */}
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<Link
							href={"/"}
							className="py-3 px-4 bg-blue-500 rounded-full text-white">
							view house
						</Link>
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
					<div className="p-4 flex items-end justify-between">
						<div>
							<h3 className="text-lg font-semibold capitalize">
								thrissur,india
							</h3>
							{/* <span className="text-gray-500 capitalize">
							beaches and views
                            </span> */}
							<p className="text-gray-500">For 16 days</p>
							<h2 className="text-lg font-semibold capitalize">
								&#8377;15,555
							</h2>
						</div>
						<Link
							href={"/"}
							className="py-3 px-4 bg-blue-500 rounded-full text-white">
							view house
						</Link>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Customer;
