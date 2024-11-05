import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
	return (
		<footer className="bg-gray-900 text-white py-14 max-3xl:pb-[88px]">
			<section className="wrapper">
				<div className="flex justify-between items-start flex-wrap max-5xl:gap-7 max-3xl:flex-col">
					<div className="w-[25%] max-5xl:w-[40%] max-3xl:w-full">
						<h2 className="text-3xl font-bold mb-3">HouseRent</h2>
						<p className="text-gray-400">
							Your trusted platform for finding and listing rental
							properties. Connecting owners and tenants with ease.
						</p>
					</div>
					<div className="max-3xl:w-full max-5xl:w-[14%]">
						<h3 className="text-lg font-semibold mb-3">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-gray-300 hover:text-white transition duration-300">
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-gray-300 hover:text-white transition duration-300">
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/listings"
									className="text-gray-300 hover:text-white transition duration-300">
									Listings
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-300 hover:text-white transition duration-300">
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div className="max-5xl:w-[30%] max-3xl:w-full">
						<h3 className="text-lg font-semibold mb-3">
							Contact Us
						</h3>
						<ul className="space-y-2 text-gray-300">
							<li>
								<strong>Phone : </strong>
								<Link
									href={"tel:+1 (123) 456-7890"}
									className="text-gray-300 hover:text-white transition duration-300">
									+1 (123) 456-7890
								</Link>
							</li>
							<li>
								<strong>Email : </strong>
								<Link
									href={"mailto:support@houserent.com"}
									className="text-gray-300 hover:text-white transition duration-300">
									support@houserent.com
								</Link>
							</li>
							<li>
								<strong>Location : </strong> 123 Main St,
								Cityville, Country
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-1 max-5xl:w-full">
						<h3 className="text-lg font-semibold mb-3">
							Follow Us
						</h3>
						<Image
							src={"/assets/images/social-media.svg"}
							width={300}
							height={200}
							alt="social media"
						/>
					</div>
				</div>

				<div className="text-center mt-8 text-gray-500">
					<p>&copy; 2024 HouseRent. All rights reserved.</p>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
