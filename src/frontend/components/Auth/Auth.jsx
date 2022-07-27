import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

function Auth() {
	const { user } = useAuth();
	const location = useLocation();

	if (user.token) {
		return <Navigate replace to={location.state?.path || "/"} />;
	}

	return <Outlet />;
}
export default Auth;
