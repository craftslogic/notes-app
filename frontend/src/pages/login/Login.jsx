import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link } from "react-router-dom";

import emailValidation from '../../utils/emailRegex';
import PasswordInput from '../../components/input/PasswordInput';

import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../utils/contants';


export default function Login({ showToastMsgHandler }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate();


  const loginHandler = async (e) => {

    e.preventDefault()
    console.log("hello this is login prevent default behavior!!");

    if (!emailValidation(email)) {
      setError("Please enter a valid email address!")
      return
    }

    if (!password) {
      setError("Please enter the password!");
      return;
    }

    setError("");




    //login api call!
    try {
      const response = await fetch(`${API_BASE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Credentials bhej rahe hain
      });

      const data = await response.json();

      if (response.ok && !data.error) {



        showToastMsgHandler(`Welcome back ${data.name}!`, "add");
        //  Token ko LocalStorage mein save karrhy
        localStorage.setItem("token", data.accessToken);

        //  User ko Dashboard par bhej rhy useNavigate hook se

        navigate("/dashboard");

      } else {
        // Agar backend se koi error aaye (e.g., Wrong Password)
        setError(data.message || "Login failed. Please try again.");

      }
    } catch (error) {
      console.error("Network Error:", error);
      setError("An unexpected error occurred. Please try again later.");

    }
  }





  return (

    <>
      <NavBar />
      <div className='flex items-center justify-center mt-22 '>

        <div className='w-96  rounded bg-white px-7 py-10 drop-shadow'>
          <form onSubmit={loginHandler}>
            <h4 className='text-2xl mb-7'>Login</h4>

            {/* email here */}
            <input type="text" placeholder='Enter your Email!' autoComplete="off" className='w-full focus:border-blue-600 text-sm bg-transparent border-[1.5px] border-slate-200 px-5 py-3 rounded mb-4 outline-none'

              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />


            <PasswordInput value={password}
              onChange={(e) => { setPassword(e.target.value)  }}
              placeholder={"Enter your Password"}
            />
            {/* Forgot Password Link */}
            <div className='flex justify-end mt-1 mb-2 mr-6'>
              <Link to="/forget-password" title='Forgot Password' className='font-medium text-sm underline  text-blue-600 my-1 hover:text-blue-700 transition-all'>
                Forgot Password?
              </Link>
            </div>

            {/* validation para ! */}
            {error && <p className='text-red-500 text-[13px] pb-1 ml-[8px]'> {error}</p>}

            <button type="submit" className='w-full text-sm border bg-blue-600 text-white p-2 rounded  hover:bg-blue-700 transition-all duration-300 cursor-pointer '

            >Login</button>


            <p className='text-sm text-center mt-4 whitespace-pre-wrap'> Not registered yet?{"      "}
              <Link to="/signup" className="font-medium  underline  text-blue-600 my-1 ">
                Create an Account!
              </Link>


            </p>

          </form>


        </div>
      </div>
    </>
  )


}

