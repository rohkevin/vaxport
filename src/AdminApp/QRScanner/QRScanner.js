import React, { useEffect, useState } from 'react'

function QRScanner() {
  const [result, setResult] = useState(null);

  const handleError = (err) => {
    console.log(err);
  }
  const handleScan = (data) => {
    console.log(data);
    // setResult(data);
  }

  return (
    <div>
    
    </div>
  )
}

export default QRScanner
