// import Home from './pages/home/home'


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUP from './pages/signUP/SignUP';

import Start from './pages/start/Start';
import Home from "./pages/home/Home";
import { useState } from "react";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/Reset password/ResetPassword";
import ForgetPassword from "./pages/forget password/ForgetPassword";
import UpdateProfile from "./pages/Update Profile/UpdateProfile";


function App() {
 
  const [showToastMsg, setShowToastMsg] = useState({
      isShown: false,
      msg: "",
      type: "add"
    });
  
    const closeToastHandler = () => {
      setShowToastMsg({
        isShown: false,
        msg: "",
        type: "add"
      })
    }
  
    const showToastMsgHandler = (message, type) => {
  
      setShowToastMsg({
        isShown: true,
        msg: message,
        type: type
   
      })
  
  
    }
    console.log(closeToastHandler)


  return (

    
  <Router>

    <Routes>
     <Route path="/" element={<Start/>} />
     <Route path='/dashboard' element={<Home showToastMsgHandler={showToastMsgHandler} showToastMsg={showToastMsg} CloseToastHandler={closeToastHandler}/>} />
     <Route path='/signUp' element={<SignUP showToastMsgHandler={showToastMsgHandler}/>} />
     <Route path='/login' element={<Login showToastMsgHandler={showToastMsgHandler}/>} />
     <Route path='/forget-password' element={<ForgetPassword />} />
     <Route path='/reset-password' element={<ResetPassword  showToastMsgHandler={showToastMsgHandler}/>}/>
     <Route path='/update-profile' element={<UpdateProfile showToastMsgHandler={showToastMsgHandler} showToastMsg={showToastMsg} CloseToastHandler={closeToastHandler}/>} />
      
    </Routes>
    
  </Router>
       
       
   )
}

export default App
