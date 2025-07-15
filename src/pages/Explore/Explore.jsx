import React from "react";
import ExploreTweets from "../../components/ExploreTweets/ExploreTweets";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return <Signin />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <motion.aside
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="lg:w-1/4 xl:w-1/5 flex-shrink-0 sticky top-24 self-start z-20"
        >
          <LeftSidebar />
        </motion.aside>

        <main className="lg:w-2/4 xl:w-3/5 w-full flex flex-col gap-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-2"
          >
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between glassmorphism">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">Explore Trending Topics</h1>
                <p className="text-lg md:text-xl opacity-90 font-medium drop-shadow">See what’s happening in the world right now.</p>
              </div>
              <svg className="w-24 h-24 md:w-32 md:h-32 mt-4 md:mt-0 drop-shadow-xl" fill="none" viewBox="0 0 48 48"><path fill="#fff" fillOpacity=".2" d="M24 0a24 24 0 100 48 24 24 0 000-48z"/><path fill="#fff" d="M36.39 17.64c.01.18.01.36.01.54 0 5.53-4.21 11.91-11.91 11.91-2.37 0-4.58-.69-6.44-1.88.33.04.66.06 1 .06 1.97 0 3.78-.67 5.23-1.8a4.19 4.19 0 01-3.91-2.91c.26.04.52.07.8.07.38 0 .75-.05 1.1-.15a4.18 4.18 0 01-3.36-4.1v-.05c.56.31 1.2.5 1.88.52a4.18 4.18 0 01-1.86-3.48c0-.77.21-1.5.57-2.13a11.87 11.87 0 008.6 4.36c-.07-.31-.11-.64-.11-.97a4.18 4.18 0 017.23-2.85 8.36 8.36 0 002.65-1.01 4.18 4.18 0 01-1.84 2.3 8.36 8.36 0 002.4-.66 9.01 9.01 0 01-2.09 2.17z"/></svg>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-4"
          >
          </motion.div>
          <ExploreTweets />
        </main>

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

export default Explore;
