// src/components/UpdateUser.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/users/update/${user._id}`, { name, email, password });
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/"); // Redirect to user list after successful update
        } catch (error) {
            console.error(error);
            toast.error("Error updating user", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <Form className='shadow-lg p-5 rounded-3' onSubmit={handleUpdate}>
                <h4 className='pb-3 text-center'>Update User</h4>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="User Name" value={name}
                        onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="User Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="User Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update User
                </Button>
            </Form>
            <ToastContainer />
        </div>
    );
};

export default UpdateUser;
