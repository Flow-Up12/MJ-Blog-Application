import { Link } from 'react-router-dom';

function SignUp({
  handleSignUp,
  usernameInput,
  setUsernameInput,
  passwordInput,
  setPasswordInput,
  setIsSigningUp,
  setEmailInput,
  emailInput

}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(emailInput, passwordInput, usernameInput);
  };

  return (
    <div className="SignUp">
      <img src="/blogging.png" alt="Blogging" className="signin-image" />
      <h1>MJ Blog</h1>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/signin" onClick={() => setIsSigningUp(false)}>
  Already have an account? Sign In
</Link>
    </div>
  );
}

export default SignUp;
