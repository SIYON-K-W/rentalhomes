"use client";
import { BiMessageRounded } from "react-icons/bi";
import { useAuth } from "@/context/Authcontext";

const Message = () => {
	const { user } = useAuth();
	return (
		<>
			{user && user.token ? (
				<div className="fixed bottom-10 max-3xl:bottom-24 right-[8%] cursor-pointer">
					<div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center pt-1">
						<BiMessageRounded className="text-white text-4xl" />
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Message;
