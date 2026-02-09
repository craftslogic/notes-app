import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/contants';

export default function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        setError("");

        try {
          
            const response = await fetch(`${API_BASE_URL}forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && !data.error) {
                setError("Check your email for the OTP to reset your password.");
               
                // Email ko state mein bhej rahe hain taake Reset page par kaam aaye
                navigate("/reset-password", { state: { email } });
            } else {
                setError(data.message || "User not found or something went wrong.");
            }
        } catch (err) {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <>
            <NavBar />
            <div className='flex items-center justify-center mt-22 drop-shadow'>
            <div className='w-96  rounded bg-white px-7 py-10 '>
                <form onSubmit={handleForgotPassword}>
                    <h4 className='text-2xl mb-7 '>Forgot Password ?</h4>

                    <input 
                        type="email" 
                        placeholder='Enter your Email' 
                        className='w-full focus:border-blue-600 text-sm bg-transparent border-[1.5px] border-slate-200 px-5 py-3 rounded mb-4 outline-none '
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {error && <p className='text-red-500 text-[13px]  ml-[8px] pb-1'>{error}</p>}

                    <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded my-1 hover:bg-blue-700 transition-all font-medium cursor-pointer'>
                        Send OTP
                    </button>

                    <p className='text-sm text-center mt-4 whitespace-pre-wrap'>
                        Remember your password?{"     "}
                        <span className='font-medium text-blue-600 underline cursor-pointer' onClick={() => navigate("/login")}>
                            Login!
                        </span>
                    </p>
                </form>
            </div>
        </div>

        </>)
}


