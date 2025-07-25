import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import SignInForm from "./pages/Signin/Signin";
import SignUpForm from "./pages/Signup/Signup";

import Error from "./pages/Error/Error";

const Layout = () => {
	return (
		<div className=" flex mx-auto ">
			<Outlet></Outlet>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Error />,
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/profile/:id",
				element: <Profile />,
			},
			{
				path: "/explore",
				element: <Explore />,
			},
			{
				path: "/signin",
				element: <SignInForm />,
			},
			{
				path: "/signup",
				element: <SignUpForm />,
			},
			{
				path: "/signout",
				element: <SignInForm />,
			},
		],
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
