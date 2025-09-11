import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronDown,
  Sparkles,
  Star,
} from "lucide-react";
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";

const Events = () => {
  <Navbar />;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const categories = [
    "All",
    "Cultural",
    "Academic",
    "Sports",
    "Social",
    "Religious",
  ];

  const eventsData = [
    {
      id: 1,
      title: "Afrobeat Cultural Night",
      description:
        "Experience the vibrant sounds of Afrobeat with live performances from top campus artists and guest musicians.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
      category: "Cultural",
      date: "2024-12-20",
      time: "7:00 PM",
      venue: "Main Auditorium",
      organizer: "Cultural Affairs Department",
      registered: 185,
      capacity: 300,
      status: "Open",
      deadline: "2024-12-18",
      featured: true,
    },
    {
      id: 2,
      title: "Career Fair 2024",
      description:
        "Connect with top employers, explore internship opportunities, and kickstart your professional journey.",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop",
      category: "Academic",
      date: "2024-12-19",
      time: "10:00 AM",
      venue: "Exhibition Hall",
      organizer: "Career Services Center",
      registered: 420,
      capacity: 500,
      status: "Open",
      deadline: "2024-12-17",
      featured: false,
    },
    {
      id: 3,
      title: "Inter-Faculty Football Championship",
      description:
        "Witness the ultimate showdown as faculties compete for the prestigious championship trophy.",
      image:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop",
      category: "Sports",
      date: "2024-12-22",
      time: "4:00 PM",
      venue: "Sports Complex",
      organizer: "Sports Department",
      registered: 150,
      capacity: 200,
      status: "Open",
      deadline: "2024-12-20",
      featured: true,
    },
    {
      id: 4,
      title: "Contemporary Art Exhibition",
      description:
        "Explore thought-provoking artworks by talented student artists from across different faculties.",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop",
      category: "Cultural",
      date: "2024-12-21",
      time: "2:00 PM",
      venue: "Art Gallery",
      organizer: "Fine Arts Department",
      registered: 78,
      capacity: 150,
      status: "Open",
      deadline: "2024-12-19",
      featured: false,
    },
    {
      id: 5,
      title: "Blood Donation Drive",
      description:
        "Join us in saving lives. Every drop counts in our community health initiative.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      category: "Social",
      date: "2024-12-16",
      time: "9:00 AM",
      venue: "Medical Center",
      organizer: "Red Cross Society",
      registered: 95,
      capacity: 100,
      status: "Almost Full",
      deadline: "2024-12-15",
      featured: false,
    },
    {
      id: 6,
      title: "Poetry & Spoken Word Evening",
      description:
        "An intimate evening of powerful words, emotions, and artistic expression by campus poets.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
      category: "Cultural",
      date: "2024-12-18",
      time: "6:30 PM",
      venue: "Library Amphitheater",
      organizer: "Literary Society",
      registered: 45,
      capacity: 80,
      status: "Open",
      deadline: "2024-12-17",
      featured: false,
    },
    {
      id: 7,
      title: "Environmental Sustainability Summit",
      description:
        "Learn about climate action, sustainable practices, and join our campus green initiative.",
      image:
        "https://images.unsplash.com/photo-1569163139394-de44cb4fef64?w=500&h=300&fit=crop",
      category: "Academic",
      date: "2024-12-23",
      time: "11:00 AM",
      venue: "Conference Center",
      organizer: "Environmental Club",
      registered: 120,
      capacity: 200,
      status: "Open",
      deadline: "2024-12-21",
      featured: true,
    },
    {
      id: 8,
      title: "Research Symposium 2024",
      description:
        "Undergraduate researchers present groundbreaking projects across various academic disciplines.",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&h=300&fit=crop",
      category: "Academic",
      date: "2024-12-17",
      time: "1:00 PM",
      venue: "Academic Complex",
      organizer: "Research Office",
      registered: 65,
      capacity: 150,
      status: "Open",
      deadline: "2024-12-16",
      featured: false,
    },
    {
      id: 9,
      title: "Campus Fashion Show",
      description:
        "Witness creativity and style as student designers showcase their latest fashion collections.",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=300&fit=crop",
      category: "Cultural",
      date: "2024-12-25",
      time: "8:00 PM",
      venue: "Student Union Hall",
      organizer: "Fashion Design Club",
      registered: 220,
      capacity: 250,
      status: "Open",
      deadline: "2024-12-23",
      featured: false,
    },
    {
      id: 10,
      title: "Interfaith Unity Service",
      description:
        "Come together in peace and harmony as we celebrate our diverse religious traditions.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      category: "Religious",
      date: "2024-12-24",
      time: "5:00 PM",
      venue: "Multi-faith Chapel",
      organizer: "Campus Ministry",
      registered: 140,
      capacity: 200,
      status: "Open",
      deadline: "2024-12-22",
      featured: false,
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Cultural: "bg-purple-500/80",
      Academic: "bg-blue-500/80",
      Sports: "bg-green-500/80",
      Social: "bg-pink-500/80",
      Religious: "bg-yellow-500/80",
    };
    return colors[category] || "bg-gray-500/80";
  };

  const getStatusColor = (status) => {
    const colors = {
      Open: "text-green-400",
      "Almost Full": "text-orange-400",
      Full: "text-red-400",
    };
    return colors[status] || "text-gray-400";
  };

  const filteredEvents = eventsData.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "Latest") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === "Popular") {
      return b.registered - a.registered;
    }
    if (sortBy === "Deadline") {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    return 0;
  });

  return (
    <div className="min-h-screen  pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
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
        {/* Page Header */}
        <div className="text-center mb-16">
          <div
            className="text-center mb-16 relative py-20 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url('/events.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <h1 className="relative text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Campus Events
            </h1>
            <p className="relative text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in unforgettable experiences. From cultural
              celebrations to academic breakthroughs.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {filteredEvents.length}
              </div>
              <div className="text-gray-400 text-sm">Active Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">5K+</div>
              <div className="text-gray-400 text-sm">Students Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-gray-400 text-sm">Categories</div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute -inset-1 rounded-xl blur opacity-30 group-hover:opacity-100 "></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for your next adventure..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all text-lg"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown - CUSTOM COMPONENT */}
            <div className="relative z-20">
              <div
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="group cursor-pointer flex items-center justify-between gap-4 bg-white/10 border border-white/30 rounded-xl px-6 py-4 text-white hover:bg-white/15 transition-colors duration-300 backdrop-blur-lg"
              >
                <span className="font-medium text-lg">{sortBy}</span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
                    isSortDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isSortDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white/10 border border-white/30 rounded-xl backdrop-blur-lg shadow-xl overflow-hidden">
                  <div
                    className="px-6 py-4 text-white hover:bg-white/20 cursor-pointer transition-colors"
                    onClick={() => {
                      setSortBy("Latest");
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    Latest
                  </div>
                  <div
                    className="px-6 py-4 text-white hover:bg-white/20 cursor-pointer transition-colors"
                    onClick={() => {
                      setSortBy("Popular");
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    Popular
                  </div>
                  <div
                    className="px-6 py-4 text-white hover:bg-white/20 cursor-pointer transition-colors"
                    onClick={() => {
                      setSortBy("Deadline");
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    Deadline
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="flex flex-wrap justify-center gap-10">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className={`group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:bg-gradient-to-b hover:from-white/15 hover:to-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 max-w-sm relative ${
                event.featured ? "ring-2 ring-purple-400/50" : ""
              }`}
            >
              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 animate-pulse">
                    <Star className="w-5 h-5 text-white fill-current" />
                  </div>
                </div>
              )}

              {/* Event Image */}
              <div className="relative overflow-hidden h-56">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent z-10"></div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Category Badge */}
                <div
                  className={`absolute top-4 left-4 ${getCategoryColor(
                    event.category
                  )} backdrop-blur-lg rounded-full px-4 py-2 text-xs font-bold text-white border border-white/20 shadow-lg`}
                >
                  {event.category}
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-lg rounded-full px-4 py-2 text-xs font-bold text-white border border-white/20">
                  {event.registered}/{event.capacity}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Event Details */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all duration-300">
                  {event.title}
                </h3>

                <p className="text-gray-300 text-base mb-6 line-clamp-2 group-hover:text-gray-200 transition-colors leading-relaxed">
                  {event.description}
                </p>

                {/* Event Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="font-medium">
                      {new Date(event.date).toLocaleDateString()} at{" "}
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Users className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-medium ${getStatusColor(event.status)}`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg border border-transparent hover:border-purple-400/50">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 max-w-lg mx-auto border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-3">
                No events found
              </h3>
              <p className="text-gray-400 text-lg">
                Try adjusting your search or filter criteria to discover amazing
                events!
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events;
