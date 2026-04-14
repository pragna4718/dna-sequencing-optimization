import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MutationPage = () => {
  const navigate = useNavigate();

  const [seq1, setSeq1] = useState("");
  const [seq2, setSeq2] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/mutation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seq1: seq1,
          seq2: seq2,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Failed to fetch mutation result");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      
      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h1>🧬 DNA Mutation Analysis</h1>

      <input
        placeholder="Original Sequence"
        value={seq1}
        onChange={(e) => setSeq1(e.target.value)}
        style={{ display: "block", margin: "10px", padding: "10px", width: "300px" }}
      />

      <input
        placeholder="Target Sequence"
        value={seq2}
        onChange={(e) => setSeq2(e.target.value)}
        style={{ display: "block", margin: "10px", padding: "10px", width: "300px" }}
      />

      <button onClick={handleAnalyze}>Analyze Mutation</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Result:</h2>
          <p><b>Distance:</b> {result.distance}</p>
          <p><b>Similarity:</b> {result.similarity}</p>

          <h3>Operations:</h3>
          <ul>
            {result.operations.map((op, index) => (
              <li key={index}>{JSON.stringify(op)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MutationPage;