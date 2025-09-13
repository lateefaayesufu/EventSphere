// components/dashboard/modals/QRScannerModal.jsx
import React, { useState } from "react";
import { XCircle, QrCode } from "lucide-react";

const QRScannerModal = ({ isOpen, onClose, event }) => {
  const [scannedCode, setScannedCode] = useState("");

  if (!isOpen || !event) return null;

  const handleScan = () => {
    if (!scannedCode.trim()) return;
    alert(`QR Code "${scannedCode}" scanned for event "${event.title}"!`);
    setScannedCode("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#131414] border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <QrCode className="w-6 h-6 mr-2" />
            Scan QR Code
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-white">{event.title}</h4>
            <p className="text-gray-400">
              {event.date} • {event.venue}
            </p>
          </div>

          <input
            type="text"
            placeholder="Enter scanned QR code"
            value={scannedCode}
            onChange={(e) => setScannedCode(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none"
          />

          <button
            onClick={handleScan}
            disabled={!scannedCode.trim()}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              scannedCode.trim()
                ? "bg-purple-500 hover:bg-purple-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScannerModal;
