import React, { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
// import "./login.css"
import {
  FaRunning,
} from "react-icons/fa"

const NewLogin = () => {
  const navigate = useNavigate()
  const { register, control, handleSubmit, formState, watch } = useForm()
  const { errors } = formState

  const { email, loading, error, dispatch } = useContext(AuthContext)

  console.log(errors)
  const onSubmit = (data) => {
    dispatch({type: "LOGIN_START"})
    const options = {
        method: 'POST',
        url: 'http://localhost:8000/api/auth/login',
        headers: {'Content-Type': 'application/json'},
        data: {email: data.email, password: data.password}
      };
      
      axios.request(options).then(function (response) {
        console.log(response)
        console.log(data)
        dispatch({type: "LOGIN_SUCCESS", payload: response.data.email})
        setTimeout(()=> navigate("/") ,2000)
      }).catch(function (error) {
        if (error.response.data.status) {
          dispatch({type: "LOGIN_FAILURE", payload: {theError: error.response.data.message, theNotificationMessage: error.response.data.message}})
        }
      });
  }
  console.log(email)
  return (
    <div>
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="input-wrapper">
                    <label htmlFor="email">* Email</label>
                    <input type="email" id="email" {...register("email", {
                        pattern: {
                            value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email"
                        },
                        required: "Email is required"
                    })} />
                    {errors.email && <p className="field-errors">{errors.email?.message}</p>}
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">* Password</label>
                    <input type="password" id="password" {...register("password", {
                        required: "Password is required"
                    })} />
                    {errors.password && <p className="field-errors">{errors.password?.message}</p>}
                </div>
                <button className="mt-[15px]" type="submit">Login</button>
        </form>
      {/* <DevTool control={control} /> */}
    </div>
  )
}

export default NewLogin