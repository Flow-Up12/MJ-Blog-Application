import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Settings from './Settings';
import Missing from './Missing';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MyPostDisplay from './MyPostDisplay';
import EditPost from './EditPost';
import EditProfile from './EditProfile';
import Profile from './Profile'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { auth, database } from './data/FireBase';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import { getDocs, addDoc, collection, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { storage } from './data/FireBase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Search from './Search';
//unique ids
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [myPost, setMyPost] = useState([]);
  const [user, setUser] = useState([]);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [userImg, setUserImg] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [newUsername, setNewUsername] = useState();
  const [profile, setProfile] = useState('');






  useEffect(() => {
    const fetchPosts = async () => {
      const postCollection = collection(database, 'posts');
      const querySnapshot = await getDocs(postCollection);
      const userCollection = collection(database, 'usernames');
      const userQuerySnapshot = await getDocs(userCollection);

      const fetchedPosts = [];
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push(doc.data());

      });
      userQuerySnapshot.forEach((doc) => {
        fetchedUsers.push(doc.data().username);

      });
      setPosts(fetchedPosts);
      setUsers(fetchedUsers);
      console.log(fetchedPosts);
      console.log(fetchedUsers);




    };

    fetchPosts();

  }, []);

  useEffect(() => {

    if (isLoggedIn) {
      const fetchUser = async () => {
        try {
          const querySnapshot = await getDocs(
            query(collection(database, 'usernames'), where('username', '==', usernameInput))
          );

          if (!querySnapshot.empty && !editingProfile) {
            // Since there could be multiple matching documents, let's consider the first one
            const doc = querySnapshot.docs[0];
            const userData = doc.data();
            setUser(userData);
            localStorage.setItem('userdata', userData);
            if (userData.profileImg != null) {
              setUserImg(userData.profileImg)
              localStorage.setItem('userimg', userData.profileImg);
            }
            else {
              localStorage.setItem('userimg', 'user.png');
            }
            setBio(userData.bio);
            setName(userData.name);
            console.log(userData);

          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }

  }, [usernameInput, isLoggedIn, editingProfile,]);


  useEffect(() => {

    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      setUsernameInput(storedUsername);
      const StoredUserImg = localStorage.getItem('userimg');
      if (StoredUserImg != null) {
        setUserImg(StoredUserImg);
      }


    }





    // Simulate a 2-second timeout before setting isLoading to false
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, []);


  // Save isLoggedIn and current username to local storage whenever they change


  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    localStorage.setItem('username', usernameInput);
  }, [isLoggedIn, usernameInput]);


  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    const userFilteredResults = filteredResults.filter(
      (post) => post.username === usernameInput
    );


    setSearchResults(filteredResults.reverse());
    setMyPost(userFilteredResults);
  }, [posts, search, usernameInput, users])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = uuidv4();
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, username: usernameInput, title: postTitle, datetime, body: postBody, imageUrl: selectedImage, profileImg: userImg };
    try {
      const postCollection = collection(database, 'posts');
      await addDoc(postCollection, newPost);

      // Update state with the new post
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setPostTitle('');
      setPostBody('');
      navigate('/');


    } catch (err) {
      console.log(`Error ${err.message}`);
    }

  }

  const handleUserInfoSubmit = async (e) => {
    try {
      // Check if the username is already taken
      const querySnapshot = await getDocs(query(collection(database, 'usernames'), where('username', '==', newUsername)));
      if (!querySnapshot.empty && usernameInput !== newUsername) {
        alert("Username Taken");
      } else {
        // Update user profile information
        const querySnapshot = await getDocs(query(collection(database, 'usernames'), where('username', '==', usernameInput)));
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            const userRef = doc.ref;
            // Update the 'profileImg' field in the user document
            await updateDoc(userRef, { username: newUsername, bio: bio, name: name });
            setBio(bio);
            setUsernameInput(newUsername);
            setName(name);

            // Update the username in user's posts
            const updatedMyPosts = myPost.map((post) => {
              if (post.username === usernameInput) {
                return { ...post, username: newUsername };
              }
              return post;
            });
            setMyPost(updatedMyPosts);

            alert("Profile saved");
          });
        }
        setEditingProfile(false);
        navigate('/myProfile');
      }
    } catch (error) {
      alert("Username taken or invalid input. Please try again.");
      console.log(error.message);
    }
  };

  const handleProfileImgSubmit = async (e) => {
    e.preventDefault();

    try {
      const querySnapshot = await getDocs(query(collection(database, 'usernames'), where('username', '==', usernameInput)));
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          const userRef = doc.ref;

          // Update the 'profileImg' field in the user document
          await updateDoc(userRef, { profileImg: userImg });
          alert("user img changed");
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {
      id,
      username: usernameInput, // Use usernameInput instead of emailInput
      title: editTitle,
      datetime,
      body: editBody,
    };

    try {
      const querySnapshot = await getDocs(query(collection(database, 'posts'), where('id', '==', id)));

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, updatedPost); // Use doc.ref to get the document reference
        });
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  const handleImageChange = async (e) => {

    if (e.target.files.length) {
      const imageFile = e.target.files[0];

      try {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `${usernameInput}/` + imageFile.name);
        await uploadBytes(storageRef, imageFile);

        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        setSelectedImage(downloadURL); // Update the selectedImage state
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  const handleUserImg = async (e) => {

    if (e.target.files.length) {
      const imageFile = e.target.files[0];

      try {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `${usernameInput}/` + imageFile.name);
        await uploadBytes(storageRef, imageFile);

        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        setUserImg(downloadURL); // Update the selectedImage state
        localStorage.setItem('userimg', downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleDelete = async (postId) => {
    try {
      const querySnapshot = await getDocs(query(collection(database, 'posts'), where('id', '==', postId)));

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref); // Use doc.ref to get the document reference
        });
      }

      // Update state by removing the deleted post
      setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
      navigate("/");
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      setEmailInput('');
      setUsernameInput('');
      setPasswordInput('');
      setUserImg('');
      localStorage.setItem('username', '');
      localStorage.setItem('userimg', '');
      alert("You were signed out.");
    });
  };

  const handleSignIn = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);

      // Retrieve the username from Firestore using the email
      const querySnapshot = await getDocs(query(collection(database, 'usernames'), where('userId', '==', auth.currentUser.uid)));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log('User Data:', userData);
          setUsernameInput(userData.username);
          setUser({ userData });

        });
      }
      console.log(user);
      setIsLoggedIn(true);
      setPasswordInput('');
      navigate("/");
    } catch (error) {
      alert("Invalid username or password. Please try again.");
      console.log(error.message);
    }
  };



  const handleSignUp = async (e) => {
    try {
      // Check if the username is already taken
      const querySnapshot = await getDocs(query(collection(database, 'usernames'), where('username', '==', usernameInput)));
      if (!querySnapshot.empty) {
        alert("Username Taken");
      } else {
        // Sign up the user using Firebase authentication
        await createUserWithEmailAndPassword(auth, emailInput, passwordInput);

        // Add user information to Firestore collection
        const userCollection = collection(database, 'usernames'); // 'usernames' is the name of your collection
        const newUser = {
          userId: auth.currentUser.uid, // Firebase UID of the user
          username: usernameInput,
        };
        await addDoc(userCollection, newUser);
        setUser({ newUser });
        setIsSigningUp(false);
        setIsLoggedIn(true);

        alert("You were signed up.");
        navigate('/');
      }
    } catch (error) {
      alert("Username taken or invalid input. Please try again.");
      console.log(error.message);
    }
  };

  const handlePasswordReset = (email) => {
   
    sendPasswordResetEmail(auth, email)
    .then(() => {
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      
    });
  
  };

  return (
    <>

      {!isLoggedIn && !isSigningUp && !isLoading && (
        <SignIn
          handleSignIn={handleSignIn}
          setEmailInput={setEmailInput}
          emailInput={emailInput}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          setIsSigningUp={setIsSigningUp}
          handlePasswordReset={handlePasswordReset}
        />
      )}

      {isSigningUp && (
        <SignUp
          usernameInput={usernameInput}
          setUsernameInput={setUsernameInput}
          handleSignUp={handleSignUp}
          setEmailInput={setEmailInput}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          emailInput={emailInput}
          setIsSigningUp={setIsSigningUp}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      {isLoggedIn && !isSigningUp && (
        <Routes>
          <Route
            path="/"
            element={<Layout search={search} setSearch={setSearch} usernameInput={usernameInput} userImg={userImg} editingProfile={editingProfile} setEditingProfile={setEditingProfile} posts={posts} />}
          >
            <Route index element={<Home posts={searchResults} usernameInput={usernameInput} setProfile={setProfile} />} />
            <Route path="/profile/:username" element={<Profile profile={profile} setProfile={setProfile} usernameInput={usernameInput} posts={posts} userImg={userImg} bio={bio} name={name} setEditingProfile={setEditingProfile} />} />
            <Route path="myProfile" element={<MyPostDisplay setProfile={setProfile} posts={searchResults} usernameInput={usernameInput} myPost={myPost} userImg={userImg} bio={bio} name={name} setEditingProfile={setEditingProfile} />} />
            <Route path="/myProfile/editProfile" element={<EditProfile name={name} usernameInput={usernameInput} handleUserInfoSubmit={handleUserInfoSubmit} setUserImg={setUserImg} user={user} setBio={setBio} setName={setName} setEditingProfile={setEditingProfile} newUsername={newUsername} setNewUsername={setNewUsername} bio={bio} userImg={userImg} />} />
            <Route path="post">
              <Route
                index
                element={
                  <NewPost
                    handleImageChange={handleImageChange}
                    handleSubmit={handleSubmit}
                    postTitle={postTitle}
                    setPostTitle={setPostTitle}
                    postBody={postBody}
                    setPostBody={setPostBody}
                    setSelectedImage={setSelectedImage}
                    selectedImage={selectedImage}
                  />
                }
              />
              <Route
                path="/post/edit/:id"
                element={(
                  <EditPost
                    posts={posts}
                    handleEdit={handleEdit}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editBody={editBody}
                    setEditBody={setEditBody}
                  />
                )}
              />
              <Route
                path=":id"
                element={<PostPage usernameInput={usernameInput} posts={posts} handleDelete={handleDelete} />}
              />

            </Route>

            <Route path="myProfile/settings" element={<Settings handleSignOut={handleSignOut} handleUserImg={handleUserImg} handleProfileImgSubmit={handleProfileImgSubmit} />} />
            <Route path="search" element={<Search/>}/>
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;