import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import Certificate from "./Certificate";
import QRCodeGenerator from "./QRCodeGenerator";

// --- Helper Components (No changes needed here) ---
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-gradient-to-r ${color} backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-transform transform hover:scale-105`}
  >
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <div className="text-white/70">{icon}</div>
    </div>
    <p className="mt-2 text-4xl font-bold text-white">{value}</p>
  </div>
);

const EventCard = ({
  event,
  onViewDetails,
  onCancelRegistration,
  onDownloadQR,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-300";
      case "cancelled":
        return "bg-red-500/20 text-red-300";
      case "waitlist":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-blue-500/20 text-blue-300";
    }
  };

  const isUpcoming = new Date(event.date) > new Date();
  const canCancel = isUpcoming && event.status === "confirmed";

  return (
    <div className="bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] border border-white/10 rounded-2xl p-6 transition-transform hover:scale-[1.02] duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-semibold text-white">{event.title}</h4>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
              event.status
            )}`}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {event.status === "confirmed" && (
            <button
              onClick={() => onDownloadQR(event)}
              className="p-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
              title="View QR Code"
            >
              <QRIcon />
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-2">{event.description}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
        <span>{event.date}</span>
        <span>{event.venue}</span>
        <span>{event.category}</span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(event)}
          className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors"
        >
          View Details
        </button>
        {canCancel && (
          <button
            onClick={() => onCancelRegistration(event)}
            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
          >
            Cancel Registration
          </button>
        )}
      </div>
    </div>
  );
};

const CertificateCard = ({ certificate, onDownload, onPayFee }) => (
  <div className="bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] border border-white/10 rounded-2xl p-6 transition-transform hover:scale-[1.02] duration-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-xl font-semibold text-white">
          {certificate.eventTitle}
        </h4>
        <p className="text-gray-400 text-sm">
          Completed on {certificate.completionDate}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {certificate.status === "paid" ? (
          <button
            onClick={() => onDownload(certificate)}
            className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
          >
            Download
          </button>
        ) : (
          <button
            onClick={() => onPayFee(certificate)}
            className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm font-medium hover:bg-yellow-500/30 transition-colors"
          >
            Pay Fee (₹{certificate.fee})
          </button>
        )}
      </div>
    </div>
  </div>
);

const NotificationItem = ({ notification, onMarkAsRead }) => (
  <div
    className={`p-4 rounded-xl border transition-colors ${
      notification.read
        ? "bg-white/5 border-white/10 text-gray-400"
        : "bg-blue-500/10 border-blue-500/20 text-white"
    }`}
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h5 className="font-semibold mb-1">{notification.title}</h5>
        <p className="text-sm mb-2">{notification.message}</p>
        <span className="text-xs opacity-70">{notification.timestamp}</span>
      </div>
      {!notification.read && (
        <button
          onClick={() => onMarkAsRead(notification.id)}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          Mark as read
        </button>
      )}
    </div>
  </div>
);

const SavedMediaCard = ({ media, onRemove }) => (
  <div className="bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] border border-white/10 rounded-2xl overflow-hidden">
    <img
      src={media.thumbnail}
      alt={media.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h4 className="text-white font-semibold mb-2">{media.title}</h4>
      <p className="text-gray-400 text-sm mb-3">From: {media.eventTitle}</p>
      <div className="flex justify-between">
        <button className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
          View Full
        </button>
        <button
          onClick={() => onRemove(media.id)}
          className="px-3 py-1 bg-red-500/20 text-red-300 rounded text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

// --- Modal Components ---
const EventDetailsModal = ({ event, isOpen, onClose, onRegister }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>
        <h3 className="text-3xl font-bold text-white mb-6">{event.title}</h3>
        <div className="space-y-4 text-gray-300">
          <div>
            <h4 className="text-white font-semibold">Description</h4>
            <p>{event.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-semibold">Date & Time</h4>
              <p>
                {event.date} at {event.time}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold">Venue</h4>
              <p>{event.venue}</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold">Organizer</h4>
            <p>{event.organizer}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-500/20 text-gray-300 font-medium hover:bg-gray-500/30 transition-colors"
          >
            Close
          </button>
          {event.canRegister && (
            <button
              onClick={() => onRegister(event)}
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white"
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CertificateModal = ({ certificate, isOpen, onClose, onDownload }) => {
  const certificateRef = useRef(null);
  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-white">Certificate Preview</h3>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        <div ref={certificateRef} className="my-8">
          <Certificate certificate={certificate} />
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => onDownload(certificateRef)}
            className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

const QRCodeModal = ({ event, isOpen, onClose }) => {
  const qrCodeRef = useRef(null);
  if (!isOpen || !event) return null;
  const qrValue = `https://yourapp.com/events/${event.id}`;

  const handleDownloadQRImage = async () => {
    if (qrCodeRef.current) {
      try {
        const canvas = await html2canvas(qrCodeRef.current, {
          backgroundColor: null,
          useCORS: true,
          scale: 2,
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `qr-code-${event.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading QR code:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Your Event QR Code
        </h3>

        <div
          ref={qrCodeRef}
          className="flex justify-center mb-4 p-2 bg-white rounded-lg"
        >
          <QRCodeGenerator value={qrValue} size={200} />
        </div>

        <p className="text-center text-gray-300 text-sm mb-4">
          Scan this code to quickly access details for {event.title}.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleDownloadQRImage}
            className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white"
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => (
  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option value="technical">Technical</option>
        <option value="cultural">Cultural</option>
        <option value="sports">Sports</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Status</option>
        <option value="confirmed">Confirmed</option>
        <option value="waitlist">Waitlist</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <select
        value={filters.time}
        onChange={(e) => setFilters({ ...filters, time: e.target.value })}
        className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Time</option>
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
      </select>
    </div>
  </div>
);

// --- Icons (No changes needed here) ---
const EventIcon = () => (
  <svg
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 7V3m8 4V3m-9 8h.01M11 15h.01M15 15h.01M17 19h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2m2 3v-3h3v3a2 2 0 01-2 2H9a2 2 0 01-2-2z"
    />
  </svg>
);

const CertificateIcon = () => (
  <svg
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const MediaIcon = () => (
  <svg
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const QRIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 4v1m0 14v1m8-8h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Main Dashboard Component ---
const ParticipantDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    time: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [qrCodeEvent, setQrCodeEvent] = useState(null);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);

  // New state to manage profile form data
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@university.edu",
    department: "Computer Science",
    enrollmentNumber: "CS2025001",
  });

  // Mock Data
  const [userStats] = useState({
    registeredEvents: 8,
    attendedEvents: 5,
    certificates: 3,
    savedMedia: 12,
  });

  const [registeredEvents] = useState([
    {
      id: 1,
      title: "React Advanced Workshop",
      description: "Deep dive into React patterns and performance optimization",
      date: "2025-10-28",
      time: "10:00 AM",
      venue: "Tech Lab A",
      category: "technical",
      status: "confirmed",
      organizer: "Tech Society",
      canRegister: false,
    },
    {
      id: 2,
      title: "Cultural Night 2025",
      description: "Annual cultural celebration with music and dance",
      date: "2025-11-15",
      time: "6:00 PM",
      venue: "Main Auditorium",
      category: "cultural",
      status: "waitlist",
      organizer: "Cultural Committee",
      canRegister: false,
    },
    {
      id: 3,
      title: "AI/ML Symposium",
      description:
        "Latest trends in artificial intelligence and machine learning",
      date: "2025-09-10",
      time: "9:00 AM",
      venue: "Conference Hall",
      category: "technical",
      status: "confirmed",
      organizer: "AI Club",
      canRegister: false,
    },
  ]);

  const [certificates] = useState([
    {
      id: 1,
      eventTitle: "AI/ML Symposium",
      completionDate: "2025-09-10",
      fee: 100,
      status: "paid",
    },
    {
      id: 2,
      eventTitle: "Web Development Workshop",
      completionDate: "2025-08-15",
      fee: 150,
      status: "unpaid",
    },
    {
      id: 3,
      eventTitle: "Cultural Night 2024",
      completionDate: "2024-11-15",
      fee: 0,
      status: "paid",
    },
  ]);

  // --- UPDATED NOTIFICATIONS MOCK DATA ---
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Registration Confirmed",
      message: "Your registration for the AI/ML Symposium has been approved!",
      timestamp: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "New Certificate Available",
      message: "Your certificate for the React Workshop is ready to download.",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Event Reminder",
      message: "Cultural Night 2025 is happening this Friday!",
      timestamp: "1 day ago",
      read: false,
    },
    {
      id: 4,
      title: "Account Update",
      message: "Your profile information has been updated successfully.",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: 5,
      title: "Payment Confirmation",
      message:
        "Your payment for the Web Dev Workshop certificate was successful.",
      timestamp: "1 week ago",
      read: true,
    },
  ]);

  const [savedMedia] = useState([
    {
      id: 1,
      title: "Workshop Highlights",
      eventTitle: "React Workshop",
      thumbnail:
        "https://placehold.co/300x200/3B82F6/ffffff?text=React+Workshop",
    },
    {
      id: 2,
      title: "Performance Video",
      eventTitle: "Cultural Night",
      thumbnail:
        "https://placehold.co/300x200/EC4899/ffffff?text=Cultural+Night",
    },
  ]);

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDownloadQR = (event) => {
    setQrCodeEvent(event);
    setShowQRCodeModal(true);
  };

  const handleCancelRegistration = (event) => {
    console.log("Cancelling registration for:", event.title);
  };

  const handleDownloadCertificate = async (certificateRef) => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          backgroundColor: null,
          useCORS: true,
          scale: 2,
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `certificate-${selectedCertificate.eventTitle.replace(
          /\s+/g,
          "-"
        )}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("Certificate downloaded successfully!");
      } catch (error) {
        console.error("Error downloading certificate:", error);
        alert("Failed to download certificate. Please try again.");
      }
    } else {
      console.warn("Certificate ref is null, cannot download.");
    }
  };

  const handlePayCertificateFee = (certificate) => {
    console.log("Processing payment for:", certificate.eventTitle);
  };
  const handleMarkNotificationAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleRemoveSavedMedia = (id) => {
    console.log("Removing saved media:", id);
  };

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  // New function to handle form field changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // New function to handle saving the profile
  const handleSaveProfile = () => {
    // In a real app, you would send this data to a backend API
    console.log("Saving profile changes:", profileData);
    alert("Profile saved successfully! (Simulated)");
  };

  const filteredEvents = registeredEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filters.category || event.category === filters.category;
    const matchesStatus = !filters.status || event.status === filters.status;

    let matchesTime = true;
    if (filters.time === "upcoming") {
      matchesTime = new Date(event.date) > new Date();
    } else if (filters.time === "past") {
      matchesTime = new Date(event.date) < new Date();
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesTime;
  });

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Registered Events"
                value={userStats.registeredEvents}
                icon={<EventIcon />}
                color="from-purple-500/10 to-blue-500/10"
              />
              <StatCard
                title="Attended Events"
                value={userStats.attendedEvents}
                icon={<EventIcon />}
                color="from-green-500/10 to-lime-500/10"
              />
              <StatCard
                title="Certificates"
                value={userStats.certificates}
                icon={<CertificateIcon />}
                color="from-yellow-500/10 to-orange-500/10"
              />
              <StatCard
                title="Saved Media"
                value={userStats.savedMedia}
                icon={<MediaIcon />}
                color="from-pink-500/10 to-red-500/10"
              />
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-colors text-left">
                  <EventIcon />
                  <h4 className="font-semibold mt-2">Browse Events</h4>
                  <p className="text-sm opacity-80">Find new events to join</p>
                </button>
                <button
                  onClick={() => setSelectedTab("certificates")}
                  className="p-4 bg-green-500/20 text-green-300 rounded-xl hover:bg-green-500/30 transition-colors text-left"
                >
                  <CertificateIcon />
                  <h4 className="font-semibold mt-2">View Certificates</h4>
                  <p className="text-sm opacity-80">
                    Download your certificates
                  </p>
                </button>
                <button
                  onClick={() => setSelectedTab("notifications")}
                  className="p-4 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors text-left"
                >
                  <BellIcon />
                  <h4 className="font-semibold mt-2">Notifications</h4>
                  <p className="text-sm opacity-80">Check latest updates</p>
                </button>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {notifications.slice(0, 3).map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkNotificationAsRead}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">My Events</h3>
              <SearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onViewDetails={handleViewEventDetails}
                      onCancelRegistration={handleCancelRegistration}
                      onDownloadQR={handleDownloadQR}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 p-8">
                    <p>No events found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "certificates":
        return (
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6">
              My Certificates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onDownload={handleViewCertificate}
                  onPayFee={handlePayCertificateFee}
                />
              ))}
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6">
              Notifications
            </h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkNotificationAsRead}
                />
              ))}
            </div>
          </div>
        );

      case "media":
        return (
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6">Saved Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedMedia.map((media) => (
                <SavedMediaCard
                  key={media.id}
                  media={media}
                  onRemove={handleRemoveSavedMedia}
                />
              ))}
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6">
              Profile Settings
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={profileData.department}
                    onChange={handleProfileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    name="enrollmentNumber"
                    value={profileData.enrollmentNumber}
                    onChange={handleProfileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
              My Dashboard
            </h1>
            <div className="relative">
              {/* --- UPDATED BELL ICON TO A BUTTON --- */}
              <button
                onClick={() => setSelectedTab("notifications")}
                className="p-3 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                <BellIcon />
              </button>
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </div>
          </div>

          <nav className="mt-6 md:mt-0">
            <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 p-2 bg-white/5 rounded-full border border-white/10 shadow-lg">
              {[
                "overview",
                "events",
                "certificates",
                "notifications",
                "media",
                "profile",
              ].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setSelectedTab(tab)}
                    className={`
                      px-4 py-2 rounded-full font-medium capitalize transition-colors
                      ${
                        selectedTab === tab
                          ? "bg-blue-500 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="mb-8 relative z-10">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back, John! 👋
            </h2>
            <p className="text-gray-300">
              You have {notifications.filter((n) => !n.read).length} new
              notifications waiting for you.
            </p>
          </div>
        </div>

        <main className="relative z-10">{renderContent()}</main>

        <EventDetailsModal
          event={selectedEvent}
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          onRegister={(event) => console.log("Register for:", event.title)}
        />

        <CertificateModal
          certificate={selectedCertificate}
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          onDownload={handleDownloadCertificate}
        />

        {/* Render the QR Code Modal */}
        <QRCodeModal
          event={qrCodeEvent}
          isOpen={showQRCodeModal}
          onClose={() => setShowQRCodeModal(false)}
        />
      </div>
    </div>
  );
};

export default ParticipantDashboard;
