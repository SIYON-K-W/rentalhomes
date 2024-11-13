"use client";
import Image from "next/image";
import AllImages from "./AllImages";
import { useEffect, useState } from "react";

const ImageGallery = ({ featuredImage, galleryImages }) => {
	const [show, setShow] = useState(false);
	const showimages = () => {
		setShow(true);
		document.body.classList.add("no-scroll");
	};
	const closeimages = () => {
		setShow(false);
		document.body.classList.remove("no-scroll");
	};
	return (
		<>
			<div className="grid grid-cols-2 max-3xl:grid-cols-1 gap-3 rounded-lg overflow-hidden">
				<div
					className="w-full h-auto relative cursor-pointer"
					style={{ aspectRatio: "16/11" }}
					onClick={showimages}>
					<Image
						src={featuredImage}
						alt="house image"
						layout="fill"
						className="object-cover rounded-lg"
					/>
					<p className="absolute bottom-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm 3xl:hidden">
						1/{galleryImages.length}
					</p>
				</div>
				<div className="relative grid gap-2 h-full max-3xl:hidden">
					{galleryImages.length === 1 && (
						<div
							className="w-full h-auto relative cursor-pointer"
							style={{ aspectRatio: "16/11" }}
							onClick={showimages}>
							<Image
								src={galleryImages[0].image}
								alt="Gallery Image 1"
								layout="fill"
								className="object-cover rounded-lg"
							/>
							<button
								className="border border-[#e240ff] capitalize absolute bottom-2 right-2 bg-white text-black px-[14px] py-[5px] rounded-md text-sm font-semibold"
								onClick={showimages}>
								Show photos
							</button>
						</div>
					)}

					{galleryImages.length === 2 && (
						<div className="grid grid-rows-1 grid-cols-2 gap-2 h-full">
							{galleryImages.map((img, index) => (
								<div
									className="w-full h-auto relative cursor-pointer"
									key={index}
									onClick={showimages}>
									<Image
										src={img.image}
										alt={`Gallery Image ${index + 1}`}
										layout="fill"
										className="object-cover rounded-lg"
									/>
								</div>
							))}
							<button
								className="border border-[#e240ff] capitalize absolute bottom-2 right-2 bg-white text-black px-[14px] py-[5px] rounded-md text-sm font-semibold"
								onClick={showimages}>
								Show photos
							</button>
						</div>
					)}

					{galleryImages.length >= 3 && galleryImages.length <= 4 && (
						<div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
							{galleryImages.slice(0, 4).map((img, index) => (
								<div
									className={`w-full h-auto relative cursor-pointer ${
										galleryImages.length === 3 &&
										index === 2
											? "col-span-2 row-span-1"
											: "aspect-[16/11]"
									}`}
									key={index}
									onClick={showimages}>
									<Image
										key={index}
										src={img.image}
										fill
										alt={`Gallery Image ${index + 1}`}
										className={"object-cover rounded-lg"}
									/>
								</div>
							))}
							<button
								className="border border-[#e240ff] capitalize absolute bottom-2 right-2 bg-white text-black px-[14px] py-[5px] rounded-md text-sm font-semibold"
								onClick={showimages}>
								Show photos
							</button>
						</div>
					)}

					{galleryImages.length > 4 && (
						<div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
							{galleryImages.slice(0, 4).map((img, index) => (
								<div
									className="w-full h-auto relative cursor-pointer"
									style={{ aspectRatio: "16/11" }}
									key={index}
									onClick={showimages}>
									<Image
										src={img.image}
										alt={`Gallery Image ${index + 1}`}
										layout="fill"
										className="object-cover rounded-lg"
									/>
								</div>
							))}
							<button
								className="border border-[#e240ff] capitalize absolute bottom-2 right-2 bg-white text-black px-[14px] py-[5px] rounded-md text-sm font-semibold"
								onClick={showimages}>
								Show photos
							</button>
						</div>
					)}
				</div>
			</div>
			{show && (
				<AllImages
					closeimages={closeimages}
					featuredimage={featuredImage}
					galleryimages={galleryImages}
				/>
			)}
		</>
	);
};

export default ImageGallery;
