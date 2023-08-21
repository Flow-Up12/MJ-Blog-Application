import React, { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MyPostFeed from './MyPostFeed';

const MyPostDisplay = ({ myPost, usernameInput, userImg, name, bio, setEditingProfile}) => {
  const [activeTab, setActiveTab] = useState('post'); // Default active tab is "post"
  const name2 = usernameInput;
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

            <div style={{ marginBottom: 20, marginLeft:40, marginTop:24 }}>
            <Button color="primary"
              onClick={() => handleTabChange('post')}
              style={{ fontSize:15,marginRight: 10, color: activeTab === 'post' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Posts
            </Button>
            <Button color="primary"
              onClick={() => handleTabChange('followers')}
              style={{fontSize:15, marginRight: 10, color: activeTab === 'followers' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Followers
            </Button>
            <Button color="primary" 
              onClick={() => handleTabChange('following')}
              style={{ fontSize:15, marginRight: 10, color: activeTab === 'following' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Following
            </Button>
          </div>
        </div>
        <div style= {{display:'flex', flexDirection: 'column'}}>
          <div>{!name.length ? name2 : name} </div>
          <div style={{ marginTop: 10}} >{bio}</div>
        </div>
        <Button 
          style={{ marginTop: 30, marginBottom: 20, marginRight: 10, backgroundColor: 'lightgray', color:'black', }}
         > <Link onClick={setEditingProfile} to="editProfile" style={{color: 'black', textDecoration:'none'}}>Edit Profile</Link>
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
