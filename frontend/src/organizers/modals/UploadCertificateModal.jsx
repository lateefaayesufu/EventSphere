import React from "react";
import XCircleIcon from "../icons/XCircle";
import UploadIcon from "../icons/Upload";

const UploadCertificateModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const handleUpload = () => {
    console.log(`Certificates uploaded for ${event.title}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-lg"
        >
          <XCircleIcon className="w-6 h-6 text-red-400" />
        </button>
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <UploadIcon className="w-6 h-6 text-blue-400" />
          Upload Certificates - {event.title}
        </h3>
        <div className="flex flex-col items-center justify-center p-6 border border-dashed border-white/20 rounded-xl">
          <p className="text-gray-300 mb-4">Drop certificate files here</p>
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCertificateModal;
