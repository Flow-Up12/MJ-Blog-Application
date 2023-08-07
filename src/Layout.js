import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ search, setSearch, usernameInput }) => {
    return (
        <div className="App">
            <Header title="MJ - Blog"/>
            <Nav search={search} setSearch={setSearch} />
            <Outlet />
            <Footer usernameInput={usernameInput} />
        </div>
    )
}

export default Layout
