import {
	// faBars,
	faBook,
	faSearch,
	faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import useDetectClickOutside from "../../hooks/useDetectClickOutside";
import Filter from "../Filter/Filter";
import ModalCard from "../ModalCard/ModalCard";
import "./Header.css";
function Header() {
	const { user: currentUser } = useAuth();
	const { user } = currentUser;
	const { triggerRef, nodeRef, showItem } = useDetectClickOutside(false);
	const location = useLocation();
	const [, setSearchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchParams({ search: searchQuery });
		setSearchQuery("");
	};

	const searchRoutes = ["/", "/bin", "/archived"];
	return (
		<header className="header flex">
			<div className="flex">
				{/* <FontAwesomeIcon icon={faBars} className="header-icon text-xlg" /> */}
				<div className="flex header-brand">
					<FontAwesomeIcon icon={faBook} className="header-logo text-huge" />
					<h2 className="header-text text-xlg">ANIPAD</h2>
				</div>
			</div>
			{searchRoutes.includes(location.pathname) && (
				<div className="header-searchbar-wrapper">
					<form className="search-form" onSubmit={handleSearch}>
						<label aria-label="search" htmlFor="search" />
						<input
							type="search"
							name="search"
							className="header-searchbar text-white"
							placeholder="Search Notes..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button className="btn">
							<FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
						</button>
					</form>
					<div>
						<button className="btn" ref={triggerRef}>
							<FontAwesomeIcon
								icon={faSliders}
								className="text-white text-lg"
							/>
						</button>
						{showItem && (
							<ModalCard ref={nodeRef}>
								<Filter />
							</ModalCard>
						)}
					</div>
				</div>
			)}
			<NavLink to="/profile">
				<div className="avatar flex-container">
					<div className="avatar-content text-white font-bold">
						{user.firstName[0]}
					</div>
				</div>
			</NavLink>
		</header>
	);
}

export default Header;
