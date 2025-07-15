import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import MainTweet from "../../components/MainTweet/MainTweet";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import SignInForm from "../Signin/Signin";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-purple-200">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="w-full max-w-md p-8 bg-white/80 rounded-2xl shadow-2xl backdrop-blur-lg"
        >
          <SignInForm />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Toaster position="top-right" toastOptions={{ duration: 3500, style: { fontSize: '1rem', borderRadius: '1rem', background: '#fff', color: '#222', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' } }} />
     
      <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <motion.aside
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="lg:w-1/4 xl:w-1/5 flex-shrink-0 sticky top-24 self-start z-20"
        >
          <LeftSidebar />
        </motion.aside>

        {/* Main Content */}
        <main className="lg:w-2/4 xl:w-3/5 w-full flex flex-col gap-8">
          {/* Hero Banner */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-2"
          >
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between glassmorphism">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">Welcome back!</h1>
                <p className="text-lg md:text-xl opacity-90 font-medium drop-shadow">Share your thoughts and connect with the world.</p>
              </div>
              <img src="/twitter-logo.png" alt="Twitter Logo" className="w-24 h-24 md:w-32 md:h-32 mt-4 md:mt-0 drop-shadow-xl" />
            </div>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <MainTweet />
          </motion.div>
        </main>

        {/* Right Sidebar */}
        <motion.aside
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="lg:w-1/4 xl:w-1/5 flex-shrink-0 sticky top-24 self-start z-20"
        >
          <RightSidebar />
        </motion.aside>
      </div>
    </div>
  );
};

export default Home;
