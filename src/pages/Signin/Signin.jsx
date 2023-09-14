import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginStart());
		try {
			const res = await axios.post(
				"https://twitter-api-xgoy.onrender.com/api/auth/signin",
				{ username, password }
			);
			dispatch(loginSuccess(res.data));
			navigate("/");
		} catch (err) {
			dispatch(loginFailed());
			setError(err.response);
		}
	};
	const handleSignUpClick = () => {
		navigate("/signup"); // Route to the signup page when the button is clicked
	};

	return (
		<form className="bg-gray-200 mt-20 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
			<h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>

			<input
				onChange={(e) => setUsername(e.target.value)}
				type="text"
				placeholder="username"
				className="text-xl py-2 rounded-full px-4"
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				placeholder="password"
				className="text-xl py-2 rounded-full px-4"
			/>

			<button
				className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
				onClick={handleLogin}
			>
				Sign in
			</button>

			<div>
				Don't have an account
				<button
					className="text-l py-1 rounded-full px-4 bg-blue-400 text-white ml-2"
					onClick={handleSignUpClick}
				>
					Sign up
				</button>
			</div>
			{error && <div className="text-red-500">{error}</div>}
		</form>
	);
};

export default SignInForm;
