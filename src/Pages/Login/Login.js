import React, { useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../../context';
import { useAuth } from '../../Auth'
import './Login.scss'

import LoginMessage from '../../Components/LoginMessage/LoginMessage';

function Login() {
  const { showSignup, setShowSignup, showAlert, loginAlert } = useGlobalContext();
  const { signup, login } = useAuth();

  let history = useHistory();

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useEffect(()=> {
    
    if (emailRef.current.value) {
      emailRef.current.value="";
    }
    if (passwordRef.current.value) {
      passwordRef.current.value="";
    }
    if (showSignup){
      if (fnameRef.current.value) {
        fnameRef.current.value="";
      }
      if (lnameRef.current.value) {
        lnameRef.current.value="";
      }
      if (passwordConfirmRef.current.value) {
        passwordConfirmRef.current.value="";
      }
    }
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Sign up
    if (showSignup){
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return showAlert(true, 'failure', 'Passwords do not match!');
      }
  
      try {
        await signup(emailRef.current.value, passwordRef.current.value);
        showAlert(true,'success','Redirecting...');

        // DEPENDING ON HOW MUCH THE USER HAS COMPLETED:
        // if user has uploaded documents and received verification
          // history.push("/dashboard")
        // if user has uploaded documents and is waiting verification
          // history.push("/pending-review")
        // if use has not yet uploaded documents
          // history.push("/create-profile")

        history.push("/upload-passport");
      } catch(error){
        switch (error.code){
          case ('auth/email-already-in-use') :
            showAlert(true,'failure',error.message);
            break;
          case ('auth/invalid-email') :
            showAlert(true,'failure',error.message);
            break;
          case ('auth/weak-password') :
            showAlert(true,'failure',error.message);
            break;
          default:
            showAlert(true,'failure','Failed to create an account');
            break;
        }
      }

    // Login
    } else {
      try {
        await login(emailRef.current.value, passwordRef.current.value);
        showAlert(true,'success','Redirecting...');
        history.push("/dashboard");
      } catch {
        showAlert(true, 'failure', 'Failed to sign in!')
      }
    }
  }
  const toggleShowSignup = () => {
    setShowSignup(!showSignup);
  }
  return (
    <main>
      <form>
          <div className={showAlert ? "login-alert show-alert" : "login-alert"}>
            {loginAlert.show && <LoginMessage {...loginAlert} removeAlert={showAlert}/>}
          </div>
          {showSignup && (
            <>
            {/* Need to pass in this data to storage */}
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                ref={fnameRef}
                placeholder="First name"
              />
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                ref={lnameRef}
                placeholder="Last name"
              />
            </>
          )}
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            name="login-email"
            ref={emailRef}
            placeholder="Email"
          />
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            name="login-password"
            ref={passwordRef}
            placeholder="Password"
          />
          {showSignup && (
            <>
              <label htmlFor="login-password-confirm">Confirm Password</label>
              <input
                type="password"
                name="login-password-confirm"
                ref={passwordConfirmRef}
                placeholder="Confirm Password"
              />
            </>
          )}
          <button type="submit" onClick={handleSubmit}>
            {showSignup ? 'Continue' : 'Login'}
          </button>
          {showSignup ? 
          <span className="switch-to-login" onClick={() => setShowSignup(false)}>Log in instead</span>
          :
          <span className="switch-to-login" onClick={() => setShowSignup(true)}>Need an account? Sign up</span>}
          <Link to="/" className={showSignup ? 'display-none' : 'forgot-pw'}>Forgot your password?</Link>
      </form>
    </main>
  )
}

export default Login
