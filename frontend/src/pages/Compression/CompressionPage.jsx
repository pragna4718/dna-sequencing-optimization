import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompressionPage = () => {
  const navigate = useNavigate();

  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState(null);

  const handleCompress = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/compress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sequence }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error compressing DNA");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      
      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h1>DNA Compression</h1>

      <input
        type="text"
        placeholder="Enter DNA sequence"
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        style={{ width: "300px", padding: "10px", margin: "10px" }}
      />

      <br />

      <button onClick={handleCompress}>Compress</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Result:</h2>
          <p><b>Original:</b> {result.original}</p>
          <p><b>Compressed:</b> {result.compressed}</p>
          <p><b>Ratio:</b> {result.ratio}</p>
        </div>
      )}
    </div>
  );
};

export default CompressionPage;