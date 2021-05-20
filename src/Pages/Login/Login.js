import React, { useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../../context';
import { useAuth } from '../../Auth'
import './Login.scss'

import LoginMessage from '../../Components/LoginMessage/LoginMessage';
import { db } from '../../firebase';

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
      .then(function(docRef) {
        alert('User added successfully')
        // Clear fields
      })
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
  
      try {
        await signup(emailRef.current.value, passwordRef.current.value);
        // Add to database
        const newUser = {
          id: emailRef.current.value,
          email: emailRef.current.value,
          firstName: fnameRef.current.value,
          lastName: lnameRef.current.value,
          password: passwordRef.current.value,
        }
        console.log(newUser);
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

        const nextPath = "/"
        // Check login data against database
        if (users){
          const oldUser = users.find((user) => user.email === emailRef.current.value);
          console.log(oldUser);
          if (!("nationality" in oldUser) || !("passportNumber" in oldUser)) {
            console.log("registration incomplete");
            // history.push("/upload-passport")
          } else 
          if (!("recordURL" in oldUser)) {
            console.log("missing records");
            // history.push("/upload-records")
          } else
          // If not verified by the government yet
          if (!("governmentVerified" in oldUser) || !oldUser.governmentVerified) {
            // history.push("/pending-review")
            console.log("pending review")
          } else {
            console.log("everything's there")
            // history.push("/dashboard")
          }
        }
        showAlert(true,'success','Redirecting...');
        
      } catch {
        showAlert(true, 'failure', 'Failed to sign in!')
      }
    }
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
