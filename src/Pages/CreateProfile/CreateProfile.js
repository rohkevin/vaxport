import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router'
import './CreateProfile.scss'
import { FaRegFolderOpen } from 'react-icons/fa'
import { FiCamera } from 'react-icons/fi'

function CreateProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openUploadModal = () => {
    setIsModalOpen(true);
  }
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setIsModalOpen(false);
    }
  }
  const uploadImage = () => {

  }
  const takePicture = () => {

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
        <button type="button" onClick={openUploadModal} className="button-2 upload-btn">Upload</button>  


        <div className={isModalOpen ? "overlay" : "hide-overlay"} onClick={handleOutsideClick}>
          <div className={isModalOpen ? "upload-modal show-modal" : "upload-modal"}>
            <h3>How would you like to upload?</h3>
            <label for="file-upload" className="custom-file-upload" onClick={uploadImage}>
              <FaRegFolderOpen/> From library
            </label>
            <input id="file-upload" type="file" />
            <button type="button" onClick={takePicture}><FiCamera/> Take picture</button>
          </div>

        </div>





        {/* temp button */}
        <button type="button" onClick={() => history.push("/upload")} className="upload-btn">Continue</button>
      </form>
    </main>
  )
}

export default CreateProfile
