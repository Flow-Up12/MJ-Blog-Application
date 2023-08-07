import React from 'react';
import Feed from './Feed';

const Home = ({ posts, usernameInput}) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} usernameInput={usernameInput}/>
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display.</p>
      )}
    </main>
  );
};

export default Home