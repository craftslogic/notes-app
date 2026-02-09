import React from 'react'


import { FaMagnifyingGlass } from 'react-icons/fa6'


import { IoMdClose } from 'react-icons/io'




export default function SearchBar({value , onChange ,  onClearSearch }) {
  

  return (

    // <div>SearchBar is here</div>
    <div className='w-80 flex items-center justify-between  px-[12px] bg-slate-100 rounded-[8px]'>
    <input
     type="text"
     placeholder='Search notes!'
     value={value}
     className='w-full text-[14.5px] bg-transparent py-[11px] outline-none '
     onChange={onChange}
     

     
    />

{

value && (
  <IoMdClose className="text-xl text-slate-400 cursor-pointer hover:text-black mr-3"
  onClick={onClearSearch}/>

)}
    

    <FaMagnifyingGlass 
    className="cursor-pointer text-slate-400 hover:text-black"
    


    />

    </div>
  )
}
