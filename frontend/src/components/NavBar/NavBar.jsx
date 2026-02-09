import React, { useEffect, useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';



export default function NavBar({ userInfo, searchHandler, isSearchNeeded, showSettings = true }) {
    

     const [query, setQuery] = useState("")

   
    useEffect(() => {
     
        const delayDebounceFn = setTimeout(() => {
            
            searchHandler?.(query);
        }, 250); 

        
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    

    const onClearSearch = ()=>{
        setQuery("");
       
        
    }

    const navigate = useNavigate();

    const onLogOut = ()=>{
        localStorage.clear();
        navigate("/login")



    }

    const onChange = (e)=>{
        setQuery(e.target.value);
        
    }

    return (
        <div className="bg-white flex items-center justify-between px-[36px] py-[6px] gap-2 drop-shadow sticky top-0 w-full z-100"> 
            <h1 className='text-[27px] font-bold text-blue-600 py-2'>
                Notes! 
            </h1>

            {(userInfo && isSearchNeeded) && (
                <SearchBar 
                    value={query}
                    onChange={onChange}
                    onClearSearch={onClearSearch}
                />
            )}

            {userInfo && (
                <div className="flex items-center gap-5">
                    {/* VIP Logic: Sirf tab dikhao jab showSettings true ho */}
                    {showSettings && (
                        <button 
                            onClick={() => navigate("/update-profile")}
                            className="text-[13px] font-semibold text-black bg-slate-100 px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 border border-blue-100 active:scale-95"
                        >
                            Settings
                        </button>
                    )}
                    
                    <ProfileInfo userInfo={userInfo} onLogOut={onLogOut}/>
                </div>
            )}
        </div>
    )
}