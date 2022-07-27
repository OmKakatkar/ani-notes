import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";

function Auth() {
	const { user } = useAuth();

	if (user.token) {
		return <Navigate replace to="/" />;
	}

	return <Outlet />;
}
export default Auth;
