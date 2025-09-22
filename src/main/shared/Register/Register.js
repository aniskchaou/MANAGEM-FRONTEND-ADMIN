import React, { useEffect } from 'react';

import CurrentUser from '../../config/user';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../services/userHTTPService';
import showMessage from '../../../libraries/messages/messages';
import User from '../../config/user';

const Register = ({ handleClick }) => {

    let history = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
    }, []);


    const onSubmit = (data) => {
    // You can handle registration logic here
    // For now, just log the data
    console.log('Register data:', data);
    }


    return (
        <div className="login-content" style={{ display: (!CurrentUser.CONNECTED_USER ? 'block' : 'none') }}>
            <div className="login-form">
                <div className="login-logo">
                    <img className="align-content" src="images/logo.png" alt="" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="form-group">
                        <label>Fullname</label>
                        <input type="text" className="form-control" placeholder="Fullname" {...register('fullname', { required: true })} />
                        {errors.fullname && <span className="text-danger">Fullname is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Birth Date</label>
                        <input type="date" className="form-control" placeholder="Birth Date" {...register('birthDate', { required: true })} />
                        {errors.birthDate && <span className="text-danger">Birth Date is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" {...register('address', { required: true })} />
                        {errors.address && <span className="text-danger">Address is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Telephone</label>
                        <input type="text" className="form-control" placeholder="Telephone" {...register('telephone', { required: true })} />
                        {errors.telephone && <span className="text-danger">Telephone is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" {...register('username', { required: true })} />
                        {errors.username && <span className="text-danger">Username is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control" placeholder="Password" {...register('password', { required: true })} />
                        {errors.password && <span className="text-danger">Password is required</span>}
                    </div>
                    <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30"><i className="fas fa-sign-in"></i> Sign up</button>
                </form>
            </div>
        </div>
    )
};



export default Register;
