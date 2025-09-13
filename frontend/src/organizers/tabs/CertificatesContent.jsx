import React, { useState } from "react";
import { Award, Upload, XCircle } from "lucide-react";

const CertificatesContent = ({ events }) => {
  const completedEvents = events.filter((e) => e.status === "Completed");
  const [selectedEventForCert, setSelectedEventForCert] = useState(null);

  const handleUploadClick = (event) => setSelectedEventForCert(event);

  const handleGenerateCertificate = (participant) => {
    alert(`Generating and downloading certificate for ${participant.name}...`);
  };

  const UploadCertificateModal = ({ event, onClose }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = () => {
      if (file) {
        console.log(`Uploading certificate file for event: ${event.title}`);
        alert(`Certificate for ${event.title} uploaded successfully!`);
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white">
              Upload Certificates for {event.title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <XCircle size={24} />
            </button>
          </div>

          <p className="text-gray-400 mb-4">
            Select a file to upload (PDF or ZIP of certificates)
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-500/20 text-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                file
                  ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Upload size={16} className="inline mr-2" />
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-white mb-6">
        Certificate Management
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {completedEvents.length > 0 ? (
          completedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-white">
                  {event.title}
                </h4>
                <span className="text-gray-400 text-sm">{event.date}</span>
              </div>

              <div className="space-y-4">
                <h5 className="text-lg font-medium text-gray-300">
                  Participants
                </h5>
                <ul className="space-y-2">
                  {event.participants.length > 0 ? (
                    event.participants.map((p) => (
                      <li
                        key={p.id}
                        className="flex justify-between items-center p-2 bg-white/5 rounded-lg"
                      >
                        <span>{p.name}</span>
                        <button
                          onClick={() => handleGenerateCertificate(p)}
                          className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-full hover:bg-green-500/30 transition-colors flex items-center"
                        >
                          <Award className="w-3 h-3 inline mr-1" />
                          Generate Cert
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      No participants for this event.
                    </p>
                  )}
                </ul>
              </div>

              <button
                onClick={() => handleUploadClick(event)}
                className="w-full mt-6 py-2 px-4 bg-purple-500/20 text-purple-300 rounded-lg font-medium hover:bg-purple-500/30 transition-colors flex items-center justify-center"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload Batch Certificates
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 p-8">
            <Award className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p>No completed events to manage certificates for.</p>
          </div>
        )}
      </div>

      {selectedEventForCert && (
        <UploadCertificateModal
          event={selectedEventForCert}
          onClose={() => setSelectedEventForCert(null)}
        />
      )}
    </div>
  );
};

export default CertificatesContent;
