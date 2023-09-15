import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import formatDistance from "date-fns/formatDistance";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
			const like = await axios.put(
				`https://twitter-api-xgoy.onrender.com/api/tweets/${tweet._id}/like`,
				{
					id: currentUser._id,
				}
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
			const editedTweet = await axios.put(
				`https://twitter-api-xgoy.onrender.com/api/tweets/${tweet._id}`,
				{
					userId: currentUser._id,
					description: editedDescription,
				}
			);

			setData((prevData) =>
				prevData.map((item) =>
					item._id === tweet._id
						? { ...item, description: editedDescription }
						: item
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
				{
					data: {
						id: currentUser._id,
					},
				}
			);

			setData((prevData) => prevData.filter((item) => item._id !== tweetId));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="">
			{userData && (
				<>
					<div className="flex space-x-2">
						<h3 className="font-bold">{userData.username}</h3>

						<span className="font-normal">@{userData.username}</span>
						<p> - {dateStr}</p>
					</div>

					{isEditing ? (
						<div className="mb-2">
							<textarea
								value={editedDescription}
								onChange={(e) => setEditedDescription(e.target.value)}
								className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
							/>
							<button
								className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
								onClick={handleEditSave}
							>
								Save
							</button>
						</div>
					) : (
						<p className="mb-2">{tweet.description}</p>
					)}
					<div className="flex justify-between">
						<button onClick={handleLike}>
							{tweet.likes.includes(currentUser._id) ? (
								<FavoriteIcon className="text-blue-500 mr-2 my-2 cursor-pointer" />
							) : (
								<FavoriteBorderIcon className="mr-2 my-2 cursor-pointer" />
							)}
							{tweet.likes.length}
						</button>
						{currentUser._id === tweet.userId && (
							<div className="mt-2 flex">
								<button
									className="mr-2 focus:outline-none"
									onClick={handleEditClick}
								>
									<EditIcon />
									Edit
								</button>
								<button
									className="text-red-500 hover:text-red-700 focus:outline-none"
									onClick={() => handleDelete(tweet._id)}
								>
									<DeleteIcon />
									Delete
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Tweet;
