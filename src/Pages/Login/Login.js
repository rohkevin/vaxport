import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.scss'

function Login() {
  const [showSignup, setShowSignup] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  let history = useHistory();

  useEffect(()=> {
    if (emailRef.current.value) {
      emailRef.current.value="";
    }
    if (passwordRef.current.value) {
      passwordRef.current.value="";
    }
    if (showSignup){
      if (passwordConfirmRef.current.value) {
        passwordConfirmRef.current.value="";
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary routing
    history.push('/upload')
  }
  const toggleShowSignup = () => {
    setShowSignup(!showSignup);
  }
  return (
    <main>
      <form>
        <div className="login-header">
          <p>
            {showSignup ? 'Already have an account?' : 'Need to make an account?'}
          </p>
          <button type="button" onClick={toggleShowSignup}>
            {showSignup ? 'Login' : 'Sign Up'}
          </button>
        </div>
        {showSignup ? <h1>Sign Up</h1> : <h1>Log In</h1>}
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          name="login-email"
          ref={emailRef}
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          name="login-password"
          ref={passwordRef}
        />
        {showSignup && (
          <>
            <label htmlFor="login-password-confirm">Confirm Password</label>
            <input
              type="password"
              name="login-password-confirm"
              ref={passwordConfirmRef}
            />
          </>
        )}
        <button type="submit" onClick={handleSubmit}>
          {showSignup ? 'Register' : 'Login'}
        </button>
        <Link to="/" className={showSignup ? 'display-none' : 'forgot-pw'}>Forgot your password?</Link>
      </form>
    </main>
  )
}

export default Login
