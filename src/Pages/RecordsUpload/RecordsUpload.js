import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import './RecordsUpload.scss'
import { FaRegFolderOpen } from 'react-icons/fa'
import { FiCamera } from 'react-icons/fi'

import { db, storage } from '../../firebase'
import { useAuth } from '../../Auth'

import CameraModal from '../../Components/CameraModal/CameraModal'

const vaccineRecord = process.env.PUBLIC_URL + '/assets/icons/receipt.svg'

function RecordsUpload() {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [cameraUpload, setCameraUpload] = useState(false);

  const [cameraModal, setCameraModal] = useState(false);

  let history = useHistory();

  const openUploadModal = () => {
    setIsModalOpen(true);
  }
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    if (image && !imageUploaded) {
      // Starting upload
      handleUpload();
    }

  }, [image])

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      // Image selected
      setImage(e.target.files[0]);
    }
  }
  
  const handleUpload = () => {
    if (image){
      var docRef = db.collection("users").doc(currentUser.email);
      let fname, lname, pnumber, childPath;
      let uploadTask;
      docRef.get().then((doc) => {
        fname=doc.data().firstName;
        lname=doc.data().lastName;
        pnumber=doc.data().passportNumber;
        childPath = cameraUpload ? fname + lname + pnumber + '_recordUploadImg' : image.name;
      }).then(() => {
        if (cameraUpload) {
          // remove the first 23 digits "data:image/jpeg;base64,"
          var shortenedBase64 = image.substr(23);
          // provide metadata
          var metadata = {
            contentType: 'image/jpeg'
          }
          uploadTask = storage
            .ref(`images/${childPath}`)
            .putString(shortenedBase64, 'base64', metadata);
        } else {
          // const uploadTask = storage.ref(`images/${childPath}`).put(image);
          uploadTask = storage
            .ref(`images/${childPath}`)
            .put(image);
        }
        uploadTask.on(
          "state_changed",
          snapshot => {
          },
          error => {
            alert(error);
          },
          () => {
            storage
            .ref("images")
            .child(childPath)
            .getDownloadURL()
            .then(url => {
              // Store url to user database
              db.collection("users").doc(currentUser.email).set({
                recordURL: url
              }, { merge: true });
  
              setImage(null);
              setImageUploaded(true);
              setIsModalOpen(false);
            })
          }
        )
      })



    }
  }
  const openCamera = () => {
    setCameraModal(true);
  }
  const toggleCameraModal = () => {
    setCameraModal(!cameraModal);
  }
  const handleContinue = () => {
    db.collection("users").doc(currentUser.email).get().then((doc) => {
      // Route to next path if record exists
      const { recordURL } = doc.data();
      if (recordURL) {
        history.push("/pending-review")
      } else {
        alert('Your upload could not be completed. Please try again or check back later.')
      }
    })
  }

  return (
    <main id="upload-records">
        <figure>
          <img src={vaccineRecord} alt="Vaccine receipt"/>
        </figure>
        <div className="text-wrapper">
          <h3>What is a Vaccination Record?</h3>
          <p>A vaccination record is a government certified document that indicates your vaccination status.</p>
        </div>
        <form>
          
          <label>Upload Vaccination Record</label>
          <button 
            type="button" 
            onClick={openUploadModal} 
            className="button-2 upload-btn" 
            >
            { imageUploaded ? 'Upload Completed!' : 'Upload' }
          </button>  


          {/* Needs to be a component */}
          <div 
            className={isModalOpen ? "overlay" : "hide-overlay"} 
            onClick={handleOutsideClick} 
            >
            <div className={isModalOpen ? "upload-modal show-modal" : "upload-modal"}>
              <h3>How would you like to upload?</h3>

              {/* Option 1: File upload */}
              <label htmlFor="file-upload" className="custom-file-upload" >
                <FaRegFolderOpen/> From library
              </label>
              <input id="file-upload" type="file" onChange={uploadImage}/>

              {/* Option 2: Camera */}
              <button type="button" onClick={openCamera}><FiCamera/> Take picture</button>
              <CameraModal 
                isOpen={cameraModal} 
                toggleCameraModal={toggleCameraModal}
                image={image}
                setImage={setImage}
                setCameraUpload={setCameraUpload}
              />
            </div>

          </div>

          {/* temp button */}
          {/* Validate that user info is there */}
          <button type="button" onClick={handleContinue} className="upload-btn">Continue</button>
        </form>

    </main>
  )
}

export default RecordsUpload
