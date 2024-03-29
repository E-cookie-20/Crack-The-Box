import React from 'react';

const Signup = () => {
  return (
    <div>
      <h2>Signup</h2>
      <form action="signup.php" method="post">
        <label htmlFor="signup_username">Username:</label><br />
        <input type="text" id="signup_username" name="signup_username" required /><br />
        <label htmlFor="signup_password">Password:</label><br />
        <input type="password" id="signup_password" name="signup_password" required /><br />
        <label htmlFor="confirm_password">Confirm Password:</label><br />
        <input type="password" id="confirm_password" name="confirm_password" required /><br /><br />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default Signup;
