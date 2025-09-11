import React from "react";
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";

const About = () => {
  const features = [
    {
      title: "Centralized Event Hub",
      description:
        "All college events in one place - no more scattered information or missed opportunities.",
    },
    {
      title: "Easy Registration",
      description:
        "One-click registration with real-time capacity tracking and instant confirmations.",
    },
    {
      title: "Digital Certificates",
      description:
        "Earn and download certificates instantly after attending events.",
    },
    {
      title: "Real-time Updates",
      description:
        "Get instant notifications about event changes, deadlines, and new opportunities.",
    },
    {
      title: "Secure Platform",
      description:
        "Role-based access ensures data security and appropriate permissions for all users.",
    },
    {
      title: "Analytics & Insights",
      description:
        "Track your participation history and discover events that match your interests.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      {/* Animated Background Elements */}
      <Navbar />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div
            className="text-center mb-16 relative py-20 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative flex items-center justify-center mb-6">
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                About EventSphere
              </h1>
            </div>
            <p className="relative text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Your gateway to extraordinary campus experiences. Where every
              event becomes a memory, and every participation shapes your
              journey.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-6 animate-bounce"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                To revolutionize campus life by creating a seamless bridge
                between students and opportunities, fostering engagement, and
                building a vibrant academic community where no one misses out.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-white/10 group-hover:border-purple-400/50 transition-all duration-300">
                  <svg
                    className="w-12 h-12 text-purple-400 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-3">Connect</h3>
                  <p className="text-gray-400">
                    Bringing students together through shared interests and
                    experiences
                  </p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-white/10 group-hover:border-blue-400/50 transition-all duration-300">
                  <svg
                    className="w-12 h-12 text-blue-400 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-3">Engage</h3>
                  <p className="text-gray-400">
                    Making participation effortless and rewarding for every
                    student
                  </p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border border-white/10 group-hover:border-green-400/50 transition-all duration-300">
                  <svg
                    className="w-12 h-12 text-green-400 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-3">Grow</h3>
                  <p className="text-gray-400">
                    Empowering personal and academic development through events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is EventSphere Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                What is EventSphere?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-green-400 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Centralized Hub
                    </h3>
                    <p className="text-gray-400">
                      Your one-stop destination for all college events,
                      eliminating the chaos of scattered information across
                      multiple platforms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-green-400 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Smart Discovery
                    </h3>
                    <p className="text-gray-400">
                      Advanced filtering and personalized recommendations help
                      you discover events that align with your interests and
                      schedule.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-green-400 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Seamless Experience
                    </h3>
                    <p className="text-gray-400">
                      From registration to certificate collection, every step is
                      designed to be intuitive and hassle-free.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 border border-white/20 backdrop-blur-xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Students collaborating"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Join the Revolution
                  </h3>
                  <p className="text-gray-300">
                    Be part of the campus community that never misses an
                    opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose EventSphere?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the features that make EventSphere the ultimate campus
              event platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-gradient-to-b hover:from-white/15 hover:to-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* For Students & Organizers Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Students */}
            <div className="bg-gradient-to-b from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
              <div className="text-center mb-8">
                <svg
                  className="w-16 h-16 text-purple-400 mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <h3 className="text-3xl font-bold text-white mb-4">
                  For Students
                </h3>
                <p className="text-gray-400">
                  Your campus adventure starts here
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Discover events that match your interests
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Never miss registration deadlines
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Track your participation history
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Earn digital certificates
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Connect with like-minded peers
                  </span>
                </div>
              </div>
            </div>

            {/* For Organizers */}
            <div className="bg-gradient-to-b from-green-500/10 to-teal-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
              <div className="text-center mb-8">
                <svg
                  className="w-16 h-16 text-green-400 mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-3xl font-bold text-white mb-4">
                  For Organizers
                </h3>
                <p className="text-gray-400">
                  Powerful tools for seamless event management
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Effortless event creation and management
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Automated registration handling
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Real-time analytics and insights
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Streamlined feedback collection
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Automated certificate distribution
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Campus Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already discovered their
              passion through EventSphere
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button className="group bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-white/90 transition-all transform hover:scale-105 shadow-2xl">
                <span>Browse Events</span>
              </button>

              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
