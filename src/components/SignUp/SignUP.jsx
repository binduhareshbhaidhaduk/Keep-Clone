import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../Services/Action/KeepAction'; // Ensure this is the correct path

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); // Ensure this matches the key in the reducer

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
