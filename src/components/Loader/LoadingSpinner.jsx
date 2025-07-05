import React from "react";
import { Box, CircularProgress, Paper } from "@mui/material";

const LoadingSpinner = () => (
	<Box
		sx={{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: 2000,
			background: "rgba(30, 41, 59, 0.35)",
			backdropFilter: "blur(2px)",
		}}
	>
		<Paper
			elevation={8}
			sx={{
				p: 4,
				borderRadius: "50%",
				background: "rgba(255,255,255,0.85)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
			}}
		>
			<CircularProgress size={64} thickness={4.5} sx={{ color: "#1da1f2" }} />
		</Paper>
	</Box>
);

export default LoadingSpinner;
