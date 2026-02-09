import React, { useEffect } from 'react'
import { LuCheck } from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'
export default function ToastMessage({ isShown, message, type, onClose }) {

    console.log(onClose)

    useEffect(() => {
        // Sirf tab timer lagao jab toast dikh raha ho
        if (isShown) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => {
                clearTimeout(timer); // Correct cleanup
            };
        }
    }, [isShown]); // Ab ye sirf tab chalega jab isShown true/false hoga



    return (

        <div className={`absolute top-20 right-7 transition-all duration-300 ${isShown ? 'opacity-100 ' : 'opacity-0'
            } `} >

            <div className={`min-w-52 bg-white border border-slate-200 shadow-2xl rounded-md after:w-1 after:h-full ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} mb-4 after:absolute after:top-0 after:left-0 after:rounded-l-lg `}>

                <div className='flex items-center gap-3 py-2 px-4 '>

                    <div className={`flex items-center justify-center w-9 h-9 rounded-full  ${type === "delete" ? "bg-red-100" : "bg-green-100"}`}>

                        {type === 'delete' ? <MdDeleteOutline className="text-red-500 text-xl" /> :
                            <LuCheck
                                className="text-xl text-green-500"
                            />}

                    </div>
                    <p className='text-sm text-slate-800'>{message}</p>
                </div>
            </div>
        </div >

    )
}
