import { useLocation } from "@/context/Locationcontext";

const Location = ({ locations }) => {
	const { location, updateLocation } = useLocation();
	console.log(location);

	return (
		<select
			value={location}
			onChange={(e) => updateLocation(e.target.value)}
			className="bg-transparent text-black cursor-pointer focus:outline-none overflow-hidden capitalize">
			<option value={0}>Cities</option>
			{locations?.map((location) => (
				<option key={location.id} value={location.id}>
					{location.name}
				</option>
			))}
		</select>
	);
};

export default Location;
