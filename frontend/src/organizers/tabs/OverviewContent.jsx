import React from "react";

const OverviewContent = () => {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2">Total Events</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2">Registrations</h2>
          <p className="text-3xl font-bold">245</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2">Attendance Rate</h2>
          <p className="text-3xl font-bold">78%</p>
        </div>
      </section>

      <section className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
        <ul className="space-y-4">
          {["Hackathon 2023", "Tech Talk", "AI Workshop"].map((event, i) => (
            <li
              key={i}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <span>{event}</span>
              <span className="text-sm text-gray-400">View</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OverviewContent;
