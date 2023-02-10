import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

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
    text-align: center;
    color: white;
    a {
      color: #00ace6;
      text-decoration: underline;
    }
  }
`;
  
const Login = () => {
    const navigate = useNavigate()
   // const location = useLocation()

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const [values, setValues] = useState({
        username: "",
        password : ""
    })

   // console.log(location.pathname)

    // useEffect(() => {
    //   if (localStorage.getItem('angchat-user')) {
    //     navigate('/chat');
    //   }
    // });

    const validationHandler = () => {
      const { username, password } = values;

      if (username === "") {
        toast.error("Email and Password is required.", toastOptions);
        return false;
      } else if (password === "") {
        toast.error("Email and Password is required.", toastOptions);
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
          const { username, password } = values;
          console.log(loginRoute)
          const { data } = await axios.post(loginRoute, {
            username,
            password,
          });

          if (data.status ===  false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem('angchat-user', JSON.stringify(data.user));
            navigate('/chat')
          }
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
                    min = "3"
                />

                <input 
                    type= 'password'
                    placeholder='Password'
                    name='password'
                    onChange = {elementChangeHandler}
                />

                <button type="submit"> Login </button>
                <span>
                    <Link to="/Register">New User? Sign Up Now!</Link>
                </span>

            </form>
        </FormContainer>
        <ToastContainer />
    </Fragment>
  )
}

export default Login;