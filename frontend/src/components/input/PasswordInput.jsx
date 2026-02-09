import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"

export default function PasswordInput({ value, onChange, placeholder }) {

    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className='flex items-center bg-transparent border-[1.5px] border-slate-200 px-5 rounded mb-3   focus-within:border-blue-600'>
            <input
             className='w-full text-sm bg-transparent py-3  rounded outline-none '
             placeholder={placeholder} 
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}

               

            />

  {/* toggling of eye icon  */}
            {isShowPassword ? <FaRegEye

              size={22}
              className="text-blue-600 cursor-pointer"
              onClick={toggleShowPassword}
              /> : 
              <FaRegEyeSlash
              size={22}
              className="text-blue-600 cursor-pointer"
              onClick={toggleShowPassword}
              />
              
            }


        </div>
    )
}
