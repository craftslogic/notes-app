import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/contants';
import PasswordInput from '../../components/input/PasswordInput';

export default function ResetPassword({ showToastMsgHandler }) {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // ForgotPassword page se email receive kar rhy

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!otp) {
            setError("Please enter the OTP sent to your email.");
            return;
        }
        if (!newPassword) {
            setError("Please enter a new password.");
            return;
        }

        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();
            console.log(data)

            if (response.ok && !data.error) {
                showToastMsgHandler("Password reset successfully! Please login.", "add");
                navigate("/login");
            } else {
                setError(data.message || "Invalid OTP or something went wrong.");
            }
        } catch (err) {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <>
            <NavBar />
            <div className='flex items-center justify-center mt-22 drop-shadow'>
                <div className='w-96 rounded bg-white px-7 py-10'>
                    <form onSubmit={handleResetPassword}>
                        <h4 className='text-2xl mb-7'>Reset Password</h4>

                        <p className='text-[13px] text-slate-500 mb-4'>
                            OTP sent to: <b>{email}</b>
                        </p>

                        <input 
                            type="text" 
                            placeholder='Enter 6-digit OTP' 
                            className='w-full focus:border-blue-600 text-sm bg-transparent border-[1.5px] border-slate-200 px-5 py-3 rounded mb-4 outline-none'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <PasswordInput 
                            value={newPassword}
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-[13px] ml-[8px] pb-1'>{error}</p>}

                        <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded my-1 hover:bg-blue-700 transition-all font-medium cursor-pointer'>
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}