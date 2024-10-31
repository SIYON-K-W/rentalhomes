"use client";

import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import Propertype from "./Propertype";

const AddForm = ({ locations }) => {
	const [featuredImage, setFeaturedImage] = useState(null);
	const [imageInputs, setImageInputs] = useState([
		{ id: Date.now(), file: null, preview: null },
	]);
	const [formData, setFormData] = useState({
		title: "",
		sub_title: "",
		special_about_place: "",
		featured_image: null,
		location_city: "",
		exact_location: "",
		phone_number: "",
		contact_email: "",
		number_of_guests: "",
		rent_amount: "",
		property_type: "",
		number_of_bedrooms: "",
		number_of_bathrooms: "",
		extra_features: "",
		lease_duration: "",
		parking_available: false,
		pet_friendly: false,
		gallery_images: [],
	});
	const [fieldErrors, setFieldErrors] = useState({});
	const [nonFieldErrors, setNonFieldErrors] = useState([]);

	const handleChange = (e) => {
		const { name, value, type, files, checked } = e.target;

		if (type === "file" && name === "featured_image") {
			if (files.length > 0) {
				// If a file is selected, update the form data and featured image preview
				setFormData((prevData) => ({
					...prevData,
					[name]: files[0], // Single file for featured image
				}));
				setFeaturedImage(URL.createObjectURL(files[0])); // Update the preview
			} else {
				// If no file is selected, clear the featured image and its preview
				setFormData((prevData) => ({
					...prevData,
					[name]: null, // Clear the featured image in form data
				}));
				setFeaturedImage(null); // Clear the preview
			}
		} else if (type === "file" && name.startsWith("gallery_image_")) {
			const index = name.split("_")[2]; // Get index from name
			const newImageInputs = [...imageInputs];
			if (files.length > 0) {
				newImageInputs[index].file = files[0];
				newImageInputs[index].preview = URL.createObjectURL(files[0]); // Update the specific input
			} else {
				newImageInputs[index].file = null;
				newImageInputs[index].preview = null;
			}
			setImageInputs(newImageInputs);
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: type === "checkbox" ? checked : value,
			}));
		}
	};

	const addImageInput = () => {
		setImageInputs((prev) => [...prev, { id: Date.now(), file: null }]);
	};

	const removeImageInput = (index) => {
		setImageInputs((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFieldErrors({});
		setNonFieldErrors([]);
		const tokenString = Cookies.get("token");
		console.log(tokenString);

		if (tokenString) {
			const token = JSON.parse(tokenString);
			const data = new FormData();
			data.append("title", formData.title);
			data.append("sub_title", formData.sub_title);
			data.append("special_about_place", formData.special_about_place);
			data.append("featured_image", formData.featured_image);
			data.append("location_city", formData.location_city);
			data.append("exact_location", formData.exact_location);
			data.append("phone_number", formData.phone_number);
			data.append("contact_email", formData.contact_email);
			data.append("number_of_guests", formData.number_of_guests);
			data.append("rent_amount", formData.rent_amount);
			data.append("property_type", formData.property_type);
			data.append("number_of_bedrooms", formData.number_of_bedrooms);
			data.append("number_of_bathrooms", formData.number_of_bathrooms);
			data.append("extra_features", formData.extra_features);
			data.append("lease_duration", formData.lease_duration);
			data.append("parking_available", formData.parking_available);
			data.append("pet_friendly", formData.pet_friendly);

			// Append gallery images
			imageInputs.forEach((input) => {
				if (input.file) {
					data.append("gallery_images", input.file);
				}
			});

			try {
				const res = await fetch(
					"http://localhost:8000/api/v1/houses/create/",
					{
						method: "POST",
						body: data,
						headers: {
							Authorization: `Bearer ${token.access}`, // Include JWT token if needed
						},
					}
				);
				if (!res.ok) {
					const errordata = await res.json();
					const fieldErrors = {};
					let nonFieldErrors = [];

					if (errordata.data && errordata.data.error) {
						const errorMessages = errordata.data.message;

						if (errorMessages) {
							for (const field in errorMessages) {
								// Check if the field is 'gallery_images' to handle it differently
								if (field === "gallery_images") {
									const galleryErrors = errorMessages[field];
									for (const index in galleryErrors) {
										// Map the error to the corresponding gallery input
										fieldErrors[`gallery_image_${index}`] =
											galleryErrors[index].join(" ");
									}
								} else {
									// Handle other fields normally
									fieldErrors[field] =
										errorMessages[field].join(" ");
								}
							}
						}

						// Check for non-field errors
						if (errordata.data.non_field_errors) {
							nonFieldErrors = errordata.data.non_field_errors;
						}
					}

					// Set the errors in state
					setFieldErrors(fieldErrors);
					setNonFieldErrors(nonFieldErrors);

					return; // Exit after setting the errors
				}

				const result = await res.json();
				console.log("House created successfully!", result);
			} catch (error) {
				console.error("Error creating house:", error.data);
			}
		}
	};
	console.log("Field errors:", fieldErrors);

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4"
			encType="multipart/form-data">
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Title
				</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="a catching title must be 10 characters long"
					required
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
				/>
				{fieldErrors.title && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.title}</p>
					</div>
				)}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Subtitle
				</label>
				<input
					type="text"
					name="sub_title"
					value={formData.sub_title}
					onChange={handleChange}
					required
					placeholder={`Your subtitle will appear as "${
						formData.sub_title || "your subtitle"
					} in 'your location', India"`}
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
				/>
				{fieldErrors.sub_title && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.sub_title}</p>
					</div>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					What's special about this place?
				</label>
				<input
					type="text"
					name="special_about_place"
					value={formData.special_about_place}
					onChange={handleChange}
					required
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
					placeholder="In maximum 30 words and minimum 10 words"
				/>
				{fieldErrors.special_about_place && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.special_about_place}</p>
					</div>
				)}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 capitalize">
					brief description about place
				</label>
				<textarea
					name="extra_features"
					value={formData.extra_features}
					onChange={handleChange}
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
					placeholder="e.g. beatigul Pool with vast Garden, etc."
				/>
				{fieldErrors.extra_features && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.extra_features}</p>
					</div>
				)}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Featured Image
				</label>

				<input
					type="file"
					name="featured_image"
					accept="image/*"
					onChange={handleChange}
					className="mt-1 cursor-pointer"
				/>
				{featuredImage && (
					<div className="mt-4 w-ful h-96 relative">
						<Image
							src={featuredImage}
							alt="Featured image preview"
							fill={true}
							className="object-cover"
						/>
					</div>
				)}
				{fieldErrors.featured_image && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.featured_image}</p>
					</div>
				)}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Location (City)
				</label>
				<select
					name="location_city"
					value={formData.location_city}
					onChange={handleChange}
					required
					className="mt-1 p-2 w-full border border-gray-300 rounded-md">
					<option value="">Select City</option>
					{locations?.map((location) => (
						<option key={location.id} value={location.id}>
							{location.name}
						</option>
					))}
				</select>
				{fieldErrors.location_city && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.location_city}</p>
					</div>
				)}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Exact Location
				</label>
				<input
					type="text"
					name="exact_location"
					value={formData.exact_location}
					placeholder="eg:mathilakam,irinjalakuda,680685"
					onChange={handleChange}
					required
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
				/>
				{fieldErrors.exact_location && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.exact_location}</p>
					</div>
				)}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Phone Number
				</label>
				<input
					type="text"
					name="phone_number"
					value={formData.phone_number}
					onChange={handleChange}
					placeholder="valid number"
					required
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
				/>
				{fieldErrors.phone_number && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.phone_number}</p>
					</div>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Contact Email
				</label>
				<input
					type="email"
					name="contact_email"
					value={formData.contact_email}
					onChange={handleChange}
					required
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
				/>
				{fieldErrors.contact_email && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.contact_email}</p>
					</div>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Rent Amount
				</label>
				<input
					type="number"
					name="rent_amount"
					value={formData.rent_amount}
					onChange={handleChange}
					required
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
				/>
				{fieldErrors.rent_amount && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.rent_amount}</p>
					</div>
				)}
			</div>
			<Propertype
				formData={formData}
				handleChange={handleChange}
				setFormData={setFormData}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Number of Bedrooms
					</label>
					<input
						type="number"
						name="number_of_bedrooms"
						value={formData.number_of_bedrooms}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md"
					/>
					{fieldErrors.number_of_bedrooms && (
						<div className="error-message" style={{ color: "red" }}>
							<p>{fieldErrors.number_of_bedrooms}</p>
						</div>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Number of Bathrooms
					</label>
					<input
						type="number"
						name="number_of_bathrooms"
						value={formData.number_of_bathrooms}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md"
					/>
					{fieldErrors.number_of_bathrooms && (
						<div className="error-message" style={{ color: "red" }}>
							<p>{fieldErrors.number_of_bathrooms}</p>
						</div>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Number of Guests
					</label>
					<input
						type="number"
						name="number_of_guests"
						value={formData.number_of_guests}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md"
					/>
					{fieldErrors.number_of_guests && (
						<div className="error-message" style={{ color: "red" }}>
							<p>{fieldErrors.number_of_guests}</p>
						</div>
					)}
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Lease Duration
				</label>
				<input
					type="text"
					name="lease_duration"
					value={formData.lease_duration}
					onChange={handleChange}
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
					placeholder="e.g. 2 days and 1 night or 1 month"
				/>
				{fieldErrors.lease_duration && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.lease_duration}</p>
					</div>
				)}
			</div>
			<div className="flex items-center">
				<input
					type="checkbox"
					name="parking_available"
					id="parking_available"
					checked={formData.parking_available}
					onChange={handleChange}
					className="h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
				/>
				<label
					className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
					htmlFor="parking_available">
					Parking Available
				</label>
			</div>
			<div className="flex items-center">
				<input
					type="checkbox"
					name="pet_friendly"
					id="pet_friendly"
					checked={formData.pet_friendly}
					onChange={handleChange}
					className="h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
				/>
				<label
					className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
					htmlFor="pet_friendly">
					Pet Friendly
				</label>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Gallery Images
				</label>
				{imageInputs.map((input, index) => (
					<div key={input.id} className="flex mb-4 flex-col gap-4">
						<div>
							<input
								type="file"
								name={`gallery_image_${index}`}
								accept="image/*"
								onChange={handleChange}
								className="mt-1 cursor-pointer"
							/>
							<button
								type="button"
								onClick={() => removeImageInput(index)}
								className="ml-2 text-red-500">
								Remove
							</button>
						</div>
						{input.preview && (
							<div className="ml-4 w-24 h-24 relative">
								<Image
									src={input.preview}
									fill={true}
									className="object-cover"
									alt="Gallery image preview"
								/>
							</div>
						)}

						{fieldErrors[`gallery_image_${index}`] && (
							<div className="error-message text-red-500 mt-1">
								<p>{fieldErrors[`gallery_image_${index}`]}</p>
							</div>
						)}
					</div>
				))}
				<button
					type="button"
					onClick={addImageInput}
					className="text-blue-500 text-sm">
					Add another image
				</button>
			</div>
			{nonFieldErrors.length > 0 && (
				<div className="non-field-error text-red-500 mb-4">
					{nonFieldErrors.map((error, index) => (
						<p key={index}>{error}</p>
					))}
				</div>
			)}
			<div>
				<button
					type="submit"
					className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500">
					Create House Listing
				</button>
			</div>
		</form>
	);
};

export default AddForm;
