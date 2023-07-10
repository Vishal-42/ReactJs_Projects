import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    const {id} = useParams();
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

    useEffect(()=>{
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, user);
        navigate("/");
    }

    const loadUser = async ()=>{
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-3 border rounded py-4 md-2 shadow'>
                    <h2 className='text-center m-4'>Edit User</h2>
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