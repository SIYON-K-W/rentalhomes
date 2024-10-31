import Image from "next/image";
import Link from "next/link";
import Owner from "./Owner";
import Customer from "./Customer";

const Dashboard = async () => {
	const isowner = true;
	return (
		<section className="py-12">
			<section className="wrapper">
				<section className="flex flex-col gap-5 items-center">
					<div className="flex gap-8 w-2/3 items-center">
						<div className="relative w-48 h-48">
							<Image
								src={"/assets/images/nonprofile.jpg"}
								alt="profile image"
								fill={true}
								className="object-cover rounded-full"
							/>
						</div>
						<div className="flex flex-col gap-7">
							<div className="flex items-end gap-5">
								<h2 className="text-2xl">siyon wilson</h2>
								{isowner ? (
									<Link
										href={"/addhouse"}
										className="px-[26px] py-[7px] text-white bg-blue-500 rounded-[10px]">
										addhouse
									</Link>
								) : (
									<></>
								)}
								<button className="px-[26px] py-[7px] text-black bg-transparent rounded-[10px] border-black border">
									Logout
								</button>
							</div>
							<div
								className={`flex items-center ${
									isowner ? "justify-between" : ""
								}`}>
								{isowner ? (
									<>
										<span className="font-semibold">
											11 houses
										</span>
										<span className="font-semibold">
											336 customers
										</span>
										<span className="font-semibold capitalize">
											thrissur
										</span>
									</>
								) : (
									<span className="font-semibold">
										33 connected houses
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="bg-slate-400 h-[1px] w-4/5 mt-7"></div>
					{isowner ? <Owner /> : <Customer />}
				</section>
			</section>
		</section>
	);
};

export default Dashboard;
