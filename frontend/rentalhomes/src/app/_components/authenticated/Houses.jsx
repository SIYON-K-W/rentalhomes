import Image from "next/image";
import Link from "next/link";

const Houses = async () => {
	return (
		<section className="py-12">
			<section className="wrapper">
				<section className="grid grid-cols-1 2xl:grid-cols-2 5xl:grid-cols-3 gap-6">
					<div className="border rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
						<Link href={`house/${1}`}>
							<div>
								<Image
									alt="huses image"
									src={"/t.jpg"}
									width={500}
									height={400}
								/>
							</div>
							<div className="p-4">
								<h3 className="text-lg font-semibold capitalize">
									thrissur,india
								</h3>
								<span className="text-gray-500 capitalize">
									beaches and views
								</span>
								<p className="text-gray-500">For 16 days</p>
								<h2 className="text-lg font-semibold capitalize">
									&#8377;15,555
								</h2>
							</div>
						</Link>
					</div>
				</section>
			</section>
		</section>
	);
};

export default Houses;
