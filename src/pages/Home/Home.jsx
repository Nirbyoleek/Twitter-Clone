import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import MainTweet from "../../components/MainTweet/MainTweet";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import SignInForm from "../Signin/Signin";
import Navbar from "../../components/Navbar/Navbar";

import { useSelector } from "react-redux";

const Home = () => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<>
			{!currentUser ? (
				<SignInForm />
			) : (
				<div>
					<Navbar />
					<div className="flex justify-center">
						<div className="px-6" style={{ marginLeft: "-8vw" }}>
							<LeftSidebar />
						</div>
						<div className="main-tweet-wrapper" style={{ width: "40vw" }}>
							<MainTweet />
						</div>
						<div className="px-6">
							<RightSidebar />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
