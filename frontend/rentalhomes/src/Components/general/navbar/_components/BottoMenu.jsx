import { MdHomeFilled } from "react-icons/md";
import { IoBag } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { BsNut } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Bottomenu() {
	const pathname = usePathname();
	const data = [
		{
			icon: <MdHomeFilled className="text-xl max-xl:text-lg" />,
			P: "home",
			to: "/",
		},
		{
			icon: <IoBag className="text-xl max-xl:text-lg" />,
			P: "about",
			to: "/about",
		},
		{
			icon: <GrServices className="text-xl max-xl:text-lg" />,
			P: "contact",
			to: "/contact",
		},
		{
			icon: <BsNut className="text-xl max-xl:text-lg" />,
			P: "dashboard",
			to: "/dashboard",
		},
	];
	return (
		<div className="fixed bottom-0 py-2 left-0 w-full bg-white z-[15] border-t shadow-[0px_-2px_10px_1px_#00000026] 3xl:hidden">
			<div className="wrapper h-full">
				<ul className="flex items-center justify-between h-full">
					{data.map((Element, index) => (
						<li key={index}>
							<Link
								href={Element.to}
								className={`${
									pathname === Element.to ? "active" : ""
								} flex items-center flex-col gap-1 text-slate-600`}>
								{Element.icon}
								<p className="capitalize text-xs max-xl:font-custom1">
									{Element.P}
								</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Bottomenu;
