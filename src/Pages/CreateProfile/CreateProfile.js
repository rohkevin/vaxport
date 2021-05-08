import React, {useEffect, useRef} from 'react'
import { useHistory } from 'react-router';

function CreateProfile() {

  let history = useHistory();

  const countryRef = useRef();
  const passportRef = useRef();

  useEffect(()=> {
    if (countryRef.current.value) {
      countryRef.current.value="";
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
      <form>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          ref={countryRef}
        />
        <label htmlFor="passport-number">Passport Number</label>
        <input
          type="text"
          name="passport-number"
          ref={passportRef}
        />
        <button type="submit" onClick={handleSubmit}>Continue</button>
      </form>
    </main>
  )
}

export default CreateProfile
