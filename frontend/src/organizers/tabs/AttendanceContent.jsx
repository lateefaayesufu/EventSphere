import React from "react";
import { Download, QrCode } from "lucide-react";

const AttendanceContent = ({ events, handleQRScan }) => {
  const approvedOrOngoingEvents = events.filter(
    (e) => e.status === "Approved" || e.status === "Ongoing"
  );

  const handleDownloadReport = () => {
    const attendanceData = events.map((e) => ({
      eventId: e.id,
      title: e.title,
      registered: e.registrations,
      present: Math.floor(e.registrations * 0.8),
      absent: e.registrations - Math.floor(e.registrations * 0.8),
    }));
    console.log("Generating attendance report:", attendanceData);
    alert("Attendance report downloaded successfully!");
  };

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-white">Attendance Management</h3>
        <button
          onClick={handleDownloadReport}
          className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg font-medium hover:bg-blue-500/30 transition-colors flex items-center"
        >
          <Download className="w-4 h-4 inline mr-2" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedOrOngoingEvents.length > 0 ? (
              approvedOrOngoingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {event.date} • {event.venue}
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Registered</span>
                      <span className="text-white font-medium">
                        {event.registrations}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Present</span>
                      <span className="text-green-400 font-medium">
                        {Math.floor(event.registrations * 0.8)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Absent</span>
                      <span className="text-red-400 font-medium">
                        {event.registrations -
                          Math.floor(event.registrations * 0.8)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleQRScan(event)}
                    className="w-full mt-4 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg font-medium hover:bg-purple-500/30 transition-colors flex items-center justify-center"
                  >
                    <QrCode className="w-4 h-4 inline mr-2" />
                    Scan QR Code
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 p-8">
                No approved or ongoing events to manage attendance.
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Panel */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h4 className="text-xl font-semibold text-white mb-4">Quick Stats</h4>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">85%</div>
              <div className="text-sm text-gray-400">Average Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {events.filter((e) => e.status === "Ongoing").length}
              </div>
              <div className="text-sm text-gray-400">Live Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {events.filter((e) => e.status === "Pending Approval").length}
              </div>
              <div className="text-sm text-gray-400">Pending Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceContent;
