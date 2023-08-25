import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
      <h2>
    <Link to={"/"}> 
      <Avatar style={{marginRight: 10}}
      src={post.profileImg === undefined ? 'user.png' : post.profileImg}
      alt="Profile Image"
      />
    </Link>
  {post.title} By: {post.username}
      </h2>
        <p className="postDate">{post.datetime}</p>
      </Link>
      <p className="postBody">
        {(post.body).length <= 25
          ? `${post.body} `
          : `${(post.body).slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;