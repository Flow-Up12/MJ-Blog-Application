import Post from './Post';

const MyPost = ({myPost}) => {  
  return (
    <>
      {myPost.map((post) => (
        <Post key={post.id} post={post}  />
      ))}
    </>
  );
};

export default MyPost;
