import { useState, useEffect, useRef } from "react";

const Propertype = ({ formData, handleChange, setFormData }) => {
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const propertyTypeSuggestions = ["Villa", "Apartment", "House", "Condo"];
	const suggestionsRef = useRef(null); // Create a ref for the suggestions container

	// Handle input change and filter suggestions
	const handleInputChange = (e) => {
		const { value } = e.target;

		// Update form data
		setFormData((prevData) => ({
			...prevData,
			property_type: value,
		}));

		// Filter suggestions based on current input value
		const filtered = propertyTypeSuggestions.filter((suggestion) =>
			suggestion.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredSuggestions(filtered);
	};

	const handleSuggestionClick = (suggestion) => {
		setFormData((prevData) => ({
			...prevData,
			property_type: suggestion,
		}));
		setFilteredSuggestions([]); // Clear suggestions after selection
	};

	const handleFocus = () => {
		// Show suggestions on focus
		const filtered = propertyTypeSuggestions.filter((suggestion) =>
			suggestion
				.toLowerCase()
				.includes(formData.property_type.toLowerCase())
		);
		setFilteredSuggestions(filtered);
	};

	// Effect to handle clicks outside the suggestions
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target)
			) {
				setFilteredSuggestions([]); // Close suggestions when clicking outside
			}
		};

		// Attach event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Clean up the event listener
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={suggestionsRef}>
			{" "}
			{/* Add ref to parent div */}
			<label className="block text-sm font-medium text-gray-700">
				Property Type
			</label>
			<input
				type="text"
				name="property_type"
				value={formData.property_type}
				onChange={handleInputChange} // Use the new handler
				onFocus={handleFocus} // Show suggestions on focus
				className="mt-1 p-2 w-full border border-gray-300 rounded-md"
				placeholder="Enter or select property type"
				aria-haspopup="true"
				aria-expanded={filteredSuggestions.length > 0}
			/>
			{/* Display suggestions */}
			{filteredSuggestions.length > 0 && (
				<div className="absolute z-10 border border-gray-300 rounded-md mt-1 bg-white shadow-lg w-full">
					{" "}
					{/* Position absolute */}
					{filteredSuggestions.map((suggestion, index) => (
						<div
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}
							className="p-2 cursor-pointer hover:bg-gray-100">
							{suggestion}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Propertype;
