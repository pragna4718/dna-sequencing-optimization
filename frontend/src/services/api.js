const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const translateDNA = async (sequence) => {
  const response = await fetch(`${API_BASE_URL}/dna/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sequence }),
  });

  return await response.json();
};


// ✅ MUTATION API
export const runMutation = async (seq1, seq2) => {
  const response = await fetch(`${API_BASE_URL}/mutation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      seq1: seq1,
      seq2: seq2,
    }),
  });

  if (!response.ok) {
    throw new Error("Mutation failed");
  }

  return await response.json();
};
// ✅ COMPRESSION API
export const runCompression = async (sequence) => {
  const response = await fetch("http://localhost:8000/compress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sequence: sequence,
    }),
  });

  if (!response.ok) {
    throw new Error("Compression failed");
  }

  return await response.json();
};