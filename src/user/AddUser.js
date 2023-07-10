import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: ''
    });

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user", user);
        navigate("/");
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-3 border rounded py-4 md-2 shadow'>
                    <h2 className='text-center m-4'>Register User</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='form-group m-4'>
                            <input type="text" className="form-control" name='name' placeholder="Enter Name"
                                value={name}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='form-group m-4'>
                            <input type="text" className="form-control" name='username' placeholder="Enter Username"
                                value={username}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='form-group m-4'>
                            <input type="email" className="form-control" name='email' placeholder="Enter Email"
                                value={email}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}