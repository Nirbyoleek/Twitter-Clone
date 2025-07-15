import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Navbar = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/twitter-logo.png" alt="Twitter Logo" className="w-10 h-10" />
          {/* <span className="text-xl font-extrabold text-blue-500 tracking-tight">Chirp</span> */}
        </Link>
        {/* Page Title */}
        <div className="flex-1 flex justify-center">
          <h2 className="font-bold text-2xl text-blue-700">
            {location.includes("profile") ? (
              <UserPlaceholder />
            ) : location.includes("explore") ? (
              "Explore"
            ) : (
              "Home"
            )}
          </h2>
        </div>
        {/* Logout Button */}
        <Link to="/signin">
          <button
            className="bg-red-500 px-5 py-2 text-white rounded-full font-semibold shadow hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
