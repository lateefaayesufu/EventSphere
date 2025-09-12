import React, { useState, useEffect } from "react";

// Helper components for the Overview tab
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

// New component for the Event card
const EventCard = ({ event, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/20 text-green-300";
      case "Pending Approval":
        return "bg-yellow-500/20 text-yellow-300";
      case "Rejected":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-blue-500/20 text-blue-300";
    }
  };

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
            {event.status}
          </span>
        </div>
        {/* Admin Dropdown */}
        <div className="relative inline-block text-left">
          <select
            value={event.status}
            onChange={(e) => onStatusChange(event.id, e.target.value)}
            className="appearance-none bg-blue-500/20 text-white rounded-lg text-sm font-medium px-4 py-2 hover:bg-blue-500/30 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
          </select>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-2">{event.description}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <span>{event.date}</span>
        <span>{event.venue}</span>
        <span>{event.participants} Participants</span>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors">
          View Details
        </button>
        <button className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
};

// New modal component for creating/editing a user
const UserModal = ({ isOpen, onClose, onSave, user = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "User",
        status: "Active",
        avatar: "https://placehold.co/40x40/5c5c5c/ffffff?text=NN",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: user ? user.id : Date.now(),
      joinDate: user ? user.joinDate : new Date().toLocaleDateString(),
      avatar: user
        ? user.avatar
        : `https://placehold.co/40x40/5c5c5c/ffffff?text=${formData.name
            .charAt(0)
            .toUpperCase()}${
            formData.name.split(" ")[1]?.charAt(0).toUpperCase() || ""
          }`,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
        <h3 className="text-3xl font-bold text-white mb-6">
          {user ? "Edit User" : "Add New User"}
        </h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="User">User</option>
            <option value="Contributor">Contributor</option>
            <option value="Event Manager">Event Manager</option>
            <option value="Administrator">Administrator</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-500/20 text-gray-300 font-medium hover:bg-gray-500/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// New modal component for creating an event
const CreateEventModal = ({ isModalOpen, setIsModalOpen, onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    maxParticipants: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(), // Simple unique ID
      status: "Pending Approval",
      participants: 0,
      ...formData,
    };
    onAddEvent(newEvent);
    setIsModalOpen(false);
    // Clear form after submission
    setFormData({
      title: "",
      category: "",
      description: "",
      venue: "",
      date: "",
      time: "",
      maxParticipants: 0,
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
        <h3 className="text-3xl font-bold text-white mb-6">Create New Event</h3>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Technical, Cultural)"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="number"
            name="maxParticipants"
            placeholder="Max Participants"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-xl bg-gray-500/20 text-gray-300 font-medium hover:bg-gray-500/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper components and icons
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H4a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v2M6 12h9M9 20h-3C4.224 20 3 18.776 3 17v-3.776C3 13.09 3.224 12 4.195 12h2.61a.8.8 0 01.693.39L8.4 14.286A.8.8 0 009.2 14h4.6a.8.8 0 00.693-.39L16.2 12.39a.8.8 0 01.693-.39h2.61C20.776 12 22 13.09 22 14.224V17c0 1.776-1.224 3-3 3h-3a2 2 0 01-2-2z"
    />
  </svg>
);

const EventIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-pink-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h.01M11 15h.01M15 15h.01M17 19h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2m2 3v-3h3v3a2 2 0 01-2 2H9a2 2 0 01-2-2z"
    />
  </svg>
);

const ApprovalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-green-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ActiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-yellow-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const AlertCard = ({ title, message }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start space-x-4">
    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-red-500/30 text-red-300 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.308 17c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
    <div>
      <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
      <p className="text-gray-400">{message}</p>
    </div>
  </div>
);

const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;
  return (
    <div className="relative w-48 h-48 mx-auto">
      {data.map((item, index) => {
        const start = cumulativePercentage;
        cumulativePercentage += (item.value / total) * 100;
        const end = cumulativePercentage;
        const style = {
          "--p": (item.value / total) * 100,
          "--b": "16px",
          "--c": item.color,
          "--a": "160deg",
        };
        return (
          <div key={index} className="absolute inset-0 z-10" style={style}>
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845a15.9155 15.9155 0 010 31.831a15.9155 15.9155 0 010-31.831"
                fill="none"
                stroke={item.color}
                strokeWidth="2"
                strokeDasharray={`${(item.value / total) * 100}, 100`}
                strokeDashoffset={`${100 - (end - start)}`}
                className="transform rotate-90 origin-center"
              />
            </svg>
          </div>
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-[#1A1B1B] rounded-full flex items-center justify-center text-white/50 text-sm font-semibold">
          Data
        </div>
      </div>
    </div>
  );
};

const BarChart = ({ data }) => {
  const maxVal = Math.max(...data.map((item) => item.value));
  return (
    <div className="flex items-end h-64 w-full space-x-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex-1 h-full flex flex-col justify-end items-center"
        >
          <div
            className="w-8 rounded-t-lg transition-all duration-300 ease-out hover:scale-x-110"
            style={{
              height: `${(item.value / maxVal) * 100}%`,
              backgroundColor: item.color,
            }}
          />
          <div className="mt-2 text-xs text-gray-400 text-center">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const SettingSection = ({ title, children }) => (
  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
    <h4 className="text-xl font-semibold text-white mb-4">{title}</h4>
    {children}
  </div>
);

// Tab Content components
const Events = ({ events, setIsModalOpen, onStatusChange }) => {
  const [activeTab, setActiveTab] = useState("Pending Approval");

  const filteredEvents = events.filter((event) => event.status === activeTab);

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-white">Events Management</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white"
        >
          Create New Event
        </button>
      </div>

      {/* Tabs for event status */}
      <div className="flex space-x-4 mb-8 border-b border-white/10">
        {["Pending Approval", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`
              px-4 py-2 text-lg font-medium transition-colors
              ${
                activeTab === status
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            {status} ({events.filter((e) => e.status === status).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 p-8">
            <p>No {activeTab.toLowerCase()} events found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Users = ({ users, onEditUser, onAddUser }) => (
  <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-3xl font-bold text-white">User Management</h3>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search users..."
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
        />
        <button
          onClick={onAddUser}
          className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition-colors font-medium text-white"
        >
          Add New User
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10 rounded-2xl overflow-hidden">
        <thead className="bg-white/5">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Joined
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/5 divide-y divide-white/5">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {user.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-400">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500/20 text-blue-300">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === "Active"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {user.joinDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEditUser(user)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Reports = () => {
  const pieData = [
    { value: 50, color: "var(--tw-colors-blue-500)" },
    { value: 30, color: "var(--tw-colors-purple-500)" },
    { value: 20, color: "var(--tw-colors-pink-500)" },
  ];

  const barData = [
    { label: "Q1", value: 120, color: "var(--tw-colors-cyan-400)" },
    { label: "Q2", value: 180, color: "var(--tw-colors-green-400)" },
    { label: "Q3", value: 90, color: "var(--tw-colors-yellow-400)" },
    { label: "Q4", value: 250, color: "var(--tw-colors-purple-400)" },
  ];
  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-white mb-6">
        Analytics & Reports
      </h3>
      <p className="text-gray-400 mb-8">
        Visual dashboards provide a quick overview of user engagement and event
        performance.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <h4 className="text-xl font-semibold text-white mb-4">
            Event Category Breakdown
          </h4>
          <div className="flex items-center justify-center h-64">
            <PieChart data={pieData} />
            <div className="ml-8 space-y-2">
              <div className="flex items-center text-gray-300">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                Technical (50%)
              </div>
              <div className="flex items-center text-gray-300">
                <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                Cultural (30%)
              </div>
              <div className="flex items-center text-gray-300">
                <div className="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
                Other (20%)
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <h4 className="text-xl font-semibold text-white mb-4">
            Quarterly User Sign-ups
          </h4>
          <div className="flex items-center justify-center h-64">
            <BarChart data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const [siteName, setSiteName] = useState("EventSphere");
  const [contactEmail, setContactEmail] = useState("support@eventsphere.edu");
  const [enable2FA, setEnable2FA] = useState(true);
  const [forcePasswordReset, setForcePasswordReset] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = () => {
    setSaveStatus("Saving...");
    setTimeout(() => {
      // In a real app, this would be an API call
      console.log({ siteName, contactEmail, enable2FA, forcePasswordReset });
      setSaveStatus("Changes saved successfully!");
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-white mb-6">System Settings</h3>
      <div className="space-y-6">
        <SettingSection title="General Settings">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="siteName"
                className="text-white block mb-2 text-sm font-medium"
              >
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="contactEmail"
                className="text-white block mb-2 text-sm font-medium"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </SettingSection>

        <SettingSection title="Security Settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">
                Enable Two-Factor Authentication (2FA)
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enable2FA}
                  onChange={(e) => setEnable2FA(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">
                Force Password Reset for all Users
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={forcePasswordReset}
                  onChange={(e) => setForcePasswordReset(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </SettingSection>
      </div>
      <div className="mt-8 flex justify-end items-center space-x-4">
        {saveStatus && (
          <span className="text-sm font-medium text-white/70 animate-pulse">
            {saveStatus}
          </span>
        )}
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const OverviewContent = ({ events, stats }) => (
  <div className="space-y-8">
    {/* Stat Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={<UserIcon />}
        color="from-purple-500/10 to-blue-500/10"
      />
      <StatCard
        title="Total Events"
        value={stats.totalEvents}
        icon={<EventIcon />}
        color="from-pink-500/10 to-red-500/10"
      />
      <StatCard
        title="Pending Approvals"
        value={stats.pendingApprovals}
        icon={<ApprovalIcon />}
        color="from-green-500/10 to-lime-500/10"
      />
      <StatCard
        title="Active Events"
        value={stats.activeEvents}
        icon={<ActiveIcon />}
        color="from-yellow-500/10 to-orange-500/10"
      />
    </div>

    {/* Charts and recent activity */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* User Growth Chart */}
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6">
          User Sign-ups Over Time
        </h3>
        <div className="w-full h-64">
          <svg
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            className="w-full h-full text-blue-400 fill-current opacity-70"
          >
            <line
              x1="10"
              y1="40"
              x2="90"
              y2="40"
              stroke="#FFFFFF"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <line
              x1="10"
              y1="30"
              x2="90"
              y2="30"
              stroke="#FFFFFF"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <line
              x1="10"
              y1="20"
              x2="90"
              y2="20"
              stroke="#FFFFFF"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <path
              d="M10,40 Q25,10 40,30 T70,25 T90,15"
              stroke="#87CEEB"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M10,40 Q25,10 40,30 T70,25 T90,15 L90,50 L10,50 
              z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#87CEEB" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Recent events */}
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Recent Events</h3>
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock data for Events, now with more variety and statuses
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "React Workshop",
      description: "A hands-on workshop to learn the fundamentals of React.",
      date: "Oct 26, 2025",
      venue: "Main Auditorium",
      participants: 120,
      status: "Approved",
    },
    {
      id: 2,
      title: "Data Science Meetup",
      description: "Networking event for data enthusiasts and professionals.",
      date: "Nov 15, 2025",
      venue: "Tech Hub",
      participants: 85,
      status: "Approved",
    },
    {
      id: 3,
      title: "Cultural Fest 2025",
      description:
        "Annual cultural festival with music, dance, and food stalls.",
      date: "Dec 01, 2025",
      venue: "University Grounds",
      participants: 500,
      status: "Pending Approval",
    },
    {
      id: 4,
      title: "AI & ML Seminar",
      description:
        "An expert-led discussion on the future of AI and machine learning.",
      date: "Nov 05, 2025",
      venue: "Seminar Hall B",
      participants: 75,
      status: "Approved",
    },
    {
      id: 5,
      title: "Robotics Hackathon",
      description: "A 24-hour hackathon to build and program robots.",
      date: "Jan 10, 2026",
      venue: "Innovation Lab",
      participants: 40,
      status: "Pending Approval",
    },
    {
      id: 6,
      title: "Design Thinking Workshop",
      description:
        "Learn to solve complex problems with a human-centric approach.",
      date: "Nov 22, 2025",
      venue: "Creative Space",
      participants: 30,
      status: "Rejected",
    },
    {
      id: 7,
      title: "Cybersecurity Conference",
      description:
        "Discussing the latest threats and best practices in cybersecurity.",
      date: "Dec 15, 2025",
      venue: "Conference Center",
      participants: 150,
      status: "Approved",
    },
    {
      id: 8,
      title: "Startup Pitch Day",
      description: "Budding entrepreneurs present their ideas to investors.",
      date: "Feb 01, 2026",
      venue: "Business School",
      participants: 90,
      status: "Pending Approval",
    },
    {
      id: 9,
      title: "Mobile App Development",
      description:
        "A series of lectures on building scalable mobile applications.",
      date: "Dec 05, 2025",
      venue: "Lecture Hall 101",
      participants: 60,
      status: "Rejected",
    },
    {
      id: 10,
      title: "Blockchain Fundamentals",
      description:
        "Introduction to blockchain technology and its applications.",
      date: "Nov 28, 2025",
      venue: "Online",
      participants: 200,
      status: "Approved",
    },
  ]);

  // Mock data for Users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Administrator",
      status: "Active",
      joinDate: "01/15/2024",
      avatar: "https://placehold.co/40x40/5c5c5c/ffffff?text=JD",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Event Manager",
      status: "Active",
      joinDate: "02/20/2024",
      avatar: "https://placehold.co/40x40/5c5c5c/ffffff?text=JS",
    },
    {
      id: 3,
      name: "Emily White",
      email: "emily.w@example.com",
      role: "Contributor",
      status: "Inactive",
      joinDate: "03/10/2024",
      avatar: "https://placehold.co/40x40/5c5c5c/ffffff?text=EW",
    },
    {
      id: 4,
      name: "Mike Brown",
      email: "mike.b@example.com",
      role: "User",
      status: "Active",
      joinDate: "04/05/2024",
      avatar: "https://placehold.co/40x40/5c5c5c/ffffff?text=MB",
    },
  ]);

  const stats = {
    totalUsers: users.length,
    totalEvents: events.length,
    pendingApprovals: events.filter((e) => e.status === "Pending Approval")
      .length,
    activeEvents: events.filter((e) => e.status === "Approved").length,
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsUserModalOpen(true);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    if (updatedUser.id) {
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    } else {
      setUsers([...users, { ...updatedUser, id: users.length + 1 }]);
    }
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventStatusChange = (eventId, newStatus) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return <OverviewContent events={events} stats={stats} />;
      case "events":
        return (
          <Events
            events={events}
            setIsModalOpen={setIsCreateEventModalOpen}
            onStatusChange={handleEventStatusChange}
          />
        );
      case "users":
        return (
          <Users
            users={users}
            onEditUser={handleEditUser}
            onAddUser={handleAddUser}
          />
        );
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
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

      {/* Main container with background and glow */}
      <div className="relative w-full max-w-7xl mx-auto rounded-[3rem] p-4 md:p-8 lg:p-12 overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-white/5 opacity-50 blur-3xl rounded-[3rem] pointer-events-none"></div>

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 relative z-10">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200">
              Admin Dashboard
            </h1>
          </div>
          <nav className="mt-6 md:mt-0">
            <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 p-2 bg-white/5 rounded-full border border-white/10 shadow-lg">
              {["overview", "events", "users", "reports", "settings"].map(
                (tab) => (
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
                )
              )}
            </ul>
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10">{renderContent()}</main>

        {/* Modals */}
        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          onSave={handleSaveUser}
          user={currentUser}
        />
        <CreateEventModal
          isModalOpen={isCreateEventModalOpen}
          setIsModalOpen={setIsCreateEventModalOpen}
          onAddEvent={handleAddEvent}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
