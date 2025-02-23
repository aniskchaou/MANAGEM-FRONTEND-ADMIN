import React, { useEffect, useState } from 'react';
import './Login.css';
import CurrentUser from '../../config/user';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../services/userHTTPService';
import showMessage from '../../../libraries/messages/messages';
import User from '../../config/user';

const Login = ({ handleClick = () => {} }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState({ username: 'admin', password: 'admin' });

  useEffect(() => {}, []);

  const registerPage = () => {
    navigate('/register', { replace: true });
  };

  const onSubmit = async () => {
    try {
      const response = await userHTTPService.login({ username: user.username, password: user.password });
      setUser({ username: '', password: '' });

      if (response.data && Object.keys(response.data).length !== 0) {
        handleClick(true);
        User.USER_DETAIL = response.data;
        localStorage.setItem('connected', JSON.stringify(User.CONNECTED_USER));
        navigate('/dashboard');
      } else {
        User.CONNECTED_USER = false;
        showMessage('Error', 'Invalid username or password', 'warning');
      }
    } catch (e) {
      showMessage('Error', 'An error occurred while logging in', 'warning');
      console.error(e);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="login-content" style={{ display: !CurrentUser.CONNECTED_USER ? 'block' : 'none' }}>
      <div className="login-form">
        <div className="login-logo">
          <img className="align-content" src="images/logo.png" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              name="username"
              onChange={handleInputChange}
              value={user.username}
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={user.password}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30">
            <i className="ti-user"></i> Sign in
          </button>
          <button type="button" onClick={registerPage} className="btn social facebook btn-primary btn-addon mb-3">
            <i className="ti-pin"></i> Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
