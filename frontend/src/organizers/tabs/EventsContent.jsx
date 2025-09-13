import React from "react";
import { Plus, QrCode, Users, XCircle } from "lucide-react";
import EventCard from "../modals/EventCard";

const EventsContent = ({
  filteredEvents,
  handleCreateEvent,
  handleViewDetails,
  handleEditEvent,
  handleCancelEvent,
  handleQRScan,
  handleManageRegistrations,
}) => {
  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-white">Manage Events</h3>
        <button
          onClick={handleCreateEvent}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors font-medium text-white flex items-center"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={() => handleViewDetails(event)}
              onEdit={() => handleEditEvent(event)}
              onCancel={() => handleCancelEvent(event)}
              onQRScan={() => handleQRScan(event)}
              onManageRegistrations={() => handleManageRegistrations(event)}
              icons={{
                view: <XCircle className="w-4 h-4 mr-1" />, // optional: replace with eye icon if available
                edit: <Plus className="w-4 h-4 mr-1" />, // optional: replace with edit icon
                cancel: <XCircle className="w-4 h-4 mr-1" />,
                qr: <QrCode className="w-4 h-4 mr-1" />,
                manage: <Users className="w-4 h-4 mr-1" />,
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 p-8">
            <p>No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsContent;
