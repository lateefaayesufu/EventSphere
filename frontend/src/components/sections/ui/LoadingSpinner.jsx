import React from "react";

const LoadingSpinner = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-[#131414]">
			<div className="relative">
				<div className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg">
					Loading...
				</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
