import React, { useEffect, useState } from 'react';

import CurrentUser from '../../config/user';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../services/userHTTPService';
import showMessage from '../../../libraries/messages/messages';
import User from '../../config/user';

const Register = ({ handleClick }) => {

    let history = useHistory()
    var userInit = { username: "admin", password: "admin" }
    const { register, handleSubmit, errors } = useForm()
    const [user, setUser] = useState(userInit);

    useEffect(() => {
    }, []);


    const onSubmit = (data) => {



    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className="login-content" style={{ display: (!CurrentUser.CONNECTED_USER ? 'block' : 'none') }}>

            <div className="login-form">
                <div className="login-logo">
                    <img className="align-content" src="images/logo.png" alt="" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="form-group">
                        <label>Fullname</label>
                        <input type="text" className="form-control" placeholder="Email" name="username" onChange={handleInputChange} value={user.username} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>birth Date</label>
                        <input type="date" className="form-control" placeholder="Email" name="username" onChange={handleInputChange} value={user.username} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Email" name="username" onChange={handleInputChange} value={user.username} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Telephone</label>
                        <input type="text" className="form-control" placeholder="Email" name="username" onChange={handleInputChange} value={user.username} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Email" name="username" onChange={handleInputChange} value={user.username} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleInputChange} value={user.password} ref={register({ required: true })} />
                    </div>
                    <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30"><i class="fas fa-sign-in"></i> Sign in</button>
                </form>
            </div>
        </div>
    )
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;