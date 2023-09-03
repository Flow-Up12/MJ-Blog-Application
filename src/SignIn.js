import { Button } from "@mui/material";
import { Link } from "react-router-dom";


function SignIn({ handlePasswordReset, handleSignIn, emailInput, setEmailInput, passwordInput, setPasswordInput, setIsSigningUp}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(emailInput, passwordInput);
  };

  return (
    <div className="SignIn">
    
        <img src="/blogging.png" alt="Blogging" className="signin-image" />  
          <h1>MJ Blog</h1>
      <h3>Sign In</h3>       
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <Link to="/signup" onClick={() => setIsSigningUp(true)}>
  Create an account
      </Link>
     
      <Button style={{height:30, fontSize:12}} onClick={() => handlePasswordReset(emailInput)}>Forgot Password</Button>

    </div>
    
  );
}

export default SignIn;
