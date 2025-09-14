import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#131414] text-white font-sans antialiased flex flex-col items-center justify-center p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background: #0d0d0d;
        }
      `}</style>

      <div className="relative w-full max-w-2xl mx-auto rounded-[3rem] p-8 md:p-12 overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] text-center shadow-2xl border border-white/10">
        <div className="absolute inset-0 bg-white/5 opacity-50 blur-3xl rounded-[3rem] pointer-events-none"></div>

        <h1 className="relative z-10 text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 mb-4">
          404
        </h1>
        <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-white mb-6">
          Page Not Found
        </h2>
        <p className="relative z-10 text-lg text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="relative z-10 inline-flex items-center px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors font-medium text-white text-lg shadow-lg transform hover:scale-105"
        >
          Go to Homepage
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-3 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
