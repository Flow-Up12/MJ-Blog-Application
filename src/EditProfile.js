import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EditProfile = ({handleUserInfoSubmit ,name , setEditingProfile, newUsername, setNewUsername, bio, setBio,setName}) => {
  
  const handleSaveProfile = (e) => {
    handleUserInfoSubmit(name, newUsername, bio);  
  };

  return (
    <main className="editProfile">
      <div>
        <TextField
          label="New Username"
          variant="outlined"
          fullWidth
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Bio"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <Button variant="contained" color="primary" onClick={handleSaveProfile}>
          Save Profile
        </Button>
        <Button variant="contained" color="primary" onClick={ () => setEditingProfile(false) } >
          <Link to="/mypost"style={{textDecoration:'none', color: "white"}}>Cancel</Link>
        </Button>
      </div>
    </main>
  );
};

export default EditProfile;
