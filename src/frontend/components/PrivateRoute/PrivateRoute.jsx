import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const PrivateRoute = ({ children }) => {
	const {
		user: { token },
	} = useAuth();
	return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
