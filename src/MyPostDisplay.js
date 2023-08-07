import React from 'react';
import MyPostFeed from './MyPostFeed';

const MyPostDisplay = ({myPost}) => {
    return (
      <main className="Home">
        {myPost.length ? (
          <MyPostFeed myPost={myPost} />
        ) : (
          <p style={{ marginTop: "2rem" }}>No posts to display.</p>
        )}
      </main>
    );
  };

export default MyPostDisplay