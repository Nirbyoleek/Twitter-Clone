import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { following } from "../../redux/userSlice";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const RightSidebar = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://twitter-api-xgoy.onrender.com/api/users/usersAll"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      if (!currentUser.following.includes(userId)) {
        await axios.put(
          `https://twitter-api-xgoy.onrender.com/api/users/follow/${userId}`,
          { id: currentUser._id }
        );
        dispatch(following(userId));
      } else {
        await axios.put(
          `https://twitter-api-xgoy.onrender.com/api/users/unfollow/${userId}`,
          { id: currentUser._id }
        );
        dispatch(following(userId));
      }
      window.location.reload();
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInRight}
      className="bg-white/80 rounded-2xl shadow-xl p-4 backdrop-blur-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-600">Who to follow</h2>
      <div className="max-h-96 overflow-y-auto pr-2">
        <ul className="space-y-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/60">
                  <div className="flex items-center space-x-3 min-w-0">
                    <Skeleton circle height={40} width={40} />
                    <div className="min-w-0">
                      <Skeleton height={18} width={80} className="mb-1" />
                      <Skeleton height={14} width={60} />
                    </div>
                  </div>
                  <Skeleton height={32} width={70} style={{ borderRadius: 9999 }} />
                </li>
              ))
            : users
                .filter((user) => user._id !== currentUser._id)
                .map((user) => (
                  <motion.li
                    key={user._id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50/80 transition shadow-sm bg-white/60"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username || "U")}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border border-blue-100 shadow-sm"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{user.name || user.username}</div>
                        <div className="text-xs text-gray-500 truncate">@{user.username}</div>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-1 text-sm font-bold rounded-full border transition-all duration-200 focus:outline-none
                        ${currentUser.following.includes(user._id)
                          ? "bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300"
                          : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"}
                      `}
                      onClick={() => handleFollow(user._id)}
                    >
                      {currentUser.following.includes(user._id) ? "Following" : "Follow"}
                    </motion.button>
                  </motion.li>
                ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default RightSidebar;
