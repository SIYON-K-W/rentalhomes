"use client";

import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import Propertype from "./Propertype";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

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

	const router = useRouter();

	const handleChange = (e) => {
		const { name, value, type, files, checked } = e.target;

		if (type === "file" && name === "featured_image") {
			if (files.length > 0) {
				setFormData((prevData) => ({
					...prevData,
					[name]: files[0],
				}));
				setFeaturedImage(URL.createObjectURL(files[0]));
			} else {
				setFormData((prevData) => ({
					...prevData,
					[name]: null,
				}));
				setFeaturedImage(null);
			}
		} else if (type === "file" && name.startsWith("gallery_image_")) {
			const index = name.split("_")[2];
			const newImageInputs = [...imageInputs];
			if (files.length > 0) {
				newImageInputs[index].file = files[0];
				newImageInputs[index].preview = URL.createObjectURL(files[0]);
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

			imageInputs.forEach((input) => {
				if (input.file) {
					data.append("gallery_images", input.file);
				}
			});

			try {
				const res = await fetch(
					"http://localhost:8000/api/v1/houses/house/create/",
					{
						method: "POST",
						body: data,
						headers: {
							Authorization: `Bearer ${token.access}`,
						},
					}
				);
				if (!res.ok) {
					toast.error("House Creation Failed,Check Details Again");
					const errordata = await res.json();
					const fieldErrors = {};
					let nonFieldErrors = [];

					if (errordata.data && errordata.data.error) {
						const errorMessages = errordata.data.message;

						if (errorMessages) {
							for (const field in errorMessages) {
								if (field === "gallery_images") {
									const galleryErrors = errorMessages[field];
									for (const index in galleryErrors) {
										fieldErrors[`gallery_image_${index}`] =
											galleryErrors[index].join(" ");
									}
								} else {
									fieldErrors[field] =
										errorMessages[field].join(" ");
								}
							}
						}

						if (errordata.data.non_field_errors) {
							nonFieldErrors = errordata.data.non_field_errors;
						}
					}

					setFieldErrors(fieldErrors);
					setNonFieldErrors(nonFieldErrors);

					return;
				}
				if (res.ok) {
					const result = await res.json();
					toast.success("House Created Successfully");
					router.push("/dashboard");
					console.log("House created successfully!", result);
				}
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
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="title">
					Title
				</label>
				<input
					type="text"
					name="title"
					id="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="catching title,min:10 characters"
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
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="sub_title">
					Subtitle
				</label>
				<input
					type="text"
					name="sub_title"
					id="sub_title"
					value={formData.sub_title}
					onChange={handleChange}
					required
					placeholder={"catching subtitle"}
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
				/>
				{fieldErrors.sub_title && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.sub_title}</p>
					</div>
				)}
			</div>

			<div>
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="special_about_place">
					What's special about this place?
				</label>
				<input
					type="text"
					name="special_about_place"
					id="special_about_place"
					value={formData.special_about_place}
					onChange={handleChange}
					required
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
					placeholder="In max:30 words and min: 10 words"
				/>
				{fieldErrors.special_about_place && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.special_about_place}</p>
					</div>
				)}
			</div>
			<div>
				<label
					className="block text-sm font-medium text-gray-700 capitalize"
					htmlFor="extra_features">
					brief description about place
				</label>
				<textarea
					name="extra_features"
					id="extra_features"
					value={formData.extra_features}
					onChange={handleChange}
					className="mt-1 p-2 w-full border border-gray-300 rounded-md"
					placeholder="e.g. beautifull Pool with vast Garden, etc."
					rows={8}
				/>
				{fieldErrors.extra_features && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.extra_features}</p>
					</div>
				)}
			</div>
			<div>
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="featured_image">
					Featured Image
				</label>

				<input
					type="file"
					name="featured_image"
					id="featured_image"
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
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="location_city">
					Location (City)
				</label>
				<select
					name="location_city"
					id="location_city"
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
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="exact_location">
					Exact Location
				</label>
				<input
					type="text"
					id="exact_location"
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
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="phone_number">
					Phone Number
				</label>
				<div className="flex items-center mt-1 w-full border border-gray-300 rounded-md">
					<div className="w-10 h-full text-center">+91</div>
					<input
						type="text"
						name="phone_number"
						id="phone_number"
						value={formData.phone_number}
						onChange={handleChange}
						placeholder="enter valid number for contact"
						required
						className="p-2 flex-1 border-l"
					/>
				</div>
				{fieldErrors.phone_number && (
					<div className="error-message" style={{ color: "red" }}>
						<p>{fieldErrors.phone_number}</p>
					</div>
				)}
			</div>

			<div>
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="contact_email">
					Contact Email
				</label>
				<input
					type="email"
					name="contact_email"
					id="contact_email"
					value={formData.contact_email}
					onChange={handleChange}
					placeholder="enter valid email for contact"
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
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="rent_amount">
					Rent Amount
				</label>
				<input
					type="number"
					name="rent_amount"
					id="rent_amount"
					placeholder="in INR"
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
			<div className="grid max-lg:grid-cols-1 grid-cols-3 gap-4">
				<div>
					<label
						className="block text-sm font-medium text-gray-700"
						htmlFor="number_of_bedrooms">
						Number of Bedrooms
					</label>
					<input
						type="number"
						id="number_of_bedrooms"
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
					<label
						className="block text-sm font-medium text-gray-700"
						htmlFor="number_of_bathrooms">
						Number of Bathrooms
					</label>
					<input
						type="number"
						name="number_of_bathrooms"
						id="number_of_bathrooms"
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
					<label
						className="block text-sm font-medium text-gray-700"
						htmlFor="number_of_guests">
						Number of Guests
					</label>
					<input
						type="number"
						id="number_of_guests"
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
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="lease_duration">
					Lease Duration
				</label>
				<input
					type="text"
					id="lease_duration"
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
						<div className="flex max-md:flex-col max-md:gap-2 items-start">
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
								className="md:ml-2 text-red-500">
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
					Create House
				</button>
			</div>
		</form>
	);
};

export default AddForm;
