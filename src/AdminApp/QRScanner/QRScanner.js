import React from 'react'
import QrReader from 'react-qr-scanner'

function QRScanner({closeScanner}) {
  const delay = 1000;
  let scanCounter = 0;
  const handleScan = (data) => {
    scanCounter++;
    if (scanCounter > 2000) {
      closeScanner();
      alert('No code found');
      scanCounter = 0;
    }
    if (data) {
      console.log(data.text);
      closeScanner();
      window.location = data.text;
      return null;
    }
  }
  const handleError = (err) => {
    alert(err);
  }
  const previewStyle = {
    height: 300,
    width: window.innerWidth
  }
  return (
    <div>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  )
}

export default QRScanner
