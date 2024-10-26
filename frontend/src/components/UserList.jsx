import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form } from 'react-bootstrap';
import { MdSystemUpdateAlt, MdDelete } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const getUsers = () => {
        axios.get("http://localhost:5000/users/get")
            .then((res) => {
                setUsers(res.data); // Assuming response data is an array of users
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleUpdate = (user) => {
        navigate("/update", { state: user }); // Navigate to the update page with user data
    };

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:5000/users/delete/${userId}`)
            .then((res) => {
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
                getUsers(); // Refresh the user list after deletion
            })
            .catch((err) => {
                console.error(err);
                toast.error("Error deleting user", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container className='py-5'>
            <h2>User Controller</h2>
            {/* Search Bar */}
            <Form className="mb-4">
                <Form.Group controlId="searchBar">
                    <Form.Control
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className='d-flex gap-3'>
                                <MdSystemUpdateAlt onClick={() => handleUpdate(user)} className='fs-3 cursor-pointer' />
                                <MdDelete onClick={() => handleDelete(user._id)} className='fs-3 cursor-pointer' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer />
        </Container>
    );
};

export default UserList;
