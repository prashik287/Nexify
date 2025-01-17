  import React, { useEffect, useState } from "react";
  import { jwtDecode } from "jwt-decode"; // Import jwtDecode
  import logo from "../assets/cropped_image.png";

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("hire2hire");
      if (token) {
        try {
          const decodedData = jwtDecode(token);
          console.log(decodedData); // Log user email
          setIsLoggedIn(true); // Set logged-in status
        } catch (error) {
          console.error("Invalid token:", error);
          setIsLoggedIn(false); // Reset logged-in status if token is invalid
        }
      }
    }, []);

    return (
      <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Nexify Logo"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="text-white text-lg font-bold">Nexify</span>
          </div>

          {/* Hamburger Menu (visible on small screens) */}
          <button
            className="text-white text-2xl lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          {/* Navigation Links (visible on larger screens) */}
          <div className="hidden lg:flex gap-4">
            <a
              href="/"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Contact
            </a>

            {isLoggedIn ? (
              <a
                href="/logout"
                className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={() => {
                  localStorage.removeItem("hire2hire");
                  setIsLoggedIn(false);
                }}
              >
                Signout
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>

        {/* Dropdown Menu (visible on small screens) */}
        {isOpen && (
          <div className="lg:hidden flex flex-col gap-2 mt-4">
            <a
              href="/"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Contact
            </a>

            {isLoggedIn ? (
              <a
                href="/logout"
                className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={() => {
                  localStorage.removeItem("hire2hire");
                  setIsLoggedIn(false);
                }}
              >
                Signout
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Register
                </a>
              </>
            )}
          </div>
        )}
      </nav>
    );
  };

  export default Navbar;
