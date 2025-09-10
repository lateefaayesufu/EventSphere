import React from "react";
import { Link } from "react-router-dom";
import { PartyPopper } from "lucide-react";

const Navbar = function () {
  return (
    <div>
      <nav className="flex items-center justify-between px-3 py-5 bg-black/20 text-white w-[95%] mx-auto rounded-b-lg backdrop-blur-lg">
        <div>
          <PartyPopper
            size={24}
            strokeWidth={2}
            color="gray"
            className="inline-block mx-3"
            fill="grey"
          />
        </div>
        <div>
          <ul className="list-none flex gap-3 items-center justify-around">
            <li className="inline-block mx-3">
              <Link to="/">Home</Link>
            </li>
            <li className="inline-block mx-3">
              <Link to="/events">About</Link>
            </li>
            <li className="inline-block mx-3">
              <Link to="/events">Events</Link>
            </li>
            <li className="inline-block mx-3">
              <Link to="/events">Contact</Link>
            </li>
            <li className="inline-block mx-3">
              <Link to="/events">Gallery</Link>
            </li>
            <li className="inline-block mx-3">
              <Link to="/events">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
