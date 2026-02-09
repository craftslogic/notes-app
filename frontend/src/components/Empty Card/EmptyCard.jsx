import React from 'react'
import NoteTaking from '../../assets/notesPic.png'
export default function EmptyCard({setOpenAddEditModal}) {
    return (
        <>
            <div className='container mx-auto px-14 py-8 flex justify-center  '>
                <div className='w-[50%] h-[50%] '>
                    <div className='flex flex-col items-center justify-center font-bold text-2xl text-blue-700 gap-10 mt-7'>

                        <img src={NoteTaking} alt="Note Taking" className="w-70 h-70 object-contain bg-white" />

                       

                        <button onClick={() => {
                            setOpenAddEditModal({
                                isShown: true,
                                type: "add",
                                data: null
                            })
                        }} className='px-3 h-16 flex items-center justify-center rounded-2xl cursor-pointer bg-blue-200 border  '>
                            Create your First Note!
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}
