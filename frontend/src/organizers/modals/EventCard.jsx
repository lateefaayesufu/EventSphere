import React from "react";

const EventCard = ({ event, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition cursor-pointer"
    >
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{event.date}</p>
      <p className="text-gray-300">{event.description}</p>
    </div>
  );
};

export default EventCard;
