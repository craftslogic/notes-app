import React from 'react'
import getUserInitials from '../../utils/userInitials';

export default function ProfileInfo({ onLogOut, userInfo }) {
  console.log(userInfo)


  // const logoutHandler = (e)=>{
  //       e.preventDefault();
  // }

  return (
    // <div>ProfileInfo</div>
    <>
    
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950  font-medium bg-slate-100'>{getUserInitials(userInfo?.username)}</div>
        <div>
          <p className='text-sm font-medium '>{userInfo?.username}</p>
          <button onClick={onLogOut} className='text-sm text-blue-600 underline cursor-pointer '>Logout!</button>
        </div>

      </div>

    </>
  )
}
