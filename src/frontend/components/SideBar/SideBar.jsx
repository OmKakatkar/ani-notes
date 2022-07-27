import {
	faHome,
	faArchive,
	faTrashAlt,
	faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
import { OPEN_NOTE_CREATE_MODAL } from "../../constants/reducer-constants";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import "./SideBar.css";
function SideBar() {
	const { user } = useAuth();
	const { dispatch } = useNotes();
	const location = useLocation();
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
										to="/archived"
										className="sidebar-item-link text-white"
									>
										<FontAwesomeIcon icon={faArchive} className="text-lg" />
										<span>Archived</span>
									</NavLink>
								</li>
								<li className="sidebar-list-item">
									<NavLink to="/bin" className="sidebar-item-link text-white">
										<FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
										<span>Bin</span>
									</NavLink>
								</li>
								{location.pathname !== "/profile" && (
									<button
										className="sidebar-item-link text-white bg-blue"
										onClick={() => dispatch({ type: OPEN_NOTE_CREATE_MODAL })}
									>
										<FontAwesomeIcon icon={faAdd} className="text-lg" />

										<span>Create Post</span>
									</button>
								)}
							</>
						)}
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default SideBar;
