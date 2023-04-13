import { Link } from "react-router-dom"
import "./Homepage.css"

const Homepage = () => {
  return (
    <div className="container">
      <h2>Homepage</h2>
      <button><Link to="/login">Login</Link></button>
    </div>
  )
}

export default Homepage
