import React from "react";
import { Users, MessageSquare } from "lucide-react";

const RegistrationsContent = ({
  events,
  handleManageRegistrations,
  handleCommunication,
}) => {
  const eventsWithRegistrations = events.filter((e) => e.registrations > 0);

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-white mb-6">
        Registration Management
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {eventsWithRegistrations.length > 0 ? (
          eventsWithRegistrations.map((event) => (
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
                <button
                  onClick={() => handleManageRegistrations(event)}
                  className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors flex items-center justify-center"
                >
                  <Users className="w-4 h-4 inline mr-1" />
                  Manage
                </button>
                <button
                  onClick={() => handleCommunication(event)}
                  className="flex-1 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors flex items-center justify-center"
                >
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Message
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 p-8">
            <p>No registrations available for any events.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationsContent;
