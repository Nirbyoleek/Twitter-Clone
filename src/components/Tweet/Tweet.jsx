import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import formatDistance from "date-fns/formatDistance";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

const fadeInTweet = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(tweet.description);

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(
          `https://twitter-api-xgoy.onrender.com/api/users/find/${tweet.userId}`
        );
        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://twitter-api-xgoy.onrender.com/api/tweets/${tweet._id}/like`,
        { id: currentUser._id }
      );
      if (location.includes("profile")) {
        const newData = await axios.get(
          `https://twitter-api-xgoy.onrender.com/api/tweets/user/all/${id}`
        );
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(
          `https://twitter-api-xgoy.onrender.com/api/tweets/explore`
        );
        setData(newData.data);
      } else {
        const newData = await axios.get(
          `https://twitter-api-xgoy.onrender.com/api/tweets/timeline/${currentUser._id}`
        );
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `https://twitter-api-xgoy.onrender.com/api/tweets/${tweet._id}`,
        {
          userId: currentUser._id,
          description: editedDescription,
        }
      );
      setData((prevData) =>
        prevData.map((item) =>
          item._id === tweet._id ? { ...item, description: editedDescription } : item
        )
      );
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      await axios.delete(
        `https://twitter-api-xgoy.onrender.com/api/tweets/${tweetId}`,
        { data: { id: currentUser._id } }
      );
      setData((prevData) => prevData.filter((item) => item._id !== tweetId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInTweet}
      whileHover={{ scale: 1.015, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 rounded-2xl shadow-md p-5 mb-4 transition hover:shadow-xl backdrop-blur-lg"
    >
      {userData && (
        <>
          <div className="flex items-center space-x-3 mb-2">
            <img
              src={userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || userData.username || "U")}`}
              alt="avatar"
              className="w-12 h-12 rounded-full border border-blue-100 shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900 truncate">{userData.name || userData.username}</span>
                <span className="text-gray-500 text-sm truncate">@{userData.username}</span>
                <span className="text-gray-400 text-xs">· {dateStr}</span>
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className="mb-2">
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400 resize-none"
                rows={2}
                maxLength={280}
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white py-1 px-4 rounded-full mt-2 hover:bg-blue-600 transition"
                onClick={handleEditSave}
              >
                Save
              </motion.button>
            </div>
          ) : (
            <p className="mb-3 text-lg text-gray-800 break-words">{tweet.description}</p>
          )}
          <div className="flex items-center justify-between mt-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition"
            >
              {tweet.likes.includes(currentUser._id) ? (
                <FavoriteIcon className="text-blue-500" />
              ) : (
                <FavoriteBorderIcon />
              )}
              <span className="font-medium">{tweet.likes.length}</span>
            </motion.button>
            {currentUser._id === tweet.userId && (
              <div className="flex items-center space-x-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center text-gray-500 hover:text-blue-500 transition"
                  onClick={handleEditClick}
                >
                  <EditIcon fontSize="small" />
                  <span className="ml-1 text-sm">Edit</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center text-red-500 hover:text-red-700 transition"
                  onClick={() => handleDelete(tweet._id)}
                >
                  <DeleteIcon fontSize="small" />
                  <span className="ml-1 text-sm">Delete</span>
                </motion.button>
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Tweet;
