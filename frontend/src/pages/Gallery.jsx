import Button from "../components/sections/ui/Button";
import React, { useState, useEffect, useRef } from "react"; // Import useRef
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null); // Create a ref for the carousel container

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // --- Scroll functions for custom arrows ---
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8; // Scroll by ~80% of container width
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderMediaItem = (item, isCarousel) => (
    <div
      key={item.id}
      className={`relative break-inside-avoid group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
        isCarousel ? "snap-center w-full flex-shrink-0" : "mb-6"
      }`}
    >
      {item.type === "image" ? (
        <div className="relative overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            className={`w-full object-cover transition-transform duration-700 ${
              isCarousel ? "h-[300px]" : ""
            }`}
            style={isCarousel ? {} : { height: `${item.height}px` }}
            onError={(e) => {
              e.target.src = `https://unsplash.com/photos/a-crowd-of-people-standing-around-a-basketball-court-2qEA9np6O4E`;
            }}
          />
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg rounded-full px-3 py-1 text-xs font-bold text-white">
            {item.year}
          </div>
        </div>
      ) : (
        <div className="relative">
          <video
            className={`w-full object-cover rounded-t-2xl ${
              isCarousel ? "h-[300px]" : ""
            }`}
            style={isCarousel ? {} : { height: `${item.height}px` }}
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
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg rounded-full px-3 py-1 text-xs font-bold text-white">
            {item.year}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      <Navbar />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div
            className="text-center mb-16 relative py-16 sm:py-20 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url('/gallery.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
                Media Gallery
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed px-4">
                Relive the magic of campus life through our visual journey.
                Every moment captured, every memory preserved.
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-center gap-8 mt-8 flex-wrap">
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

        <div className="mb-12">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Filter by Year
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Explore memories from different academic years
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition-all duration-300 ${
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

        {isMobile ? (
          <div className="mb-12 relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 transition-all z-10 ml-2"
            >
              <ChevronLeft size={24} />
            </button>

            <div
              ref={carouselRef} // Attach ref here
              className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 px-12 no-scrollbar" // Added horizontal padding for arrows
            >
              {filteredMedia.map((item) => (
                <div key={item.id} className="w-4/5 flex-shrink-0 snap-center">
                  {renderMediaItem(item, true)}
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 transition-all z-10 mr-2"
            >
              <ChevronRight size={24} />
            </button>

            {/* Scroll Indicator */}
            <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-400">
              <span className="inline-block bg-white/20 rounded-full px-3 py-1">
                Swipe or use arrows to view more
              </span>
            </div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredMedia.map((item) => (
              <div key={item.id} className="mb-6">
                {renderMediaItem(item, false)}
              </div>
            ))}
          </div>
        )}

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

        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Share Your Memories?
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community and contribute to the visual story of campus
              life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button requireAuth={true} onClick={() => console.log("Button clicked!")}>
                Upload Media
              </Button>
              <Button onClick={() => console.log("Button clicked!")}>
                Browse Events
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
