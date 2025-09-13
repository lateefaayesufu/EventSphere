import React, { useState } from "react";
import { Upload, Trash2, Image } from "lucide-react";

const MediaContent = ({ events, setEvents }) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);

  const completedEvents = events.filter((e) => e.status === "Completed");

  const handleFileChange = (e) => setFileToUpload(e.target.files[0]);

  const handleUploadMedia = () => {
    if (selectedEventId && fileToUpload) {
      const newMedia = {
        id: Date.now(),
        url: URL.createObjectURL(fileToUpload),
        type: fileToUpload.type.startsWith("video") ? "video" : "image",
      };

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === parseInt(selectedEventId)
            ? { ...event, media: [...event.media, newMedia] }
            : event
        )
      );

      setFileToUpload(null);
      document.getElementById("media-upload-input").value = "";
    }
  };

  const handleDeleteMedia = (eventId, mediaId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, media: event.media.filter((m) => m.id !== mediaId) }
          : event
      )
    );
  };

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-white mb-6">
        Media Gallery Management
      </h3>

      <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
        <h4 className="text-xl font-semibold text-white mb-4">
          Upload New Media
        </h4>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="flex-1 w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="bg-[#1A1B1B]">
              Select a completed event...
            </option>
            {completedEvents.map((event) => (
              <option key={event.id} value={event.id} className="bg-[#1A1B1B]">
                {event.title}
              </option>
            ))}
          </select>

          <input
            id="media-upload-input"
            type="file"
            onChange={handleFileChange}
            className="flex-1 w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <button
            onClick={handleUploadMedia}
            disabled={!selectedEventId || !fileToUpload}
            className={`py-3 px-6 rounded-lg font-medium transition-colors ${
              selectedEventId && fileToUpload
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            } flex items-center justify-center`}
          >
            <Upload size={16} className="inline mr-2" />
            Upload
          </button>
        </div>
      </div>

      <h4 className="text-2xl font-semibold text-white mb-4">
        Event Galleries
      </h4>
      {completedEvents.length > 0 ? (
        <div className="space-y-6">
          {completedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-semibold text-white">
                  {event.title}
                </h5>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View All →
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {event.media.length > 0 ? (
                  event.media.map((media) => (
                    <div
                      key={media.id}
                      className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                      <img
                        src={media.url}
                        alt={`Media for ${event.title}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Trash2
                          size={24}
                          className="text-red-400 cursor-pointer"
                          onClick={() => handleDeleteMedia(event.id, media.id)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 p-4">
                    No media uploaded yet.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center text-gray-400 p-8">
          <Image className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p>No completed events with media.</p>
        </div>
      )}
    </div>
  );
};

export default MediaContent;
