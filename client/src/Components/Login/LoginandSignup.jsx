import React, { useContext, useRef, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { appContext } from '../../Context/AppContext';
import Cookies from 'universal-cookie'
const LoginandSignup = () => {

  const cookies= new Cookies();
  const { setLoggedIn} = useContext(appContext)
  const toast = useToast();
  const navigate = useNavigate();

  const [loginform, setLoginForm] = useState({ email: "" ,password:""});
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password:""});

  const loginText = useRef(null);
  const loginForm = useRef(null);
  const loginBtn = useRef(null);
  const signupBtn = useRef(null);
  const signupLink = useRef(null);

  const handleSignupClick = () => {
    loginForm.current.style.marginLeft = '-50%';
    loginText.current.style.marginLeft = '-100%';
  };

  const handleLoginClick = () => {
    loginForm.current.style.marginLeft = '0%';
    loginText.current.style.marginLeft = '0%';
  };

  const handleSignupLinkClick = (e) => {
    signupBtn.current.click();
    e.preventDefault();
  };

  const handleSignupFormChange = (e) => {
    e.preventDefault();
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios.post('https://bmi-assignment.vercel.app/users', signupForm)
      .then((response) => {
        setSignupForm({ name: "", email: "", password: "" });
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          position: "top",
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
      })
      .catch((error) => {
        
        setSignupForm({ name: "", email: "", password: "" });
        toast({
          title: 'Error in Signup.',
          position: "top",
          description: error.response.data.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      });
  }

  const handleLoginFormChange = (e) => {
    e.preventDefault();
    setLoginForm({ ...loginform, [e.target.name]: e.target.value });
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('https://bmi-assignment.vercel.app/users/login', loginform)
      .then((response) => {
        cookies.set('jwt' , response.data.token , {
          maxAge:24 * 60 * 60,
          path: '/'
        });
        setLoggedIn(true);
        setLoginForm({ email: "", password:"" });
        toast({
          title: 'Login Success',
          position: "top",
          description: "Congratulation ! you logged in successfully",
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
      })
      .catch((error) => {
        setLoginForm({ email: "", password:"" });
        toast({
          title: 'Error in login',
          position: "top",
          description: error.response.data.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      });
  }

  return (
    <div className='login_signup_container'>
      <div className='wrapper'>
        <div className='title-text' ref={loginText} >
          <div className='title login' >
            Login Form
          </div>
          <div className='title signup'>Signup Form</div>
        </div>
        <div className='form-container'>
          <div className='slide-controls'>
            <input type='radio' name='slide' id='login'  defaultChecked />
            <input type='radio' name='slide' id='signup' />
            <label htmlFor='login' className='slide login' ref={loginBtn} onClick={handleLoginClick}>
              Login
            </label>
            <label htmlFor='signup' className='slide signup' ref={signupBtn} onClick={handleSignupClick}>
              Signup
            </label>
            <div className='slider-tab'></div>
          </div>
          <div className='form-inner'>
            <form action='#' className='login' ref={loginForm} onSubmit={handleLoginSubmit} >
              <div className='field'> 
                <input type='email' name='email' value={loginform.email} placeholder='Email Address' onChange={handleLoginFormChange} required />
              </div>
              <div className='field'> 
                <input type='password' name='password' value={loginform.password} placeholder='Enter Password' onChange={handleLoginFormChange} required />
              </div>
              <div className='field btn'>
                <div className='btn-layer'></div>
                <input type='submit' value='Login' />
              </div>
              <div className='signup-link'>
               Forgot your Password? <Link onClick={handleSignupLinkClick}>Click here</Link>
              </div>
              <div className='signup-link'>
                Not a member? <Link onClick={handleSignupLinkClick}>Signup now</Link>
              </div>
            </form>
            <form action='#' className='signup' onSubmit={handleSignupSubmit} >
              <div className='field'>
                <input type='text' placeholder='Enter Name' name='name' value={signupForm.name} onChange={handleSignupFormChange} required />
              </div>
              <div className='field'>
                <input type='email' name='email' value={signupForm.email} placeholder='Email Address' onChange={handleSignupFormChange} required />
              </div>
              <div className='field'>
                <input type='password' name='password' value={signupForm.password} placeholder='Enter Password' onChange={handleSignupFormChange} required />
              </div>
              <div className='field btn'>
                <div className='btn-layer'></div>
                <input type='submit' value='Signup' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginandSignup };
