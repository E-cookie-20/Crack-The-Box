import React from 'react';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form action="login.php" method="post">
        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" name="username" required /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" required /><br /><br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
