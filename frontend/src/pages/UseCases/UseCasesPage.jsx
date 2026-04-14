import React from "react";
import { useNavigate } from "react-router-dom";

const UseCasesPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", color: "white" }}>

      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h1>Real World Applications</h1>

      <h3>Healthcare</h3>
      <p>DNA sequencing helps diagnose diseases faster and improves treatment decisions.</p>

      <h3>Drug Discovery</h3>
      <p>Helps identify target genes and accelerate drug development.</p>

      <h3>Agriculture</h3>
      <p>Improves crop quality and resistance using genetic analysis.</p>

      <h3>Genetic Engineering</h3>
      <p>Enables precise gene editing and biotechnology advancements.</p>

    </div>
  );
};

export default UseCasesPage;