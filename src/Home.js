import React from 'react';
import Feed from './Feed';

const Home = ({ posts, usernameInput, setProfile}) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} usernameInput={usernameInput} setProfile={setProfile}/>
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display.</p>
      )}
    </main>
  );
};

export default Home