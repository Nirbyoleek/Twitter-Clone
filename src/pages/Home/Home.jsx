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
				<div className=" min-h-screen ml-16">
					<Navbar />
					<div className="flex">
						{/* Left Sidebar */}
						<div className="w-1/5 p-4 bg-white mr-8">
							<LeftSidebar />
						</div>

						{/* Main Content */}
						<div className="w-3/5 p-4 bg-gray-100">
							<MainTweet />
						</div>

						{/* Right Sidebar */}
						<div className="w-1/5 p-4 bg-white ml-8">
							<RightSidebar />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
