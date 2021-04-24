import React from 'react';
import './Login.css';
import CurrentUser from '../../config/user';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

const Login = (props) => {

  let history = useHistory()
  const { register, handleSubmit, errors } = useForm()


  const onSubmit = (data) => {
    props.rerender();
    CurrentUser.CONNECTED_USER = true
    history.push("/dashboard")
  }

  return (
    <div className="login-content" style={{ display: (!CurrentUser.CONNECTED_USER ? 'block' : 'none') }}>
      <div className="login-logo">
        <img className="align-content" src="images/logo.png" alt="" />
      </div>
      <div className="login-form">
        <label>login : admin  / mp : admin</label>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" placeholder="Email" value="admin" />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" className="form-control" placeholder="Password" value="admin" />
          </div>
          <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30">Connexion</button>
        </form>
      </div>
    </div>
  )
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
