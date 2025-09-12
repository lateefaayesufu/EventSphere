import React, { useState } from "react";

const Settings = () => {
  // Use state to manage different administrative settings
  const [siteTitle, setSiteTitle] = useState("EventSphere");
  const [announcement, setAnnouncement] = useState("");
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [defaultRole, setDefaultRole] = useState("Participant");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to our college event platform!"
  );

  // Mock function to simulate saving settings to the backend
  const handleSaveSettings = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    console.log("Saving settings:", {
      siteTitle,
      announcement,
      registrationEnabled,
      defaultRole,
      welcomeMessage,
    });
    // In a real application, you would make an API call here, e.g.,
    // axios.put('/api/admin/settings', { siteTitle, announcement, ... });
    alert("Settings saved successfully! (This is a simulation)");
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-bold text-white mb-6">System Settings</h3>
        <p className="text-gray-400 mb-8">
          Manage platform-wide configurations and global policies.
        </p>

        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* Section: Site Information */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-white">
              Site Information
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">
                  Platform Title
                </label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Default Welcome Message
                </label>
                <input
                  type="text"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section: User Management Settings */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-white">
              User Management
            </h4>
            <div className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <label htmlFor="reg-toggle" className="flex-grow text-gray-300">
                Allow New User Registrations
              </label>
              <input
                type="checkbox"
                id="reg-toggle"
                checked={registrationEnabled}
                onChange={(e) => setRegistrationEnabled(e.target.checked)}
                className="form-checkbox h-6 w-6 text-blue-500 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Default Role for New Users
              </label>
              <select
                value={defaultRole}
                onChange={(e) => setDefaultRole(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Participant" className="bg-gray-800 text-white">
                  Participant
                </option>
                <option value="Organizer" className="bg-gray-800 text-white">
                  Organizer
                </option>
                <option value="Visitor" className="bg-gray-800 text-white">
                  Visitor
                </option>
              </select>
            </div>
          </div>

          {/* Section: Announcements & Notifications */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-white">Announcements</h4>
            <p className="text-gray-400">
              Broadcast a message to all users on the home page.
            </p>
            <textarea
              className="w-full h-32 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Type your announcement here..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
          </div>

          <div className="mt-10 text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
