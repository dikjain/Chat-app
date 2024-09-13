import React, { useEffect, useRef, useState } from 'react'

function Signup({username,setusername}) {
    const naamvalue = useRef()



  return (
    <div className='Signup w-screen h-screen bg-[rgba(0,0,0,0.8)] relative flex items-center justify-center'>
     <div id="container" className='w-[40%] overflow-y-scroll h-[70%]  relative p-10  rounded-xl flex flex-col items-center justify-center bg-blue-300'>
        <div className='w-[80%] h-[6%] rounded-xl text-3xl my-5'>Add Username</div>
        <input ref={naamvalue}  className='w-[80%] h-[6%] py-2 px-5 bg-white rounded-xl' type="text"  />
        <button onClick={()=>{setusername(naamvalue.current.value)}} className='w-[80%] h-[6%] py-2 px-5 rounded-xl my-[20px] bg-green-500 text-white'>Submit</button>
     </div>
    </div>
  )
}

export default Signup