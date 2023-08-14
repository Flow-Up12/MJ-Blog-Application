const Settings = ({ handleSignOut, handleUserImg, selectedImage, handleProfileImgSubmit }) => {
    
  
  return (
      <main className="Settings">
        <h2 className="settings-title">Settings</h2>
        <button className="settings-logout" onClick={handleSignOut}>Logout</button>
        <p style={{ marginTop: "1rem" }}></p>
        <form className="newPostForm" onSubmit={handleProfileImgSubmit}>
        
        <label htmlFor="imageInput">Profile Image:</label>
                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleUserImg}
                />
               {selectedImage && <img src={selectedImage} alt="Selected" />}
               <button type="submit">Submit</button>
        
        
        </form>
        
      </main>
    );
  };
  
  export default Settings;