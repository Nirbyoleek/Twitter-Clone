import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const TimelineTweet = () => {
	const [timeLine, setTimeLine] = useState(null);

	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const timelineTweets = await axios.get(
					`https://twitter-api-xgoy.onrender.com/api/tweets/timeline/${currentUser._id}`
				);

				// Sort tweets by creation date in descending order (latest first)
				const sortedTimelineTweets = timelineTweets.data
					.slice()
					.sort((a, b) => {
						const dateA = new Date(a.createdAt);
						const dateB = new Date(b.createdAt);
						return dateB - dateA; // Sort in descending order (latest first)
					});

				setTimeLine(sortedTimelineTweets);
			} catch (err) {
				console.log("error", err);
			}
		};

		fetchData();
	}, [currentUser._id]);

	const handleDeleteTweet = (deletedTweetId) => {
		// Filter out the deleted tweet from the state
		const updatedTweets = timeLine.filter(
			(tweet) => tweet._id !== deletedTweetId
		);

		// Update the state with the new list of tweets
		setTimeLine(updatedTweets);
	};

	return (
		<div className="mt-8">
			<h1 className="text-2xl font-extrabold mb-8 text-blue-700 tracking-tight">Timeline</h1>
			<div className="space-y-6">
				{timeLine === null
					? Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="bg-white/80 rounded-2xl shadow-md p-5 mb-4">
							<Skeleton circle height={48} width={48} className="mb-2" />
							<Skeleton height={20} width={120} className="mb-1" />
							<Skeleton height={16} width={80} className="mb-2" />
							<Skeleton count={2} height={16} className="mb-2" />
							<Skeleton height={32} width={80} />
						</div>
					))
					: timeLine.map((tweet) => (
						<Tweet
							key={tweet._id}
							tweet={tweet}
							setData={setTimeLine}
							onDelete={handleDeleteTweet}
						/>
					))}
			</div>
		</div>
	);
};

export default TimelineTweet;
