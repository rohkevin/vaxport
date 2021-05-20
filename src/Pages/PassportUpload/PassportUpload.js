import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router'
import './PassportUpload.scss'
import { FaRegFolderOpen } from 'react-icons/fa'
import { FiCamera } from 'react-icons/fi'

import { storage } from '../../firebase';

function PassportUpload() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

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
  const uploadImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    if (image) {
      handleUpload();
    }
  }
  const handleUpload = () => {
    if (image){
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
        },
        error => {
          console.log(error);
        },
        () => {
          storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            setImageUploaded(true);
            setIsModalOpen(false);
          })
        }
      )

    }
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
        <label>Upload</label>
        <button type="button" onClick={openUploadModal} className="button-2 upload-btn">{imageUploaded ? 'Upload Completed' : 'Upload'}</button>  


        <div className={isModalOpen ? "overlay" : "hide-overlay"} onClick={handleOutsideClick}>
          <div className={isModalOpen ? "upload-modal show-modal" : "upload-modal"}>
            <h3>How would you like to upload?</h3>
            <label htmlFor="file-upload" className="custom-file-upload" >
              <FaRegFolderOpen/> From library
            </label>
            <input id="file-upload" type="file" onChange={uploadImage}/>
            <button type="button" onClick={takePicture}><FiCamera/> Take picture</button>
          </div>

        </div>





        {/* temp button */}
        <button type="button" onClick={() => history.push("/upload-records")} className="upload-btn">Continue</button>
      </form>
    </main>
  )
}

export default PassportUpload
