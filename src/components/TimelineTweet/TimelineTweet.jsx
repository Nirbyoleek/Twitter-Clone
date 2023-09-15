import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

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
		<div className="mt-6">
			<h1 className="text-xl mb-6 font-bold">Tweets</h1>
			{timeLine &&
				timeLine.map((tweet) => {
					return (
						<div key={tweet._id} className="p-2">
							<Tweet
								tweet={tweet}
								setData={setTimeLine}
								onDelete={handleDeleteTweet}
							/>
						</div>
					);
				})}
		</div>
	);
};

export default TimelineTweet;
