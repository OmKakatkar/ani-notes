import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./frontend/containers/Layout/Layout";
import PrivateRoute from "./frontend/components/PrivateRoute/PrivateRoute";
import Login from "./frontend/pages/Auth/Login/Login";
import SignUp from "./frontend/pages/Auth/SignUp/SignUp";
import MockAPI from "./frontend/mock/MockAPI";
import UserProfile from "./frontend/pages/UserProfile/UserProfile";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Layout />
						</PrivateRoute>
					}
				>
					<Route path="/profile" element={<UserProfile />} />
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="mock" element={<MockAPI />} />
				<Route path="*" />
			</Routes>
			<ToastContainer autoClose={2000} />
		</div>
	);
}

export default App;
