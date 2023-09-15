import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";

const SignInForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setUsernameError("");
		setPasswordError("");
		setError("");

		if (!username) {
			setUsernameError("Username is required");
			return;
		}

		if (!password) {
			setPasswordError("Password is required");
			return;
		}
		setLoading(true);

		dispatch(loginStart());
		try {
			const res = await axios.post(
				"https://twitter-api-xgoy.onrender.com/api/auth/signin",
				{ username, password }
			);

			if (res.status === 200) {
				dispatch(loginSuccess(res.data));
				navigate("/");
			} else {
				setError("Username or password is incorrect");
			}
		} catch (err) {
			dispatch(loginFailed());
			if (err.response && err.response.data.message) {
				setError(err.response.data.message);
			} else {
				setError("An error occurred while logging in.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleSignUpClick = () => {
		navigate("/signup");
	};

	return (
		<div className="mt-20 w-8/12 flex ml-32 ">
			{loading ? (
				<LoadingSpinner />
			) : (
				<form className="bg-gray-200 flex flex-col py-8 px-8 rounded-lg md:w-8/12 mx-auto gap-10 ">
					<h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>
					<input
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="username"
						className={`text-xl py-2 rounded-full px-4 ${
							usernameError && "border-red-500"
						}`}
					/>
					{usernameError && <div className="text-red-500">{usernameError}</div>}
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="password"
						className={`text-xl py-2 rounded-full px-4 ${
							passwordError && "border-red-500"
						}`}
					/>
					{passwordError && <div className="text-red-500">{passwordError}</div>}
					<button
						className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
						onClick={handleLogin}
					>
						Sign in
					</button>
					<div>
						Don't have an account
						<button
							className="text-l py-1 rounded-full px-4 bg-blue-500 text-white ml-2"
							onClick={handleSignUpClick}
						>
							Sign up
						</button>
					</div>
					{error && <div className="text-red-500">{error}</div>}
				</form>
			)}
		</div>
	);
};

export default SignInForm;
