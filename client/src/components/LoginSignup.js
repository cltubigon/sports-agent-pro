import React, { useState } from 'react'
import NewSignup from './Signup/NewSignup'
import Login from './Login/Login'

const LoginSignup = () => {
    const [toggleLogin, setToggleLogin] = useState(true)
  return (
    <div>
      <NewSignup/>
      <Login/>
      <button onClick={()=> setToggleLogin((prev)=>!prev)}>{toggleLogin ? "Login" : "Signup"}</button>
    </div>
  )
}

export default LoginSignup
