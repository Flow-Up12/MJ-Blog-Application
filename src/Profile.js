import React, { useState, useEffect } from 'react';
import { Avatar, Button } from '@mui/material';
import ProfileFeed from './ProfileFeed';
import { getDocs, collection, query, where} from 'firebase/firestore';
import { database } from './data/FireBase';



const MyPostDisplay = ({ posts, usernameInput, userImg, bio, profile, setProfile}) => {
  const [activeTab, setActiveTab] = useState('post'); // Default active tab is "post"
  const name2 = usernameInput;
  const [name, setName] = useState('No name');
  const [username, setUsername] = useState('');
  const [profileImg, setProfileImg] = useState('user.png');
  const [profileBio, setProfileBio] = useState('No Bio');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  // set up to update prifle info when a different person is clicked on
  useEffect(() => {

    const fetchProfileData = async  () => {
      const profileQuerySnapshot = await getDocs(query(collection(database, 'usernames'), where('username', '==', profile)));
      
        profileQuerySnapshot.forEach((doc) => {
          const userProfile = doc.data();
          console.log('User Data:', userProfile);
          setName(userProfile.name);
          setProfileImg(userProfile.profile)
          setUsername(userProfile.username)
          console.log(userProfile.username)
          setProfileBio(userProfile.bio)
        });
     
        
      
    }
    fetchProfileData();
  }, [profile, setProfile, posts])

 
  return (
    <main className="Home">
      <div className="MyPostDisplay"> 
      <div className='username'>{username}</div>  
        <div className="MyPostDisplay-header">
          <Avatar
            sx={{ width: 70, height: 70 }}
            src={profileImg}
            alt={name}
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
          <div className="MyPostDisplay-bio">{profileBio}</div> 
        </div>
       
      </div>

      {activeTab === 'post' ? (
        posts.length ? <ProfileFeed profile={profile} setProfile={setProfile} posts={posts} /> : <p style={{ marginTop: '2rem' }}>No posts to display.</p>
      ) : (
        <p>Content for {activeTab} tab goes here.</p>
      )}
    </main>
  );
};

export default MyPostDisplay;
