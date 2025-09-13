// components/dashboard/AnalyticsContent.jsx
import React from "react";
import { MessageSquare, Star, TrendingUp, BarChart3 } from "lucide-react";

const AnalyticsContent = ({ events }) => {
  const completedEvents = events.filter((e) => e.status === "Completed");

  const totalFeedback = completedEvents.reduce(
    (sum, event) => sum + (event.feedback?.length || 0),
    0
  );

  const avgRating =
    completedEvents
      .filter((e) => e.rating > 0)
      .reduce((sum, event, _, arr) => sum + event.rating / arr.length, 0) || 0;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-3xl font-bold text-white mb-6">Event Analytics</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">
                Total Feedback
              </h4>
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {totalFeedback}
            </div>
            <div className="text-sm text-gray-400">Reviews received</div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Avg Rating</h4>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {avgRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-400">Out of 5.0</div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">
                Attendance Rate
              </h4>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">85%</div>
            <div className="text-sm text-gray-400">Average attendance</div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Revenue</h4>
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ₹
              {events
                .reduce(
                  (sum, e) =>
                    sum + e.certificateFee * Math.floor(e.registrations * 0.6),
                  0
                )
                .toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Certificate fees</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-xl font-semibold text-white mb-4">
              Recent Feedback
            </h4>
            <div className="space-y-4">
              {completedEvents.slice(-2).map((event, i) => (
                <div
                  key={i}
                  className={`border-l-4 pl-4 ${
                    i % 2 === 0 ? "border-green-500" : "border-blue-500"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {Array(event.rating)
                        .fill(0)
                        .map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current" />
                        ))}
                      {Array(5 - event.rating)
                        .fill(0)
                        .map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 text-gray-600" />
                        ))}
                    </div>
                    <span className="text-gray-400 text-sm">{event.title}</span>
                  </div>
                  <p className="text-white text-sm">
                    "{event.feedback?.[0] || "No feedback"}"
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    - {event.organizer || "Anonymous"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-xl font-semibold text-white mb-4">
              Event Performance
            </h4>
            <div className="space-y-4">
              {completedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <h5 className="text-white font-medium">{event.title}</h5>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-4">
                        {event.registrations} participants
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{event.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-400">
                      {Math.round(
                        (event.registrations / event.maxParticipants) * 100
                      )}
                      %
                    </div>
                    <div className="text-xs text-gray-400">Capacity</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent;
