import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PartyPopper, Menu, X } from "lucide-react";

const Navbar = function () {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-20">
      <nav className="glass-nav border-[1px] border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl text-white flex items-center justify-between px-4 md:px-8 py-3 md:py-4 fixed w-full md:w-auto top-0 left-0">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-2xl md:text-3xl text-white">
            <PartyPopper
              size={24}
              strokeWidth={2}
              color="white"
              className="inline-block mx-3"
              fill="white"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex list-none gap-3 items-center justify-around">
          <li className="inline-block mx-3">
            <Link to="/">Home</Link>
          </li>
          <li className="inline-block mx-3">
            <Link to="/about">About</Link>
          </li>
          <li className="inline-block mx-3">
            <Link to="/events">Events</Link>
          </li>
          <li className="inline-block mx-3">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="inline-block mx-3">
            <Link to="/gallery">Gallery</Link>
          </li>
          <li className="inline-block mx-3">
            <Link to="/faq">FAQs</Link>
          </li>
          <li className="inline-block mx-3">
            <Link to="/login">Login</Link>
          </li>
        </ul>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden block"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={28} color="white" />
          ) : (
            <Menu size={28} color="white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 transform transition-transform duration-300 ease-in-out z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative w-full h-full bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8">
          <button
            className="absolute top-6 right-6"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={32} color="white" />
          </button>
          <ul className="text-white flex flex-col gap-6 text-center text-2xl font-semibold">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/events" onClick={() => setOpen(false)}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={() => setOpen(false)}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={() => setOpen(false)}>
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
