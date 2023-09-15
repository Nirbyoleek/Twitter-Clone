import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";

const SignUpForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const validateEmail = (email) => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		return emailRegex.test(email);
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		setUsernameError("");
		setEmailError("");
		setPasswordError("");
		setError("");

		if (!username) {
			setUsernameError("Username is required");
			return;
		}

		if (!email) {
			setEmailError("Email is required");
			return;
		}
		if (!validateEmail(email)) {
			setEmailError("Please enter a valid email address");
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
				"https://twitter-api-xgoy.onrender.com/api/auth/signup",
				{
					username,
					email,
					password,
				}
			);

			if (res.status === 200) {
				dispatch(loginSuccess(res.data));

				navigate("/");
			} else {
				setError(res.error);
			}
		} catch (err) {
			dispatch(loginFailed());

			if (err.response && err.response.data.message) {
				setError(err.response.data.message);
			} else {
				setError("An error occurred while signing up.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleSignInClick = () => {
		navigate("/signin");
	};

	return (
		<div className="mt-20 w-8/12 flex ml-32 ">
			{loading ? (
				<LoadingSpinner />
			) : (
				<form className="bg-gray-200 flex flex-col py-8 px-8 rounded-lg md:w-8/12 mx-auto gap-10 ">
					<h2 className="text-3xl font-bold text-center">
						Sign up for Twitter
					</h2>

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
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="email"
						required
						className={`text-xl py-2 rounded-full px-4 ${
							emailError && "border-red-500"
						}`}
					/>
					{emailError && <div className="text-red-500">{emailError}</div>}

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
						onClick={handleSignup}
						className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
						type="submit"
					>
						Sign up
					</button>
					<div>
						Already have an account?
						<button
							className="text-l py-1 rounded-full px-4 bg-blue-500 text-white ml-2"
							onClick={handleSignInClick}
						>
							Login
						</button>
					</div>
					{error && <div className="text-red-500">{error}</div>}
				</form>
			)}
		</div>
	);
};

export default SignUpForm;
