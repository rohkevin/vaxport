import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import './WebcamComponent.scss'

import { IoRadioButtonOn } from 'react-icons/io5'

function WebcamComponent({image, setImage, toggleCameraModal, setCameraUpload}) {
  const webcamRef = useRef(null);
  // const [imgSrc, setImgSrc] = useState(null);

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight*0.8,
    facingMode: "user"
  }
  
  const capture = useCallback(() => {
    var imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setCameraUpload(true);
    toggleCameraModal();
  }, [webcamRef, setImage]);

  return (
    <div id="webcam">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={window.innerWidth}
        videoConstraints={videoConstraints}
        mirrored={false}
      />
      <div className="camera-footer">
        <button type="button" onClick={capture} className="capture-button"><IoRadioButtonOn/></button>
      </div>
    </div>
  )
}

export default WebcamComponent
