import { Link } from 'react-router-dom';
import { Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Nav = ({ search, setSearch, userImg, usernameInput}) => {

    
    return (
        <nav className='top-nav'>
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
                <li><Link to="/" >Home</Link></li>
                <li><Link to="post" >Post</Link></li>
                <li><Link to="search" >
                 <SearchIcon>

                </SearchIcon></Link></li>
              <li><Link to="myProfile"> 
                <Avatar
                src={userImg === null ? 'user.png' : userImg}
                alt={usernameInput}
                height={50}
                />
                </Link></li>              
            </ul>
        </nav>
    )
}

export default Nav
