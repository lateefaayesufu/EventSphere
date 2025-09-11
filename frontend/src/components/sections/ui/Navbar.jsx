import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PartyPopper, Menu } from "lucide-react";

const Navbar = function () {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav className="glass-nav border-[1px] border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl text-white flex items-center justify-between px-4 md:px-8 py-3 md:py-4 fixed w-full md:w-auto z-20">
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
          <Menu size={28} color="white" />
        </button>
        {/* Mobile Menuu */}
        {open && (
          <ul className="absolute top-full right-0 bg-black/90 text-white rounded-lg shadow-lg flex flex-col gap-2 p-4 w-40 md:hidden z-10">
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
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
