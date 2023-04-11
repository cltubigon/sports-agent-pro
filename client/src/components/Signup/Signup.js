import React, { useContext, useState } from "react"
import { AiFillTwitterCircle } from "react-icons/ai"
import {
  FaFacebook,
  FaHeadset,
  FaRunning,
  FaUsers,
  FaCommentDollar,
  FaRegGrinHearts,
  FaUserTie,
} from "react-icons/fa"
import { ThemeContext } from "../../contexts/themeContext"
import { Link, useNavigate } from "react-router-dom"
import "./signup.css"
import axios from "axios"
import { AuthContext } from "../../contexts/AuthContext"

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: null,
    email: null,
    password: null,
  })
  const { loading, error, dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    dispatch({ type: "LOGIN_FAILURE", payload: null })
  }
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    const options = {
      method: "POST",
      url: "http://localhost:8000/api/auth/register",
      headers: { "Content-Type": "application/json" },
      data: {
        username: "spacarlo2b",
        first_name: "Carlo",
        last_name: "Tubigon",
        email: "cltubigonSPA2a@gmail.com",
        phone: "+639167894145",
        password: "Dragonfable12356",
      },
    }

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
        navigate("/")
      })
      .catch(function (error) {
        switch (true) {
          case error.response.data.message.includes("dup key: { username:"):
            dispatch({
              type: "LOGIN_FAILURE",
              payload: "Username already exist",
            })
            break
          case error.response.data.message.includes("dup key: { email:"):
            dispatch({
              type: "LOGIN_FAILURE",
              payload: "Email already exist",
            })
          case error.response.data.message.includes("dup key: { phone:"):
            dispatch({
              type: "LOGIN_FAILURE",
              payload: "Phone already exist",
            })
            break
          default:
            console.log("Member of JLA")
        }
      })
  }

  const typeOfUsers = [
    {
      icon: <FaRunning className="text-3xl icon" />,
      type: "Athelete",
      desc: "Support and manage your athletes.",
      id: 1,
    },
    {
      icon: <FaUsers className="text-3xl icon" />,
      type: "Athlete representative",
      desc: "Support and manage your athletes.",
      id: 2,
    },
    {
      icon: <FaCommentDollar className="text-3xl icon" />,
      type: "Brand",
      desc: "Browse and book athletes to promote your business.",
      id: 3,
    },
    {
      icon: <FaRegGrinHearts className="text-3xl icon" />,
      type: "Fan",
      desc: "Request shoutouts and more from your favorite athletes.",
      id: 4,
    },
    {
      icon: <FaUserTie className="text-3xl icon" />,
      type: "Coach/staff",
      desc: "Share and receive content to engage your audience.",
      id: 5,
    },
  ]
  const [userType, setUserType] = useState(null)
  const [isFirstStep, setIsFirstStep] = useState(true)

  const handleUserTypeClick = (user) => {
    setUserType(user)
  }
  console.log(userType)

  const darkTheme = useContext(ThemeContext) //Theme Styling
  const themeStyles = !darkTheme ? "dark-theme" : "light-theme" // End Theme
  return (
    <div className={"login pt-8 pb-4 max-w-[500px] mx-auto min-h-screen "}>
      <h2 className="text-4xl font-bold mb-6 text-center">Sports Agent Pro</h2>
      <div
        className={
          "login-container px-6 pt-7 pb-9 sm:rounded-lg shadow-sm " +
          themeStyles
        }
      >
        <h2>Select Account Type</h2>
        <div className="">
          <form onSubmit={handleSubmit}>
            {isFirstStep && <div className="step-1">
              {typeOfUsers?.map((user) => {
                return (
                  <div
                    onClick={() => handleUserTypeClick(user.type)}
                    className={
                      userType == user.type
                        ? "flex pt-3 pb-3 my-8 border-[1px] border-[#ccc] cursor-pointer rounded-md selected"
                        : "flex pt-3 pb-3 my-8 border-[1px] border-[#ccc] cursor-pointer rounded-md "
                    }
                    key={user.id}
                  >
                    <div className="flex items-center w-[20%] justify-center text-[#89949F]">
                      {user.icon}
                    </div>
                    <div className="flex flex-col w-[80%]">
                      <p className="text-base font-bold">{user.type}</p>
                      <p className="text-sm font-light">{user.desc}</p>
                    </div>
                  </div>
                )
              })}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsFirstStep(false)
                }}
              >
                Continue
              </button>
            </div>}
            {!isFirstStep && (
              <div className="step-2">
                <div className="flex flex-col p-1">
                  <label htmlFor="email" className="text-sm mb-[6px]">
                    <span className="text-[red]">*</span> Email address
                  </label>
                  <input
                    onChange={handleChange}
                    required
                    type="email"
                    placeholder="email"
                    // value=""
                    name="email"
                    className={
                      darkTheme
                        ? "mb-3 p-2"
                        : "mb-3 p-2 text-[var(--primary-color)]"
                    }
                  />
                </div>
                <div className="flex flex-col p-1">
                  <label htmlFor="password" className="text-sm mb-[6px]">
                    <span className="text-[red]">*</span> Password
                  </label>
                  <input
                    onChange={handleChange}
                    required
                    type="password"
                    placeholder="password"
                    // value=""
                    name="password"
                    className={
                      darkTheme ? "p-2 mb-[20px]" : "p-2 mb-[20px] text-[var(--primary-color)]"
                    }
                  />
                  <label htmlFor="confirm-password" className="text-sm mb-[6px]">
                    <span className="text-[red]">*</span> Confirm Password
                  </label>
                  <input
                    onChange={handleChange}
                    required
                    type="password"
                    placeholder="confirm-password"
                    // value=""
                    name="confirm-password"
                    className={
                      darkTheme ? "p-2 mb-[20px]" : "p-2 mb-[20px] text-[var(--primary-color)]"
                    }
                  />
                </div>
                <p className="flex flex-col justify-center text-sm mt-[19px]">
            I agree to the Opendorse Terms of use and Privacy policy
            </p>  
                <input
                  className="mt-[30px] login-button text-xl bg-slate-600 w-full py-[10px] text-white cursor-pointer"
                  type="submit"
                  value="Signup"
                />
              </div>
            )}
          </form>
          {error && (
            <p className="text-red-600 p-3 text-center text-sm">{error}</p>
          )}
          {loading && (
            <p className="text-green-600 p-3 text-center text-sm">
              Signing in...
            </p>
          )}
          <p className="text-center text-sm mt-[35px] flex justify-center">
            <span>
              <FaHeadset className="mt-[4px] mr-2" />
            </span>
            Contact our support team
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
