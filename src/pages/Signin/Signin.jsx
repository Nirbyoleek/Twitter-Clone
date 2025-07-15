import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";
import {
	Box,
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Alert,
	Divider,
	IconButton,
	InputAdornment,
	Avatar,
	Grid,
	Fade,
	Slide,
	Grow,
	Zoom,
	Card,
	CardContent,
	Stack,
} from "@mui/material";
import {
	Twitter as TwitterIcon,
	Visibility,
	VisibilityOff,
	Login as LoginIcon,
	PersonAdd as PersonAddIcon,
	TrendingUp,
	People,
	Chat,
	Explore,
	Security,
	Speed,
} from "@mui/icons-material";

const SignInForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [animateHero, setAnimateHero] = useState(false);
	const [animateFeatures, setAnimateFeatures] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		// Trigger animations on component mount
		const timer1 = setTimeout(() => setAnimateHero(true), 300);
		const timer2 = setTimeout(() => setAnimateFeatures(true), 800);
		
		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		setUsernameError("");
		setPasswordError("");
		setError("");

		// Gmail-only validation if input contains '@'
		if (username.includes("@")) {
			const gmailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
			if (!gmailRegex.test(username)) {
				setUsernameError("Only Gmail addresses are allowed (e.g., yourname@gmail.com)");
				return;
			}
		}

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

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const features = [
		{
			icon: <TrendingUp sx={{ fontSize: 40, color: "#1da1f2" }} />,
			title: "Stay Updated",
			description: "Get real-time updates from people and topics you care about."
		},
		{
			icon: <People sx={{ fontSize: 40, color: "#1da1f2" }} />,
			title: "Connect",
			description: "Join conversations and connect with people around the world."
		},
		
		{
			icon: <Explore sx={{ fontSize: 40, color: "#1da1f2" }} />,
			title: "Discover",
			description: "Explore trending topics and discover new interests."
		},
		{
			icon: <Security sx={{ fontSize: 40, color: "#1da1f2" }} />,
			title: "Secure",
			description: "Your privacy and security are our top priorities."
		},
		
	];

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<Box 
			sx={{ 
				width: "100vw",
				height: "100vh",
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				zIndex: 0
			}}
		>
			{/* Animated Gradient Background */}
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					zIndex: 0,
					pointerEvents: "none",
					background: "linear-gradient(270deg, #1a2233, #1da1f2, #11151c, #1da1f2, #1a2233)",
					backgroundSize: "400% 400%",
					animation: "gradientBG 18s ease-in-out infinite"
				}}
			/>
			{/* Keyframes for gradient animation */}
			<style>{`
				@keyframes gradientBG {
					0% {background-position: 0% 50%;}
					50% {background-position: 100% 50%;}
					100% {background-position: 0% 50%;}
				}
			`}</style>
			<Container 
				maxWidth={false}
				disableGutters
				sx={{ height: "100%", width: "95vw", px: 2, zIndex: 1, position: "relative" }}
			>
				<Grid 
					container 
					spacing={{ xs: 2, sm: 3, lg: 4 }}
					sx={{ 
						height: "100%",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					{/* Left Side - Hero Content */}
					<Grid item xs={12} lg={7} sx={{ display: { xs: "none", lg: "block" }, height: "100%" }}>
						<Fade in={animateHero} timeout={1000}>
							<Box sx={{ 
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								pr: { lg: 4, xl: 6 }
							}}>
								<Slide direction="right" in={animateHero} timeout={800}>
									<Box sx={{ mb: 4 }}>
										<Avatar
											sx={{
												width: 80,
												height: 80,
												bgcolor: "white",
												color: "#1da1f2",
												mb: 3,
											}}
										>
											<TwitterIcon sx={{ fontSize: 50 }} />
										</Avatar>
										<Typography
											variant="h2"
											sx={{
												fontWeight: "bold",
												color: "white",
												mb: 2,
												fontSize: { lg: "3.5rem", xl: "4rem" },
												lineHeight: 1.2,
												textShadow: "0 2px 16px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.25)"
											}}
										>
											What's happening
										</Typography>
										<Typography
											variant="h4"
											sx={{
												color: "rgba(255, 255, 255, 0.95)",
												mb: 4,
												fontSize: { lg: "2rem", xl: "2.2rem" },
												lineHeight: 1.3,
												textShadow: "0 2px 12px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.18)"
											}}
										>
											Join Twitter today.
										</Typography>
									</Box>
								</Slide>

								{/* Features Grid */}
								<Grid container spacing={2} sx={{ flex: 1 }}>
									{features.map((feature, index) => (
										<Grid item xs={12} sm={6} key={index}>
											<Grow in={animateFeatures} timeout={1000 + index * 200}>
												<Card
													sx={{
														background: "rgba(255, 255, 255, 0.1)",
														backdropFilter: "blur(10px)",
														border: "1px solid rgba(255, 255, 255, 0.2)",
														borderRadius: 3,
														transition: "transform 0.3s ease-in-out",
														"&:hover": {
															transform: "translateY(-5px)",
														},
														height: "100%",
													}}
												>
													<CardContent sx={{ textAlign: "center", p: 2 }}>
														<Box sx={{ mb: 1 }}>{feature.icon}</Box>
														<Typography
															variant="h6"
															sx={{ color: "white", mb: 1, fontWeight: "bold", fontSize: "1rem" }}
														>
															{feature.title}
														</Typography>
														<Typography
															variant="body2"
															sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.875rem" }}
														>
															{feature.description}
														</Typography>
													</CardContent>
												</Card>
											</Grow>
										</Grid>
									))}
								</Grid>
							</Box>
						</Fade>
					</Grid>

					{/* Mobile Hero Section */}
					<Grid item xs={12} sx={{ display: { xs: "block", lg: "none" }, mb: 2 }}>
						<Fade in={animateHero} timeout={1000}>
							<Box sx={{ textAlign: "center", mb: 2 }}>
								<Avatar
									sx={{
										width: 60,
										height: 60,
										bgcolor: "white",
										color: "#1da1f2",
										mb: 2,
										mx: "auto",
									}}
								>
									<TwitterIcon sx={{ fontSize: 35 }} />
								</Avatar>
								<Typography
									variant="h3"
									sx={{
										fontWeight: "bold",
										color: "white",
										mb: 1,
										fontSize: "2rem",
									}}
								>
									What's happening
								</Typography>
								<Typography
									variant="h5"
									sx={{
										color: "rgba(255, 255, 255, 0.9)",
										fontSize: "1.2rem",
									}}
								>
									Join Twitter today.
								</Typography>
							</Box>
						</Fade>
					</Grid>

					{/* Right Side - Sign In Form */}
					<Grid item xs={12} lg={5} sx={{ 
						display: "flex", 
						justifyContent: "center",
						alignItems: "center",
						height: { xs: "auto", lg: "100%" }
					}}>
						<Zoom in={animateHero} timeout={1200}>
							<Paper
								elevation={24}
								sx={{
									padding: { xs: 3, sm: 4 },
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									width: "100%",
									maxWidth: 450,
									borderRadius: 4,
									background: "rgba(255, 255, 255, 0.95)",
									backdropFilter: "blur(20px)",
									border: "1px solid rgba(255, 255, 255, 0.3)",
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
								}}
							>
								<Avatar
									sx={{
										m: 1,
										bgcolor: "#1da1f2",
										color: "white",
										width: 56,
										height: 56,
									}}
								>
									<TwitterIcon sx={{ fontSize: 30 }} />
								</Avatar>
								
								<Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#1a1a1a" }}>
									Sign in to Twitter
								</Typography>

								<Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: "100%" }}>
									<TextField
										margin="normal"
										required
										fullWidth
										id="username"
										label="Username"
										name="username"
										autoComplete="username"
										autoFocus
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										error={!!usernameError}
										helperText={usernameError}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
												"& fieldset": {
													borderColor: "rgba(29, 161, 242, 0.3)",
												},
												"&:hover fieldset": {
													borderColor: "rgba(29, 161, 242, 0.5)",
												},
												"&.Mui-focused fieldset": {
													borderColor: "#1da1f2",
												},
											},
											"& .MuiInputLabel-root": {
												"&.Mui-focused": {
													color: "#1da1f2",
												},
											},
										}}
									/>
									
									<TextField
										margin="normal"
										required
										fullWidth
										name="password"
										label="Password"
										type={showPassword ? "text" : "password"}
										id="password"
										autoComplete="current-password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										error={!!passwordError}
										helperText={passwordError}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														edge="end"
														sx={{ color: "rgba(29, 161, 242, 0.7)" }}
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
												"& fieldset": {
													borderColor: "rgba(29, 161, 242, 0.3)",
												},
												"&:hover fieldset": {
													borderColor: "rgba(29, 161, 242, 0.5)",
												},
												"&.Mui-focused fieldset": {
													borderColor: "#1da1f2",
												},
											},
											"& .MuiInputLabel-root": {
												"&.Mui-focused": {
													color: "#1da1f2",
												},
											},
										}}
									/>

									{error && (
										<Alert severity="error" sx={{ mt: 2, mb: 2, borderRadius: 2 }}>
											{error}
										</Alert>
									)}

									<Button
										type="submit"
										fullWidth
										variant="contained"
										sx={{
											mt: 3,
											mb: 2,
											py: 1.5,
											fontSize: "1.1rem",
											fontWeight: "bold",
											borderRadius: 2,
											background: "#1da1f2",
											"&:hover": {
												background: "#1a8cd8",
												transform: "translateY(-2px)",
												boxShadow: "0 8px 25px rgba(29, 161, 242, 0.3)",
											},
											transition: "all 0.3s ease",
										}}
										startIcon={<LoginIcon />}
									>
										Sign In
									</Button>

									<Divider sx={{ my: 2 }}>
										<Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
											OR
										</Typography>
									</Divider>

									<Stack spacing={2}>
										<Typography variant="body2" align="center" sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
											Don't have an account?
										</Typography>
										<Button
											fullWidth
											variant="outlined"
											onClick={handleSignUpClick}
											sx={{
												py: 1.5,
												fontSize: "1rem",
												borderRadius: 2,
												borderColor: "#1da1f2",
												color: "#1da1f2",
												"&:hover": {
													borderColor: "#1a8cd8",
													background: "rgba(29, 161, 242, 0.1)",
													transform: "translateY(-2px)",
												},
												transition: "all 0.3s ease",
											}}
											startIcon={<PersonAddIcon />}
										>
											Sign Up
										</Button>
									</Stack>
								</Box>
							</Paper>
						</Zoom>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default SignInForm;
