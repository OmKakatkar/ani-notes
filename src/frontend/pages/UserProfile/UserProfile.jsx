import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { getUserDetails } from "../../services/auth-service";

import "./UserProfile.css";

function UserProfile() {
	const { user, handleLogout } = useAuth();
	const [userData, setUserData] = useState();
	useEffect(() => {
		(async () => {
			const resp = await getUserDetails(user.token);
			setUserData(resp);
		})();
	}, [user.token]);
	return (
		<div className="text-white">
			{userData && (
				<div className="profile-wrapper text-xlg">
					<div>First Name: {userData.firstName}</div>
					<div>Last Name: {userData.lastName}</div>
					<div>Email: {userData.email}</div>
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
