import Image from "next/image";
import Link from "next/link";

const ConnectedCustomers = async () => {
	return (
		<div className="absolute bg-white h-4/5 top-0 left-36 w-3/4 p-8 flex flex-col gap-3 border-black border rounded-lg">
			<h4 className="font-bold text-xl text-center">
				Connected Customers
			</h4>
			<ul className="grid grid-cols-2 h-full w-full overflow-x-auto gap-3">
				<li className="border rounded-lg p-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<div className="relative w-12 h-12">
								<Image
									src={"/t.jpg"}
									fill={true}
									className="object-cover rounded-full"
									alt="profile image"
								/>
							</div>
							<h3 className="capitalize font-semibold text-lg">
								siyon wilson
							</h3>
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-1">
								<div className="flex gap-1">
									<h5 className="font-semibold">
										Connected at :
									</h5>
									<div className="flex gap-1">
										<span>12/12/2024</span>
										<span>,</span>
										<span>12.00 am</span>
									</div>
								</div>
								<div className="flex gap-1">
									<h5 className="font-semibold">
										Contact at :
									</h5>
									<Link href={"/"} className="text-blue-600">
										siyon@example.com
									</Link>
								</div>
							</div>
							<button className="w-full py-2 bg-blue-500 text-white rounded-lg">
								message
							</button>
						</div>
					</div>
				</li>
				<li className="border rounded-lg p-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<div className="relative w-12 h-12">
								<Image
									src={"/t.jpg"}
									fill={true}
									className="object-cover rounded-full"
									alt="profile image"
								/>
							</div>
							<h3 className="capitalize font-semibold text-lg">
								siyon wilson
							</h3>
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-1">
								<div className="flex gap-1">
									<h5 className="font-semibold">
										Connected at :
									</h5>
									<div className="flex gap-1">
										<span>12/12/2024</span>
										<span>,</span>
										<span>12.00 am</span>
									</div>
								</div>
								<div className="flex gap-1">
									<h5 className="font-semibold">
										Contact at :
									</h5>
									<Link href={"/"} className="text-blue-600">
										siyon@example.com
									</Link>
								</div>
							</div>
							<button className="w-full py-2 bg-blue-500 text-white rounded-lg">
								message
							</button>
						</div>
					</div>
				</li>
				<li className="border rounded-lg p-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<div className="relative w-12 h-12">
								<Image
									src={"/t.jpg"}
									fill={true}
									className="object-cover rounded-full"
									alt="profile image"
								/>
							</div>
							<h3 className="capitalize font-semibold text-lg">
								siyon wilson
							</h3>
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-1">
								<div className="flex gap-1">
									<h5 className="font-semibold">
										Connected at :
									</h5>
									<div className="flex gap-1">
										<span>12/12/2024</span>
										<span>,</span>
										<span>12.00 am</span>
									</div>
								</div>
								<div className="flex gap-1">
									<h5 className="font-semibold">
										Contact at :
									</h5>
									<Link href={"/"} className="text-blue-600">
										siyon@example.com
									</Link>
								</div>
							</div>
							<button className="w-full py-2 bg-blue-500 text-white rounded-lg">
								message
							</button>
						</div>
					</div>
				</li>
				<li className="border rounded-lg p-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<div className="relative w-12 h-12">
								<Image
									src={"/t.jpg"}
									fill={true}
									className="object-cover rounded-full"
									alt="profile image"
								/>
							</div>
							<h3 className="capitalize font-semibold text-lg">
								siyon wilson
							</h3>
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-1">
								<div className="flex gap-1">
									<h5 className="font-semibold">
										Connected at :
									</h5>
									<div className="flex gap-1">
										<span>12/12/2024</span>
										<span>,</span>
										<span>12.00 am</span>
									</div>
								</div>
								<div className="flex gap-1">
									<h5 className="font-semibold">
										Contact at :
									</h5>
									<Link href={"/"} className="text-blue-600">
										siyon@example.com
									</Link>
								</div>
							</div>
							<button className="w-full py-2 bg-blue-500 text-white rounded-lg">
								message
							</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default ConnectedCustomers;
