import React, { useState } from 'react'
import './regist.css'
import axios from 'axios';
import { login } from '../../basketRedax/userRedux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Regist = () => {

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const { name, lastname, username, email, password, confirmPassword } = formData;
    
    if (password !== confirmPassword) {
      const user = { username };
      dispatch(login({ user }));
      Cookies.set('authToken', 'mock-auth-token', { expires: 7 });
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/users', {
        name,
        lastname,
        username,
        email,
        password,
      });

      const user = response.data;
      dispatch(login({ user }));

      setSuccess('Account created successfully!');
      setFormData({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      history.push('/Login');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className='regist'>
      <div className="regist_inner">
        <h1>Create An Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="form_left">
            <input type="text"
                name="name"
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                required/>
            <input type="text"
                name="lastname"
                placeholder='Lastname'
                value={formData.lastname}
                onChange={handleChange}
                required />
            <input type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required />
            </div>
            <div className="form_right">
            <input type="text"
                name="username"
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                required />
            <input  type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required />
            <input type="password"
                name="confirmPassword"
                placeholder='Confirm password'
                value={formData.confirmPassword}
                onChange={handleChange}
                required />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <p>By creating an account, I consent to the processing of my data in accordance with the <span>PRIVACY POLICY</span></p>
          <Link to='/Login'>Do You already have Account ?</Link>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default Regist