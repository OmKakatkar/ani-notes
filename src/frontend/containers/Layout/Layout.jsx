import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
	return (
		<>
			<Header />
			<SideBar />
			<main className="main-container flex-container">
				<Outlet className="main-container-body main-container-body-offset" />
			</main>
		</>
	);
}
export default Layout;
