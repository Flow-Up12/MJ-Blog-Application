const Settings = ({ handleSignOut }) => {
    return (
      <main className="Settings">
        <h2 className="settings-title">Settings</h2>
        <button className="settings-logout" onClick={handleSignOut}>Logout</button>
        <p style={{ marginTop: "1rem" }}></p>
      </main>
    );
  };
  
  export default Settings;