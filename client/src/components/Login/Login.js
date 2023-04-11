import React, { useContext, useState } from "react"
import { AiFillTwitterCircle } from "react-icons/ai"
import { FaFacebook, FaHeadset } from "react-icons/fa"
import { ThemeContext } from "../../contexts/themeContext"
import { Link, useNavigate } from "react-router-dom"
import "./login.css"
import axios from "axios"
import { AuthContext } from "../../contexts/AuthContext"

const Login = () => {
  const [credentials, setCredentials] = useState({
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
      url: "http://localhost:8000/api/auth/login",
      headers: { "Content-Type": "application/json" },
      data: { email: credentials.email, password: credentials.password },
    }

    axios
      .request(options)
      .then((response) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.email })
        console.log(`${response.data.email}, you are now logged in.`)
        navigate("/")
        console.log(response.data)
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: error.response.data.message,
        })
      })
  }

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
        <div className={"flex flex-col gap-2"}>
          <div
            className={
              darkTheme
                ? "flex rounded-lg border-[1px] hover:bg-[#4267b227] text-[#4267B2] border-[#4267B2] py-1 justify-center cursor-pointer"
                : "flex rounded-lg border-[1px] hover:bg-[#4267b227] text-[#fff] border-[#fff] py-1 justify-center cursor-pointer"
            }
          >
            <FaFacebook className="mt-[6px] text-lg" />
            <span className="text-lg ml-2">Log in with Facebok</span>
          </div>
          <div
            className={
              darkTheme
                ? "flex rounded-lg border-[1px] hover:bg-[#4267b227] text-[#1CA1F2] border-[#1CA1F2] py-1 justify-center cursor-pointer"
                : "flex rounded-lg border-[1px] hover:bg-[#4267b227] text-[#fff] border-[#fff] py-1 justify-center cursor-pointer"
            }
          >
            <AiFillTwitterCircle className="mt-[6px] text-lg" />
            <span className="text-lg ml-2">Log in with Twitter</span>
          </div>
        </div>
        <div className="">
          <hr className="border-t-[1px] border-[#D3D8DE] mt-[39px]" />
          <p
            className={
              darkTheme
                ? "-mt-4 bg-[var(--light-color)] w-7 mx-auto text-center mb-[3px]"
                : "-mt-4 bg-[var(--dark-color)] w-7 mx-auto text-center mb-[3px]"
            }
          >
            or
          </p>
          <form onSubmit={handleSubmit}>
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
                  darkTheme ? "p-2" : "p-2 text-[var(--primary-color)]"
                }
              />
            </div>
            <p className="font-bold text-sm mb-[30px]">Forgot password?</p>
            <input
              className="login-button text-xl bg-slate-600 w-full py-[10px] text-white cursor-pointer"
              type="submit"
              value="Login"
            />
          </form>
          {error && (
            <p className="text-red-600 p-3 text-center text-sm">{error}</p>
          )}
          {loading && (
            <p className="text-green-600 p-3 text-center text-sm">
              Signing in...
            </p>
          )}
          <hr className="border-t-[1px] border-[#D3D8DE] mt-[39px]" />
          <p
            className={
              darkTheme
                ? "-mt-4 bg-[var(--light-color)] w-7 mx-auto text-center mb-[3px]"
                : "-mt-4 bg-[var(--dark-color)] w-7 mx-auto text-center mb-[3px]"
            }
          >
            or
          </p>
          <div className="mt-4 flex flex-row gap-3 justify-center">
            <p className="flex flex-col justify-center">
              Don't have an account?
            </p>{" "}
            <button
              className={darkTheme ? "bg-light-important" : "bg-dark-important"}
            >
              <Link to="/signup">Signup</Link>
            </button>
          </div>
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

export default Login
