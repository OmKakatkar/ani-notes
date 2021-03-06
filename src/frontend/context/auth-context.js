import { createContext, useContext, useState } from "react";
import { login, signup } from "../services/auth-service";

const AuthContext = createContext();

const currentUser = "ANI_NOTES_USER";

const AuthProvider = ({ children }) => {
	const initialUser = JSON.parse(localStorage.getItem(currentUser)) || {};
	const [user, setUser] = useState(initialUser);

	const handleLogin = async ({ email, password }, isLoginRemember) => {
		try {
			const { foundUser: user, encodedToken: token } = await login({
				email,
				password,
			});
			if (token && isLoginRemember) {
				localStorage.setItem(currentUser, JSON.stringify({ user, token }));
				setUser(JSON.parse(localStorage.getItem(currentUser)));
			} else if (token) {
				setUser({ user, token });
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleSignUp = async ({ firstName, lastName, email, password }) => {
		try {
			const { createdUser: user, encodedToken: token } = await signup({
				firstName,
				lastName,
				email,
				password,
			});
			if (token) {
				localStorage.setItem(currentUser, JSON.stringify({ user, token }));
				setUser(JSON.parse(localStorage.getItem(currentUser)));
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem(currentUser);
		setUser({});
	};

	const providerData = { user, handleLogin, handleLogout, handleSignUp };

	return (
		<AuthContext.Provider value={providerData}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
