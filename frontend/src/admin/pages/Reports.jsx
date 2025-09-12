import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data for Events and Participants by Category
const categoryData = [
  { name: "Technical", Events: 120, Participants: 4000 },
  { name: "Cultural", Events: 85, Participants: 3500 },
  { name: "Sports", Events: 45, Participants: 2800 },
  { name: "Academic", Events: 60, Participants: 1500 },
  { name: "Workshops", Events: 90, Participants: 2200 },
];

// Mock data for Feedback Trends over a few months
const feedbackData = [
  { name: "Jan", "Average Rating": 4.2 },
  { name: "Feb", "Average Rating": 4.5 },
  { name: "Mar", "Average Rating": 4.1 },
  { name: "Apr", "Average Rating": 4.7 },
  { name: "May", "Average Rating": 4.6 },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-bold text-white mb-6">
          EventSphere Reports & Analytics
        </h3>
        <p className="text-gray-400 mb-8">
          Monitor key metrics related to event performance and user engagement.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bar Chart for Event & Participant Count */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.02]">
            <h4 className="text-xl font-bold text-white mb-4">
              Events and Participants by Category
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={categoryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="Events" fill="#8884d8" />
                <Bar dataKey="Participants" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart for Feedback Trends */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.02]">
            <h4 className="text-xl font-bold text-white mb-4">
              Average Feedback Ratings Over Time
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={feedbackData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis domain={[3, 5]} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Average Rating"
                  stroke="#ffc658"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
