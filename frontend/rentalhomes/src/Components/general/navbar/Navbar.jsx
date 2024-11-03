import Image from "next/image";
import Link from "next/link";
import Rightpart from "./_components/Rightpart";
import ConnectedCustomers from "@/app/dashboard/_components/ConnectedCustomers";

const getData = async () => {
	const res = await fetch("http://localhost:8000/api/v1/web/locations/", {
		next: { revalidate: 3600 },
	});

	if (!res.ok) {
		throw new Error("Something went wrong while fetching house data");
	}
	const response = await res.json();
	return response;
};

const Navbar = async () => {
	const locations = await getData();
	return (
		<header className="fixed z-50 bg-white h-fit w-full shadow-lg">
			<section className="wrapper">
				<section className="flex justify-between items-center">
					<div>
						<h1>
							<Link href={"/"}>
								<Image
									src={"/assets/logo/logo.png"}
									width={64}
									height={64}
									alt="logo"
								/>
							</Link>
						</h1>
					</div>
					<Rightpart locations={locations} />
				</section>
			</section>
			<section className="relative">
				{/* <ConnectedCustomers /> */}
			</section>
		</header>
	);
};

export default Navbar;
