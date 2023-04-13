import { useContext } from 'react'
import NewSignup from './NewSignup'
import "./signup.css"
import { AuthContext } from '../../contexts/AuthContext'
import Notification from '../notification/Notification'
import { ThemeContext } from '../../contexts/themeContext'
import { Link } from 'react-router-dom'

const SignupLayout = () => {
    const {notification} = useContext(AuthContext)
    const darkTheme = useContext(ThemeContext);
    console.log("SignupLayout rendered")
  return (
    <div className='signupcss-container flex-row pb-20'>
        <div className='pt-[53px] pb-3 mb-6'><h2 className='text-3xl text-center'>Sports Agent Pro</h2></div>
        <div className={darkTheme ? 'signupcss-form-container light-theme' : 'signupcss-form-container dark-theme'}>
            <NewSignup/>
            <div className='pt-[29px]'>
            <h4 className='text-sm text-center'>Already have an account?
              <Link to="/login" className='signupcss-login-signup-toggle'>Login</Link></h4>
            </div>
        </div>
        {notification && <Notification/>}
    </div>
  )
}

export default SignupLayout