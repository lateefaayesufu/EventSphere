// components/dashboard/modals/CommunicationModal.jsx
import React, { useState } from "react";
import { XCircle, MessageSquare } from "lucide-react";

const CommunicationModal = ({ isOpen, onClose, event }) => {
  const [message, setMessage] = useState("");

  if (!isOpen || !event) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    alert(`Message sent to participants of "${event.title}":\n\n${message}`);
    setMessage("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <MessageSquare className="w-6 h-6 mr-2" />
            Send Message
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-white">{event.title}</h4>
            <p className="text-gray-400">
              {event.date} • {event.venue}
            </p>
          </div>

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none resize-none"
          />

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              message.trim()
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationModal;
