import Image from "next/image";

const ImageGallery = async ({ featuredImage, galleryImages }) => {
	return (
		<div className="grid grid-cols-2 gap-4 rounded-lg overflow-hidden">
			<div
				className="w-full h-auto relative"
				style={{ aspectRatio: "16/11" }}>
				<Image
					src={featuredImage}
					alt="house image"
					layout="fill"
					className="object-cover rounded-lg"
				/>
			</div>
			<div className="relative grid gap-2 h-full">
				{galleryImages.length === 1 && (
					<div
						className="w-full h-auto relative"
						style={{ aspectRatio: "16/11" }}>
						<Image
							src={galleryImages[0].image}
							alt="Gallery Image 1"
							layout="fill"
							className="object-cover rounded-lg"
						/>
					</div>
				)}

				{galleryImages.length === 2 && (
					<div className="grid grid-rows-1 grid-cols-2 gap-2 h-full">
						{galleryImages.map((img, index) => (
							<div className="w-full h-auto relative" key={index}>
								<Image
									src={img.image}
									alt={`Gallery Image ${index + 1}`}
									layout="fill"
									className="object-cover rounded-lg"
								/>
							</div>
						))}
					</div>
				)}

				{galleryImages.length >= 3 && galleryImages.length <= 4 && (
					<div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
						{galleryImages.slice(0, 4).map((img, index) => (
							<div
								className={`w-full h-auto relative ${
									galleryImages.length === 3 && index === 2
										? "col-span-2 row-span-1"
										: "aspect-[16/11]"
								}`}
								key={index}>
								<Image
									key={index}
									src={img.image}
									fill
									alt={`Gallery Image ${index + 1}`}
									className={"object-cover rounded-lg"}
								/>
							</div>
						))}
					</div>
				)}

				{galleryImages.length > 4 && (
					<div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
						{galleryImages.slice(0, 4).map((img, index) => (
							<div
								className="w-full h-auto relative"
								style={{ aspectRatio: "16/11" }}
								key={index}>
								<Image
									src={img.image}
									alt={`Gallery Image ${index + 1}`}
									layout="fill"
									className="object-cover rounded-lg"
								/>
							</div>
						))}
						<button className="absolute bottom-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
							Show all photos
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageGallery;
