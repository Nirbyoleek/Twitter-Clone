import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const navItems = [
  {
    label: "Home",
    to: "/",
    icon: <HomeIcon fontSize="large" />,
  },
  {
    label: "Explore",
    to: "/explore",
    icon: <TagIcon fontSize="large" />,
  },
];

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const LeftSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
      className="flex flex-col h-full min-h-[70vh] justify-between bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-4"
    >
      {/* Brand/Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src="/twitter-logo.png" alt="Logo" className="w-12 h-12 mb-2 drop-shadow-lg" />
      </div>
      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link key={item.to} to={item.to} className="group">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-4 px-4 py-3 rounded-full transition-all duration-200 cursor-pointer select-none
                  ${isActive ? "bg-blue-100 text-blue-600 font-bold shadow" : "hover:bg-blue-50 text-gray-700"}
                `}
              >
                <span className={`transition-colors ${isActive ? "text-blue-500" : "group-hover:text-blue-400"}`}>{item.icon}</span>
                <span className="text-lg">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
      {/* User Profile Section */}
      {currentUser && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 flex items-center space-x-3 p-3 rounded-xl bg-blue-50/80 shadow-sm backdrop-blur"
        >
          <img
            src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || "U")}`}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-blue-200"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 truncate">{currentUser.name || "User"}</div>
            <div className="text-xs text-gray-500 truncate">@{currentUser.username || "username"}</div>
          </div>
          {/* Placeholder for logout or settings */}
          <button className="ml-2 px-3 py-1 text-xs font-bold text-blue-600 bg-white border border-blue-200 rounded-full hover:bg-blue-100 transition">Logout</button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LeftSidebar;
