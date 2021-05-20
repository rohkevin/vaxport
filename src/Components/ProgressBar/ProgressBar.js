import React, { useState } from 'react'
import './ProgressBar.scss'

const ProgressBar = ({done}) => {
	const [style, setStyle] = useState({});
	
	// setTimeout(() => {
	// 	const newStyle = {
	// 		opacity: 1,
	// 		width: `${done}%`
	// 	}
		
	// 	setStyle(newStyle);
  //   console.log('progressbar');
	// }, 2000);
	
	return (
		<div className="progress">
			<div className="progress-done" style={style}></div>
		</div>
	)
}

export default ProgressBar
