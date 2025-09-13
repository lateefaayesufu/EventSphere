import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "lucide-react";

const FeaturedEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(null);

  const featuredEvents = [
    {
      id: 1,
      title: "Innovation Hackathon 2024",
      date: "Dec 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Tech Hub, Main Campus",
      description:
        "48 hours of coding, innovation, and prizes worth $50,000. Join the biggest hackathon of the year!",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      category: "Technical",
      spots: 45,
      totalSpots: 200,
      price: "Free",
      rating: 4.9,
      organizer: "Computer Science Dept",
      gradient: "from-blue-600 via-purple-600 to-indigo-800",
      featured: true,
    },
    {
      id: 2,
      title: "Cultural Fusion Night",
      date: "Dec 20, 2024",
      time: "7:00 PM - 11:00 PM",
      location: "Grand Auditorium",
      description:
        "A spectacular evening celebrating diverse cultures with music, dance, and traditional performances.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      category: "Cultural",
      spots: 12,
      totalSpots: 500,
      price: "$50",
      rating: 4.8,
      organizer: "Cultural Committee",
      gradient: "from-pink-600 via-red-500 to-orange-600",
    },
    {
      id: 3,
      title: "AI & ML Summit",
      date: "Jan 5, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Innovation Center",
      description:
        "Industry experts share insights on the future of AI. Networking, workshops, and hands-on sessions.",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
      category: "Workshop",
      spots: 78,
      totalSpots: 150,
      price: "$200",
      rating: 4.7,
      organizer: "AI Research Lab",
      gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      date: "Jan 12, 2025",
      time: "2:00 PM - 8:00 PM",
      location: "Business Center",
      description:
        "Present your startup idea to VCs and industry leaders. Win funding and mentorship opportunities.",
      image:
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop",
      category: "Competition",
      spots: 25,
      totalSpots: 100,
      price: "Free",
      rating: 4.9,
      organizer: "Entrepreneurship Cell",
      gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
    },
  ];

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredEvents.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relativebg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] pt-20 pb-0 overflow-hidden">
      <header className="relative text-center mb-16 px-4 md:px-8">
        {/* Background glow effect */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-96 h-32 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Featured badge */}
        <div className="relative inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mt-6">
          <SparklesIcon className="h-4 w-4 text-yellow-400 animate-pulse" />
          <span className="text-white/80 font-medium text-sm">
            Handpicked for You
          </span>
        </div>

        {/* Main heading */}
        <h2 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6">
          <div className="text-white">
            Events Happening
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              {" "}
              Now
            </span>
          </div>
        </h2>

        <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mt-4 px-4">
          Explore a curated list of the most popular and impactful events on
          campus. Secure your spot before it's too late!
          <span className="block mt-1 font-semibold text-white/80">
            Limited spots available.
          </span>
        </p>
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
      </header>
      <div className="relative z-10 max-w-7xl mx-auto py-10 md:py-20">
        {/* Main Featured Event Carousel */}
        <div className="relative mb-16">
          <div className="relative overflow-hidden md:overflow-hidden overflow-x-scroll md:overflow-x-hidden rounded-xl md:rounded-3xl w-full">
            <div
              className="flex w-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredEvents.map((event) => (
                <div key={event.id} className="w-full flex-shrink-0">
                  {/* Remove fixed height and add min-h-[500px] for desktop */}
                  <div className="relative w-full overflow-hidden rounded-xl md:rounded-3xl min-h-[500px] lg:min-h-[600px] flex flex-col justify-end">
                    {/* Background Image with Overlay */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover -z-10"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${event.gradient} opacity-80 -z-10`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent -z-10"></div>

                    {/* Content Overlay */}
                    <div className="relative p-6 md:p-12 lg:p-16 text-white w-full">
                      <div className="max-w-4xl">
                        {/* Event Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                            {event.category}
                          </span>
                          {event.featured && (
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              event.spots < 20
                                ? "bg-red-500/80"
                                : "bg-green-500/80"
                            }`}
                          >
                            {event.spots} spots left
                          </span>
                        </div>

                        {/* Title and Description */}
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm md:text-xl text-white/90 mb-4 max-w-2xl">
                          {event.description}
                        </p>

                        {/* Event Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                              <CalendarIcon className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                            <div>
                              <div className="text-xs text-white/70">
                                Date & Time
                              </div>
                              <div className="font-semibold text-sm md:text-base">
                                {event.date}
                              </div>
                              <div className="text-xs text-white/80">
                                {event.time}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                              <MapPinIcon className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                            <div>
                              <div className="text-xs text-white/70">
                                Location
                              </div>
                              <div className="font-semibold text-sm md:text-base">
                                {event.location}
                              </div>
                              <div className="text-xs text-white/80">
                                {event.organizer}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                              <StarIcon className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />
                            </div>
                            <div>
                              <div className="text-xs text-white/70">
                                Rating & Price
                              </div>
                              <div className="font-semibold text-sm md:text-base">
                                {event.rating} ⭐ • {event.price}
                              </div>
                              <div className="text-xs text-white/80">
                                {event.totalSpots - event.spots} registered
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button className="group bg-white text-slate-900 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg flex items-center justify-center space-x-2 hover:bg-white/90 transition-all transform hover:scale-105 shadow-2xl">
                            <span>I'm in!</span>
                            <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-lg hover:bg-white/20 transition-all">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group z-20"
          >
            <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group z-20"
          >
            <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
            {featuredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
          {featuredEvents.slice(1).map((event) => (
            <div
              key={event.id}
              className="group bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              {/* First Div - Image */}
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-60 group-hover:opacity-70 transition-opacity`}
                ></div>

                {/* Badges on image */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-medium">
                    {event.category}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.spots < 20
                        ? "bg-red-500/80 text-white"
                        : "bg-white/20 backdrop-blur-sm text-white"
                    }`}
                  >
                    {event.spots} left
                  </span>
                </div>
              </div>

              {/* Second Div - Text Content */}
              <div className="p-4 md:p-6 text-white bg-gradient-to-b from-black/60 to-transparent">
                <h4 className="font-bold text-lg mb-2">{event.title}</h4>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span>{event.date}</span>
                  <span className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span>{event.rating}</span>
                  </span>
                </div>
                <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events CTA */}
        <div className="text-center mt-16 px-4 md:px-8">
          <Link
            to="/events"
            className="group inline-flex items-center justify-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-2xl"
          >
            <span>See More</span>
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
