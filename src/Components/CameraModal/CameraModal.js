import React from 'react'
import './CameraModal.scss'
import { FaChevronUp } from 'react-icons/fa'

import WebcamComponent from '../../Components/WebcamComponent/WebcamComponent'

function CameraModal({ isOpen, toggleCameraModal, image, setImage, setCameraUpload }) {
  return (
    <div className={ isOpen ? 'show-camera camera-modal' : 'camera-modal' }>
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
