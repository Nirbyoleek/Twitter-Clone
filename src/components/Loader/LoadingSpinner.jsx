import React from "react";
import { BallTriangle } from "react-loader-spinner";

const LoadingSpinner = () => (
	<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
		<div className="text-center">
			<BallTriangle color="#00BFFF" height={100} width={100} />
		</div>
	</div>
);
export default LoadingSpinner;
