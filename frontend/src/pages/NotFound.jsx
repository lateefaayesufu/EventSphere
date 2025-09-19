import React from "react";
import Button from "../components/sections/ui/Button";

const NotFound = () => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] text-white flex flex-col justify-center items-center p-4 sm:p-6">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Floating Particles */}
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
                {/* Large Gradient Orbs */}
                <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
            </div>

            {/* Floating Error Box */}
            <div className="relative z-10 text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-md w-full transform transition-all duration-500 hover:scale-[1.02]">
                {/* 404 Error Title */}
                <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text leading-none mb-3 animate-fade-in-up">
                    404
                </h1>

                {/* Main Message */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 animate-fade-in-up delay-100">
                    Event Not Found
                </h2>

                {/* Subtext */}
                <p className="text-sm sm:text-base text-gray-300 mx-auto leading-relaxed mb-6 animate-fade-in-up delay-200">
                    It seems this page has gone off the grid. The event you're looking for doesn't exist in our sphere.
                </p>

                {/* Call to Action Button */}
                <div className="animate-fade-in-up delay-300">
                    <Button>
                        <a href="/" className="px-6 py-3 text-sm sm:text-base">
                            Go Back to HomePage
                        </a>
                    </Button>
                </div>

                {/* Fun Fact */}
                <div className="mt-8 text-gray-400 text-xs sm:text-sm italic animate-fade-in-up delay-400">
                    <p>
                         **Fun Fact:** The world's largest event, the Kumbh Mela in India, has a single-day attendance of over 30 million people!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;