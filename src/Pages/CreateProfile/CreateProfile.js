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

  const handleUpload = () => {
    
  }

  return (
    <main>
      <form>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          ref={countryRef}
          placeholder="Example: Canada"
        />
        <label htmlFor="passport-number">Passport Number</label>
        <input
          type="text"
          name="passport-number"
          ref={passportRef}
          placeholder="Example: 12345678"
        />
        <label>Upload Passport</label>
        <button type="button" onClick={handleUpload} className="button-2">Upload</button>
        {/* temp button */}
        <button type="button" onClick={() => history.push("/upload")}>Next</button>
      </form>
    </main>
  )
}

export default CreateProfile
