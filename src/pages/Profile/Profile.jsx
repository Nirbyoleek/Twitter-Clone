import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";
import { following } from "../../redux/userSlice";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(
          `https://twitter-api-xgoy.onrender.com/api/tweets/user/all/${id}`
        );
        const userProfile = await axios.get(
          `https://twitter-api-xgoy.onrender.com/api/users/find/${id}`
        );
        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
        await axios.put(
          `https://twitter-api-xgoy.onrender.com/api/users/follow/${id}`,
          { id: currentUser._id }
        );
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        await axios.put(
          `https://twitter-api-xgoy.onrender.com/api/users/unfollow/${id}`,
          { id: currentUser._id }
        );
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <motion.aside
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="lg:w-1/5 flex-shrink-0 sticky top-24 self-start z-20"
        >
          <LeftSidebar />
        </motion.aside>

        {/* Main Content */}
        <main className="lg:w-3/5 w-full flex flex-col gap-8">
          {/* Profile Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between glassmorphism mb-4"
          >
            <div className="flex items-center gap-4">
              {loading ? (
                <Skeleton circle height={64} width={64} />
              ) : (
                <img
                  src={userProfile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.name || userProfile?.username || "U")}`}
                  alt="Profile Picture"
                  className="w-16 h-16 rounded-full border border-blue-100 shadow-sm"
                />
              )}
              <div>
                {loading ? (
                  <>
                    <Skeleton height={24} width={120} className="mb-2" />
                    <Skeleton height={16} width={80} />
                  </>
                ) : (
                  <>
                    <div className="font-bold text-2xl text-gray-900">{userProfile?.name || userProfile?.username}</div>
                    <div className="text-gray-500 text-md">@{userProfile?.username}</div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              {loading ? (
                <Skeleton height={40} width={120} style={{ borderRadius: 9999 }} />
              ) : currentUser._id === id ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-500 rounded-full text-white font-semibold shadow hover:bg-blue-600 transition"
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </motion.button>
              ) : currentUser.following.includes(id) ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-500 rounded-full text-white font-semibold shadow hover:bg-blue-600 transition"
                  onClick={handleFollow}
                >
                  Following
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-500 rounded-full text-white font-semibold shadow hover:bg-blue-600 transition"
                  onClick={handleFollow}
                >
                  Follow
                </motion.button>
              )}
            </div>
          </motion.div>
          {/* User Tweets */}
          <div className="space-y-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white/80 rounded-2xl shadow-md p-5 mb-4">
                    <Skeleton circle height={48} width={48} className="mb-2" />
                    <Skeleton height={20} width={120} className="mb-1" />
                    <Skeleton height={16} width={80} className="mb-2" />
                    <Skeleton count={2} height={16} className="mb-2" />
                    <Skeleton height={32} width={80} />
                  </div>
                ))
              : userTweets &&
                userTweets.map((tweet) => (
                  <Tweet key={tweet._id} tweet={tweet} setData={setUserTweets} />
                ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <motion.aside
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="lg:w-1/5 flex-shrink-0 sticky top-24 self-start z-20"
        >
          <RightSidebar />
        </motion.aside>
      </div>
    </div>
  );
};

export default Profile;
