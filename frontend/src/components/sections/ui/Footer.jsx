import React from "react";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    PartyPopper,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] text-white py-16 px-4 md:px-20 relative">
            {/* Main Content Container with Glassmorphism Effect */}
            <div className="relative max-w-7xl mx-auto z-10 p-8 md:p-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">

                {/* Top Section: Logo & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-8 border-b border-white/10">
                    {/* Brand Logo & Tagline */}
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start">
                            <div className="font-bold text-2xl md:text-3xl text-gray-200">
                                eventsphere
                            </div>
                            <PartyPopper
                                size={16}
                                className="inline-block ml-2 text-gray-300"
                                fill="currentColor"
                            />
                        </div>
                        <p className="text-gray-300 mt-2 max-w-sm">
                            Revolutionizing campus life, one event at a time.
                        </p>
                    </div>
                    {/* Social Media Icons */}
                    <div className="flex space-x-4 md:space-x-6">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors">
                            <Facebook size={24} />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
                            <Twitter size={24} />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-purple-400 transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>

                {/* Bottom Section: Links & Copyright */}
                <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-left text-gray-400 text-sm">
                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0">
                        <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                    {/* Copyright */}
                    <p>&copy; {currentYear} EventSphere. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;