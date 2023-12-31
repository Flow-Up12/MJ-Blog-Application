import React, { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MyPostFeed from './MyPostFeed';


const MyPostDisplay = ({ myPost, usernameInput, userImg, name, bio, setEditingProfile , setProfile}) => {
  const [activeTab, setActiveTab] = useState('post'); // Default active tab is "post"
  const name2 = usernameInput;
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="Home">
      <div className="MyPostDisplay"> 
      <div className='username'>{usernameInput}</div>  
        <div className="MyPostDisplay-header">
          <Avatar
            sx={{ width: 70, height: 70 }}
            src={userImg}
            alt={usernameInput}
            className="MyPostDisplay-header-avatar"
         
          />
         

          <div style={{ marginBottom: 20, marginTop:24 }}>
            <Button color="primary"
              onClick={() => handleTabChange('post')}
              className="MyPostDisplay-button"
              style={{fontSize:15, marginRight: 10, color: activeTab === 'post' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Posts
            </Button>
            <Button color="primary"
              onClick={() => handleTabChange('followers')}
              className="MyPostDisplay-button"
              style={{fontSize:15, marginRight: 10, color: activeTab === 'followers' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Followers
            </Button>
            <Button color="primary" 
              onClick={() => handleTabChange('following')}
              className="MyPostDisplay-button"
              style={{ fontSize:15, marginRight: 10, color: activeTab === 'following' ? 'black' : 'lightgray', backgroundColor: 'transparent'}}
            >
              Following
            </Button>
          </div>
        </div>
        <div className="MyPostDisplay-content"> 
          <div className="MyPostDisplay-name">{!name=== null ? name2 : name}</div> 
          <div className="MyPostDisplay-bio">{bio}</div> 
        </div>
        <Button
           style={{ marginTop: 30, marginBottom: 20, marginRight: 10, backgroundColor: 'lightgray', color:'black', }}
        >
          <Link onClick={setEditingProfile} to="editProfile" style={{ color: 'black', textDecoration: 'none' }}>
            Edit Profile
          </Link>
        </Button>
        <Button
           style={{ marginTop: 30, marginBottom: 20, marginRight: 10, backgroundColor: 'lightgray', color:'black', }}
        >
          <Link to="settings"  style={{ color: 'black', textDecoration: 'none' }}>Settings</Link>
        </Button>
      </div>

      {activeTab === 'post' ? (
        myPost.length ? <MyPostFeed setProfile={setProfile} myPost={myPost} /> : <p style={{ marginTop: '2rem' }}>No posts to display.</p>
      ) : (
        <p>Content for {activeTab} tab goes here.</p>
      )}
    </main>
  );
};

export default MyPostDisplay;
