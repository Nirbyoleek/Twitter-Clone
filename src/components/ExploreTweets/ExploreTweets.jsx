import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ExploreTweets = () => {
  const [explore, setExplore] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exploreTweets = await axios.get(
          "https://twitter-api-xgoy.onrender.com/api/tweets/explore"
        );
        setExplore(exploreTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [currentUser._id]);

  const sortedExploreTweets = explore?.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-extrabold mb-8 text-purple-700 tracking-tight">Explore Tweets</h2>
      <div className="space-y-6">
        {explore === null
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white/80 rounded-2xl shadow-md p-5 mb-4">
                <Skeleton circle height={48} width={48} className="mb-2" />
                <Skeleton height={20} width={120} className="mb-1" />
                <Skeleton height={16} width={80} className="mb-2" />
                <Skeleton count={2} height={16} className="mb-2" />
                <Skeleton height={32} width={80} />
              </div>
            ))
          : sortedExploreTweets?.map((tweet) => (
              <Tweet key={tweet._id} tweet={tweet} setData={setExplore} />
            ))}
      </div>
    </div>
  );
};

export default ExploreTweets;
