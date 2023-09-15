import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Navbar = () => {
	const [userData, setUserData] = useState(null);
	const location = useLocation().pathname;
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
			<div className="mx-auto md:mx-0">
				<img
					src="/twitter-logo.png"
					alt="Twitter Logo"
					width={"40px"}
					className="ml-8"
				/>
			</div>

			<div className="col-span-2 md:border-x-2  md:px-6 my-6 md:my-0">
				<div className="flex justify-between items-center">
					<h2 className="font-bold text-2xl">
						{location.includes("profile") ? (
							<UserPlaceholder setUserData={setUserData} userData={userData} />
						) : location.includes("explore") ? (
							"Explore"
						) : (
							"Home"
						)}
					</h2>
				</div>
			</div>
			<Link to="signin">
				<button
					className="ml-4 bg-red-500 px-4 py-2 text-white rounded-full"
					onClick={handleLogout}
				>
					Logout
				</button>
			</Link>
		</div>
	);
};

export default Navbar;
