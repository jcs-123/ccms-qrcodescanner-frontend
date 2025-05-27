import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr";

function Scanner() {
  const [dataList, setDataList] = useState([]); // All scanned results
  const canvasRef = useRef(null);

  // Camera scan handler
  const handleResult = (result, error) => {
    if (!!result) {
      const text = result?.text || "No result";
      setDataList((prev) => (prev.includes(text) ? prev : [...prev, text]));
    }
  };

  // File upload handler - scans uploaded image for QR code
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = () => {
        // Draw image on hidden canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Get image data for jsQR
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          const text = code.data;
          setDataList((prev) => (prev.includes(text) ? prev : [...prev, text]));
        } else {
          alert("No QR code found in the image.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);

    // Clear file input value so same file can be uploaded again if needed
    e.target.value = null;
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>QR Code Scanner</h2>

      <h3>Camera Scanner</h3>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={handleResult}
        style={{ width: "100%" }}
        scanMode="camera"
      />

      <h3>Upload QR Code Image</h3>
      <input type="file" accept="image/*" onChange={handleFile} />

      {/* Hidden canvas for file upload QR decoding */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <h3>Scanned Data History:</h3>
      <ul>
        {dataList.length === 0 && <li>No QR code scanned yet.</li>}
        {dataList.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Scanner;
