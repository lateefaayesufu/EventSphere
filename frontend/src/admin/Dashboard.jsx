import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

const navLinks = [
	{ to: "home", label: "Home" },
	{ to: "events", label: "Events" },
	{ to: "users", label: "Users" },
	{ to: "settings", label: "Settings" },
];

const Dashboard = function () {
	const [isSidebarOpen, setSidebarOpen] = useState(true);

	const linkClasses =
		"flex items-center px-4 py-2 rounded-md transition-colors duration-200 ease-in-out";
	const getNavLinkClassName = ({ isActive }) =>
		`${linkClasses} ${
			isActive
				? "bg-blue-600 text-white"
				: "text-gray-300 hover:bg-gray-700 hover:text-white"
		} ${!isSidebarOpen ? "justify-center" : ""}`;

	return (
		<div className="flex h-screen bg-gray-100 font-sans">
			<aside
				className={`flex-shrink-0 bg-gray-800 p-4 transition-all duration-300 ease-in-out ${
					isSidebarOpen ? "w-64" : "w-20"
				}`}
			>
				<div className="mb-8 flex items-center justify-center">
					<h1
						className={`text-2xl font-bold text-white ${
							!isSidebarOpen && "hidden"
						}`}
					>
						Admin
					</h1>
				</div>
				<nav>
					<ul className="space-y-2">
						{navLinks.map((link) => (
							<li key={link.to}>
								<NavLink to={link.to} className={getNavLinkClassName}>
									<span className={!isSidebarOpen ? "hidden" : ""}>
										{link.label}
									</span>
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</aside>

			<div className="flex flex-1 flex-col overflow-hidden">
				<header className="flex items-center justify-between border-b bg-white px-6 py-4">
					<button
						onClick={() => setSidebarOpen(!isSidebarOpen)}
						className="text-gray-500 hover:text-gray-600 focus:outline-none"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>

					<div className="flex items-center">
						<div className="text-right">
							<p className="font-semibold text-gray-800">Divinne</p>
							<p className="text-sm text-gray-500">Admin</p>
						</div>
						{/* You can add a user avatar here */}
					</div>
				</header>
				<main className="flex-1 overflow-y-auto p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
