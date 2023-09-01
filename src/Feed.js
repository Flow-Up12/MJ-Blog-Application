import Post from './Post';

const Feed = ({ posts , usernameInput, setProfile}) => {
  const sortedPosts = posts.slice().sort((b,a) => {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA - dateB;
  });

  return (
    <>
      {sortedPosts.map((post) => (
        <Post key={post.id} post={post} usernameInput={usernameInput} setProfile={setProfile} />
      ))}
    </>
  );
};

export default Feed;
