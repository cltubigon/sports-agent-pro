import React, { useContext } from "react"
import { useState, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import "./notification.css"

const Notification = () => {
  const { notification, notificationMessage, error, dispatch } = useContext(AuthContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "NOTIFICATION_DISPLAYED" })
    }, 3000) // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer)
  }, [notification])
  return (
    <>
      {notification && (
          <div className={error ? "red-notification" : "green-notification"}>
            <h2 className="text-2xl text-white">{notificationMessage}</h2>
            <p onClick={()=> dispatch({type: "NOTIFICATION_DISPLAYED"})} className="text-[var(--primary-color)] z-999 bg-white w-5 h-5 rounded-[100px] shadow-md flex justify-center items-center absolute top-3 right-5 cursor-pointer text-sm">
              X
            </p>
          </div>
      )}
    </>
  )
}

export default Notification
