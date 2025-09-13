// components/dashboard/modals/RegistrationModal.jsx
import React, { useState } from "react";
import { XCircle } from "lucide-react";

const RegistrationModal = ({ isOpen, onClose, event }) => {
  const [newParticipant, setNewParticipant] = useState("");

  if (!isOpen || !event) return null;

  const handleAddParticipant = () => {
    if (!newParticipant.trim()) return;
    if (!event.participants) event.participants = [];
    event.participants.push({ id: Date.now(), name: newParticipant.trim() });
    setNewParticipant("");
    alert(`${newParticipant} added successfully!`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white">
            Manage Registrations
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4 text-white">
          <div>
            <h4 className="text-lg font-semibold mb-2">{event.title}</h4>
            <p className="text-gray-400">
              {event.date} • {event.venue}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Participants</h4>
            {event.participants?.length > 0 ? (
              <ul className="max-h-40 overflow-y-auto border border-white/10 rounded p-2 space-y-1">
                {event.participants.map((p) => (
                  <li key={p.id} className="flex justify-between">
                    <span>{p.name}</span>
                    <button
                      className="text-red-400 hover:text-red-500 text-sm"
                      onClick={() => {
                        event.participants = event.participants.filter(
                          (part) => part.id !== p.id
                        );
                        alert(`${p.name} removed.`);
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No participants yet.</p>
            )}
          </div>

          <div className="flex space-x-2 mt-4">
            <input
              type="text"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              placeholder="Add participant name"
              className="flex-1 p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={handleAddParticipant}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
