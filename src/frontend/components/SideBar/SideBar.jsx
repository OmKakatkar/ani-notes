import {
	faHome,
	faArchive,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import "./SideBar.css";
function SideBar() {
	const { user } = useAuth();
	return (
		<div className="sidebar">
			<div className="sidebar-spacer"></div>
			<div className="sidebar-content">
				<nav className="sidebar-inner-content">
					<ul className="sidebar-list">
						<li className="sidebar-list-item">
							<NavLink to="/" className="sidebar-item-link text-white">
								<FontAwesomeIcon icon={faHome} className="text-lg" />
								<span>Home</span>
							</NavLink>
						</li>
						{user.token && (
							<>
								<li className="sidebar-list-item">
									<NavLink
										to="/history"
										className="sidebar-item-link text-white"
									>
										<FontAwesomeIcon icon={faArchive} className="text-lg" />
										<span>Archived</span>
									</NavLink>
								</li>
								<li className="sidebar-list-item">
									<NavLink to="/likes" className="sidebar-item-link text-white">
										<FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
										<span>Bin</span>
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default SideBar;
