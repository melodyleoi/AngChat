import React, { Fragment, useState,useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #78adb3;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #0f6307;
      font-family: "Times New Roman", Times, serif;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff;
    border-radius: 2rem;
    padding: 3rem 5rem;
    margin: 150px;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: #000000;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    a {
      color: #00ace6;
      text-decoration: underline;
    }
  }
`;
  
const Register = () => {
    const navigate = useNavigate()

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const [values, setValues] = useState({
        username: "",
        email : "",
        password : "",
        retypePassword : ""
    })

    const validationHandler = () => {
        const { password, retypePassword, username, email} = values

        if (password !== retypePassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            );
            return false;
        } else if (username.length < 3) {
            toast.error(
              "Username should be greater than 3 characters.",
              toastOptions
            );
            return false;
          } else if (password.length < 6) {
            toast.error(
              "Password should be equal or greater than 8 characters.",
              toastOptions
            );
            return false;
          } else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
          }
      
          return true;
    }

    const submitHandler = async(event) => {
        /*
        If invoked when the cancelable attribute value is true,
        and while executing a listener for the event with passive set to false,
        signals to the operation that caused event to be dispatched that it needs to be canceled.
        */
        event.preventDefault()
        
        if (validationHandler()) {
          const { username, email, password } = values;
          console.log(registerRoute)
          const { data } = await axios.post(registerRoute, {
            username,
            email,
            password,
          });

          if (data.status ===  false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem('angchat-user', JSON.stringify(data.user));
          }

           navigate("/login");

        }
    }

    const elementChangeHandler = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }


  return (
    <Fragment>
        <FormContainer>
            <form onSubmit={(event) => submitHandler(event)}>
                <div className='brand'>
                    <h1>AngChat</h1>
                </div>
                <input 
                    type= 'text'
                    placeholder='Username'
                    name='username'
                    onChange = {elementChangeHandler}
                />

                <input 
                    type= 'email'
                    placeholder='Email'
                    name='email'
                    onChange = {elementChangeHandler}
                />

                <input 
                    type= 'password'
                    placeholder='Password'
                    name='password'
                    onChange = {elementChangeHandler}
                />

                <input 
                    type= 'password'
                    placeholder='Retype Password'
                    name='retypePassword'
                    onChange = {elementChangeHandler}
                />

                <button type="submit"> Sign Up </button>
                <span>
                    <Link to="/Login">Existing User? click here to login</Link>
                </span>

            </form>
        </FormContainer>
        <ToastContainer />
    </Fragment>
  )
}

export default Register