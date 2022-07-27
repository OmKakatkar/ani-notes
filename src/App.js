import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./frontend/containers/Layout/Layout";
import PrivateRoute from "./frontend/components/PrivateRoute/PrivateRoute";
import Login from "./frontend/pages/Auth/Login/Login";
import SignUp from "./frontend/pages/Auth/SignUp/SignUp";
import MockAPI from "./frontend/mock/MockAPI";
import UserProfile from "./frontend/pages/UserProfile/UserProfile";
import { ToastContainer } from "react-toastify";
import NewNote from "./frontend/pages/NewNote/NewNote";
import Archives from "./frontend/pages/Archives/Archives";
import Trash from "./frontend/pages/Trash/Trash";
import Notes from "./frontend/pages/Notes/Notes";
import Auth from "./frontend/components/PrivateRoute/Auth/Auth";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route
					element={
						<PrivateRoute>
							<Layout />
						</PrivateRoute>
					}
				>
					<Route path="/" element={<Notes />} />
					<Route path="/profile" element={<UserProfile />} />
					<Route path="/new-note" element={<NewNote />} />
					<Route path="/archived" element={<Archives />} />
					<Route path="/bin" element={<Trash />} />
				</Route>
				<Route element={<Auth />}>
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
				</Route>
				<Route path="mock" element={<MockAPI />} />
				<Route path="*" />
			</Routes>
			<ToastContainer autoClose={2000} />
		</div>
	);
}

export default App;
