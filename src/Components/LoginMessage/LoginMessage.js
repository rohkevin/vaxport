import React, { useEffect } from 'react'

function LoginMessage({ type, msg, removeAlert }) {
  useEffect(()=>{
    const timer = setTimeout(()=> {
      removeAlert();
    },2000);
    return () => clearTimeout(timer);
  },[]);

  return (
    <p className={`message alert-${type}`}>{msg}</p>
  )
}

export default LoginMessage;
