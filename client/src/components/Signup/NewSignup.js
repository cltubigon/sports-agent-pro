import React, { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import "./signup.css"
import {
  FaRunning,
  FaUsers,
  FaCommentDollar,
  FaRegGrinHearts,
  FaUserTie,
  FaChevronLeft,
} from "react-icons/fa"

const NewSignup = () => {
  const [userType, setUserType] = useState(null)
  const [isFirstStep, setIsFirstStep] = useState(true)
  // const [activateButton, setActivateButton] = useState(true)
  const navigate = useNavigate()
  const { register, control, handleSubmit, formState, watch } = useForm()
  const { errors } = formState

  const { loading, error, dispatch } = useContext(AuthContext)
  const onSubmit = (data) => {
    dispatch({ type: "LOGIN_START" })
    const options = {
      method: "POST",
      url: "http://localhost:8000/api/auth/register",
      headers: { "Content-Type": "application/json" },
      data: {
        username: data.first_name + Math.floor(Math.random() * 1000),
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
        user_type: userType,
        password: data.password,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        navigate("/")
      })

      .catch(function (error) {
        switch (true) {
          case error.response.data.message.includes("dup key: { username:"):
            dispatch({
              type: "LOGIN_FAILURE",
              payload: {theError: "User already exist", theNotificationMessage: "User already exist"}
            })
            break
          case error.response.data.message.includes("dup key: { email:"):
            dispatch({
              type: "LOGIN_FAILURE",
              payload: {theError: "Email already exist", theNotificationMessage: "Email already exist"}
            })
            break
          case error.response.data.message.includes("dup key: { phone:"):
            dispatch({
              type: "LOGIN_FAILURE",
              payload: {theError: "Phone is already used", theNotificationMessage: "Phone is already used"}
            })
            break
          default:
            console.log("Switch Success")
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
  const handleUserTypeClick = (user) => {
    setUserType(user)
  }
  console.log("Signup Form rendered")
  return (
    <div>

        {isFirstStep && 
        <div>
          <h2 className="signupcss-accttype">Select account type</h2>
          {typeOfUsers?.map((user) => {
            return (
              <div
              onClick={() => handleUserTypeClick(user.type)}
              className={
                userType == user.type
                ? "signupcss-account-types selected"
                : "signupcss-account-types"
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
        <button className={!userType ? "signupcss-continue-btn" : ""} onClick={()=> setIsFirstStep((prev)=> !prev)}>Continue</button>
        </div>
        }

      {!isFirstStep && 
      <div>
        <div className="signupcss-form-header">
        <FaChevronLeft onClick={()=> setIsFirstStep((prev)=>!prev)} className="signupcss-cursor-pointer"/>
        </div>
        <h2 className="signupcss-accttype">Create your account</h2>
      <form className="signupcss-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="signupcss-input-wrapper">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            {...register("first_name", {
              required: {
                value: true,
                message: "First name is required",
              },
            })}
          />
          {errors.first_name && <p className="signupcss-field-errors">{errors.first_name.message}</p>}
        </div>

        <div className="signupcss-input-wrapper">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            {...register("last_name", {
              required: {
                value: true,
                message: "Last name is required",
              },
            })}
          />
          {errors.last_name && <p className="signupcss-field-errors">{errors.last_name.message}</p>}
        </div>

        <div className="signupcss-input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email address is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && <p className="signupcss-field-errors">{errors.email.message}</p>}
        </div>

        <div className="signupcss-input-wrapper">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            {...register("phone", {
              required: {
                value: true,
                message: "Phone is required",
              },
            })}
          />
          {errors.phone && <p className="signupcss-field-errors">{errors.phone.message}</p>}
        </div>

        <div className="signupcss-input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Mininum of 8 characters required",
              },
              maxLength: {
                value: 50,
                message: "Only maximum of 50 characters is allowed"
              },
            })}
          />
          {errors.password && <p className="signupcss-field-errors">{errors.password.message}</p>}
        </div>

        <div className="signupcss-input-wrapper">
          <label htmlFor="confirm_password">Confirm password</label>
          <input
            type="password"
            id="confirm_password"
            {...register("confirm_password", {
              validate: (fieldValue) => {
                return fieldValue === watch("password") || "Passwords do not match"
              },
            })}
          />
          {errors.confirm_password && <p className="signupcss-field-errors">{errors.confirm_password.message}</p>}
        </div>
        <button className="mt-[15px]" type="submit">Signup</button>

        <div className="signupcss-gpdr-wrapper">
          <label className="signupcss-gpdr" htmlFor="gpdr_agreement">
            <input
              type="checkbox"
              id="gpdr_agreement"
              {...register("gpdr_agreement", {
                required: "Please agree to the Sports Agent Pro terms and conditions."
              })}
            />
            I agree to the Sports Agent Pro Terms of use and Privacy policy
          </label>
          {errors.gpdr_agreement && <p className="signupcss-gpdr-field-error">{errors.gpdr_agreement.message}</p>}
        </div>

      </form>
      </div>
      }
      
      {/* <DevTool control={control} /> */}
    </div>
  )
}

export default NewSignup