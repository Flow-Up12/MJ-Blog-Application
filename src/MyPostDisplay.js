import React, { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MyPostFeed from './MyPostFeed';

const MyPostDisplay = ({ myPost, usernameInput, userImg }) => {
  const [activeTab, setActiveTab] = useState('post'); // Default active tab is "post"
  const [name, setName] = useState(usernameInput);
  const [bio, setBio] = useState("Empty");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="Home">
    <div style={{borderBottom: '1px solid black'}}>
      <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 30,
          }}
        >
          <Avatar src={userImg} sx={{ width: 60, height: 60 }} alt="Profile Img" style={{ marginRight: 20 }} />
            
            {usernameInput}

            <div style={{ marginBottom: 20, marginLeft:20, marginTop:24}}>
            <Button color="primary"
              onClick={() => handleTabChange('post')}
              style={{ marginRight: 10, color: activeTab === 'post' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Posts
            </Button>
            <Button color="primary"
              onClick={() => handleTabChange('followers')}
              style={{ marginRight: 10, color: activeTab === 'followers' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Followers
            </Button>
            <Button color="primary"
              onClick={() => handleTabChange('following')}
              style={{ marginRight: 10, color: activeTab === 'following' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Following
            </Button>
          </div>
        </div>
        <div style= {{display:'flex', flexDirection: 'column'}}>
          <div>{name}</div>
          <div>{bio}</div>
        </div>
        <Button 
          style={{ marginRight: 10, backgroundColor: 'lightgray', color:'black', }}
          > <Link to="/" style={{color: 'black', textDecoration:'none'}}>Edit Profile</Link>
        </Button>
    </div>
      

         {activeTab === 'post' ? (
        myPost.length ? <MyPostFeed myPost={myPost} /> : <p style={{ marginTop: '2rem' }}>No posts to display.</p>
      ) : (
        <p>Content for {activeTab} tab goes here.</p>
      )}
    </main>
  );
};

export default MyPostDisplay;
