import Button from "../../components/sections/ui/Button";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Star,
  Plus,
  Search,
  Filter,
  Bell,
  Settings,
  BarChart3,
  QrCode,
  Upload,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  Clock,
  MapPin,
  Image,
  Award,
  UserCheck,
  Mail,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Camera,
  FileText,
  TrendingUp,
  Activity,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  Send,
  FileImage,
  User,
  Share2,
} from "lucide-react";

// --- Helper Components ---

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <div
    className={`bg-gradient-to-r ${color} backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-transform transform hover:scale-105`}
  >
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <div className="text-white/70">{icon}</div>
    </div>
    <p className="mt-2 text-4xl font-bold text-white">{value}</p>
    {subtitle && <p className="text-white/60 text-sm mt-1">{subtitle}</p>}
  </div>
);

const EventCard = ({
  event,
  onViewDetails,
  onEdit,

  onQRScan,
  onManageRegistrations,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/20 text-green-300";
      case "Pending Approval":
        return "bg-yellow-500/20 text-yellow-300";
      case "Ongoing":
        return "bg-blue-500/20 text-blue-300";
      case "Completed":
        return "bg-purple-500/20 text-purple-300";
      case "Cancelled":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const handleShare = () => {
    const shareText = `Check out this awesome event: ${event.title}! Happening on ${event.date} at ${event.venue}. Register now!`;
    const shareUrl = window.location.href; // In a real app, this would be the event's public URL

    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: shareText,
          url: shareUrl,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Share this event! \n\n${shareText}\n\nLink: ${shareUrl}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] border border-white/10 rounded-2xl p-6 transition-transform hover:scale-[1.02] duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-semibold text-white mb-2">
            {event.title}
          </h4>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
              event.status
            )}`}
          >
            {event.status}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm">{event.rating}</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">{event.description}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>
            {event.registrations}/{event.maxParticipants}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => onViewDetails(event)}>
          View Details
        </Button>
        {event.status !== "Completed" && event.status !== "Cancelled" && (
          <Button requireAuth={true} onClick={() => onEdit(event)}>
            Edit
          </Button>
        )}
        <Button requireAuth={true} onClick={() => onManageRegistrations(event)}>
          Registrations
        </Button>
        {event.status === "Approved" && (
          <Button requireAuth={true} onClick={() => onQRScan(event)}>
            <QrCode className="w-4 h-4 inline mr-1" />
            Attendance
          </Button>
        )}
        <Button onClick={handleShare}>
          <Share2 className="w-4 h-4 inline mr-1" />
          Share
        </Button>
      </div>
    </div>
  );
};

// --- Modals ---

const CreateEventModal = ({ isOpen, onClose, onSave, event = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    maxParticipants: "",
    certificateFee: "",
    bannerImage: null,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        category: event.category || "",
        description: event.description || "",
        venue: event.venue || "",
        date: event.date || "",
        time: event.time || "",
        maxParticipants: event.maxParticipants || "",
        certificateFee: event.certificateFee || "",
        bannerImage: event.bannerImage || null,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, bannerImage: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: event ? event.id : Date.now(),
      status: "Pending Approval",
      registrations: 0,
      rating: 0,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">
            {event ? "Edit Event" : "Create New Event"}
          </h3>
          <Button onClick={onClose}>
            <XCircle size={24} />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Event Category (e.g., Technical, Cultural)"
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows="4"
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Venue"
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            placeholder="Maximum Participants"
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="number"
            name="certificateFee"
            value={formData.certificateFee}
            onChange={handleChange}
            placeholder="Certificate Fee (e.g., 100)"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
          />
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Event Banner Image
            </label>
            <input
              type="file"
              name="bannerImage"
              onChange={handleFileChange}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-white transition-colors"
          >
            {event ? "Save Changes" : "Submit for Approval"}
          </button>
        </form>
      </div>
    </div>
  );
};

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
        <p className="text-gray-400 mb-4">{event.description}</p>
        <Button onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

const RegistrationModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const participants = event.participants || [];
  const waitlist = event.waitlist || [];

  const handlePromoteToParticipant = (participantId) => {
    // Logic to move participant from waitlist to registered
    console.log(`Promoting participant ${participantId} to registered list.`);
    // In a real app, you would make an API call to update the database
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold text-white mb-4">
          Registrations for {event.title}
        </h3>

        {/* Registered Participants */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-green-400 flex items-center mb-2">
            <UserCheck size={20} className="mr-2" />
            Registered ({participants.length})
          </h4>
          {participants.length > 0 ? (
            <ul className="space-y-2 text-gray-300">
              {participants.map((p, index) => (
                <li key={index} className="p-2 bg-white/5 rounded-lg">
                  {p.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              No participants have registered yet.
            </p>
          )}
        </div>

        {/* Waitlist */}
        <div>
          <h4 className="text-xl font-semibold text-yellow-400 flex items-center mb-2">
            <Clock size={20} className="mr-2" />
            Waitlist ({waitlist.length})
          </h4>
          {waitlist.length > 0 ? (
            <ul className="space-y-2 text-gray-300">
              {waitlist.map((p, index) => (
                <li
                  key={index}
                  className="p-2 bg-white/5 rounded-lg flex justify-between items-center"
                >
                  <span>{p.name}</span>
                  <Button requireAuth={true} onClick={() => handlePromoteToParticipant(p.id)}>
                    Promote
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">The waitlist is empty.</p>
          )}
        </div>

        <Button onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

const QRScannerModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-xl w-full shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          Scan QR for {event.title}
        </h3>
        <p className="text-gray-400">QR code scanner UI goes here...</p>
        <Button onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

const CommunicationModal = ({ isOpen, onClose, event }) => {
  const [message, setMessage] = useState("");

  if (!isOpen || !event) return null;

  const handleSend = () => {
    alert(`Sending message to participants of ${event.title}: "${message}"`);
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-xl w-full shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          Communicate with Participants
        </h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Write an announcement for participants of ${event.title}...`}
          rows="6"
          className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
        ></textarea>
        <div className="flex justify-end mt-4 space-x-2">
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button requireAuth={true} onClick={handleSend}>
            <Send size={16} className="inline mr-2" />
            Send Announcement
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

const OrganizerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isQRScannerModalOpen, setIsQRScannerModalOpen] = useState(false);
  const [isCommunicationModalOpen, setIsCommunicationModalOpen] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);

  // Mock data to simulate events with more detail for new features
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "React Workshop",
      date: "2025-10-15",
      time: "10:00 AM",
      venue: "Lecture Hall 1",
      description: "Hands-on workshop to learn modern React development.",
      category: "Technical",
      status: "Approved",
      registrations: 45,
      maxParticipants: 50,
      rating: 4.8,
      certificateFee: 100,
      participants: [
        { id: 101, name: "John Doe" },
        { id: 102, name: "Jane Smith" },
      ],
      waitlist: [{ id: 201, name: "Sam Williams" }],
      media: [
        { id: 1, url: "https://via.placeholder.com/400x300", type: "image" },
      ],
      feedback: [{ rating: 5, comments: "Excellent workshop! Learned a lot." }],
    },
    {
      id: 2,
      title: "Annual Cultural Fest",
      date: "2025-11-20",
      time: "05:00 PM",
      venue: "College Auditorium",
      description: "A day filled with music, dance, and drama performances.",
      category: "Cultural",
      status: "Pending Approval",
      registrations: 0,
      maxParticipants: 200,
      rating: 0,
      certificateFee: 0,
      participants: [],
      waitlist: [],
      media: [],
      feedback: [],
    },
    {
      id: 3,
      title: "AI & ML Seminar",
      date: "2025-09-05",
      time: "02:00 PM",
      venue: "Seminar Room A",
      description:
        "An interactive seminar on the latest trends in AI and Machine Learning.",
      category: "Technical",
      status: "Completed",
      registrations: 85,
      maxParticipants: 100,
      rating: 4.5,
      certificateFee: 100,
      participants: [
        { id: 103, name: "Alice Brown" },
        { id: 104, name: "Bob Green" },
      ],
      waitlist: [],
      media: [
        { id: 2, url: "https://via.placeholder.com/400x300", type: "image" },
        { id: 3, url: "https://via.placeholder.com/400x300", type: "image" },
      ],
      feedback: [
        { rating: 5, comments: "Excellent workshop!" },
        {
          rating: 4,
          comments: "Great content, but could use more hands-on examples.",
        },
      ],
    },
  ]);

  const dashboardStats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(
      (e) => e.status === "Approved" || e.status === "Pending Approval"
    ).length,
    totalRegistrations: events.reduce(
      (sum, event) => sum + event.registrations,
      0
    ),
    avgRating: events
      .filter((e) => e.rating > 0)
      .reduce((sum, event, _, arr) => sum + event.rating / arr.length, 0)
      .toFixed(1),
  };

  const handleCreateEvent = () => {
    setEventToEdit(null);
    setIsCreateEventModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setIsCreateEventModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (eventToEdit) {
      setEvents(events.map((e) => (e.id === eventData.id ? eventData : e)));
    } else {
      setEvents([...events, eventData]);
    }
    setEventToEdit(null);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsModalOpen(true);
  };

  const handleManageRegistrations = (event) => {
    setSelectedEvent(event);
    setIsRegistrationModalOpen(true);
  };

  const handleQRScan = (event) => {
    setSelectedEvent(event);
    setIsQRScannerModalOpen(true);
  };

  const handleCommunication = (event) => {
    setSelectedEvent(event);
    setIsCommunicationModalOpen(true);
  };

  const handleCancelEvent = (eventId) => {
    setEvents(
      events.map((e) => (e.id === eventId ? { ...e, status: "Cancelled" } : e))
    );
  };

  // --- Content Components ---

  const OverviewContent = () => {
    const recentEvents = events.slice(0, 3);
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Events"
            value={dashboardStats.totalEvents}
            icon={<Calendar className="w-8 h-8" />}
            color="from-purple-500/10 to-blue-500/10"
            subtitle="Events created"
          />
          <StatCard
            title="Active Events"
            value={dashboardStats.upcomingEvents}
            icon={<Activity className="w-8 h-8" />}
            color="from-green-500/10 to-lime-500/10"
            subtitle="Upcoming & ongoing"
          />
          <StatCard
            title="Registrations"
            value={dashboardStats.totalRegistrations}
            icon={<Users className="w-8 h-8" />}
            color="from-blue-500/10 to-cyan-500/10"
            subtitle="Total participants"
          />
          <StatCard
            title="Avg Rating"
            value={dashboardStats.avgRating}
            icon={<Star className="w-8 h-8" />}
            color="from-yellow-500/10 to-orange-500/10"
            subtitle="Event feedback"
          />
        </div>
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button requireAuth={true} onClick={handleCreateEvent}>
              <Plus className="w-8 h-8 text-blue-300 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-white font-medium">Create Event</div>
              <div className="text-blue-300/70 text-sm">Add new event</div>
            </Button>
            <Button requireAuth={true} onClick={() => setSelectedTab("registrations")}>
              <UserCheck className="w-8 h-8 text-green-300 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-white font-medium">Registrations</div>
              <div className="text-green-300/70 text-sm">
                Manage participants
              </div>
            </Button>
            <Button requireAuth={true} onClick={() => setSelectedTab("attendance")}>
              <QrCode className="w-8 h-8 text-purple-300 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-white font-medium">QR Scanner</div>
              <div className="text-purple-300/70 text-sm">Mark attendance</div>
            </Button>
            <Button requireAuth={true} onClick={() => setSelectedTab("certificates")}>
              <Award className="w-8 h-8 text-orange-300 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-white font-medium">Certificates</div>
              <div className="text-orange-300/70 text-sm">
                Manage certificates
              </div>
            </Button>
          </div>
        </div>
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Recent Events</h3>
            <Button requireAuth={true} onClick={() => setSelectedTab("events")}>
              View All →
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={handleViewDetails}
                onEdit={handleEditEvent}
                onCancel={handleCancelEvent}
                onQRScan={handleQRScan}
                onManageRegistrations={handleManageRegistrations}
              />
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">
            Recent Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl">
              <Bell className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <p className="text-white font-medium">
                  React Workshop approved
                </p>
                <p className="text-gray-400 text-sm">
                  Your event has been approved and is now live for registrations
                </p>
                <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl">
              <Users className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <p className="text-white font-medium">
                  New registration received
                </p>
                <p className="text-gray-400 text-sm">
                  John Doe registered for AI & ML Seminar
                </p>
                <p className="text-gray-500 text-xs mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl">
              <Star className="w-6 h-6 text-yellow-400 mt-1" />
              <div>
                <p className="text-white font-medium">New feedback received</p>
                <p className="text-gray-400 text-sm">
                  Hackathon 2025 received a 5-star rating
                </p>
                <p className="text-gray-500 text-xs mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EventsContent = () => {
    const [eventFilter, setEventFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const filteredEvents = events.filter((event) => {
      const matchesFilter =
        eventFilter === "all" || event.status === eventFilter;
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    return (
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <h3 className="text-3xl font-bold text-white">Event Management</h3>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="bg-[#1A1B1B]" value="all">
                All Events
              </option>
              <option className="bg-[#1A1B1B]" value="Pending Approval">
                Pending Approval
              </option>
              <option className="bg-[#1A1B1B]" value="Approved">
                Approved
              </option>
              <option className="bg-[#1A1B1B]" value="Ongoing">
                Ongoing
              </option>
              <option className="bg-[#1A1B1B]" value="Completed">
                Completed
              </option>
              <option className="bg-[#1A1B1B]" value="Cancelled">
                Cancelled
              </option>
            </select>
            <Button requireAuth={true} onClick={handleCreateEvent}>
              <Plus className="w-4 h-4 inline mr-2" />
              Create Event
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={handleViewDetails}
                onEdit={handleEditEvent}
                onCancel={handleCancelEvent}
                onQRScan={handleQRScan}
                onManageRegistrations={handleManageRegistrations}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 p-8">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p>No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const RegistrationsContent = () => {
    return (
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-3xl font-bold text-white mb-6">
          Registration Management
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events
            .filter((e) => e.registrations > 0)
            .map((event) => (
              <div
                key={event.id}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {event.date} • {event.venue}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      event.status === "Approved"
                        ? "bg-green-500/20 text-green-300"
                        : event.status === "Ongoing"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Registration Progress</span>
                    <span>
                      {event.registrations}/{event.maxParticipants}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (event.registrations / event.maxParticipants) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button requireAuth={true} onClick={() => handleManageRegistrations(event)}>
                    <Users className="w-4 h-4 inline mr-1" />
                    Manage
                  </Button>
                  <Button requireAuth={true} onClick={() => handleCommunication(event)}>
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const AttendanceContent = () => {
    const handleDownloadReport = () => {
      // Logic to generate and download a report
      const attendanceData = events.map((e) => ({
        eventId: e.id,
        title: e.title,
        registered: e.registrations,
        present: Math.floor(e.registrations * 0.8), // Mock data
        absent: e.registrations - Math.floor(e.registrations * 0.8),
      }));
      console.log("Generating attendance report:", attendanceData);
      alert("Attendance report downloaded successfully!");
    };

    return (
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-white">
            Attendance Management
          </h3>
          <Button requireAuth={true} onClick={handleDownloadReport}>
            <Download className="w-4 h-4 inline mr-2" />
            Download Report
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events
                .filter(
                  (e) => e.status === "Approved" || e.status === "Ongoing"
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      {event.date} • {event.venue}
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Registered</span>
                        <span className="text-white font-medium">
                          {event.registrations}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Present</span>
                        <span className="text-green-400 font-medium">
                          {Math.floor(event.registrations * 0.8)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Absent</span>
                        <span className="text-red-400 font-medium">
                          {event.registrations -
                            Math.floor(event.registrations * 0.8)}
                        </span>
                      </div>
                    </div>
                    <Button requireAuth={true} onClick={() => handleQRScan(event)}>
                      <QrCode className="w-4 h-4 inline mr-2" />
                      Scan QR Code
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h4 className="text-xl font-semibold text-white mb-4">
              Quick Stats
            </h4>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  85%
                </div>
                <div className="text-sm text-gray-400">Average Attendance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {events.filter((e) => e.status === "Ongoing").length}
                </div>
                <div className="text-sm text-gray-400">Live Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  {events.filter((e) => e.status === "Pending Approval").length}
                </div>
                <div className="text-sm text-gray-400">Pending Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CertificatesContent = () => {
    const completedEvents = events.filter((e) => e.status === "Completed");
    const [selectedEventForCert, setSelectedEventForCert] = useState(null);

    const handleUploadClick = (event) => {
      setSelectedEventForCert(event);
    };

    const handleGenerateCertificate = (participant) => {
      // Mock function to generate a certificate for a single participant
      alert(
        `Generating and downloading certificate for ${participant.name}...`
      );
    };

    const UploadCertificateModal = ({ event, onClose }) => {
      const [file, setFile] = useState(null);
      const handleFileChange = (e) => setFile(e.target.files[0]);

      const handleUpload = () => {
        if (file) {
          console.log(`Uploading certificate file for event: ${event.title}`);
          alert(`Certificate for ${event.title} uploaded successfully!`);
          onClose();
        }
      };

      return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-xl w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">
                Upload Certificates for {event.title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>
            <p className="text-gray-400 mb-4">
              Select a file to upload (e.g., PDF or ZIP of certificates).
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={onClose}
                className="py-2 px-4 bg-gray-500/20 text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!file}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  file
                    ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Upload size={16} className="inline mr-2" />
                Upload
              </button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-3xl font-bold text-white mb-6">
          Certificate Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedEvents.length > 0 ? (
            completedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-semibold text-white">
                    {event.title}
                  </h4>
                  <span className="text-gray-400 text-sm">{event.date}</span>
                </div>
                <div className="space-y-4">
                  <h5 className="text-lg font-medium text-gray-300">
                    Participants
                  </h5>
                  <ul className="space-y-2">
                    {event.participants.length > 0 ? (
                      event.participants.map((p) => (
                        <li
                          key={p.id}
                          className="flex justify-between items-center p-2 bg-white/5 rounded-lg"
                        >
                          <span>{p.name}</span>
                          <button
                            onClick={() => handleGenerateCertificate(p)}
                            className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-full hover:bg-green-500/30 transition-colors"
                          >
                            <Award className="w-3 h-3 inline mr-1" />
                            Generate Cert
                          </button>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No participants for this event.
                      </p>
                    )}
                  </ul>
                </div>
                <button
                  onClick={() => handleUploadClick(event)}
                  className="w-full mt-6 py-2 px-4 bg-purple-500/20 text-purple-300 rounded-lg font-medium hover:bg-purple-500/30 transition-colors"
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload Batch Certificates
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 p-8">
              <Award className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p>No completed events to manage certificates for.</p>
            </div>
          )}
        </div>
        {selectedEventForCert && (
          <UploadCertificateModal
            event={selectedEventForCert}
            onClose={() => setSelectedEventForCert(null)}
          />
        )}
      </div>
    );
  };

  const MediaContent = () => {
    const [selectedEventId, setSelectedEventId] = useState("");
    const [fileToUpload, setFileToUpload] = useState(null);
    const completedEvents = events.filter((e) => e.status === "Completed");

    const handleFileChange = (e) => setFileToUpload(e.target.files[0]);

    const handleUploadMedia = () => {
      if (selectedEventId && fileToUpload) {
        // Simulate API call and state update for uploading media
        const newMedia = {
          id: Date.now(),
          url: URL.createObjectURL(fileToUpload),
          type: fileToUpload.type.startsWith("video") ? "video" : "image",
        };
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === parseInt(selectedEventId)
              ? { ...event, media: [...event.media, newMedia] }
              : event
          )
        );
        setFileToUpload(null);
        document.getElementById("media-upload-input").value = "";
      }
    };

    const handleDeleteMedia = (eventId, mediaId) => {
      // Simulate API call and state update for deleting media
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? { ...event, media: event.media.filter((m) => m.id !== mediaId) }
            : event
        )
      );
    };

    return (
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-3xl font-bold text-white mb-6">
          Media Gallery Management
        </h3>
        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h4 className="text-xl font-semibold text-white mb-4">
            Upload New Media
          </h4>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="flex-1 w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="bg-[#1A1B1B]">
                Select a completed event...
              </option>
              {completedEvents.map((event) => (
                <option
                  key={event.id}
                  value={event.id}
                  className="bg-[#1A1B1B]"
                >
                  {event.title}
                </option>
              ))}
            </select>
            <input
              id="media-upload-input"
              type="file"
              onChange={handleFileChange}
              className="flex-1 w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleUploadMedia}
              disabled={!selectedEventId || !fileToUpload}
              className={`py-3 px-6 rounded-lg font-medium transition-colors ${
                selectedEventId && fileToUpload
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Upload size={16} className="inline mr-2" />
              Upload
            </button>
          </div>
        </div>
        <h4 className="text-2xl font-semibold text-white mb-4">
          Event Galleries
        </h4>
        {completedEvents.length > 0 ? (
          <div className="space-y-6">
            {completedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-xl font-semibold text-white">
                    {event.title}
                  </h5>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    View All →
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {event.media.length > 0 ? (
                    event.media.map((media) => (
                      <div
                        key={media.id}
                        className="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <img
                          src={media.url}
                          alt={`Media for ${event.title}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Trash2
                            size={24}
                            className="text-red-400 cursor-pointer"
                            onClick={() =>
                              handleDeleteMedia(event.id, media.id)
                            }
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-400 p-4">
                      No media uploaded yet.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center text-gray-400 p-8">
            <Image className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p>No completed events with media.</p>
          </div>
        )}
      </div>
    );
  };

  const AnalyticsContent = () => {
    const completedEvents = events.filter((e) => e.status === "Completed");
    const totalFeedback = completedEvents.reduce(
      (sum, event) => sum + (event.feedback?.length || 0),
      0
    );
    const avgRating = completedEvents
      .filter((e) => e.rating > 0)
      .reduce((sum, event, _, arr) => sum + event.rating / arr.length, 0);

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            Event Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">
                  Total Feedback
                </h4>
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {totalFeedback}
              </div>
              <div className="text-sm text-gray-400">Reviews received</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Avg Rating</h4>
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {avgRating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-400">Out of 5.0</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">
                  Attendance Rate
                </h4>
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">85%</div>
              <div className="text-sm text-gray-400">Average attendance</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Revenue</h4>
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                ₹
                {events
                  .reduce(
                    (sum, e) =>
                      sum +
                      e.certificateFee * Math.floor(e.registrations * 0.6),
                    0
                  )
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Certificate fees</div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4">
                Recent Feedback
              </h4>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">
                      React Workshop
                    </span>
                  </div>
                  <p className="text-white text-sm">
                    "Excellent workshop! Learned a lot about React hooks and
                    state management."
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    - Sarah Johnson, 2 days ago
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current" />
                      ))}
                      <Star className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-400 text-sm">
                      AI & ML Seminar
                    </span>
                  </div>
                  <p className="text-white text-sm">
                    "Great content, but could use more hands-on examples."
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    - Mike Chen, 1 week ago
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4">
                Event Performance
              </h4>
              <div className="space-y-4">
                {completedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div>
                      <h5 className="text-white font-medium">{event.title}</h5>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="mr-4">
                          {event.registrations} participants
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span>{event.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-400">
                        {Math.round(
                          (event.registrations / event.maxParticipants) * 100
                        )}
                        %
                      </div>
                      <div className="text-xs text-gray-400">Capacity</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return <OverviewContent />;
      case "events":
        return <EventsContent />;
      case "registrations":
        return <RegistrationsContent />;
      case "attendance":
        return <AttendanceContent />;
      case "certificates":
        return <CertificatesContent />;
      case "media":
        return <MediaContent />;
      case "analytics":
        return <AnalyticsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#131414] text-white font-sans antialiased flex flex-col items-center p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background: #0d0d0d;
        }
      `}</style>
      <div className="relative w-full max-w-7xl mx-auto rounded-[3rem] p-4 md:p-8 lg:p-12 overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
        <div className="absolute inset-0 bg-white/5 opacity-50 blur-3xl rounded-[3rem] pointer-events-none"></div>
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 relative z-10">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200">
              Organizer Dashboard
            </h1>
          </div>
          <nav className="mt-6 md:mt-0">
            <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 p-2 bg-white/5 rounded-full border border-white/10 shadow-lg">
              {[
                "overview",
                "events",
                "registrations",
                "attendance",
                "certificates",
                "media",
                "analytics",
              ].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded-full font-medium capitalize transition-colors text-sm ${
                      selectedTab === tab
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="relative z-10">{renderContent()}</main>
        <CreateEventModal
          isOpen={isCreateEventModalOpen}
          onClose={() => {
            setIsCreateEventModalOpen(false);
            setEventToEdit(null);
          }}
          onSave={handleSaveEvent}
          event={eventToEdit}
        />
        <EventDetailsModal
          isOpen={isEventDetailsModalOpen}
          onClose={() => {
            setIsEventDetailsModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => {
            setIsRegistrationModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
        <QRScannerModal
          isOpen={isQRScannerModalOpen}
          onClose={() => {
            setIsQRScannerModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
        <CommunicationModal
          isOpen={isCommunicationModalOpen}
          onClose={() => {
            setIsCommunicationModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
      </div>
    </div>
  );
};

export default OrganizerDashboard;
