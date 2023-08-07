import { Link } from "react-router-dom";


function SignIn({ handleSignIn, emailInput, setEmailInput, passwordInput, setPasswordInput, setIsSigningUp}) {
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

    </div>
  );
}

export default SignIn;
