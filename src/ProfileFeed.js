import Post from './Post';
import { useState, useEffect } from 'react';

const MyPost = ({posts, profile, setProfile}) => {
    const [profilePost, setProfilePost] = useState([])

    
    useEffect(() => {
        
        const profileFilteredResults = posts.filter(
          (post) => post.username === profile
        );
        
        setProfilePost(profileFilteredResults);
    }, [profile, setProfile, posts])
  
    
     
  // Sort the posts by the datetime property in ascending order
  const sortedPosts = profilePost.slice().sort((b,a) => {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA - dateB;
  });

  return (
    <>
      {sortedPosts.map((post) => (
        <Post key={post.id} post={post} setProfile={setProfile}/>
      ))}
    </>
  );
};

export default MyPost;
