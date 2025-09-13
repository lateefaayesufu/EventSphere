import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import LoadingSpinner from "../../components/sections/ui/LoadingSpinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createEvent,
  getAllEvents,
  approveEvent,
  rejectEvent,
  updateEvent, // Added for edit functionality
} from "../../api/events";
import {
  getAllUsers,
  createUser, // Added for user management
  updateUser, // Added for user management
  deleteUser, // Added for user management
} from "../../api/users";
import { toast } from "sonner";

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

// Event card (combined from both versions)
const EventCard = ({ event, onApprove, onReject, userRole, onViewDetails, onEdit }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAdmin = userRole === "ADMIN"; // Check if user is admin

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/20 text-green-300";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-300";
      case "REJECTED":
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
        {/* Action Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1A1B1B] rounded-lg shadow-lg py-1 z-10 border border-white/10">
              {event.status === "PENDING" && isAdmin && (
                <>
                  <button
                    onClick={() => {
                      onApprove(event.id); // Call onApprove
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-green-300 hover:bg-white/5"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      onReject(event.id); // Call onReject
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-white/5"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  onViewDetails(event);
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/5"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  onEdit(event);
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/5"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-2">{event.description}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <span>{new Date(event.date).toLocaleDateString()}</span> {/* Format date */}
        <span>{event.venue}</span>
        <span>{event.participants} Participants</span>
      </div>
    </div>
  );
};

// Viewing event details (from >>>>>>> main)
const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/20 text-green-300";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-300";
      case "REJECTED":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-blue-500/20 text-blue-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative">
        <h3 className="text-3xl font-bold text-white mb-4">Event Details</h3>
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
        <div className="space-y-4 text-gray-300">
          <p>
            <span className="font-semibold text-white">Title:</span>{" "}
            {event.title}
          </p>
          <p>
            <span className="font-semibold text-white">Description:</span>{" "}
            {event.description}
          </p>
          <p>
            <span className="font-semibold text-white">Date:</span> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-white">Venue:</span>{" "}
            {event.venue}
          </p>
          <p>
            <span className="font-semibold text-white">Participants:</span>{" "}
            {event.participants}
          </p>
          <p>
            <span className="font-semibold text-white">Status:</span>{" "}
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                event.status
              )}`}
            >
              {event.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Creating/editing a user (combined from both versions)
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
        avatar: "https://placehold.co/40x40/5c5c5c/ffffff?text=NN", // Default avatar
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
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="bg-[#1A1B1B]" value="User">
              User
            </option>
            <option className="bg-[#1A1B1B]" value="Contributor">
              Contributor
            </option>
            <option className="bg-[#1A1B1B]" value="Event Manager">
              Event Manager
            </option>
            <option className="bg-[#1A1B1B]" value="Administrator">
              Administrator
            </option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="bg-[#1A1B1B]" value="Active">
              Active
            </option>
            <option className="bg-[#1A1B1B]" value="Inactive">
              Inactive
            </option>
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

const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  date: z.string(),
  venue: z.string().min(3, "Venue must be at least 3 characters long"),
  capacity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().positive("Capacity must be a positive integer")
  ),
});

// Creating/editing an event (combined from both versions)
const CreateEventModal = ({ isModalOpen, setIsModalOpen, eventToEdit }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      date: "",
      venue: "",
      capacity: 0,
    },
  });

  useEffect(() => {
    if (eventToEdit) {
      // Pre-fill form for editing
      setValue("title", eventToEdit.title);
      setValue("description", eventToEdit.description);
      setValue("category", eventToEdit.category);
      // Format date for datetime-local input
      const eventDate = new Date(eventToEdit.date);
      const formattedDate = eventDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
      setValue("date", formattedDate);
      setValue("venue", eventToEdit.venue);
      setValue("capacity", eventToEdit.capacity);
    } else {
      reset(); // Reset form for new event
    }
  }, [eventToEdit, reset, setValue]);

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("Event created successfully!");
      queryClient.invalidateQueries(["allEvents"]);
      setIsModalOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to create event.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateEvent, // Assuming an updateEvent API function exists
    onSuccess: () => {
      toast.success("Event updated successfully!");
      queryClient.invalidateQueries(["allEvents"]);
      setIsModalOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update event.");
    },
  });

  const onSubmit = (data) => {
    const isoDate = new Date(data.date).toISOString();
    if (eventToEdit) {
      updateMutation.mutate({ ...data, id: eventToEdit.id, date: isoDate }); // Pass ID for update
    } else {
      createMutation.mutate({ ...data, date: isoDate });
    }
  };

  if (!isModalOpen) return null;

  const isProcessing = isSubmitting || createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
        <h3 className="text-3xl font-bold text-white mb-6">
          {eventToEdit ? "Edit Event" : "Create New Event"}
        </h3>
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              {...register("title")}
              disabled={isProcessing}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Technical, Cultural)"
              {...register("category")}
              disabled={isProcessing}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Event Description"
              {...register("description")}
              disabled={isProcessing}
              rows="3"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              {...register("venue")}
              disabled={isProcessing}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.venue && (
              <p className="text-red-500 text-sm mt-1">
                {errors.venue.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="datetime-local"
                name="date"
                {...register("date")}
                disabled={isProcessing}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="capacity"
                placeholder="Max Participants"
                {...register("capacity")}
                disabled={isProcessing}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.capacity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>
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
              disabled={isProcessing}
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : eventToEdit ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper components and icons (mostly from <<<<<<< main, AlertCard from >>>>>>> main)
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

const AlertCard = ({ title, message, buttonText, buttonLink, icon }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start space-x-4">
    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-red-500/30 text-red-300 rounded-full">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
      <p className="text-gray-400">{message}</p>
      {buttonText && (
        <a
          href={buttonLink}
          className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-500 transition-colors text-sm font-medium"
        >
          {buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      )}
    </div>
  </div>
);

// Generic Line Chart Component (from >>>>>>> main)
const LineChart = ({ data, color, title, percentage }) => {
  const chartHeight = 100;
  const chartWidth = 100;
  const xOffset = chartWidth / (data.length - 1);
  const maxVal = Math.max(...data.map((item) => item.value)) || 1;

  const points = data
    .map((item, index) => {
      const x = index * xOffset;
      const y = chartHeight - (item.value / maxVal) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <div className="w-full flex flex-col justify-end relative h-full">
      <div className="flex items-baseline mb-2">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <span className="ml-2 text-green-400 text-sm font-medium">
          {percentage} this month
        </span>
      </div>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="lineChartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        <polyline fill="url(#lineChartGradient)" points={areaPoints} />
        <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
        {data.map((item, index) => (
          <circle
            key={index}
            cx={index * xOffset}
            cy={chartHeight - (item.value / maxVal) * chartHeight}
            r="2"
            fill={color}
            stroke="#1A1B1B"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
};

// Bar Chart Component (from >>>>>>> main)
const BarChart = ({ data, color, title, percentage }) => {
  const maxVal = Math.max(...data.map((item) => item.value)) || 1;

  return (
    <div className="w-full flex flex-col justify-end relative h-full">
      <div className="flex items-baseline mb-2">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        {percentage && (
          <span className="ml-2 text-green-400 text-sm font-medium">
            {percentage} this month
          </span>
        )}
      </div>
      <div className="flex items-end h-full w-full space-x-2 p-0">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 h-full flex flex-col justify-end items-center"
          >
            <div
              className="w-full rounded-t-sm transition-all duration-300 ease-out"
              style={{
                height: `${(item.value / maxVal) * 100}%`,
                backgroundColor: item.color || color,
                opacity: 0.7 + (index * 0.3) / data.length,
              }}
            />
          </div>
        ))}
      </div>
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

// Events component (combined from both versions)
const Events = ({ setIsModalOpen, userRole, onViewDetails, onEdit }) => {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("PENDING");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const {
    data: eventsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allEvents", currentPage],
    queryFn: () => getAllEvents(currentPage, itemsPerPage),
  });

  const events = eventsData?.events || [];
  const totalEventsCount = eventsData?.totalCount || 0; // Assuming API returns total count

  const approveMutation = useMutation({
    mutationFn: approveEvent,
    onSuccess: () => {
      toast.success("Event approved successfully!");
      queryClient.invalidateQueries(["allEvents"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to approve event.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectEvent,
    onSuccess: () => {
      toast.success("Event rejected successfully!");
      queryClient.invalidateQueries(["allEvents"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to reject event.");
    },
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  const filteredEvents = events.filter((event) => event.status === activeTab);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            Events Management
          </h3>
          <p className="text-gray-400 text-center text-lg py-8">
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            Events Management
          </h3>
          <p className="text-red-400 text-center text-lg py-8">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalEventsCount / itemsPerPage);

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
        {["PENDING", "APPROVED", "REJECTED"].map((status) => (
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
              onApprove={handleApprove}
              onReject={handleReject}
              userRole={userRole}
              onViewDetails={onViewDetails}
              onEdit={onEdit}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 p-8">
            <p>No {activeTab.toLowerCase()} events found.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 font-medium hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-white text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 font-medium hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Mobile view UserCard (from >>>>>>> main)
const UserCard = ({ user, onEditUser, onDeleteUser }) => (
  <div className="bg-white/5 rounded-2xl p-6 md:hidden">
    <div className="flex items-center space-x-4 mb-4">
      <img
        className="h-12 w-12 rounded-full ring-2 ring-white/10"
        src={user.avatar}
        alt={`${user.name} avatar`}
      />
      <div>
        <h5 className="text-xl font-bold text-white mb-1">{user.name}</h5>
        <p className="text-gray-400 text-sm">{user.email}</p>
      </div>
    </div>
    <div className="flex flex-col space-y-2 mb-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300 font-medium">Role:</span>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300">
          {user.role}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300 font-medium">Status:</span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            user.status === "Active"
              ? "bg-green-500/20 text-green-300"
              : "bg-red-500/20 text-red-300"
          }`}
        >
          {user.status}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300 font-medium">Joined:</span>
        <span className="text-gray-400">{user.joinDate}</span>
      </div>
    </div>
    <div className="flex justify-end space-x-4 border-t border-white/10 pt-4">
      <button
        onClick={() => onEditUser(user)}
        className="text-blue-400 hover:text-blue-600 font-medium"
      >
        Edit
      </button>
      <button
        onClick={() => onDeleteUser(user.id)}
        className="text-red-400 hover:text-red-600 font-medium"
      >
        Delete
      </button>
    </div>
  </div>
);

// The main Users component (combined from both versions)
const Users = ({ onEditUser, onAddUser }) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["allUsers"], queryFn: getAllUsers });

  const users = usersData?.users || [];

  const createUpdateUserMutation = useMutation({
    mutationFn: (userData) => (userData.id ? updateUser(userData) : createUser(userData)),
    onSuccess: () => {
      toast.success("User saved successfully!");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to save user.");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to delete user.");
    },
  });

  const handleSaveUser = (userData) => {
    createUpdateUserMutation.mutate(userData);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            User Management
          </h3>
          <p className="text-gray-400 text-center text-lg py-8">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            User Management
          </h3>
          <p className="text-red-400 text-center text-lg py-8">
            Error loading users: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h3 className="text-3xl font-bold text-white">User Management</h3>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
          <button
            onClick={onAddUser} // This will open the UserModal with null user
            className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition-colors font-medium text-white text-center w-full md:w-auto"
          >
            Add New User
          </button>
        </div>
      </div>

      {/* Responsive table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
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
            {filteredUsers.map((user) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEditUser(user)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card-based layout for small screens */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEditUser={onEditUser}
            onDeleteUser={handleDeleteUser}
          />
        ))}
      </div>
    </div>
  );
};

// Reports component (from >>>>>>> main, adapted to use BarChart)
const Reports = ({ events, users }) => {
  const approvedEvents = events.filter((e) => e.status === "APPROVED").length;
  const pendingEvents = events.filter(
    (e) => e.status === "PENDING"
  ).length;
  const rejectedEvents = events.filter((e) => e.status === "REJECTED").length;

  const eventData = [
    { label: "Approved", value: approvedEvents, color: "#34d399" },
    { label: "Pending", value: pendingEvents, color: "#facc15" },
    { label: "Rejected", value: rejectedEvents, color: "#ef4444" },
  ];

  // Mock data for user sign-ups over quarters, can be replaced with actual data if available
  const userData = [
    { label: "Q1", value: 120, color: "#22d3ee" }, // cyan-400
    { label: "Q2", value: 180, color: "#84cc16" }, // lime-500
    { label: "Q3", value: users.length, color: "#facc15" }, // yellow-400 (using current user count for Q3)
    { label: "Q4", value: 250, color: "#a855f7" }, // purple-500
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
            Event Approval Status
          </h4>
          <div className="flex flex-col items-center justify-center h-64">
            <BarChart data={eventData} title="" /> {/* Title moved to h4 */}
            <div className="mt-8 space-y-2">
              {eventData.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center text-gray-300"
                >
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {item.label} ({item.value})
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <h4 className="text-xl font-semibold text-white mb-4">
            Quarterly User Sign-ups
          </h4>
          <div className="flex items-center justify-center h-64">
            <BarChart data={userData} title="" /> {/* Title moved to h4 */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings component (from >>>>>>> main)
const Settings = () => {
  const [isEditing, setIsEditing] = useState(true);
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
      setIsEditing(false); // Switch to view mode after saving
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-white">System Settings</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition-colors font-medium text-white"
          >
            Edit Settings
          </button>
        )}
      </div>

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
                disabled={!isEditing}
                className={`w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing && "text-white/50"
                }`}
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
                disabled={!isEditing}
                className={`w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing && "text-white/50"
                }`}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </SettingSection>
      </div>
      {isEditing && (
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
      )}
    </div>
  );
};

// OverviewContent component (from >>>>>>> main, adapted for backend data)
const OverviewContent = ({ events, stats, onViewDetails, onEdit }) => {
  // Data for "User Growth Over Time" (Line Chart) - Mock data, replace with actual if available
  const userGrowthData = [
    { label: "Week 1", value: 10 },
    { label: "Week 2", value: 15 },
    { label: "Week 3", value: 25 },
    { label: "Week 4", value: 20 },
    { label: "Week 5", value: 30 },
    { label: "Week 6", value: 40 },
  ];

  // Data for "Event Participation Trends" (Bar Chart) - Mock data, replace with actual if available
  const eventParticipationData = [
    { label: "Jan", value: 12 },
    { label: "Feb", value: 18 },
    { label: "Mar", value: 15 },
    { label: "Apr", value: 22 },
    { label: "May", value: 28 },
    { label: "Jun", value: 20 },
  ];

  return (
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
        {/* User Growth Over Time - Line Chart */}
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 h-80">
          <LineChart
            data={userGrowthData}
            color="#34D399" // Green color from image
            title="User Growth Over Time"
            percentage="+15%"
          />
        </div>

        {/* Event Participation Trends - Bar Chart */}
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 h-80">
          <BarChart
            data={eventParticipationData}
            color="#34D399" // Green color from image
            title="Event Participation Trends"
            percentage="+8%"
          />
        </div>

        {/* Recent events */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6">Recent Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={onViewDetails}
                onEdit={onEdit}
                // No onApprove/onReject here as it's just a display of recent events
              />
            ))}
          </div>
        </div>
      </div>
      {/* Alerts Section */}
      <div className="space-y-6 mt-8">
        <h3 className="text-2xl font-bold text-white mb-4">Alerts</h3>
        <AlertCard
          title="Failed Login Attempts"
          message="There have been 5 failed login attempts in the last 24 hours. Review the logs for more details."
          buttonText="View Logs"
          buttonLink="#"
          icon={
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
          }
        />
        <AlertCard
          title="Suspicious Activity Detected"
          message="Unusual activity detected from IP address 192.168.1.100. Investigate immediately."
          buttonText="Investigate"
          buttonLink="#"
          icon={
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventToView, setEventToView] = useState(null);

  const { isLoading: authLoading, isError: authError, data: authData } = useAuthCheck();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authLoading) {
      if (authError || !authData?.user || authData.user.role !== "ADMIN") {
        navigate("/login"); // Redirect to login if not authenticated or not admin
      }
    }
  }, [authLoading, authError, authData, navigate]);

  // Fetch events
  const {
    data: eventsData,
    isLoading: eventsIsLoading,
    isError: eventsIsError,
    error: eventsError,
  } = useQuery({ queryKey: ["allEvents"], queryFn: () => getAllEvents(1, 100) }); // Fetch all for dashboard stats

  const events = eventsData?.events || [];

  // Fetch users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
  } = useQuery({ queryKey: ["allUsers"], queryFn: getAllUsers });

  const users = usersData?.users || [];

  const stats = {
    totalUsers: users.length,
    totalEvents: events.length,
    pendingApprovals: events.filter((e) => e.status === "PENDING").length,
    activeEvents: events.filter((e) => e.status === "APPROVED").length,
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsUserModalOpen(true);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsUserModalOpen(true);
  };

  // User save handler (delegated to Users component for mutations)
  const handleSaveUser = (userData) => {
    // This function is now handled by the Users component's internal mutations
    // AdminDashboard only needs to trigger the modal
    setIsUserModalOpen(false);
  };

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setIsCreateEventModalOpen(true);
  };

  const handleViewEventDetails = (event) => {
    setEventToView(event);
  };

  const handleEventStatusChange = async (eventId, newStatus) => {
    try {
      if (newStatus === "APPROVED") {
        await approveEvent(eventId);
        toast.success("Event approved successfully!");
      } else if (newStatus === "REJECTED") {
        await rejectEvent(eventId);
        toast.success("Event rejected successfully!");
      }
      queryClient.invalidateQueries(["allEvents"]); // Invalidate to refetch events
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to change event status."
      );
    }
  };

  const renderContent = () => {
    if (authLoading || eventsIsLoading || usersIsLoading) {
      return <LoadingSpinner />;
    }

    if (authError || eventsIsError || usersIsError) {
      return (
        <div className="text-red-500 text-center p-8">
          Error loading data: {authError?.message || eventsError?.message || usersError?.message}
        </div>
      );
    }

    const userRole = authData?.user?.role;

    switch (selectedTab) {
      case "overview":
        return (
          <OverviewContent
            events={events}
            stats={stats}
            onViewDetails={handleViewEventDetails}
            onEdit={handleEditEvent}
          />
        );
      case "events":
        return (
          <Events
            setIsModalOpen={setIsCreateEventModalOpen}
            userRole={userRole}
            onViewDetails={handleViewEventDetails}
            onEdit={handleEditEvent}
          />
        );
      case "users":
        return (
          <Users
            onEditUser={handleEditUser}
            onAddUser={handleAddUser}
            // onDeleteUser is handled internally by Users component
          />
        );
      case "reports":
        return <Reports events={events} users={users} />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

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
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10">
          <div className="flex items-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200">
              Admin Dashboard
            </h1>
          </div>
          <nav className="mt-6 md:mt-0 w-full md:w-auto">
            <ul className="flex overflow-x-auto justify-start md:justify-center space-x-2 md:space-x-4 p-2 bg-white/5 rounded-full border border-white/10 shadow-lg scrollbar-hide">
              {["overview", "events", "users", "reports", "settings"].map(
                (tab) => (
                  <li key={tab} className="flex-shrink-0">
                    <button
                      onClick={() => setSelectedTab(tab)}
                      className={`
                        px-4 py-2 text-sm sm:text-base rounded-full font-medium capitalize transition-colors
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
          onSave={handleSaveUser} // This will trigger the mutation in Users component
          user={currentUser}
        />
        <CreateEventModal
          isModalOpen={isCreateEventModalOpen}
          setIsModalOpen={setIsCreateEventModalOpen}
          eventToEdit={eventToEdit}
          // onEditEvent is handled internally by CreateEventModal's mutations
        />
        <EventDetailsModal
          isOpen={!!eventToView}
          onClose={() => setEventToView(null)}
          event={eventToView}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
/* Responsive styles using Tailwind are already present in many places.
  To further enhance responsiveness, add these global styles for scrollbars and mobile overflow. */

<style>
  {`
   /* Custom scrollbar for better UX on desktop and mobile */
   ::-webkit-scrollbar {
    width: 8px;
    background: rgba(30,31,46,0.2);
   }
   ::-webkit-scrollbar-thumb {
    background: rgba(52,211,153,0.3);
    border-radius: 8px;
   }
   /* Responsive overflow for tables and modals */
   @media (max-width: 768px) {
    .min-w-full {
      min-width: 100vw !important;
    }
    .max-w-xl, .max-w-lg, .max-w-7xl {
      max-width: 100vw !important;
    }
    .rounded-[3rem], .rounded-3xl, .rounded-2xl {
      border-radius: 1.5rem !important;
    }
    .p-8, .p-6, .p-4 {
      padding: 1rem !important;
    }
   }
   @media (max-width: 640px) {
    .grid-cols-2, .grid-cols-3, .lg\:grid-cols-2, .lg\:grid-cols-3 {
      grid-template-columns: 1fr !important;
    }
    .flex-row, .md\:flex-row {
      flex-direction: column !important;
    }
    .space-x-4, .md\:space-x-4 {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .overflow-x-auto {
      overflow-x: scroll !important;
    }
   }
  `}
</style>;