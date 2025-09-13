import React, { useState, useEffect } from "react";
import { getAllEvents, approveEvent, rejectEvent } from "../../api/events";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const EventCard = ({ event, onApprove, onReject }) => (
  <div
    key={event.id}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
        <div className="grid md:grid-cols-4 gap-4 text-gray-300">
          <div>
            <span className="text-gray-500">Organizer:</span>
            <p className="font-semibold">{event.organizer?.fullName || event.organizerId || "N/A"}</p>
          </div>
          <div>
            <span className="text-gray-500">Category:</span>
            <p className="font-semibold">{event.category || "General"}</p>
          </div>
          <div>
            <span className="text-gray-500">Date:</span>
            <p className="font-semibold">
              {event.date ? new Date(event.date).toLocaleDateString() : "TBD"}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                event.status === "PENDING"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : event.status === "APPROVED"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {event.status || "PENDING"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-3 ml-6">
        {event.status === "PENDING" && onApprove && onReject && ( // Conditionally render buttons
          <>
            <button
              onClick={() => onApprove(event.id)}
              className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 text-green-300 px-6 py-2 rounded-xl font-semibold transition-all duration-300"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(event.id)}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 text-red-300 px-6 py-2 rounded-xl font-semibold transition-all duration-300"
            >
              Reject
            </button>
          </>
        )}
        <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300">
          View Details
        </button>
      </div>
    </div>
  </div>
);

const Events = () => {
  const queryClient = useQueryClient();

  const { data: eventsData, isLoading, isError, error } = useQuery({
    queryKey: ["allEvents"], // Unique query key for all events
    queryFn: getAllEvents,
  });

  const events = eventsData?.events || [];

  const approveMutation = useMutation({
    mutationFn: approveEvent,
    onSuccess: (_, eventId) => {
      toast.success("Event approved successfully!");
      queryClient.invalidateQueries(["allEvents"]); // Invalidate to refetch all events
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to approve event.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectEvent,
    onSuccess: (_, eventId) => {
      toast.success("Event rejected successfully!");
      queryClient.invalidateQueries(["allEvents"]); // Invalidate to refetch all events
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

  const pendingEvents = events.filter(event => event.status === "PENDING");
  const approvedEvents = events.filter(event => event.status === "APPROVED");
  const rejectedEvents = events.filter(event => event.status === "REJECTED");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            Events Management
          </h3>
          <p className="text-gray-400 text-center text-lg py-8">Loading events...</p>
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
          <p className="text-red-400 text-center text-lg py-8">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Pending Events */}
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-bold text-white mb-6">
          Pending Event Approvals
        </h3>
        <div className="space-y-4">
          {pendingEvents.length > 0 ? (
            pendingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg py-8">
              🎉 No pending events! The queue is all clear.
            </p>
          )}
        </div>
      </div>

      {/* Approved Events */}
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-bold text-white mb-6">
          Approved Events
        </h3>
        <div className="space-y-4">
          {approvedEvents.length > 0 ? (
            approvedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg py-8">
              No approved events yet.
            </p>
          )}
        </div>
      </div>

      {/* Rejected Events */}
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-bold text-white mb-6">
          Rejected Events
        </h3>
        <div className="space-y-4">
          {rejectedEvents.length > 0 ? (
            rejectedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg py-8">
              No rejected events.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;