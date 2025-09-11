import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Clock,
  Heart,
  Share2,
  ChevronDown,
} from "lucide-react";
import Navbar from "../ui/Navbar";

const eventsData = [
  {
    id: 1,
    title: "Afrobeat Night Live Concert",
    description:
      "Experience the best of contemporary African music with live performances from top campus artists and special guests.",
    category: "Cultural",
    date: "2024-12-20",
    time: "7:00 PM",
    venue: "Main Auditorium",
    organizer: "Cultural Affairs Department",
    registered: 245,
    capacity: 300,
    image: "🎵",
    status: "open",
    department: "Student Affairs",
  },
  {
    id: 2,
    title: "Career Fair 2024",
    description:
      "Connect with top employers, explore internship opportunities, and kickstart your professional journey.",
    category: "Academic",
    date: "2024-12-19",
    time: "10:00 AM",
    venue: "Exhibition Hall",
    organizer: "Career Services Center",
    registered: 189,
    capacity: 500,
    image: "💼",
    status: "open",
    department: "Career Services",
  },
  {
    id: 3,
    title: "Inter-Faculty Football Tournament",
    description:
      "Cheer for your faculty in this exciting championship featuring all departments competing for the golden trophy.",
    category: "Sports",
    date: "2024-12-15",
    time: "3:00 PM",
    venue: "Sports Complex",
    organizer: "Sports Department",
    registered: 156,
    capacity: 200,
    image: "⚽",
    status: "open",
    department: "Sports",
  },
  {
    id: 4,
    title: "Blood Donation Drive",
    description:
      "Save lives by donating blood. Medical team will be present to ensure safe and comfortable donation process.",
    category: "Community",
    date: "2024-12-16",
    time: "9:00 AM",
    venue: "Medical Center",
    organizer: "Health Services",
    registered: 78,
    capacity: 150,
    image: "❤️",
    status: "open",
    department: "Health Services",
  },
  {
    id: 5,
    title: "Traditional Dance Competition",
    description:
      "Celebrate our rich cultural heritage through traditional dances from various Nigerian ethnic groups.",
    category: "Cultural",
    date: "2024-12-18",
    time: "6:00 PM",
    venue: "Cultural Center",
    organizer: "Cultural Studies Department",
    registered: 67,
    capacity: 80,
    image: "💃",
    status: "open",
    department: "Cultural Studies",
  },
  {
    id: 6,
    title: "Financial Literacy Workshop",
    description:
      "Learn essential money management skills, investment basics, and budgeting strategies for students.",
    category: "Academic",
    date: "2024-12-23",
    time: "2:00 PM",
    venue: "Business School",
    organizer: "Economics Department",
    registered: 92,
    capacity: 100,
    image: "💰",
    status: "open",
    department: "Economics",
  },
  {
    id: 7,
    title: "Basketball Championship Finals",
    description:
      "The ultimate showdown between top basketball teams. Don't miss this thrilling finale!",
    category: "Sports",
    date: "2024-12-24",
    time: "4:00 PM",
    venue: "Gymnasium",
    organizer: "Sports Department",
    registered: 234,
    capacity: 250,
    image: "🏀",
    status: "almost_full",
    department: "Sports",
  },
  {
    id: 8,
    title: "Poetry & Spoken Word Evening",
    description:
      "An intimate evening of creative expression featuring student poets and guest spoken word artists.",
    category: "Cultural",
    date: "2024-12-16",
    time: "7:30 PM",
    venue: "Library Amphitheater",
    organizer: "English Department",
    registered: 45,
    capacity: 60,
    image: "📝",
    status: "open",
    department: "English",
  },
  {
    id: 9,
    title: "Mental Health Awareness Workshop",
    description:
      "Understanding mental wellness, stress management, and campus support resources available to students.",
    category: "Health",
    date: "2024-12-19",
    time: "11:00 AM",
    venue: "Counseling Center",
    organizer: "Student Counseling Services",
    registered: 38,
    capacity: 50,
    image: "🧠",
    status: "open",
    department: "Counseling",
  },
];

const categories = [
  "All",
  "Cultural",
  "Academic",
  "Sports",
  "Community",
  "Health",
];
const departments = [
  "All",
  "Student Affairs",
  "Career Services",
  "Sports",
  "Health Services",
  "Cultural Studies",
  "Economics",
  "English",
  "Counseling",
];

const Events = () => {
  const [events] = useState(eventsData);
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    let filtered = events;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    // Department filter
    if (selectedDepartment !== "All") {
      filtered = filtered.filter(
        (event) => event.department === selectedDepartment
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date) - new Date(b.date);
        case "popularity":
          return b.registered - a.registered;
        case "availability":
          return a.capacity - a.registered - (b.capacity - b.registered);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, selectedDepartment, sortBy, events]);

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "almost_full":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "full":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Cultural: "bg-purple-500/20 text-purple-400",
      Academic: "bg-blue-500/20 text-blue-400",
      Sports: "bg-orange-500/20 text-orange-400",
      Community: "bg-green-500/20 text-green-400",
      Health: "bg-red-500/20 text-red-400",
    };
    return colors[category] || "bg-gray-500/20 text-gray-400";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-4">
              Campus Events
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Discover amazing events happening on campus
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {filteredEvents.length}
                </div>
                <div className="text-sm text-purple-300">Events Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {filteredEvents.filter((e) => e.status === "open").length}
                </div>
                <div className="text-sm text-purple-300">Open Registration</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, organizers, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-full py-3 pl-12 pr-4 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all"
              />
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-purple-300 hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort and Department Filters */}
              <div className="flex items-center space-x-4">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-gray-900">
                      {dept === "All" ? "All Departments" : dept}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="date" className="bg-gray-900">
                    Sort by Date
                  </option>
                  <option value="popularity" className="bg-gray-900">
                    Sort by Popularity
                  </option>
                  <option value="availability" className="bg-gray-900">
                    Sort by Availability
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
              >
                {/* Event Image/Icon */}
                <div className="h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-6xl">
                  {event.image}
                </div>

                <div className="p-6">
                  {/* Category and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        event.category
                      )}`}
                    >
                      {event.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status === "open"
                        ? "Open"
                        : event.status === "almost_full"
                        ? "Almost Full"
                        : "Full"}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {event.title}
                  </h3>

                  {/* Event Description */}
                  <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-purple-300 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(event.date)} at {event.time}
                    </div>
                    <div className="flex items-center text-purple-300 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-purple-300 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      {event.registered}/{event.capacity} registered
                    </div>
                  </div>

                  {/* Organizer */}
                  <p className="text-xs text-purple-400 mb-4">
                    Organized by {event.organizer}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105">
                      Register Now
                    </button>
                    <button className="p-2 bg-white/10 backdrop-blur-lg rounded-lg text-purple-300 hover:text-white hover:bg-white/20 transition-all">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/10 backdrop-blur-lg rounded-lg text-purple-300 hover:text-white hover:bg-white/20 transition-all">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No events found
              </h3>
              <p className="text-purple-300 mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedDepartment("All");
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
