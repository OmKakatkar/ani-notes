import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

function PrivateRoute({ children }) {
	const { user } = useAuth();
	const location = useLocation();

	if (!user.token) {
		return <Navigate replace to="/login" state={{ path: location.pathname }} />;
	}

	return children;
}
export default PrivateRoute;
