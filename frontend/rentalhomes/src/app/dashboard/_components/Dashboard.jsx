import Image from "next/image";
import Link from "next/link";
import Owner from "./Owner";
import Customer from "./Customer";

const Dashboard = async ({ isowner, data }) => {
	const user = data.user_details;
	return (
		<section className="py-12">
			<section className="wrapper">
				<section className="flex flex-col gap-5 items-center">
					<div className="flex gap-3 w-2/3 items-center flex-col">
						<div className="relative w-48 h-48">
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
										? "items-end gap-5"
										: "items-center gap-4"
								}`}>
								<h2 className="text-2xl">
									{user.first_name} {user.last_name}
								</h2>
								{isowner ? (
									<>
										<Link
											href={"/addhouse"}
											className="px-[26px] py-[7px] text-white bg-blue-500 rounded-[10px]">
											addhouse
										</Link>
										<button className="px-[26px] py-[7px] text-black bg-transparent rounded-[10px] border-black border">
											Logout
										</button>
									</>
								) : (
									<></>
								)}
							</div>
							<div
								className={`flex items-center ${
									isowner ? "gap-16" : ""
								}`}>
								{isowner ? (
									<>
										<span className="font-semibold">
											{data.total_owned_houses} owned
											houses
										</span>
										<span className="font-semibold">
											{data.total_connected_customers}{" "}
											customers
										</span>
										<span className="font-semibold capitalize">
											{user.location}
										</span>
									</>
								) : (
									<span className="font-semibold">
										{data.total_connected_houses} connected
										houses
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="bg-slate-400 h-[1px] w-4/5 mt-7"></div>
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
