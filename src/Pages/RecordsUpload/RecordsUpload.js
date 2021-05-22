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
      alert('starting upload')
      handleUpload();
    }

  }, [image])

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      alert('image selected');
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
        console.log(doc.data());
        console.log(fname, lname, pnumber);
        childPath = cameraUpload ? fname + lname + pnumber + '_recordUploadImg' : image.name;
      }).then(() => {
        console.log(childPath);
        if (cameraUpload) {
          // remove the first 23 digits "data:image/jpeg;base64,"
          var shortenedBase64 = image.substr(23);
          uploadTask = storage
            .ref(`images/${childPath}`)
            .putString(shortenedBase64, 'base64')
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
            console.log(error);
          },
          () => {
            storage
            .ref("images")
            // .child(image.name)
            .child(childPath)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              
              // Store url to user database
              db.collection("users").doc(currentUser.email).set({
                recordURL: url
              }, { merge: true });
  
              
              alert('image uploaded');
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
          <button type="button" onClick={openUploadModal} className="button-2 upload-btn">{imageUploaded ? 'Upload Completed' : 'Upload'}</button>  


          {/* Needs to be a component */}
          <div className={isModalOpen ? "overlay" : "hide-overlay"} onClick={handleOutsideClick}>
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
          <button type="button" onClick={() => history.push("/pending-review")} className="upload-btn">Continue</button>
        </form>

    </main>
  )
}

export default RecordsUpload
