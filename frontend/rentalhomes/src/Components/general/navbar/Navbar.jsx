import Image from "next/image";
import Link from "next/link";
import Rightpart from "./_components/Rightpart";

const Navbar = async () => {
	return (
		<header className="fixed z-50 bg-white h-fit w-full shadow-lg">
			<section className="wrapper">
				<section className="flex justify-between items-center">
					<div>
						<h1>
							<Link href={"/"}>
								<Image
									src={"/assets/logo/logo.png"}
									width={64}
									height={64}
									alt="logo"
								/>
							</Link>
						</h1>
					</div>
					<div className="flex items-center gap-[22px]">
						{/* <Rightpart /> */}
					</div>
				</section>
			</section>
		</header>
	);
};

export default Navbar;
