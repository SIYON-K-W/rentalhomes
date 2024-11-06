import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";

const AllImages = ({ featuredimage, galleryimages, closeimages }) => {
	return (
		<div className="fixed w-full h-screen top-0 left-0 bg-white z-50 pt-7 px-4 animate-wiggle">
			<IoChevronBack
				className="text-2xl cursor-pointer"
				onClick={closeimages}
			/>
			<div className="wrapper h-full">
				<div className="w-[60%] mx-auto max-3xl:w-full py-6 h-full overflow-y-auto scroll-container">
					<div className="grid gap-2 pb-6">
						<div
							className="w-full h-auto relative"
							style={{ aspectRatio: "16/11" }}>
							<Image
								src={featuredimage}
								alt="house image"
								layout="fill"
								className="object-cover"
							/>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{galleryimages.map((img, index) => (
								<div
									className="w-full h-auto relative"
									style={{ aspectRatio: "16/11" }}
									key={index}>
									<Image
										src={img.image}
										alt={`Gallery Image ${index + 1}`}
										layout="fill"
										className="object-cover"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllImages;
