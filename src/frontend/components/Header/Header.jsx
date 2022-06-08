import {
	faBars,
	faBook,
	faSearch,
	faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import useDetectClickOutside from "../../hooks/useDetectClickOutside";
import Filter from "../Filter/Filter";
import ModalCard from "../ModalCard/ModalCard";
import "./Header.css";
function Header() {
	const { triggerRef, nodeRef, showItem } = useDetectClickOutside(false);
	return (
		<header className="header flex">
			<div className="flex">
				<FontAwesomeIcon icon={faBars} className="header-icon text-xlg" />
				<div className="flex header-brand">
					<FontAwesomeIcon icon={faBook} className="header-logo text-huge" />
					<h2 className="header-text text-xlg">ANIPAD</h2>
				</div>
			</div>
			<div className="header-searchbar-wrapper">
				<input type="search" className="header-searchbar text-white" />
				<button className="btn">
					<FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
				</button>
				<div>
					<button className="btn" ref={triggerRef}>
						<FontAwesomeIcon icon={faSliders} className="text-white text-lg" />
					</button>
					{showItem && (
						<ModalCard ref={nodeRef}>
							<Filter />
						</ModalCard>
					)}
				</div>
			</div>
			<NavLink to="/profile">
				<div className="avatar flex-container">
					<div className="avatar-content text-white font-bold">R</div>
				</div>
			</NavLink>
		</header>
	);
}

export default Header;
