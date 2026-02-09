import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import { useState } from 'react';
import emailValidation from '../../utils/emailRegex';

import { Link, useNavigate } from "react-router-dom";
import PasswordInput from '../../components/input/PasswordInput';
import { API_BASE_URL } from '../../utils/contants';


export default function SignUP({showToastMsgHandler}) {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

const navigate = useNavigate();


  const signupHandler = async (e) => {

    e.preventDefault();
    console.log("sign up handler called")

    

    if (!name) {
      setError("Enter your name!!")
      return
    }

    if (!emailValidation(email)) {
      setError("Please enter a valid email address!")
      return
    }

    if (!password) {
      setError("Enter your password!")
      return
    }

    setError("")

    //sign up api setting

    try {
      const response = await fetch(`${API_BASE_URL}create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await response.json();
      if (response.ok && !data.error) {
        // Account created successfully
        showToastMsgHandler("Welcome to our Notes App!", "add");
        console.log("Account created successfully:", data);
        localStorage.setItem("token", data.accessToken);

        //having login here 
        
       
        navigate("/dashboard");

      } else {
        // Handle errors returned by the server
        setError(data.message || "Signup failed. Please try again.");
      }


  }catch (error) {
      console.error("Error during signup:", error);
      setError("Internal server error! Please try again later.");
    }

  }


  return (
    // <div>This is Sign up component vroo!!</div>
    <>
      <NavBar />

      <div className='flex items-center justify-center mt-22 '>

        <div className='w-96  rounded bg-white px-7 py-10 drop-shadow'>
          <form onSubmit={signupHandler}>
            <h4 className='text-2xl mb-7'>Sign UP</h4>


            {/* name */}
            <input type="text" placeholder='Enter your UserName!' autoComplete="off" className='w-full text-sm bg-transparent border-[1.5px] border-slate-200 px-5 py-3 rounded mb-4 outline-none focus:border-blue-600'

              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            {/* email  */}
            <input type="text" placeholder='Enter your Email!' autoComplete="off" className='w-full text-sm bg-transparent border-[1.5px] border-slate-200 px-5 py-3 rounded mb-4 outline-none focus:border-blue-600'

              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />


            {/* PasswordInput  */}
            <PasswordInput
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              placeholder={"Enter your Password"}
            />

            {/* validation para ! */}
            {error && <p className='text-red-500 text-[13px] pb-1 ml-[8px]'> {error}</p>}

            <button type="submit" className='w-full text-sm border bg-blue-600 text-white p-2 rounded  hover:bg-blue-700 transition-all duration-300 cursor-pointer '
              onClick={signupHandler}
            >Create Account!</button>

            <p className='text-sm text-center mt-4 whitespace-pre-wrap'> Already have an account?{"      "}
              <Link to="/login" className="font-medium text-primary underline  text-blue-600 my-1 ">
                Login!
              </Link>
            </p>

          </form >

        </div>
      </div>




    </>


  )
}






