import React, { useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../../context';
import { useAuth } from '../../Auth'
import { db } from '../../firebase';
import './Login.scss';
import { generateUID } from '../../Utils/generateUID';

import LoginMessage from '../../Components/LoginMessage/LoginMessage';

function Login() {
  const { showSignup, setShowSignup, showAlert, loginAlert, users } = useGlobalContext();
  const { signup, login } = useAuth();
  const [user, setUser] = useState(null);

  let history = useHistory();

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useEffect(()=> {
    // Clear fields
    showAlert(false, '', '');
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

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.email).set(user)
      .catch(function(error){
        alert('Error: user could not be added')
      })
    }
  }, [user])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Sign up
    if (showSignup){
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return showAlert(true, 'failure', 'Passwords do not match!');
      }
      // Check if all fields exist
      if (!fnameRef.current.value || !lnameRef.current.value || !emailRef.current.value || !passwordRef.current.value || !passwordConfirmRef.current.value ) {
        return showAlert(true, 'failure', 'Missing fields')
      }
  
      try {
        await signup(emailRef.current.value, passwordRef.current.value);
        const newID = fnameRef.current.value + lnameRef.current.value + generateUID();
        // Add to database
        const newUser = {
          id: newID,
          email: emailRef.current.value,
          firstName: fnameRef.current.value,
          lastName: lnameRef.current.value,
        }
        setUser(newUser);

        showAlert(true,'success','Redirecting...');
        
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

        var nextPath = "/"
        // Check login data against database
        if (users){
          const oldUser = users.find((user) => user.email === emailRef.current.value);
          if ("adminAccess" in oldUser) {
            nextPath="/certified"
          } else 
          if (!("nationality" in oldUser) || !("passportNumber" in oldUser)) {
            nextPath = "/upload-passport";
          } else 
          if (!("recordURL" in oldUser)) {
            nextPath = "/upload-records";
          } else
          // If not verified by the government yet
          if (!("governmentVerified" in oldUser)) {
            nextPath = "/pending-review"
          } else {
            nextPath = "/dashboard";
          }
        }
        showAlert(true,'success','Redirecting...');
        history.push(nextPath)
      } catch {
        showAlert(true, 'failure', 'Failed to sign in!')
      }
    }
  }

  return (
    <main id="login-page">
      <form>
        <div className={showAlert ? "login-alert show-alert" : "login-alert"}>
          {loginAlert.show && <LoginMessage {...loginAlert} removeAlert={showAlert}/>}
        </div>
        {showSignup && (
          <>
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
          {showSignup ? 'Continue' : 'Sign In'}
        </button>
        {showSignup ? 
        <button type="button" className="switch-to-login button-2" onClick={() => setShowSignup(false)}>Log in instead</button>
        :
        <button type="button" className="switch-to-login button-2" onClick={() => setShowSignup(true)}>Need an account? Sign up</button>}
        <Link to="/" className={showSignup ? 'display-none' : 'forgot-pw button-2'}>Forgot your password?</Link>
      </form>
    </main>
  )
}

export default Login
