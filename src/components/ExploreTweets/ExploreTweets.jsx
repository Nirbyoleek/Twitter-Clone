import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

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
		<div className="mt-6">
			<h2 className="text-bold text-xl font-bold mb-4">Explore Tweets</h2>
			{sortedExploreTweets?.map((tweet) => {
				return (
					<div key={tweet._id} className="p-2">
						<Tweet tweet={tweet} setData={setExplore} />
					</div>
				);
			})}
		</div>
	);
};

export default ExploreTweets;
