import React, { useState } from "react";
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState("All");
  const images = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    src: `/Food${i + 1}.jpg`,
    type: "image",
    year: [2021, 2022, 2023, 2024][Math.floor(Math.random() * 4)],
    height: Math.floor(Math.random() * 200) + 250,
  }));

  const videos = Array.from({ length: 4 }, (_, i) => ({
    id: `video-${i + 1}`,
    src: `/Video${i + 1}.mp4`,
    type: "video",
    year: [2022, 2023, 2024][Math.floor(Math.random() * 3)],

    height: 300,
  }));

  const allMedia = [...images, ...videos];
  const years = ["All", "2024", "2023", "2022", "2021"];

  const filteredMedia = allMedia.filter(
    (item) => selectedYear === "All" || item.year.toString() === selectedYear
  );

  return (
    <div className="min-h-screen pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      <Navbar />

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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div
            className="text-center mb-16 relative py-20 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url('/gallery.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative flex items-center justify-center mb-6">
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Media Gallery
              </h1>
            </div>
            <p className="relative text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Relive the magic of campus life through our visual journey. Every
              moment captured, every memory preserved.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {filteredMedia.length}
              </div>
              <div className="text-gray-400 text-sm">Media Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {filteredMedia.filter((item) => item.type === "image").length}
              </div>
              <div className="text-gray-400 text-sm">Photos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {filteredMedia.filter((item) => item.type === "video").length}
              </div>
              <div className="text-gray-400 text-sm">Videos</div>
            </div>
          </div>
        </div>

        {/* Year Filter */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Filter by Year
              </h2>
              <p className="text-gray-400">
                Explore memories from different academic years
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                    selectedYear === year
                      ? "bg-white text-black shadow-lg scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20 hover:scale-105"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-gradient-to-b hover:from-white/15 hover:to-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              style={{ marginBottom: "24px" }}
            >
              {item.type === "image" ? (
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ height: `${item.height}px` }}
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      e.target.src = `https://unsplash.com/photos/a-crowd-of-people-standing-around-a-basketball-court-2qEA9np6O4E`;
                    }}
                  />
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg rounded-full px-3 py-1 text-xs font-bold text-white">
                    {item.year}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <video
                    className="w-full object-cover rounded-t-2xl"
                    style={{ height: `${item.height}px` }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={(e) => e.target.play()}
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg rounded-full px-3 py-1 text-xs font-bold text-white">
                    {item.year}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMedia.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 max-w-lg mx-auto border border-white/20">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-2xl font-bold text-white mb-3">
                No media found
              </h3>
              <p className="text-gray-400 text-lg">
                No photos or videos found for the selected year. Try a different
                filter!
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Share Your Memories?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community and contribute to the visual story of campus
              life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg">
                Upload Media
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                Browse Events
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
