import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// YOUR WORKING PAGES
import MutationPage from "./pages/Mutation/MutationPage";
import CompressionPage from "./pages/Compression/CompressionPage";
import UseCasesPage from "./pages/UseCases/UseCasesPage";

// ❌ TEMPORARILY COMMENT FRIEND PAGES (avoid errors)
// import AlignmentPage from "./pages/Alignment/AlignmentPage";
// import CodonTablePage from "./pages/CodonTable/CodonTablePage";
// import TranslationPage from "./pages/Translation/TranslationPage";

const Home = () => {
  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>DNA Sequencing Optimization</h1>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => window.location.href = "/mutation"}>
          Mutation
        </button>

        <button onClick={() => window.location.href = "/compression"}>
          Compression
        </button>

        <button onClick={() => window.location.href = "/usecases"}>
          Real World Applications
        </button>

        {/* 👇 FRIEND MODULES (DISABLED TEMPORARILY) */}
        {/* 
        <button onClick={() => window.location.href = "/alignment"}>Alignment</button>
        <button onClick={() => window.location.href = "/codon"}>Codon Table</button>
        <button onClick={() => window.location.href = "/translation"}>Translation</button>
        */}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* YOUR WORK */}
        <Route path="/mutation" element={<MutationPage />} />
        <Route path="/compression" element={<CompressionPage />} />
        <Route path="/usecases" element={<UseCasesPage />} />

        {/* ❌ COMMENTED ROUTES */}
        {/*
        <Route path="/alignment" element={<AlignmentPage />} />
        <Route path="/codon" element={<CodonTablePage />} />
        <Route path="/translation" element={<TranslationPage />} />
        */}

      </Routes>
    </Router>
  );
}

export default App;