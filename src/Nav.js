import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

const Nav = ({ search, setSearch, userImg }) => {

    
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
                <li><Link to="settings">Settings</Link></li> 
                <li><Link to="myPost"> 
                <Avatar
                src={userImg === null ? 'user.png' : userImg}
                alt='User Icon'
                height={50}
                />
                </Link></li>              
            </ul>
        </nav>
    )
}

export default Nav
