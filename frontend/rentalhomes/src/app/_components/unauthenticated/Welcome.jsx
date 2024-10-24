import Link from "next/link";

const Welcome = () => {
	return (
		<>
			<div className="bg-white h-[65px]"></div>
			<section
				className="h-screen backgroundImage"
				style={{
					backgroundImage: `url("/spotlight.jpg")`,
				}}>
				<section className="wrapper h-full">
					<section className="flex justify-center h-full">
						<div className="flex flex-col gap-6 content items-center justify-center">
							<div className="flex items-center flex-col gap-2 px-16">
								<h3 className="text-white capitalize font-extrabold text-5xl italic">
									Find Your Perfect Home with Ease
								</h3>
								<p className="text-white text-center text-xl">
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
									className="text-white text-center text-xl bg-[#4d8cf5] px-9 py-2 rounded-lg">
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
