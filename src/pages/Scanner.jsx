import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function Scanner() {
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);

 const addToList = (text) => {
  // Only update if the new scan is different from the current
  if (dataList[0] !== text) {
    setDataList([text]); // Replace old scan with new
  }
};


  const startScanner = () => {
    const scannerDivId = "qr-scanner";
    const config = {
      fps: 15,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 4 / 3,
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
    };

    const scanner = new Html5Qrcode(scannerDivId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        config,
        (decodedText) => addToList(decodedText),
        (errMsg) => console.warn("Scan error:", errMsg)
      )
      .catch((err) => {
        console.error("Failed to start scanner", err);
        setError("Camera access denied or not available.");
      });
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .then(() => scannerRef.current.clear())
        .catch((err) => console.error("Stop error:", err));
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setError(null);
        startScanner();
      })
      .catch(() => {
        setError("Camera access denied or not available.");
      });

    return () => stopScanner();
  }, []);

  const clearResults = () => {
    setDataList([]);
    setError(null);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "16px" }}>
      <h2 style={{ textAlign: "center" }}>QR Code Live Scanner</h2>

      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{error}</div>
      )}

      <div
        id="qr-scanner"
        style={{
          width: "100%",
          maxWidth: "100%",
          aspectRatio: "4 / 3",
          margin: "auto",
          border: "2px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      />

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={stopScanner} style={{ ...styles.button, backgroundColor: "#6c757d" }}>
          Stop
        </button>
        <button onClick={startScanner} style={styles.button}>
          Restart
        </button>
        <button onClick={clearResults} style={{ ...styles.button, backgroundColor: "#dc3545" }}>
          Clear
        </button>
      </div>

      <h3>Scan Results:</h3>
      {dataList.length === 0 ? (
        <p>No scans yet</p>
      ) : (
        dataList.map((item, idx) => {
          let parsed;
          try {
            parsed = JSON.parse(item);
          } catch (e) {
            return (
              <div key={idx} style={{ color: "red", marginBottom: "10px" }}>
                Invalid JSON: {item}
              </div>
            );
          }

          return (
           <table key={idx} style={styles.animatedTable}>
  <tbody>
    {Object.entries(parsed).map(([key, value]) => (
      <tr key={key} style={styles.animatedRow}>
        <td style={styles.resultKey}>{key}</td>
        <td style={styles.resultValue}>{value}</td>
      </tr>
    ))}
  </tbody>
</table>

          );
        })
      )}
    </div>
  );
}

const styles = {
  button: {
    padding: "8px 16px",
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    margin: "0 5px",
    cursor: "pointer",
  },
  animatedTable: {
    width: "100%",
    marginBottom: "20px",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    animation: "fadeIn 0.5s ease-in-out",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  animatedRow: {
    transition: "background-color 0.3s ease",
  },
  resultKey: {
    fontWeight: "bold",
    border: "1px solid #ccc",
    padding: "12px",
    width: "40%",
    background: "#f1f1f1",
    wordBreak: "break-word",
  },
  resultValue: {
    border: "1px solid #ccc",
    padding: "12px",
    backgroundColor: "#fff",
    wordBreak: "break-word",
  },
};


export default Scanner;
