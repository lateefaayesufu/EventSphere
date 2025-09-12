import React, { useState } from "react";

// Icons for a more visually appealing dashboard
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white/80 drop-shadow-lg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4.5 4.5 0 100 9.292 4.5 4.5 0 000-9.292zM12 15a8 8 0 018 8v1H4v-1a8 8 0 018-8z"
    />
  </svg>
);

const EventIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white/80 drop-shadow-lg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-5 4h.01M12 21h4.25a2 2 0 002-2V8.75a2 2 0 00-2-2H8.75a2 2 0 00-2 2V19a2 2 0 002 2H12z"
    />
  </svg>
);

const ApprovalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white/80 drop-shadow-lg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.955a11.955 11.955 0 01-5.618 1.029m-2.14 0l-2.75 3.75m2.75-3.75l-2.75 3.75m3.75-2.75a8 8 0 100 16 8 8 0 000-16z"
    />
  </svg>
);

const ActiveEventIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white/80 drop-shadow-lg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white/80 drop-shadow-lg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.308 17c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const Overview = () => {
  // Use the same stats object as your main dashboard for consistency
  const [stats] = useState({
    totalUsers: 1247,
    totalEvents: 89,
    pendingApprovals: 12,
    activeEvents: 5,
    systemAlerts: 2,
  });

  // Mock data for recent activities, tailored to your design
  const [recentActivities] = useState([
    {
      id: 1,
      type: "New User",
      description: "John Doe registered as a student.",
      timestamp: "Just now",
    },
    {
      id: 2,
      type: "Event Created",
      description: '"AI & ML Workshop" submitted for approval.',
      timestamp: "5 mins ago",
    },
    {
      id: 3,
      type: "Event Feedback",
      description: 'New feedback for "Annual Tech Fest".',
      timestamp: "1 hour ago",
    },
    {
      id: 4,
      type: "Registration",
      description: 'Jane Smith registered for "Cultural Fest 2024".',
      timestamp: "2 hours ago",
    },
    {
      id: 5,
      type: "User Suspended",
      description: 'Account for "Mike Johnson" has been suspended.',
      timestamp: "Yesterday",
    },
  ]);

  return (
    <div className="space-y-8">
      {/* KPI Section with matching glassmorphism style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-transform transform hover:scale-105 flex flex-col items-center text-center">
          <UserIcon />
          <h4 className="text-lg font-semibold text-purple-300 mt-2">
            Total Users
          </h4>
          <p className="mt-1 text-4xl font-bold text-white">
            {stats.totalUsers}
          </p>
        </div>
        <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-transform transform hover:scale-105 flex flex-col items-center text-center">
          <EventIcon />
          <h4 className="text-lg font-semibold text-pink-300 mt-2">
            Total Events
          </h4>
          <p className="mt-1 text-4xl font-bold text-white">
            {stats.totalEvents}
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-lime-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-transform transform hover:scale-105 flex flex-col items-center text-center">
          <ApprovalIcon />
          <h4 className="text-lg font-semibold text-green-300 mt-2">
            Pending Approvals
          </h4>
          <p className="mt-1 text-4xl font-bold text-white">
            {stats.pendingApprovals}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-transform transform hover:scale-105 flex flex-col items-center text-center">
          <ActiveEventIcon />
          <h4 className="text-lg font-semibold text-yellow-300 mt-2">
            Active Events
          </h4>
          <p className="mt-1 text-4xl font-bold text-white">
            {stats.activeEvents}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity Feed */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h4 className="text-3xl font-bold text-white mb-6">
            Recent Activities
          </h4>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white">{activity.type}</p>
                  <span className="text-xs text-gray-500">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-sm">{activity.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* System Alerts */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h4 className="text-3xl font-bold text-white mb-6">System Alerts</h4>
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start space-x-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-red-500/30 text-red-300 rounded-full">
                <AlertIcon />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  High Server Load
                </h4>
                <p className="text-gray-400">
                  The server is experiencing a 90% CPU load. Consider scaling up
                  resources.
                </p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start space-x-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-yellow-500/30 text-yellow-300 rounded-full">
                <AlertIcon />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  Pending Approvals
                </h4>
                <p className="text-gray-400">
                  There are {stats.pendingApprovals} events pending approval
                  from event organizers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
