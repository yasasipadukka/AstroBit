import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-base">
              Explore the wonders of the universe and learn about celestial
              objects, space missions, and more.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-5">
              <li>
                <a href="#" className="text-base hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/Astropod" className="text-base hover:text-gray-300">
                  Astronomy POD
                </a>
              </li>
              <li>
                <a href="#" className="text-base hover:text-gray-300">
                  Mars Rover
                </a>
              </li>
              <li>
                <a href="#" className="text-base hover:text-gray-300">
                  Earth
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-base">
              123 Observatory Drive
              <br />
              New York, NY 10001
              <br />
              Email: contact@astronomywebsite.com
              <br />
              Phone: 123-456-7890
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <span className="inline-block" style={{ width: "10px" }}></span>
              <a href="#" className="text-white hover:text-gray-300">
                <FontAwesomeIcon
                  icon={faFacebook}
                  //className="fa-beat"
                  size="2x"
                />
              </a>
              <span className="inline-block" style={{ width: "10px" }}></span>
              <a href="#" className="text-white hover:text-gray-300">
                <FontAwesomeIcon
                  icon={faTwitter}
                  //className="fa-beat"
                  size="2x"
                />
              </a>
              <span className="inline-block" style={{ width: "10px" }}></span>
              <a href="#" className="text-white hover:text-gray-300">
                <FontAwesomeIcon
                  icon={faInstagram}
                  //className="fa-beat"
                  size="2x"
                />
              </a>
              <span className="inline-block" style={{ width: "10px" }}></span>
              <a href="#" className="text-white hover:text-gray-300">
                <FontAwesomeIcon
                  icon={faGithub}
                  //className="fa-beat"
                  size="2x"
                />
              </a>
              <span className="inline-block" style={{ width: "10px" }}></span>
              <a href="#" className="text-white hover:text-gray-300">
                <FontAwesomeIcon
                  icon={faGoogle}
                  //className="fa-beat"
                  size="2x"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Astronomy Website. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
