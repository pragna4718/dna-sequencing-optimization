import React from "react";

function Result({ result }) {
  if (!result) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Result:</h3>

      <p><b>Distance:</b> {result.distance}</p>
      <p><b>Similarity:</b> {result.similarity}</p>

      <h4>Operations:</h4>
      <ul>
        {result.operations &&
          result.operations.map((op, index) => (
            <li key={index}>{JSON.stringify(op)}</li>
          ))}
      </ul>
    </div>
  );
}

export default Result;