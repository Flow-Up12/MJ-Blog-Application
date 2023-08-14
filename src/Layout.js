
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ search, setSearch, usernameInput, userImg }) => {
    return (
        <div className="App">
            <Nav search={search} setSearch={setSearch} userImg={userImg} />
            <Outlet />
            <Footer usernameInput={usernameInput} />
        </div>
    )
}

export default Layout
