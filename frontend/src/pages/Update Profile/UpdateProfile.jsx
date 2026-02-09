
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/contants';
import NavBar from '../../components/NavBar/NavBar';
import PasswordInput from '../../components/input/PasswordInput';
import ToastMessage from '../../components/ToastMessage/ToastMessage';


export default function UpdateProfile({ showToastMsgHandler , showToastMsg , CloseToastHandler }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
console.log(userInfo)
  const [fullName, setFullName] = useState(userInfo?.username || "");
  const [password, setPassword] = useState(""); // Security ke liye password blank hi dikhana behtar hai
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!fullName) {
      setError("Please enter your name");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ fullName, password })
      });

      const data = await response.json();
      if (response.ok && !data.error) {
        // Local storage update karrhy taake navbar par naam change ho jaye
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        setUserInfo(data.user);
        showToastMsgHandler("Profile updated successfully!", "add");
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Internal server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        <NavBar userInfo={userInfo} isSearchNeeded={false} showSettings={false} />

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[500px] border border-slate-200 rounded-lg p-8 shadow-sm bg-white">
            <h1 className="text-2xl font-bold text-black mb-1">Account Settings</h1>
            <p className="text-slate-400 text-xs mb-8">Manage your profile information and security.</p>

            <div className="space-y-6">
              {/* Name Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  className="w-full text-sm text-black border-b-[1.5px] border-slate-200 py-2 outline-none focus:border-blue-600 transition-all"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Email (Read Only) */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email (Cannot be changed)</label>
                <input
                  type="text"
                  className="w-full text-sm text-black border-b-[1.5px] border-slate-100 py-2 outline-none bg-transparent cursor-not-allowed"
                  value={userInfo?.email}
                  readOnly
                />
              </div>

              {/* Password Input */}
              {/* Password Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Update Password
                </label>
                <PasswordInput placeholder={"Enter New Password"} />
              </div>


              {/* <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ">Update Password</label>
           <PasswordInput placeholder={"Enter New Password"}/> */}

              {error && <p className="text-red-500 text-[11px] mt-2">{error}</p>}

              {/* Buttons Row */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white font-medium py-2.5 rounded hover:bg-blue-700 transition-all text-sm shadow-sm hover:cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-white text-slate-600 border border-slate-200 font-medium py-2.5 rounded hover:bg-slate-50 transition-all text-sm hover:cursor-pointer"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <ToastMessage

        isShown={showToastMsg.isShown}
        message={showToastMsg.msg}
        type={showToastMsg.type}
        onClose={CloseToastHandler}
      />
    </>
  );
}