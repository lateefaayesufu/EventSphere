import Button from "../components/sections/ui/Button";
import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Star,
  Calendar,
  MapPin,
  Users,
  X,
  DollarSign,
  Info,
} from "lucide-react";
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";

// All image imports are back here
import environmentalSummit from "/environment.jpg";
import afroBeats from "/afro.jpg";
import fashion from "/fashion.jpg";
import equity from "/equity.jpg";
import football from "/football.jpg";
import art from "/art.jpg";
import career from "/career.jpg";
import poetry from "/poetry.jpg";
import research from "/research.jpg";
import donation from "/donation.jpg";
import studentHackathon from "/student-hackathon.jpg";
import photographyExhibit from "/photography-exhibit.jpg";



const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
        "Experience the vibrant sounds of Afrobeat with live performances from top campus artists and guest musicians. Join us for a night of rhythm, dance, and cultural celebration. This event is a fusion of modern and traditional African sounds, bringing together students and music lovers from all walks of life. Don't miss out on this electrifying night!",
      image: afroBeats,
      category: "Cultural",
      date: "2025-12-20",
      time: "7:00 PM",
      venue: "Main Auditorium",
      organizer: "Cultural Affairs Department",
      registered: 185,
      capacity: 300,
      status: "Open",
      deadline: "2025-12-18",
      featured: true,
    },
    {
      id: 2,
      title: "Career Fair 2024",
      description:
        "Connect with top employers, explore internship opportunities, and kickstart your professional journey. This is your chance to network with industry leaders, attend resume workshops, and participate in mock interviews. Prepare for a future full of possibilities!",
      image: career,
      category: "Academic",
      date: "2025-09-11",
      time: "10:00 AM",
      venue: "Exhibition Hall",
      organizer: "Career Services Center",
      registered: 420,
      capacity: 500,
      status: "Open",
      deadline: "2025-09-11",
      featured: false,
    },
    {
      id: 3,
      title: "Inter-Faculty Football Championship",
      description:
        "Witness the ultimate showdown as faculties compete for the prestigious championship trophy. Get ready for an intense day of football action, cheering for your favorite team, and celebrating campus unity. Food and drinks will be available.",
      image: football,
      category: "Sports",
      date: "2025-12-22",
      time: "4:00 PM",
      venue: "Sports Complex",
      organizer: "Sports Department",
      registered: 150,
      capacity: 200,
      status: "Open",
      deadline: "2025-12-20",
      featured: true,
    },
    {
      id: 4,
      title: "Contemporary Art Exhibition",
      description:
        "Explore thought-provoking artworks by talented student artists from across different faculties. The exhibition will feature paintings, sculptures, and digital art, all exploring themes of modern identity and societal change.",
      image: art,
      category: "Cultural",
      date: "2025-12-21",
      time: "2:00 PM",
      venue: "Art Gallery",
      organizer: "Fine Arts Department",
      registered: 78,
      capacity: 150,
      status: "Open",
      deadline: "2025-12-19",
      featured: false,
    },
    {
      id: 5,
      title: "Blood Donation Drive",
      description:
        "Join us in saving lives. Every drop counts in our community health initiative. Your donation can make a difference and help those in need. Free refreshments and medical checkups will be provided to all donors.",
      image: donation,
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
        "An intimate evening of powerful words, emotions, and artistic expression by campus poets. This open-mic event is a space for creativity and self-expression. Come and share your work or simply enjoy the talent on display.",
      image: poetry,
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
        "Learn about climate action, sustainable practices, and join our campus green initiative. Experts will discuss topics like renewable energy, waste management, and conservation. Participate in hands-on workshops and contribute to a greener future.",
      image: environmentalSummit,
      category: "Academic",
      date: "2025-12-23",
      time: "11:00 AM",
      venue: "Conference Center",
      organizer: "Environmental Club",
      registered: 120,
      capacity: 200,
      status: "Open",
      deadline: "2025-12-21",
      featured: true,
    },
    {
      id: 8,
      title: "Research Symposium 2024",
      description:
        "Undergraduate researchers present groundbreaking projects across various academic disciplines. This symposium is an opportunity to learn about cutting-edge research, network with faculty, and get inspired for your own academic pursuits.",
      image: research,
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
        "Witness creativity and style as student designers showcase their latest fashion collections. From couture to street style, this event has it all. Join us for a glamorous night celebrating the artistry of our talented students.",
      image: fashion,
      category: "Cultural",
      date: "2025-12-25",
      time: "8:00 PM",
      venue: "Student Union Hall",
      organizer: "Fashion Design Club",
      registered: 220,
      capacity: 250,
      status: "Open",
      deadline: "2025-12-23",
      featured: false,
    },
    {
      id: 10,
      title: "Interfaith Unity Service",
      description:
        "Come together in peace and harmony as we celebrate our diverse religious traditions. This service is dedicated to fostering understanding and respect among all campus communities, regardless of faith.",
      image: equity,
      category: "Religious",
      date: "2025-12-24",
      time: "5:00 PM",
      venue: "Multi-faith Chapel",
      organizer: "Campus Ministry",
      registered: 140,
      capacity: 200,
      status: "Open",
      deadline: "2025-12-22",
      featured: false,
    },
    {
      id: 11,
      title: "Student Innovation Hackathon",
      description:
        "Code, collaborate, and create groundbreaking solutions to real-world problems over 48 hours. Compete for prizes, network with tech leaders, and build something amazing. All skill levels are welcome!",
      image: studentHackathon,
      category: "Academic",
      date: "2025-09-09",
      time: "9:00 AM",
      venue: "Innovation Hub",
      organizer: "Computer Science Club",
      registered: 250,
      capacity: 300,
      status: "Open",
      deadline: "2025-09-12",
      featured: true,
    },
    {
      id: 12,
      title: "Photography Club Exhibition",
      description:
        "A showcase of stunning photos from our members, capturing campus life and beyond. The exhibit will feature various styles and themes, from landscape to portraiture. It's a visual journey you won't want to miss.",
      image: photographyExhibit,
      category: "Cultural",
      date: "2025-09-10",
      time: "11:00 AM",
      venue: "Campus Art Gallery",
      organizer: "Photography Club",
      registered: 80,
      capacity: 100,
      status: "Open",
      deadline: "2025-09-12",
      featured: false,
    },
  ];

  const categorizeEvents = (events) => {
    const now = new Date();
    const upcoming = [];
    const ongoing = [];
    const past = [];

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const eventDeadline = new Date(event.deadline);

      if (eventDate > now) {
        upcoming.push(event);
      } else if (eventDate <= now && eventDeadline >= now) {
        ongoing.push(event);
      } else {
        past.push(event);
      }
    });

    return { upcoming, ongoing, past };
  };

  const filteredEvents = eventsData.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedAndFilteredEvents = [...filteredEvents].sort((a, b) => {
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

  const { upcoming, ongoing, past } = categorizeEvents(sortedAndFilteredEvents);

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

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const renderEventCards = (events) => {
    return events.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <div
            key={event.id}
            className={`group bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.02] relative ${
              event.featured ? "ring-2 ring-purple-400/50" : ""
            }`}
          >
            {event.featured && (
              <div className="absolute -top-2 -right-2 z-20">
                <div className="bg-white/30 backdrop-blur-md rounded-full p-2 animate-pulse">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              </div>
            )}

            <div className="relative overflow-hidden h-56">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div
                className={`absolute top-4 left-4 ${getCategoryColor(
                  event.category
                )} backdrop-blur-lg rounded-full px-4 py-2 text-xs font-bold text-white border border-white/20 shadow-lg`}
              >
                {event.category}
              </div>
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-lg rounded-full px-4 py-2 text-xs font-bold text-white border border-white/20">
                {event.registered}/{event.capacity}
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {event.title}
              </h3>
              <p className="text-gray-300 text-base mb-6 line-clamp-2 leading-relaxed">
                {event.description}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
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
              <Button onClick={() => handleOpenModal(event)}>
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No events to show.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      <Navbar />
      {/* Animated Background Elements */}
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16 relative py-20 rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/events.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <h1 className="relative text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Campus Events
          </h1>
          <p className="relative text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in unforgettable experiences. From cultural
            celebrations to academic breakthroughs.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Bar */}
            <div className="relative w-full lg:w-auto lg:flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for your next adventure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 backdrop-blur-lg transition-all text-lg"
              />
            </div>

            {/* Category Filters and Sort Dropdown */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full lg:w-auto">
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-3 rounded-2xl text-sm font-semibold hover:scale-105 transition-transform ${
                      selectedCategory === category
                        ? "bg-white text-black shadow-lg"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative z-20 w-full md:w-auto">
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
        </div>

        {/* Events Sections */}
        <h2 className="text-4xl font-bold text-white mb-8 mt-16 text-center">
          Upcoming Events
        </h2>
        {renderEventCards(upcoming)}

        <h2 className="text-4xl font-bold text-white mb-8 mt-16 text-center">
          Ongoing Events
        </h2>
        {renderEventCards(ongoing)}

        <h2 className="text-4xl font-bold text-white mb-8 mt-16 text-center">
          Past Events
        </h2>
        {renderEventCards(past)}
      </div>
      <Footer />

      {/* Event Details Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative bg-gradient-to-br from-[#1E1F2E] to-[#2B2426] rounded-3xl shadow-2xl max-w-xl w-full flex flex-col max-h-[90vh] border border-white/20">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2 rounded-full bg-white/10 backdrop-blur-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover rounded-t-3xl"
            />

            <div className="p-8 overflow-y-auto no-scrollbar">
              {" "}
              {/* Added no-scrollbar class here */}
              <h2 className="text-4xl font-bold text-white mb-2">
                {selectedEvent.title}
              </h2>
              <div className="flex items-center gap-2 mb-6">
                <span
                  className={`${getCategoryColor(
                    selectedEvent.category
                  )} backdrop-blur-lg rounded-full px-4 py-2 text-xs font-bold text-white border border-white/20 shadow-lg`}
                >
                  {selectedEvent.category}
                </span>
                <span
                  className={`text-sm font-semibold ${getStatusColor(
                    selectedEvent.status
                  )}`}
                >
                  {selectedEvent.status}
                </span>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-purple-400 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-semibold">Date</p>
                      <p>
                        {new Date(selectedEvent.date).toLocaleDateString()} at{" "}
                        {selectedEvent.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-semibold">Venue</p>
                      <p>{selectedEvent.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-semibold">Capacity</p>
                      <p>
                        {selectedEvent.registered}/{selectedEvent.capacity}{" "}
                        registered
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Info className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-semibold">Organizer</p>
                      <p>{selectedEvent.organizer}</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button requireAuth={true} onClick={() => console.log("Button clicked!")}>
                Register for this Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
