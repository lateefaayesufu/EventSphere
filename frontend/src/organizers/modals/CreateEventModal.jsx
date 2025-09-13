// components/dashboard/modals/CreateEventModal.jsx
import React, { useState, useEffect } from "react";
import { XCircle, Plus } from "lucide-react";

const CreateEventModal = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [status, setStatus] = useState("Pending Approval");
  const [maxParticipants, setMaxParticipants] = useState(50);

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDate(event.date || "");
      setVenue(event.venue || "");
      setStatus(event.status || "Pending Approval");
      setMaxParticipants(event.maxParticipants || 50);
    } else {
      setTitle("");
      setDate("");
      setVenue("");
      setStatus("Pending Approval");
      setMaxParticipants(50);
    }
  }, [event, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !date.trim() || !venue.trim()) return;
    const newEvent = {
      id: event?.id || Date.now(),
      title,
      date,
      venue,
      status,
      maxParticipants: parseInt(maxParticipants, 10),
      registrations: event?.registrations || 0,
      participants: event?.participants || [],
      media: event?.media || [],
      rating: event?.rating || 0,
      feedback: event?.feedback || [],
      certificateFee: event?.certificateFee || 0,
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            {event ? "Edit Event" : "Create Event"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
          >
            <option value="Pending Approval">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="number"
            placeholder="Max Participants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={!title || !date || !venue}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              title && date && venue
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {event ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
