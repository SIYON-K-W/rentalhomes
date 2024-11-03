import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = () => {
	const pathname = usePathname();
	const links = [
		{
			title: "home",
			path: "/",
		},
		{
			title: "about",
			path: "/about",
		},
		{
			title: "contact",
			path: "/contact",
		},
		{
			title: "dashboard",
			path: "/dashboard",
		},
	];
	return links.map((link) => (
		<Link
			href={link.path}
			key={link.title}
			className={`capitalize ${
				pathname === link.path ? "font-semibold" : ""
			}`}>
			{link.title}
		</Link>
	));
};

export default Links;
