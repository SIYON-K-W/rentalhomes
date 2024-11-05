import Image from "next/image";
import Link from "next/link";
import Owner from "./Owner";
import Customer from "./Customer";
import Logout from "@/Components/general/navbar/_components/Logout";

const Dashboard = async ({ isowner, data }) => {
	const user = data.user_details;
	return (
		<section className="py-12">
			<section className="wrapper">
				<section className="flex flex-col gap-5 items-center">
					<div className="flex gap-3 w-2/3 items-center flex-col max-6xl:w-full">
						<div className="relative w-48 h-48 max-xl:w-40 max-xl:h-40">
							<Image
								src={`${
									user.profile_image ||
									"/assets/images/nonprofile.jpg"
								}`}
								alt="profile image"
								fill={true}
								className="object-cover rounded-full"
							/>
						</div>
						<h4>{user.email}</h4>
						<div
							className={`flex flex-col items-center ${
								isowner ? "gap-6" : "gap-3"
							}`}>
							<div
								className={`flex ${
									isowner
										? "flex-col items-center gap-3"
										: "items-center gap-4"
								}`}>
								<h2 className="text-2xl capitalize">
									{user.first_name} {user.last_name}
								</h2>

								{isowner ? (
									<div className="flex items-center gap-5">
										<Link
											href={"/addhouse"}
											className="px-[26px] py-[7px] text-white bg-blue-500 rounded-[10px] capitalize">
											addhouse
										</Link>
										<Logout
											style={
												"px-[26px] py-[7px] text-black bg-transparent rounded-[10px] border-black border"
											}
										/>
									</div>
								) : (
									<></>
								)}
							</div>
							{isowner ? (
								<div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
									<div className="flex flex-col items-center gap-2 max-md:gap-1">
										<h4 className="font-semibold capitalize">
											owned houses
										</h4>
										<span>{data.total_owned_houses} </span>
									</div>
									<div className="flex flex-col items-center gap-2 max-md:gap-1">
										<h4 className="font-semibold capitalize">
											customers
										</h4>
										<span>
											{data.total_connected_customers}
										</span>
									</div>
									<div className="flex flex-col items-center gap-2 max-md:gap-1">
										<h4 className="font-semibold capitalize">
											your location
										</h4>
										<span>{user.location}</span>
									</div>
								</div>
							) : (
								<div className="flex flex-col items-center gap-1 max-md:gap-1">
									<h4 className="font-semibold capitalize">
										connected houses
									</h4>
									<span>{data.total_connected_houses} </span>
								</div>
							)}
						</div>
					</div>
					<div className="bg-slate-400 h-[1px] w-4/5 mt-7 max-6xl:w-full"></div>
					{isowner ? (
						<Owner owned_houses={data.owned_houses} />
					) : (
						<Customer connected_houses={data.connected_houses} />
					)}
				</section>
			</section>
		</section>
	);
};

export default Dashboard;
