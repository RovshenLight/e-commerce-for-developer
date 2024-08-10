import React, { useState } from 'react'
import './login.css'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../basketRedax/userRedux';
import Cookies from 'js-cookie'

const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await axios.get('http://localhost:8000/users');
      const users = response.data;
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        dispatch(login({ user }));
        Cookies.set('authToken', 'your-auth-token', { expires: 7 });
        setSuccess('Login successful!');
        setError('');
        history.push('/'); 
      } else {
        setError('Invalid username or password');
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className='login'>
    <div className="login_inner">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
          <input type="text"
            name="username"
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            required />
          <input type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required />
        <button>Log In</button>
      </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <p><Link>DO NOT REMEMBER THE PASSWORD?</Link></p>
        <p><Link to='/Regist'>Create New Account</Link></p>
    </div>
  </div>
  )
}

export default Login