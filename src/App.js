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
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { auth, database } from './data/FireBase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, addDoc, collection, query, where, updateDoc, doc, deleteDoc} from 'firebase/firestore';


function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([])
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
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  const [myPost, setMyPost] = useState([]);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  
  useEffect(() => {
    const fetchPosts = async () => {
      const postCollection = collection(database, 'posts');
      const querySnapshot = await getDocs(postCollection);

      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push(doc.data());
      });
      setPosts(fetchedPosts);
      console.log(fetchedPosts)
    };

    fetchPosts();
    
  }, []);

 
  
  useEffect(() => {
    const fetchUserData = async () => {
      const userCollection = collection(database, 'users');
      const querySnapshot = await getDocs(userCollection);

      const fetchUserDatas = [];
      querySnapshot.forEach((doc) => {
        fetchUserDatas.push(doc.data().username);
      });

      setUsers(fetchUserDatas);
    };

    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      setUsernameInput(storedUsername);
    }

    // Simulate a 2-second timeout before setting isLoading to false
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    fetchUserData();
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
  }, [posts, search, usernameInput])

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, username: usernameInput, title: postTitle, datetime, body: postBody };
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
      const postCollection = collection(database, 'posts');
      const postDocRef = doc(postCollection, id);
      await updateDoc(postDocRef, updatedPost);
  
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
  
  
  const handleDelete = async (id) => {  
    try{
    const postCollection = collection(database, 'posts');
    await deleteDoc(doc(postCollection, id));

     setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
      navigate('/');
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
   
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      setEmailInput('');
      setUsernameInput('');
      setPasswordInput('');
      alert("You were signed out.");
    });
  };
   
  const handleSignIn = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
  
      // Retrieve the username from Firestore using the email
      const querySnapshot = await getDocs(query(collection(database, 'usernames'), where('userId', '==',auth.currentUser.uid)));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUsernameInput(doc.data().username);
        });
      }
  
      setIsLoggedIn(true);
      setPasswordInput('');
      navigate("/");
      console.log(usernameInput)
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
  
    
    return (
      <>
       
        {!isLoggedIn && !isSigningUp && !isLoading && (
          <SignIn
            handleSignIn={handleSignIn}
            setEmailInput={setEmailInput}
            emailInput = {emailInput}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
            setIsSigningUp={setIsSigningUp}
            user={users}
          />
        )}
      
        {isSigningUp && (
          <SignUp
            usernameInput= {usernameInput}
            setUsernameInput= { setUsernameInput}
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
            element={<Layout search={search} setSearch={setSearch} usernameInput={usernameInput} />}
          >
            <Route index element={<Home posts={searchResults} usernameInput={usernameInput} />} />
            <Route path="myPost" element={<MyPostDisplay posts={searchResults} usernameInput={usernameInput} myPost={myPost} />} />

            <Route path="post">
              <Route
                index
                element={
                  <NewPost
                    handleSubmit={handleSubmit}
                    postTitle={postTitle}
                    setPostTitle={setPostTitle}
                    postBody={postBody}
                    setPostBody={setPostBody}
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

            <Route path="settings" element={<Settings handleSignOut={handleSignOut} />} />

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
  
export default App;