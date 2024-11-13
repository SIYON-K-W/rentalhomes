import Link from "next/link";

const Welcome = async () => {
	return (
		<>
			<section
				className="h-screen backgroundImage"
				style={{
					backgroundImage: `url("/assets/spotlight/spotlight.jpg")`,
				}}>
				<section className="wrapper h-full">
					<section className="flex justify-center h-full">
						<div className="flex flex-col gap-6 content items-center justify-center">
							<div className="flex items-center flex-col gap-2 px-16 max-2xl:px-0 max-lg:gap-6">
								<h3 className="text-white capitalize font-extrabold text-5xl italic text-center max-md:font-semibold max-md:text-4xl">
									Find Your Perfect Home with Ease
								</h3>
								<p className="text-white text-center text-xl max-md:text-lg">
									This platform connects property owners and
									renters, allowing owners to list rentals and
									renters to easily find and connect with the
									perfect place. Simplifying the rental
									process for everyone.
								</p>
							</div>
							<div className="flex justify-center items-center">
								<Link
									href={"/login"}
									className="capitalize text-black text-center text-xl bg-white max-lg:bg-[#4d8cf5] px-9 py-2 max-lg:text-white max-md:px-8 rounded-lg hover:bg-[#4d8cf5] hover:text-white transition-all">
									Login
								</Link>
							</div>
						</div>
					</section>
				</section>
			</section>
		</>
	);
};

export default Welcome;
