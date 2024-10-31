const ImageGallery = async ({ featuredImage, galleryImages }) => {
	return (
		<div className="grid grid-cols-2 gap-4 h-[400px] rounded-lg overflow-hidden">
			<div className="h-full">
				<img
					src={featuredImage}
					alt="Featured"
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<div className="relative grid gap-2 h-full">
				{galleryImages.length === 1 && (
					<img
						src={galleryImages[0].image}
						alt="Gallery Image 1"
						className="w-full h-full object-cover rounded-lg"
					/>
				)}

				{galleryImages.length === 2 && (
					<div className="grid grid-cols-2 gap-2 h-full">
						{galleryImages.map((img, index) => (
							<img
								key={index}
								src={img.image}
								alt={`Gallery Image ${index + 1}`}
								className="w-full h-full object-cover rounded-lg"
							/>
						))}
					</div>
				)}

				{galleryImages.length >= 3 && galleryImages.length <= 4 && (
					<div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
						{galleryImages.slice(0, 4).map((img, index) => (
							<img
								key={index}
								src={img.image}
								alt={`Gallery Image ${index + 1}`}
								className={`w-full h-full object-cover rounded-lg ${
									galleryImages.length === 3 && index === 2
										? "col-span-2 row-span-1"
										: ""
								}`}
							/>
						))}
					</div>
				)}

				{galleryImages.length > 4 && (
					<div className="grid grid-cols-2 grid-rows-2 gap-2 h-full relative">
						{galleryImages.slice(0, 4).map((img, index) => (
							<img
								key={index}
								src={img.image}
								alt={`Gallery Image ${index + 1}`}
								className="w-full h-full object-cover rounded-lg"
							/>
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
