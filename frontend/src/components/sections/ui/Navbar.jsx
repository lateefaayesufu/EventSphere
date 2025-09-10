import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PartyPopper, Menu } from "lucide-react";

const Navbar = function () {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav className="flex items-center justify-between px-3 py-5 bg-black/20 text-white md:w-[95%] w-full mx-auto rounded-b-lg backdrop-blur-lg relative">
        <div className="flex items-center">
          <PartyPopper
            size={24}
            strokeWidth={2}
            color="gray"
            className="inline-block mx-3"
            fill="grey"
          />
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
        {/* Mobile Menu */}
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
