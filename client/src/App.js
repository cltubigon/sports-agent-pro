import React, { useContext } from "react";
import Login from "./components/Login/Login";
import { FaMoon, FaRegSun } from "react-icons/fa";
import { ThemeContext, ThemeUpdateContext } from "./contexts/themeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/Toggle.css";
import Test from "./components/Test/Test";
import Homepage from "./components/Homepage/Homepage";
import Signup from "./components/Signup/Signup";

function App() {
  const darkTheme = useContext(ThemeContext); //Theme Styling
  const toggleTheme = useContext(ThemeUpdateContext);
  const themeStyles = darkTheme ? "dark-theme" : "light-theme"; // End Theme Styling
  return (
    <Router>
      <div className={"app " + themeStyles}>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup />} />
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


// import React, { useContext } from "react"
// import Login from "./components/Login/Login"
// import { FaMoon, FaRegSun } from "react-icons/fa"
// import { ThemeContext, ThemeUpdateContext } from "./contexts/themeContext"
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import "./assets/Toggle.css"
// import Test from "./components/Test/Test"

// function App() {
//   const darkTheme = useContext(ThemeContext) //Theme Styling
//   const toggleTheme = useContext(ThemeUpdateContext)
//   const themeStyles = darkTheme ? "dark-theme" : "light-theme" // End Theme Styling
//   return (
//     <Router>
//       <div className={"app " + themeStyles}>
//         <Switch>
//           <Route exact path="/">
//             <Login />
//           </Route>
//         </Switch>
//         <div className="toggle">
//           <FaMoon onClick={toggleTheme} className="moon" />{" "}
//           <FaRegSun onClick={toggleTheme} className="sun" />
//         </div>
//       </div>
//     </Router>
//   )
// }

// export default App
