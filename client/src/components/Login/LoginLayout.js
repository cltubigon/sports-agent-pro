import { useContext } from 'react'
import NewLogin from './NewLogin'
import "./login.css"
import { AuthContext } from '../../contexts/AuthContext'
import Notification from '../notification/Notification'
import { ThemeContext } from '../../contexts/themeContext'
import { Link } from 'react-router-dom'

const LoginLayout = () => {
    const {notification} = useContext(AuthContext)
    const darkTheme = useContext(ThemeContext);
    console.log("LoginLayout rendered")
  return (
    <div className='container flex-row pb-20'>
        <div>
          <p className='text-3xl'>Sports Agent Pro</p>
          <div className={darkTheme ? 'form-container light-theme' : 'form-container dark-theme'}>
            <NewLogin/>
            <div className='pt-[29px]'>
            <h4 className='text-sm text-center'>Already have an account?
              <Link to="/Signup" className='login-signup-toggle'>Signup</Link></h4>
            </div>
          </div>
        </div>
        {notification && <Notification/>}
    </div>
  )
}

export default LoginLayout