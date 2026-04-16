import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MutationPage() {
  const navigate = useNavigate();

  const [seq1, setSeq1] = useState("");
  const [seq2, setSeq2] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/mutation", {
        seq1,
        seq2,
      });
      setResult(res.data);
    } catch (err) {
      alert("Error fetching mutation result");
    }
  };

  const renderAlignment = () => {
    if (!result?.aligned_seq1) return null;

    return (
      <div style={{ marginTop: "20px", background: "white", padding: "20px", color: "black" }}>
        <h3>Alignment:</h3>

        {/* SEQ1 */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {result.aligned_seq1.split("").map((char, i) => {
            const char2 = result.aligned_seq2[i];

            let style = {};
            if (char !== char2) {
              if (char === "-" || char2 === "-") {
                style = { backgroundColor: "#c8f7c5" }; // green = indel
              } else {
                style = { backgroundColor: "#ffb3b3" }; // red = mismatch
              }
            }

            return (
              <span key={i} style={{ padding: "5px", margin: "2px", ...style }}>
                {char}
              </span>
            );
          })}
        </div>

        {/* SEQ2 */}
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
          {result.aligned_seq2.split("").map((char, i) => {
            const char1 = result.aligned_seq1[i];

            let style = {};
            if (char !== char1) {
              if (char === "-" || char1 === "-") {
                style = { backgroundColor: "#c8f7c5" };
              } else {
                style = { backgroundColor: "#ffb3b3" };
              }
            }

            return (
              <span key={i} style={{ padding: "5px", margin: "2px", ...style }}>
                {char}
              </span>
            );
          })}
        </div>

        <p style={{ color: "red", marginTop: "10px" }}>Red = mismatch</p>
        <p style={{ color: "green" }}>Green = insertion/deletion</p>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <button onClick={() => navigate("/")}>← Back</button>

      <h1>DNA Mutation Analysis</h1>

      <input
        placeholder="Original Sequence"
        value={seq1}
        onChange={(e) => setSeq1(e.target.value)}
      />

      <br />

      <input
        placeholder="Target Sequence"
        value={seq2}
        onChange={(e) => setSeq2(e.target.value)}
      />

      <br />

      <button onClick={handleAnalyze}>Analyze Mutation</button>

      {result && (
        <div>
          <h2>Result</h2>
          <p>Distance: {result.distance}</p>
          <p>Similarity: {result.similarity.toFixed(2)}%</p>

          {renderAlignment()}
        </div>
      )}
    </div>
  );
}

export default MutationPage;