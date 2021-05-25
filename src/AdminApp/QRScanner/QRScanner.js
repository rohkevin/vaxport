import React, { useEffect } from 'react'

function QRScanner() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://raw.githubusercontent.com/mebjas/html5-qrcode/master/minified/html5-qrcode.min.js";
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [])

  

  return (
    <div id="reader" width="600px">
      
    </div>
  )
}

export default QRScanner
