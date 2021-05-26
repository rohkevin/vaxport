import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context';
import { FiCheck } from 'react-icons/fi'
import './ProgressBar.scss'

const ProgressBar = () => {
	const [style, setStyle] = useState({});
  const { progress, progressCheck } = useGlobalContext();

  useEffect(() => {
    const newStyle = {
      width: `${progress}%`,
      opacity: 1
    }
    setStyle(newStyle);

  }, [progress])
	
	return (
    <div className="progress-container">
      <div className="checkpoints">
        {
          progressCheck.map((checkpoint) => {
            const { checkpointName, status } = checkpoint
            return (
              <div key={checkpointName} className="checkpoint">
                <p className="checkpoint-label">{checkpointName}</p>
                <div className="checkpoint-value" style={status ? {backgroundColor: 'var(--primary-main)'} : {backgroundColor: '#fff'}}>
                  {
                    status && <FiCheck />
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="progress">
        <div className="progress-done" style={style}></div>
      </div>
    </div>
	)
}

export default ProgressBar
