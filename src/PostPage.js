import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete, usernameInput}) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>   
                        {post.imageUrl && <img src={post.imageUrl} alt="Post" style = {{
                           maxHeight: 600,
                            maxWidth:600
                        }} />} {/* Display the image */}

                        <p className="postBody">{post.body}</p>
                        <p className="postDate"> {post.datetime}</p>
                        <p> By : {post.username}</p>
                        {usernameInput === post.username &&
                         <>
                        <Link to={`/post/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button className="deleteButton" onClick={() =>handleDelete(post.id)}>
                            Delete Post
                        </button>
                        </>
                        }
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage
