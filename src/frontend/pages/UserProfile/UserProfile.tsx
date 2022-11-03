import { useAuth } from "../../context/auth-context";

import "./UserProfile.css";

function UserProfile() {
	const { user: currentUser, handleLogout } = useAuth();
	const { user } = currentUser;

	return (
		<div className="text-white flex-container">
			{currentUser.token && (
				<div className="profile-wrapper text-xlg">
					<div>First Name: {user.firstName}</div>
					<div>Last Name: {user.lastName}</div>
					<div>Email: {user.email}</div>
					<button
						className="btn bg-red rounded"
						onClick={() => {
							handleLogout();
						}}
					>
						Log Out
					</button>
				</div>
			)}
		</div>
	);
}
export default UserProfile;
