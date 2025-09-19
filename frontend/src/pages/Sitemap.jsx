import React from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";
import {
  Home,
  Calendar,
  Image,
  Users,
  MessageSquare,
  ClipboardList,
  Info,
  ChevronRight,
} from "lucide-react";

const Sitemap = () => {
  const sitemapSections = [
    {
      title: "General",
      icon: Home,
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "FAQs", path: "/faq" },
      ],
    },
    {
      title: "Events",
      icon: Calendar,
      links: [
        { name: "Upcoming Events", path: "/events" },
        { name: "Past Events", path: "/events" },
        { name: "Event Categories", path: "/events" },
        { name: "Media Gallery", path: "/gallery" },
      ],
    },
    {
      title: "Account & Dashboard",
      icon: Users,
      links: [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/login" },
        { name: "My Dashboard", path: "/participant" },
        { name: "My Registrations", path: "/participant" },
        { name: "Download Certificates", path: "/participant" },
      ],
    },
    {
      title: "Support",
      icon: MessageSquare,
      links: [
        { name: "Feedback", path: "/feedback" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
    {
      title: "Organizers & Admins",
      icon: ClipboardList,
      links: [
        { name: "Organizer Dashboard", path: "/organizer" },
        { name: "Create Event", path: "/organizer" },
        { name: "Admin Panel", path: "/admin" },
        { name: "Manage Users", path: "/admin" },
      ],
    },
    {
      title: "Legal & Info",
      icon: Info,
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      <Navbar />
      
    
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mt-10 font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Site Map
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mt-4">
            A comprehensive guide to all pages on EventSphere. Find your way around with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-3 flex-shrink-0">
                  <section.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-200"
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-200" />
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap;