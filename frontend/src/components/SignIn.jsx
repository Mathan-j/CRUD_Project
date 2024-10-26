import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
   
  const navigate = useNavigate()
   

  
  const [userEmail, setUserEmail] = useState(location.userEmail);
  const [userPassword, setUserPassword] = useState(location.userPassword);

  const dataToSendBackend = {
    _id: location._id,  // this should be fetched from the url parameters     
    userEmail,
    userPassword
  }

  const handleSignIn = async(e) => {
    e.preventDefault();
    await axios
    .post("http://localhost:5000/api/auth/signIn",dataToSendBackend)
    .then((res)=>{console.log(res.data.token);
      localStorage.setItem("token",res.data.token);
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
        setTimeout(()=>{
          navigate("/")
        },5000)
        
    })
    .catch((err)=>{console.log(err);
    });
  }

  console.log(dataToSendBackend);


  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <Form   className='shadow-lg p-5 rounded-3'>
        <h4 className='pb-3 text-center'>Sign In</h4>
       
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="Text" placeholder="userEmail" value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="Text" placeholder="userPassword" value={userPassword} 
          onChange={(e) => setUserPassword(e.target.value)}/>
        </Form.Group>      
        <div className='d-flex justify-content-between'>
        <Button href='/signup' variant="primary" type="submit">
          Sign Up
        </Button>
        <Button onClick={handleSignIn} href='/signin' variant="primary" type="submit">
          Log In
        </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  )
}


export default SignIn