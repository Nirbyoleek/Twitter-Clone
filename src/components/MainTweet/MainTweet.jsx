import React, { useState, useRef } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const fadeInMainTweet = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const textareaRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://twitter-api-xgoy.onrender.com/api/tweets",
        {
          userId: currentUser._id,
          description: tweetText,
        }
      );
      toast.success("Tweet posted!");
      setTweetText("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setTimeout(() => window.location.reload(false), 1000);
    } catch (err) {
      toast.error("Failed to post tweet. Please try again.");
      console.log(err);
    }
  };

  // Auto-resize textarea
  const handleInput = (e) => {
    setTweetText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div>
      {/* Tweet Input Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInMainTweet}
        className="bg-white rounded-2xl shadow-md p-6 mb-8"
        whileHover={{ scale: 1.01, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
        whileTap={{ scale: 0.98 }}
      >
        {currentUser && (
          <div className="flex items-center mb-4">
            <img
              src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || currentUser.username || "U")}`}
              alt="avatar"
              className="w-12 h-12 rounded-full border border-blue-100 shadow-sm mr-3"
            />
            <div>
              <p className="font-bold text-lg text-gray-900">{currentUser.name || currentUser.username}</p>
              <p className="text-xs text-gray-500">@{currentUser.username}</p>
            </div>
          </div>
        )}
        <form className="flex flex-col gap-4">
          <textarea
            ref={textareaRef}
            onChange={handleInput}
            value={tweetText}
            type="text"
            placeholder="What's happening?"
            maxLength={280}
            className="bg-slate-100 rounded-lg w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none min-h-[60px] transition-all"
            rows={1}
            style={{ overflow: "hidden" }}
          ></textarea>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${tweetText.length > 260 ? "text-red-500" : "text-gray-400"}`}>{tweetText.length}/280</span>
            <motion.button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-6 rounded-full font-semibold shadow hover:bg-blue-600 transition"
              disabled={!tweetText.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tweet
            </motion.button>
          </div>
        </form>
      </motion.div>
      {/* Timeline */}
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
