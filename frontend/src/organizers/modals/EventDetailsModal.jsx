// components/dashboard/modals/EventDetailsModal.jsx
import React from "react";
import { XCircle } from "lucide-react";

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white">Event Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4 text-white">
          <div>
            <h4 className="text-lg font-semibold">Title</h4>
            <p>{event.title}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Date</h4>
            <p>{event.date}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Venue</h4>
            <p>{event.venue}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Status</h4>
            <p>{event.status}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Participants</h4>
            <p>
              {event.registrations} / {event.maxParticipants}
            </p>
          </div>
          {event.participants?.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold">Participant List</h4>
              <ul className="list-disc list-inside">
                {event.participants.map((p) => (
                  <li key={p.id}>{p.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
