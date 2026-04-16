import React from "react";

// Statistics component (top)
const Statistics = ({ distance, similarity }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "64px",
        marginBottom: "32px",
        paddingBottom: "24px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {distance !== undefined && (
        <div>
          <div style={{ fontSize: "13px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "2px" }}>
            Distance
          </div>
          <div style={{ fontSize: "56px", fontWeight: "700", color: "#ffffff", marginTop: "12px" }}>
            {distance}
          </div>
        </div>
      )}

      {similarity !== undefined && (
        <div>
          <div style={{ fontSize: "13px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "2px" }}>
            Similarity
          </div>
          <div style={{ fontSize: "56px", fontWeight: "700", color: "#ffffff", marginTop: "12px" }}>
            {typeof similarity === "number" ? similarity.toFixed(1) : similarity}%
          </div>
        </div>
      )}
    </div>
  );
};

// Nucleotide position with styling
const BasePosition = ({ char, isMismatch, isIndel }) => {
  let backgroundColor = "transparent";
  let borderColor = "transparent";

  if (isMismatch) {
    backgroundColor = "#ffb3b3"; // Light red for mismatches
    borderColor = "#ff6b6b";
  } else if (isIndel) {
    backgroundColor = "#c8f7c5"; // Light green for indels
    borderColor = "#51cf66";
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "42px",
        height: "42px",
        backgroundColor,
        border: `2px solid ${borderColor}`,
        fontWeight: "700",
        fontSize: "16px",
        fontFamily: "monospace",
        color: "#000",
        marginRight: "16px",
        marginBottom: "8px",
        borderRadius: "4px",
        flexShrink: 0,
      }}
    >
      {char}
    </div>
  );
};

// Alignment visualization
const AlignmentSection = ({ seq1, seq2 }) => {
  return (
    <div style={{ marginTop: "32px", marginBottom: "32px" }}>
      <h3 style={{ color: "#aaa", fontSize: "14px", fontWeight: "600", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
        Alignment:
      </h3>

      <div
        style={{
          position: "relative",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "6px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Sequence 1 */}
        <div style={{ marginBottom: "80px", display: "flex", flexWrap: "wrap" }}>
          {seq1.split("").map((char, i) => {
            const c2 = seq2[i];
            const isMismatch = char !== c2 && char !== "-" && c2 !== "-";
            const isIndel = char === "-" || c2 === "-";

            return (
              <BasePosition
                key={`seq1-${i}`}
                char={char}
                isMismatch={isMismatch}
                isIndel={isIndel}
              />
            );
          })}
        </div>

        {/* Connector lines (pseudo-element via SVG) */}
        <svg
          style={{
            position: "absolute",
            left: "20px",
            top: "60px",
            width: "1000px",
            height: "80px",
            pointerEvents: "none",
          }}
        >
          {seq1.split("").map((char, i) => {
            const xOffset = i * 58 + 21;
            return (
              <line
                key={`connector-${i}`}
                x1={xOffset}
                y1="0"
                x2={xOffset}
                y2="80"
                stroke="#4a90e2"
                strokeWidth="1.5"
                strokeDasharray="2,4"
              />
            );
          })}
        </svg>

        {/* Sequence 2 */}
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {seq2.split("").map((char, i) => {
            const c1 = seq1[i];
            const isMismatch = char !== c1 && char !== "-" && c1 !== "-";
            const isIndel = char === "-" || c1 === "-";

            return (
              <BasePosition
                key={`seq2-${i}`}
                char={char}
                isMismatch={isMismatch}
                isIndel={isIndel}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Legend component
const Legend = () => {
  return (
    <div
      style={{
        marginTop: "32px",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "6px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {/* Red mismatch */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#ffb3b3",
              borderRadius: "3px",
              border: "2px solid #ff6b6b",
            }}
          />
          <span style={{ fontSize: "13px", color: "#aaa", fontWeight: "500" }}>
            mismatches
          </span>
        </div>

        {/* Green indel */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#c8f7c5",
              borderRadius: "3px",
              border: "2px solid #51cf66",
            }}
          />
          <span style={{ fontSize: "13px", color: "#aaa", fontWeight: "500" }}>
            indels
          </span>
        </div>
      </div>
    </div>
  );
};

// Main Result component
function Result({ result }) {
  if (!result) return null;

  return (
    <div
      style={{
        background: "transparent",
        padding: "40px",
        color: "#ffffff",
      }}
    >
      {/* Statistics */}
      {(result.distance !== undefined || result.similarity !== undefined) && (
        <Statistics distance={result.distance} similarity={result.similarity} />
      )}

      {/* Alignment visualization */}
      {result.aligned_seq1 && result.aligned_seq2 && (
        <AlignmentSection seq1={result.aligned_seq1} seq2={result.aligned_seq2} />
      )}

      {/* Legend */}
      <Legend />
    </div>
  );
}

export default Result;