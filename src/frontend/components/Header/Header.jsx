import { faBars, faBook, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
function Header() {
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
			</div>
			<div className="avatar flex-container">
				<div className="avatar-content text-white font-bold">R</div>
			</div>
		</header>
	);
}

export default Header;
