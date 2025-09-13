import React from "react";
import { PartyPopper } from "lucide-react";

const Certificate = React.forwardRef(({ certificate }, ref) => {
  const user = { fullName: "John Doe" };
  const event = {
    title: certificate.eventTitle,
    organizer: "University Event Services",
    logo: "https://placehold.co/40x40/5000C1/white?text=LOGO",
  };

  if (!certificate || !user || !event) return null;

  return (
    <div
      ref={ref}
      // Main container for the certificate with a more flexible design
      className="relative w-full h-full p-8 md:p-12 lg:p-16 
                 bg-gradient-to-br from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] 
                 text-white flex flex-col justify-between items-center 
                 rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
    >
      {/* Background Gradients and Shapes for visual appeal */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow-reverse"></div>
      <div className="absolute inset-0 bg-white/5 opacity-30 blur-3xl rounded-[3rem] pointer-events-none"></div>

      {/* Header with Organization Logo and Certificate Title */}
      <div className="w-full flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center">
          <div className="font-bold text-xl md:text-2xl text-gray-400">
            eventsphere
          </div>
          <PartyPopper
            size={16}
            strokeWidth={2}
            color="gray"
            className="inline-block ml-2"
            fill="grey"
          />
        </div>{" "}
        <h1 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200">
          Certificate
        </h1>
      </div>

      {/* Main Content: Recipient, Event, and Date */}
      <div className="flex flex-col items-center justify-center flex-grow text-center relative z-10 px-4">
        <p className="text-md md:text-lg text-gray-300 font-medium mb-4">
          This certifies that
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {user.fullName}
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-2">
          has successfully participated in the
        </p>
        <h3 className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300 mb-6 leading-snug">
          "{event.title}"
        </h3>
        <p className="text-gray-300 text-md md:text-lg mt-4">
          on {certificate.completionDate}
        </p>
        <p className="text-gray-400 text-sm md:text-md">
          Organized by {event.organizer}
        </p>
      </div>

      {/* Footer with Signature and Certificate ID */}
      <div className="w-full flex justify-between items-end mt-8 relative z-10">
        <div className="flex flex-col items-center">
          {/* Cursive "eventsphere" signature with a gradient style */}
          <h4 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 font-[\'Great Vibes\', cursive]">
            eventsphere
          </h4>
          <span className="text-gray-300 text-sm md:text-md border-t border-gray-600 pt-1">
            Authorized Signature
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs md:text-sm text-gray-500">Certificate ID:</p>
          <p className="text-sm md:text-md text-gray-400 font-mono">
            {certificate.id}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Certificate;
