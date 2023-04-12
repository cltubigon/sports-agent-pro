import React, { useContext } from "react";
import Login from "./components/Login/Login";
import { FaMoon, FaRegSun } from "react-icons/fa";
import { ThemeContext, ThemeUpdateContext } from "./contexts/themeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/Toggle.css";
import Homepage from "./components/Homepage/Homepage";
import NewSignup from "./components/Signup/NewSignup";

function App() {
  const darkTheme = useContext(ThemeContext); //Theme Styling
  const toggleTheme = useContext(ThemeUpdateContext);
  const themeStyles = darkTheme ? "dark-theme" : "light-theme"; // End Theme Styling
  return (
    <Router>
      <div className={"app " + themeStyles}>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<NewSignup />} />
          <Route path='/' element={<Homepage/>}/>
        </Routes>
        <div className="toggle">
          <FaMoon onClick={toggleTheme} className="moon" />{" "}
          <FaRegSun onClick={toggleTheme} className="sun" />
        </div>
      </div>
    </Router>
  );
}

export default App;