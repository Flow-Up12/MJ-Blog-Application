import Post from './Post';

const MyPost = ({ myPost, setProfile}) => {
  // Sort the posts by the datetime property in ascending order
  const sortedPosts = myPost.slice().sort((b,a) => {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA - dateB;
  });

  return (
    <>
      {sortedPosts.map((post) => (
        <Post key={post.id} post={post} setProfile={setProfile} />
      ))}
    </>
  );
};

export default MyPost;
