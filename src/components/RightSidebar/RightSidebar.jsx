import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { following } from "../../redux/userSlice";

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const { currentUser } = useSelector((state) => state.user);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					"https://twitter-api-xgoy.onrender.com/api/users/usersAll"
				);
				setUsers(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	const handleFollow = async (userId) => {
		try {
			if (!currentUser.following.includes(userId)) {
				const follow = await axios.put(
					`https://twitter-api-xgoy.onrender.com/api/users/follow/${userId}`,
					{
						id: currentUser._id,
					}
				);
				dispatch(following(userId));
			} else {
				const unfollow = await axios.put(
					`https://twitter-api-xgoy.onrender.com/api/users/unfollow/${userId}`,
					{
						id: currentUser._id,
					}
				);
				dispatch(following(userId));
			}
			window.location.reload();
		} catch (err) {
			console.log("error", err);
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">All Users</h2>
			<ul>
				{users.map((user) => (
					<li
						key={user._id}
						className="flex items-center mb-4 p-2 bg-gray-100 rounded-lg justify-between "
						style={{ width: "15vw" }}
					>
						<span className="text-lg font-semibold">{user.username}</span>
						{currentUser._id !== user._id && (
							<button
								className={
									!currentUser.following.includes(user._id)
										? `px-4 py-2 ml-2 bg-blue-500 rounded-full text-white`
										: "px-4 py-2 ml-2 bg-gray-500 rounded-full text-white"
								}
								onClick={() => handleFollow(user._id)}
							>
								{currentUser.following.includes(user._id)
									? "Following"
									: "Follow"}
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AllUsers;
