import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between p-6 ">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 ml-7" />
          <span className="text-4xl font-semibold text-white"></span>
        </Link>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`hidden md:block `} id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
            <li className="ml-auto">
              {" "}
              {/* Adjusted margin */}
              <Link
                to="/"
                className="block py-2 px-4 text-white text-xl rounded hover:bg-gray-700 "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/apod"
                className="block py-2 px-3 text-white text-xl rounded hover:bg-gray-700"
              >
                Astronomy POD
              </Link>
            </li>
            <li>
              <Link
                to="/Marsrover"
                className="block py-2 px-3 text-white text-xl rounded hover:bg-gray-700"
              >
                Mars Rover
              </Link>
            </li>
            <li>
              <Link
                to="/earth"
                className="block py-2 px-3 text-white text-xl rounded hover:bg-gray-700 mr-16 "
              >
                Earth
              </Link>
            </li>
            <li>
              <div className="block py-2 px-3 text-white bg-blue-900 text-xl rounded hover:bg-gray-700 ml-18 text-center">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-navbar"
      >
        <ul className="font-medium flex flex-col md:flex-row md:space-x-7 rtl:space-x-reverse ">
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-white text-xl rounded hover:bg-gray-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/apod"
              className="block py-2 px-3 text-white text-xl rounded hover:bg-gray-700"
            >
              Astronomy POD
            </Link>
          </li>
          <li>
            <Link
              to="/Marsrover"
              className="block py-2 px-3 text-white text-xl rounded hover:bg-gray-700"
            >
              Mars Rover
            </Link>
          </li>
          <li>
            <Link
              to="/earth"
              className="block py-2 px-3 text-white text-xl rounded hover:bg-gray-700 mr-16 "
            >
              Earth
            </Link>
          </li>
          <li>
            <div className="block py-2 px-3 text-white bg-blue-900 text-xl rounded hover:bg-gray-700 ml-18 text-center">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
