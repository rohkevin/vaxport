import React, {useEffect, useRef} from 'react'
import { useHistory } from 'react-router';

function CreateProfile() {

  let history = useHistory();

  const nameRef = useRef();
  const passportRef = useRef();

  useEffect(()=> {
    if (nameRef.current.value) {
      nameRef.current.value="";
    }
    if (passportRef.current.value) {
      passportRef.current.value="";
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary reroute
    history.push("/upload")
  }

  return (
    <main>
      <h1>Profile</h1>
      <form>
        <label htmlFor="username">Legal Name</label>
        <input
          type="text"
          name="username"
          ref={nameRef}
        />
        <label htmlFor="passport-number">Passport Number</label>
        <input
          type="text"
          name="passport-number"
          ref={passportRef}
        />
        <button type="submit" onClick={handleSubmit}>Complete</button>
      </form>
    </main>
  )
}

export default CreateProfile
