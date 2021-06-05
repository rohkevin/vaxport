import React, { useEffect, useState } from 'react'
import './CameraModal.scss'
import { FaChevronUp } from 'react-icons/fa'

import WebcamComponent from '../../Components/WebcamComponent/WebcamComponent'

function CameraModal({ isOpen, toggleCameraModal, image, setImage, setCameraUpload }) {
  const [camLocation, setCamLocation] = useState(0);
  useEffect(() => {
    if (window.innerWidth > 500) {
      let camRef = document.getElementById("upload-records");
      let locator = camRef.getBoundingClientRect();
      const {left} = locator;
      setCamLocation(left);
    }
  }, [])
  return (
    <div className={ isOpen ? 'show-camera camera-modal' : 'camera-modal' } style={{left: camLocation}}>
      {isOpen && (
        <>
          <div className="camera-head">
            <button onClick={toggleCameraModal}><FaChevronUp /></button>
          </div>
          <WebcamComponent 
            image={image} 
            setImage={setImage} 
            toggleCameraModal={toggleCameraModal} 
            setCameraUpload={setCameraUpload}
          />
        </>
      )}
      
    </div>
  )
}

export default CameraModal
