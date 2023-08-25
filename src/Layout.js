
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';


const Layout = ({ search, setSearch, usernameInput, userImg, editingProfile, setEditingProfile, posts}) => {
    return (
        <div className="App">
            {editingProfile === false &&
                <Nav search={search} setSearch={setSearch} userImg={userImg} setEditingProfile={setEditingProfile} usernameInput={usernameInput} posts={posts}/>
            }
            
            <Outlet />
            <Footer usernameInput={usernameInput} />
        </div>
    )
}

export default Layout
