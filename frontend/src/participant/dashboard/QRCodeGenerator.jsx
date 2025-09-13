import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeGenerator = ({ value, size = 150 }) => {
  return (
    <div className="flex items-center justify-center">
      {value ? (
        <QRCodeSVG value={value} size={size} level="H" />
      ) : (
        <p className="text-gray-500">No QR code data available</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
