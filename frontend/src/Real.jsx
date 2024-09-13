import React, { useState,useEffect } from 'react'
import App from './App'
import Signup from './Signup'

function Real() {

    const [username,setusername] =useState(undefined)
    


  return (
    <div id="real">
        {username ?  <App username={username} />: <Signup username={username} setusername={setusername} />}

    </div>
  )
}

export default Real