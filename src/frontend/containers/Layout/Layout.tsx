import SideBar from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <>
      <Header />
      <SideBar />
      <main className='main-container'>
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
