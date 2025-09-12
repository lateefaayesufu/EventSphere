import React, { useState } from "react";

const Events = () => {
  // Mock data for demonstration. You will replace this with a real API call later.
  const [pendingEvents, setPendingEvents] = useState([
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      organizer: "Dr. Sarah Johnson",
      department: "Computer Science",
      date: "2024-10-25",
      type: "Technical",
    },
    {
      id: 2,
      title: "Cultural Fest 2024",
      organizer: "Prof. Michael Chen",
      department: "Student Affairs",
      date: "2024-11-15",
      type: "Cultural",
    },
    {
      id: 3,
      title: "Career Fair",
      organizer: "Ms. Emily Davis",
      department: "Placement Cell",
      date: "2024-12-05",
      type: "Career",
    },
  ]);

  const handleApprove = (id) => {
    console.log(`Approving event with ID: ${id}`);
    // In a real application, you would send a request to your backend here.
    // e.g., axios.put(`/api/admin/events/${id}/approve`).then(...)

    // For now, we'll just filter out the approved event from our state.
    setPendingEvents(pendingEvents.filter((event) => event.id !== id));
  };

  const handleReject = (id) => {
    console.log(`Rejecting event with ID: ${id}`);
    // In a real application, you would send a request to your backend here.
    // e.g., axios.put(`/api/admin/events/${id}/reject`).then(...)

    // For now, we'll just filter out the rejected event from our state.
    setPendingEvents(pendingEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-bold text-white mb-6">
          Pending Event Approvals
        </h3>
        <div className="space-y-4">
          {pendingEvents.length > 0 ? (
            pendingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h4>
                    <div className="grid md:grid-cols-4 gap-4 text-gray-300">
                      <div>
                        <span className="text-gray-500">Organizer:</span>
                        <p className="font-semibold">{event.organizer}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Department:</span>
                        <p className="font-semibold">{event.department}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <p className="font-semibold">{event.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            event.type === "Technical"
                              ? "bg-blue-500/20 text-blue-300"
                              : event.type === "Cultural"
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3 ml-6">
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 text-green-300 px-6 py-2 rounded-xl font-semibold transition-all duration-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(event.id)}
                      className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 text-red-300 px-6 py-2 rounded-xl font-semibold transition-all duration-300"
                    >
                      Reject
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg py-8">
              🎉 No pending events! The queue is all clear.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
