import './Login.css'

function Login() {
  return (
    <div className="background-container">
  <form className="login-form">
    <h3>Login Here</h3>

    <label htmlFor="username">Username</label>
    <input type="text" placeholder="Email or Phone" id="username" />

    <label htmlFor="password">Password</label>
    <input type="password" placeholder="Password" id="password" />

    <button className="login-button">Log In</button>
    <div className="social">
      <a className="glassIco" href="#"><i className="fab fa-facebook-f"></i></a>
      <a className="glassIco" href="#"><i className="fab fa-instagram"></i></a>
      <a className="glassIco" href="#"><i className="fab fa-linkedin-in"></i></a>
      <a className="glassIco" href="#"><i className="fab fa-whatsapp"></i></a>
    </div>
  </form>
</div>

  );
}

export default Login;
