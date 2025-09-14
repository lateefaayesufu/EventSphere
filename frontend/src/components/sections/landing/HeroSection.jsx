import React from "react";
import { PartyPopper } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
const HeroSection = function () {
	const navigate = useNavigate();
	return (
		<>
			<section className="text-white bg-transparent flex flex-col pt-20 px-4 md:px-20 justify-between items-center md:flex-row min-h-screen overflow-x-hidden">
				<div className="flex flex-col gap-4 py-8 md:py-30 w-full md:w-2/5 lg:w-1/2 md:justify-center md:items-start text-center md:text-left">
					<div className="flex items-center justify-center md:justify-start">
						<div className="font-bold text-lg md:text-xl text-gray-400">
							eventsphere
						</div>
						<PartyPopper
							size={16}
							strokeWidth={2}
							color="gray"
							className="inline-block ml-2"
							fill="grey"
						/>
					</div>{" "}
					<h1 className="text-5xl md:text-5xl font-bold leading-tight">
						Engage in <br />
						<span className="bg-gray-500 bg-clip-text text-transparent">
							Campus Life.
						</span>
					</h1>
					<p className="text-white font-medium w-full md:w-2/3 text-sm md:text-base">
						The central hub for all things campus. Find events, register, and
						get your certificates—seamlessly.
					</p>
					<div className="flex justify-center md:justify-start pt-2">
						<Button
							onClick={() => {
								navigate("/login");
							}}
						>
							Create your first event
						</Button>
					</div>
				</div>

				<div className="w-full md:w-3/5 lg:w-1/2 flex items-center justify-center p-4 bg-transparent">
					<div className="w-full rounded-lg overflow-hidden  bg-transparent">
						<video
							src="/landing.webm"
							className="w-full h-auto object-cover"
							autoPlay
							loop
							muted
							playsInline
						></video>
					</div>
				</div>
			</section>
		</>
	);
};

export default HeroSection;
