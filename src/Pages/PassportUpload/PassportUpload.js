import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router'
import './PassportUpload.scss'
import { db } from '../../firebase';
import { useAuth } from '../../Auth';
import { useGlobalContext } from '../../context';

import CountriesDropdown from '../../Components/CountriesDropdown/CountriesDropdown'

function PassportUpload() {
  const { currentUser } = useAuth();
  const { updateProgressCheck } = useGlobalContext();
  const [country, setCountry] = useState(null);

  let history = useHistory();

  const passportRef = useRef();

  useEffect(()=> {
    if (passportRef.current.value) {
      passportRef.current.value="";
    }
  }, [])

  const handleUpload = (e) => {
    e.preventDefault();
    // Add passport nationality and number to current user's database
    if (!country || passportRef.current.value === "") {
      // Change this to error message
      alert('fill out required fields')
    } else {
      if (currentUser) {
        db.collection("users").doc(currentUser.email).set({
          nationality: country,
          passportNumber: passportRef.current.value
        }, { merge: true })

        // Update progress bar
        updateProgressCheck('passport');



        history.push("/upload-records");
      };

    }
    
  }
  return (
    <main id="upload-passport" >
      <form autoComplete="off">
        <label htmlFor="country">Country</label>
        <CountriesDropdown setCountry={setCountry}/>
        <label htmlFor="passport-number">Passport Number</label>
        <input
          type="text"
          name="passport-number"
          ref={passportRef}
          placeholder="Example: 12345678"
        />

        {/* temp button */}
        <button type="submit" onClick={handleUpload} className="upload-btn">Continue</button>
      </form>
    </main>
  )
}

export default PassportUpload
