import React, { useEffect, useState } from 'react';
import Register from '../Register/Register';
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

  const [showRegister, setShowRegister] = useState(false);
  const registerPage = () => {
    setShowRegister(true);
  };
  const closeRegister = () => {
    setShowRegister(false);
  };

  const onSubmit = async () => {
    try {
      //const response = await userHTTPService.login({ username: user.username, password: user.password });
      //setUser({ username: '', password: '' });

       handleClick(true);
       // User.USER_DETAIL = response.data;
        User.CONNECTED_USER = true;
        localStorage.setItem('connected', JSON.stringify(User.CONNECTED_USER));
        navigate('/dashboard');

      // if (response.data && Object.keys(response.data).length !== 0) {
      //   handleClick(true);
      //   User.USER_DETAIL = response.data;
      //   localStorage.setItem('connected', JSON.stringify(User.CONNECTED_USER));
      //   navigate('/dashboard');
      // } else {
      //   User.CONNECTED_USER = false;
      //   showMessage('Error', 'Invalid username or password', 'warning');
      // }
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
    <>
      <div className="login-content" style={{ display: !CurrentUser.CONNECTED_USER ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 24px #1976d255', padding: 40, minWidth: 340, maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="login-logo" style={{ marginBottom: 24 }}>
            <img className="align-content" src="images/logo.png" alt="Logo" style={{ width: 80, height: 80, borderRadius: 16, boxShadow: '0 2px 8px #43a04733' }} />
          </div>
          <h2 style={{ color: '#1565c0', fontWeight: 700, marginBottom: 18, fontSize: 28, letterSpacing: 1 }}>Sign in to Managem</h2>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label style={{ color: '#1976d2', fontWeight: 600, marginBottom: 6 }}>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="username"
                onChange={handleInputChange}
                value={user.username}
                {...register('username', { required: 'Username is required' })}
                style={{ borderRadius: 10, border: '1px solid #e0e4ea', padding: '10px 14px', fontSize: 16, background: '#fafdff', color: '#1565c0', fontWeight: 500 }}
              />
              {errors.username && <p className="error-message" style={{ color: '#d32f2f', marginTop: 4 }}>{errors.username.message}</p>}
            </div>
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label style={{ color: '#1976d2', fontWeight: 600, marginBottom: 6 }}>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={user.password}
                {...register('password', { required: 'Password is required' })}
                style={{ borderRadius: 10, border: '1px solid #e0e4ea', padding: '10px 14px', fontSize: 16, background: '#fafdff', color: '#1565c0', fontWeight: 500 }}
              />
              {errors.password && <p className="error-message" style={{ color: '#d32f2f', marginTop: 4 }}>{errors.password.message}</p>}
            </div>
            <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #1565c0 0%, #43a047 100%)', color: '#fff', fontWeight: 700, fontSize: 18, borderRadius: 10, border: 'none', padding: '12px 0', marginBottom: 14, boxShadow: '0 2px 8px #1565c033', cursor: 'pointer', transition: 'background 0.2s' }}>
              <i className="ti-user" style={{ marginRight: 8 }}></i> Sign in
            </button>
            <button type="button" onClick={registerPage} style={{ width: '100%', background: '#1976d2', color: '#fff', fontWeight: 700, fontSize: 16, borderRadius: 10, border: 'none', padding: '10px 0', boxShadow: '0 2px 8px #1976d233', cursor: 'pointer' }}>
              <i className="ti-pin" style={{ marginRight: 8 }}></i> Register
            </button>
          </form>
        </div>
      </div>
      {showRegister && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.25)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative' }}>
            <button onClick={closeRegister} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 24, color: '#1976d2', cursor: 'pointer', zIndex: 101 }}>&times;</button>
            <Register />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
