import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PartyPopper, Menu } from "lucide-react";

const Navbar = function () {
	const [open, setOpen] = useState(false);

	const links = [
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
		{ name: "Events", path: "/events" },
		{ name: "Contact", path: "/contact" },
		{ name: "Gallery", path: "/gallery" },
		{ name: "FAQs", path: "/faq" },
		{ name: "Get Started", path: "/login" },
	];

	return (
		<div>
			<nav className="glass-nav border-[1px] border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl text-white flex items-center justify-between px-4 md:px-8 py-3 md:py-4 fixed w-full md:w-auto z-20">
				<div className="flex items-center">
					<Link to="/" className="font-bold text-2xl md:text-3xl text-white">
						<PartyPopper
							size={24}
							strokeWidth={2}
							color="white"
							className="inline-block mx-3"
							fill="white"
						/>
					</Link>
				</div>

				{/* Desktop Menu */}
				<ul className="hidden md:flex list-none gap-3 items-center justify-around">
					{links.map((link) => (
						<li key={link.name} className="inline-block mx-3">
							<Link
								to={link.path}
								className={
									link.name === "Get Started"
										? "bg-white text-black px-4 py-3 font-bold  rounded-sm"
										: ""
								}
							>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
				{/* Mobile Menu Button */}
				<button
					className="md:hidden block"
					onClick={() => setOpen(!open)}
					aria-label="Toggle menu"
				>
					<Menu size={28} color="white" />
				</button>
				{/* Mobile Menuu */}
				{open && (
					<ul className="absolute top-full right-0 bg-black/90 text-white rounded-lg shadow-lg flex flex-col gap-2 p-4 w-40 md:hidden z-10">
						{links.map((link) => (
							<li key={link.name}>
								<Link
									to={link.path}
									onClick={() => setOpen(false)}
									className={
										link.name === "Get Started"
											? "bg-white text-black px-4 py-2 font-bold"
											: ""
									}
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
