import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router'
import './RecordsUpload.scss'
import { FaRegFolderOpen } from 'react-icons/fa'
import { FiCamera } from 'react-icons/fi'

import { storage } from '../../firebase';

const vaccineRecord = process.env.PUBLIC_URL + '/assets/icons/vaccine.svg'

function RecordsUpload() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  let history = useHistory();

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
    // Handle upload
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
        <figure>
          <img src={vaccineRecord} alt="Vaccine receipt"/>
        </figure>
        
        <h3>What is a Vaccination Record?</h3>
        <p>A vaccination record is a government certified document that indicates your vaccination status.</p>
      <form>
        
        <label>Upload Vaccination Record</label>
        <button type="button" onClick={openUploadModal} className="button-2 upload-btn">{imageUploaded ? 'Upload Completed' : 'Upload'}</button>  


        {/* Needs to be a component */}
        <div className={isModalOpen ? "overlay" : "hide-overlay"} onClick={handleOutsideClick}>
          <div className={isModalOpen ? "upload-modal show-modal" : "upload-modal"}>
            <h3>How would you like to upload?</h3>
            <label for="file-upload" className="custom-file-upload" >
              <FaRegFolderOpen/> From library
            </label>

            <input id="file-upload" type="file" onChange={uploadImage}/>
            <button type="button" onClick={takePicture}><FiCamera/> Take picture</button>
            <button type="button" onClick={handleUpload}>Upload</button>
          </div>

        </div>

        {/* temp button */}
        <button type="button" onClick={() => history.push("/upload")} className="upload-btn">Continue</button>
      </form>
    </main>
  )
}

export default RecordsUpload
