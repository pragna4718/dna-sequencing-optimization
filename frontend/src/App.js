import { useState } from "react";
import "./App.css";
import { translateDNA, runMutation, runCompression, runOptimize } from "./services/api";

// ─── Menu Drawer ─────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { label: "Optimizer", icon: "⚙️" },
  { label: "DNA Sequence to Amino Acids", icon: "🧬" },
  { label: "DNA Compression", icon: "📦" },
  { label: "DNA Mutation", icon: "🔬" },
  { label: "DAA Concept Explanation", icon: "📚" },
  { label: "DNA Codon–Amino Acid Table", icon: "📋" },
  { label: "Real World Applications", icon: "🌍" },
];

function MenuDrawer({ open, onClose, onNavigate }) {
  return (
    <>
      <div
        className={`drawer-backdrop${open ? " open" : ""}`}
        onClick={onClose}
        role="presentation"
      />
      <div className={`drawer-panel${open ? " open" : ""}`}>
        <div className="drawer-header">
          <span className="drawer-eyebrow">Navigation</span>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className="drawer-rule" />
        <nav className="drawer-nav">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.label}
              className="drawer-item"
              onClick={() => {
                onClose();
                onNavigate(item.label);
              }}
            >
              <span className="di-icon">{item.icon}</span>
              <span className="di-label">{item.label}</span>
              <span className="di-arrow">→</span>
            </button>
          ))}
        </nav>
        <div className="drawer-footer">DNA Sequencing Optimization</div>
      </div>
    </>
  );
}

// ─── Codon–Amino Acid Table Page ──────────────────────────────────────────────
const CODON_DATA = [
  { codons: "TTT, TTC", amino: "Phenylalanine", structure: "H2N—CH(CH₂-C₆H₅)—COOH" },
  { codons: "TTA, TTG, CTT, CTC, CTA, CTG", amino: "Leucine", structure: "H2N—CH(CH₂-CH(CH₃)₂)—COOH" },
  { codons: "ATT, ATC, ATA", amino: "Isoleucine", structure: "H2N—CH(CH(CH₃)-CH₂-CH₃)—COOH" },
  { codons: "ATG", amino: "Methionine (Start)", structure: "H2N—CH(CH₂-CH₂-S-CH₃)—COOH" },
  { codons: "GTT, GTC, GTA, GTG", amino: "Valine", structure: "H2N—CH(CH(CH₃)₂)—COOH" },
  { codons: "TCT, TCC, TCA, TCG, AGT, AGC", amino: "Serine", structure: "H2N—CH(CH₂OH)—COOH" },
  { codons: "CCT, CCC, CCA, CCG", amino: "Proline", structure: "NH—(CH₂)₃—CH—COOH" },
  { codons: "ACT, ACC, ACA, ACG", amino: "Threonine", structure: "H2N—CH(CH(OH)-CH₃)—COOH" },
  { codons: "GCT, GCC, GCA, GCG", amino: "Alanine", structure: "H2N—CH(CH₃)—COOH" },
  { codons: "TAT, TAC", amino: "Tyrosine", structure: "H2N—CH(CH₂-C₆H₄-OH)—COOH" },
  { codons: "TAA, TAG, TGA", amino: "STOP", structure: "—" },
  { codons: "CAT, CAC", amino: "Histidine", structure: "H2N—CH(CH₂-imidazole)—COOH" },
  { codons: "CAA, CAG", amino: "Glutamine", structure: "H2N—CH(CH₂-CH₂-CONH₂)—COOH" },
  { codons: "AAT, AAC", amino: "Asparagine", structure: "H2N—CH(CH₂-CONH₂)—COOH" },
  { codons: "AAA, AAG", amino: "Lysine", structure: "H2N—CH((CH₂)₄-NH₂)—COOH" },
  { codons: "GAT, GAC", amino: "Aspartic Acid", structure: "H2N—CH(CH₂-COOH)—COOH" },
  { codons: "GAA, GAG", amino: "Glutamic Acid", structure: "H2N—CH(CH₂-CH₂-COOH)—COOH" },
  { codons: "TGT, TGC", amino: "Cysteine", structure: "H2N—CH(CH₂SH)—COOH" },
  { codons: "TGG", amino: "Tryptophan", structure: "H2N—CH(CH₂-indole)—COOH" },
  { codons: "CGT, CGC, CGA, CGG, AGA, AGG", amino: "Arginine", structure: "H2N—CH((CH₂)₃-NH-C(=NH)-NH₂)—COOH" },
  { codons: "GGT, GGC, GGA, GGG", amino: "Glycine", structure: "H2N—CH₂—COOH" },
];

function CodonTablePage({ onBack }) {
  const [search, setSearch] = useState("");
  const filtered = CODON_DATA.filter(
    (row) =>
      row.amino.toLowerCase().includes(search.toLowerCase()) ||
      row.codons.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-root codon-root">
      <button
        className="menu-trigger codon-back-btn"
        onClick={onBack}
        title="Back"
        aria-label="Back to main"
      >
        <span className="back-arrow">←</span>
      </button>

      <div className="codon-wrapper">
        <div className="codon-card">
          <div className="card-top-accent" />
          <div className="codon-header">
            <h1 className="card-title" style={{ fontSize: "22px" }}>
              DNA Codon–Amino Acid Table
            </h1>
            <input
              className="codon-search"
              type="text"
              placeholder="Search codon or amino acid…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="codon-table-wrap">
            <table className="codon-table">
              <thead>
                <tr>
                  <th>Codon(s)</th>
                  <th>Amino Acid</th>
                  <th>Chemical Structure</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={i}
                    className={row.amino === "STOP" ? "stop-row" : ""}
                  >
                    <td className="codon-cell">{row.codons}</td>
                    <td className="amino-cell">{row.amino}</td>
                    <td className="structure-cell">{row.structure}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={3} className="no-results">
                      No matches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="codon-footer">
            {filtered.length} of {CODON_DATA.length} entries
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DNA Sequence to Amino Acids Page ────────────────────────────────────────
function DNAToAminoPage({ onBack }) {
  const [dnaInput, setDnaInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    const clean = dnaInput.toUpperCase().replace(/[^ATCG]/g, "");
    if (clean.length < 3) {
      setResult({ error: "Please enter a valid DNA sequence (at least 3 bases)." });
      return;
    }

    setLoading(true);
    try {
      const response = await translateDNA(clean);
      const codons = [];
      for (let i = 0; i < clean.length; i += 3) {
        if (i + 3 <= clean.length) {
          codons.push(clean.slice(i, i + 3));
        }
      }

      setResult({
        codons,
        aminos: response.amino_acids,
        clean,
        protein_sequence: response.protein_sequence
      });
    } catch (error) {
      setResult({ error: "Failed to translate DNA sequence. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setDnaInput(""); setResult(null); };

  return (
    <div className="main-root codon-root">
      <button className="menu-trigger codon-back-btn" onClick={onBack} title="Back" aria-label="Back to main">
        <span className="back-arrow">←</span>
      </button>

      <div className="codon-wrapper">
        <div className="codon-card">
          <div className="card-top-accent" />
          <div className="codon-header">
            <h1 className="card-title" style={{ fontSize: "22px" }}>
              DNA Sequence to Amino Acid Sequence
            </h1>
          </div>

          <div className="dna-form">
            {/* Input */}
            <div className="dna-field">
              <label className="dna-label">Enter the DNA Sequence</label>
              <textarea
                className="dna-textarea"
                placeholder="e.g. ATGGCCTATCGA..."
                value={dnaInput}
                onChange={(e) => { setDnaInput(e.target.value); setResult(null); }}
                spellCheck={false}
              />
              <div className="dna-meta">
                {dnaInput.replace(/[^ATCGatcg]/g, "").length} bases
                {dnaInput.replace(/[^ATCGatcg]/g, "").length >= 3 &&
                  ` · ${Math.floor(dnaInput.replace(/[^ATCGatcg]/g, "").length / 3)} codon${Math.floor(dnaInput.replace(/[^ATCGatcg]/g, "").length / 3) !== 1 ? "s" : ""}`}
              </div>
            </div>

            {/* Buttons */}
            <div className="dna-actions">
              <button className="cta-btn" onClick={translate} disabled={!dnaInput.trim() || loading}>
                <span>{loading ? "Translating..." : "Translate →"}</span>
              </button>
              {result && (
                <button className="dna-reset-btn" onClick={reset}>
                  Clear
                </button>
              )}
            </div>

            {/* Output */}
            <div className="dna-field">
              <label className="dna-label">Amino Acid Sequence</label>
              <div className="dna-output-box">
                {!result && !loading && (
                  <span className="dna-placeholder">
                    Your translated amino acid sequence will appear here…
                  </span>
                )}
                {loading && (
                  <span className="dna-placeholder">
                    Translating DNA sequence...
                  </span>
                )}
                {result?.error && (
                  <span className="dna-error">{result.error}</span>
                )}
                {result && !result.error && (
                  <>
                    {/* Codon → Amino chip row */}
                    <div className="dna-chips">
                      {result.codons.map((codon, i) => (
                        <div
                          key={i}
                          className={`dna-chip${result.aminos[i] === "STOP" ? " chip-stop" : result.aminos[i] === "Methionine" && i === 0 ? " chip-start" : ""}`}
                        >
                          <span className="chip-codon">{codon}</span>
                          <span className="chip-amino">{result.aminos[i]}</span>
                        </div>
                      ))}
                    </div>

                    {/* Plain text summary */}
                    <div className="dna-summary">
                      <span className="dna-summary-label">Sequence: </span>
                      {result.protein_sequence}
                    </div>

                    {/* Stats row */}
                    <div className="dna-stats">
                      <div className="dna-stat">
                        <span className="stat-val">{result.clean.length}</span>
                        <span className="stat-key">bases</span>
                      </div>
                      <div className="dna-stat">
                        <span className="stat-val">{result.codons.length}</span>
                        <span className="stat-key">codons</span>
                      </div>
                      <div className="dna-stat">
                        <span className="stat-val">
                          {result.aminos.filter(a => a !== "STOP").length}
                        </span>
                        <span className="stat-key">amino acids</span>
                      </div>
                      <div className="dna-stat">
                        <span className={`stat-val ${result.aminos.includes("STOP") ? "stat-green" : "stat-warn"}`}>
                          {result.aminos.includes("STOP") ? "Yes" : "No"}
                        </span>
                        <span className="stat-key">stop codon</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="codon-footer" style={{ marginTop: "8px" }}>
            DNA → mRNA → Protein translation · Standard genetic code
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DNA Compression Page ────────────────────────────────────────────────────
function CompressionPage({ onBack }) {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompress = async () => {
    const clean = sequence.toUpperCase().replace(/[^ATCG]/g, "");
    if (clean.length < 1) {
      setResult({ error: "Please enter a valid DNA sequence." });
      return;
    }

    setLoading(true);
    try {
      const data = await runCompression(clean);
      setResult(data);
    } catch (error) {
      setResult({ error: "Failed to compress sequence. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setSequence(""); setResult(null); };

  return (
    <div className="main-root codon-root">
      <button className="menu-trigger codon-back-btn" onClick={onBack} title="Back" aria-label="Back to main">
        <span className="back-arrow">←</span>
      </button>

      <div className="codon-wrapper">
        <div className="codon-card">
          <div className="card-top-accent" />
          <div className="codon-header">
            <h1 className="card-title" style={{ fontSize: "22px" }}>
              DNA Compression
            </h1>
          </div>

          <div className="dna-form">
            <div className="dna-field">
              <label className="dna-label">Enter DNA Sequence</label>
              <textarea
                className="dna-textarea"
                placeholder="e.g. AAAATTTTCCCCGGGG..."
                value={sequence}
                onChange={(e) => { setSequence(e.target.value); setResult(null); }}
                spellCheck={false}
              />
              <div className="dna-meta">
                {sequence.replace(/[^ATCGatcg]/g, "").length} bases
              </div>
            </div>

            <div className="dna-actions">
              <button className="cta-btn" onClick={handleCompress} disabled={!sequence.trim() || loading}>
                <span>{loading ? "Compressing..." : "Compress →"}</span>
              </button>
              {result && (
                <button className="dna-reset-btn" onClick={reset}>
                  Clear
                </button>
              )}
            </div>

            <div className="dna-field">
              <label className="dna-label">Result</label>
              <div className="dna-output-box">
                {!result && !loading && (
                  <span className="dna-placeholder">
                    Compression result will appear here…
                  </span>
                )}
                {loading && (
                  <span className="dna-placeholder">
                    Compressing sequence...
                  </span>
                )}
                {result?.error && (
                  <span className="dna-error">{result.error}</span>
                )}
                {result && !result.error && (
                  <>
                    <div className="dna-summary">
                      <span className="dna-summary-label">Original: </span>
                      <span style={{ wordBreak: "break-all" }}>{result.original}</span>
                    </div>
                    <div className="dna-summary">
                      <span className="dna-summary-label">Compressed: </span>
                      <span style={{ wordBreak: "break-all" }}>{result.compressed}</span>
                    </div>
                    <div className="dna-stats">
                      <div className="dna-stat">
                        <span className="stat-val">{result.original.length}</span>
                        <span className="stat-key">original length</span>
                      </div>
                      <div className="dna-stat">
                        <span className="stat-val">{result.compressed.length}</span>
                        <span className="stat-key">compressed length</span>
                      </div>
                      <div className="dna-stat">
                        <span className="stat-val">{(result.ratio * 100).toFixed(1)}%</span>
                        <span className="stat-key">compression ratio</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="codon-footer" style={{ marginTop: "8px" }}>
            Run-Length Encoding compression · Efficient DNA storage
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DNA Mutation Page ───────────────────────────────────────────────────────
function MutationPage({ onBack }) {
  const [seq1, setSeq1] = useState("");
  const [seq2, setSeq2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    const clean1 = seq1.toUpperCase().replace(/[^ATCG]/g, "");
    const clean2 = seq2.toUpperCase().replace(/[^ATCG]/g, "");
    if (clean1.length < 1 || clean2.length < 1) {
      setResult({ error: "Please enter both DNA sequences." });
      return;
    }

    setLoading(true);
    try {
      const data = await runMutation(clean1, clean2);
      setResult(data);
    } catch (error) {
      setResult({ error: "Failed to analyze mutation. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setSeq1(""); setSeq2(""); setResult(null); };

  return (
    <div className="main-root codon-root">
      <button className="menu-trigger codon-back-btn" onClick={onBack} title="Back" aria-label="Back to main">
        <span className="back-arrow">←</span>
      </button>

      <div className="codon-wrapper">
        <div className="codon-card">
          <div className="card-top-accent" />
          <div className="codon-header">
            <h1 className="card-title" style={{ fontSize: "22px" }}>
              DNA Mutation Analysis
            </h1>
          </div>

          <div className="dna-form">
            <div className="dna-field">
              <label className="dna-label">Original Sequence</label>
              <textarea
                className="dna-textarea"
                placeholder="e.g. ATGGCCTAT..."
                value={seq1}
                onChange={(e) => { setSeq1(e.target.value); setResult(null); }}
                spellCheck={false}
              />
              <div className="dna-meta">
                {seq1.replace(/[^ATCGatcg]/g, "").length} bases
              </div>
            </div>

            <div className="dna-field">
              <label className="dna-label">Mutated Sequence</label>
              <textarea
                className="dna-textarea"
                placeholder="e.g. ATGGCGTAT..."
                value={seq2}
                onChange={(e) => { setSeq2(e.target.value); setResult(null); }}
                spellCheck={false}
              />
              <div className="dna-meta">
                {seq2.replace(/[^ATCGatcg]/g, "").length} bases
              </div>
            </div>

            <div className="dna-actions">
              <button className="cta-btn" onClick={handleAnalyze} disabled={!seq1.trim() || !seq2.trim() || loading}>
                <span>{loading ? "Analyzing..." : "Analyze →"}</span>
              </button>
              {result && (
                <button className="dna-reset-btn" onClick={reset}>
                  Clear
                </button>
              )}
            </div>

            <div className="dna-field">
              <label className="dna-label">Analysis Result</label>
              <div className="dna-output-box">
                {!result && !loading && (
                  <span className="dna-placeholder">
                    Mutation analysis will appear here…
                  </span>
                )}
                {loading && (
                  <span className="dna-placeholder">
                    Analyzing mutations...
                  </span>
                )}
                {result?.error && (
                  <span className="dna-error">{result.error}</span>
                )}
                {result && !result.error && (
                  <>
                    <div className="dna-stats">
                      <div className="dna-stat">
                        <span className="stat-val">{result.distance}</span>
                        <span className="stat-key">distance</span>
                      </div>
                      <div className="dna-stat">
                        <span className="stat-val">{result.similarity.toFixed(1)}%</span>
                        <span className="stat-key">similarity</span>
                      </div>
                    </div>
                    {result.operations && result.operations.length > 0 && (
                      <div className="dna-summary">
                        <span className="dna-summary-label">Operations: </span>
                        <ul style={{ marginTop: "8px", color: "rgba(196, 181, 253, 0.75)" }}>
                          {result.operations.slice(0, 5).map((op, i) => (
                            <li key={i} style={{ fontSize: "12px", marginLeft: "16px" }}>
                              {Array.isArray(op) ? op.join(" → ") : JSON.stringify(op)}
                            </li>
                          ))}
                          {result.operations.length > 5 && (
                            <li style={{ fontSize: "12px", marginLeft: "16px", color: "rgba(255, 255, 255, 0.4)" }}>
                              +{result.operations.length - 5} more operations
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="codon-footer" style={{ marginTop: "8px" }}>
            Edit distance algorithm · Sequence alignment analysis
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Use Cases Data ──────────────────────────────────────────────────────────
const USE_CASES_DATA = [
  {
    title: "Healthcare",
    description: "In healthcare, optimized DNA sequencing enables rapid diagnosis of genetic disorders. By reducing computational time, clinicians can analyze patient genomes faster, leading to quicker treatment decisions. This technology supports early detection of diseases like cancer and inherited conditions, improving patient outcomes through personalized care plans.",
    flow: ["Sample Collection", "Fast Sequencing", "Quick Analysis", "Diagnosis"]
  },
  {
    title: "Drug Discovery",
    description: "Pharmaceutical companies use optimized sequencing to identify drug targets more efficiently. By accelerating genome analysis, researchers can screen vast libraries of compounds against genetic data, speeding up the drug development pipeline. This leads to faster identification of potential treatments for complex diseases.",
    flow: ["Genome Screening", "Target Identification", "Compound Testing", "Drug Development"]
  },
  {
    title: "Agriculture",
    description: "Farmers and breeders leverage optimized DNA sequencing for crop improvement. Rapid analysis of plant genomes allows for quicker development of drought-resistant and high-yield varieties. This technology supports sustainable agriculture by enabling precise genetic modifications that enhance food security.",
    flow: ["Plant Sampling", "Genome Analysis", "Trait Selection", "Crop Breeding"]
  },
  {
    title: "Personalized Medicine",
    description: "Personalized medicine relies on optimized sequencing to tailor treatments to individual genetic profiles. By processing genomic data swiftly, healthcare providers can recommend medications that work best for each patient, minimizing side effects and maximizing efficacy. This approach transforms healthcare from one-size-fits-all to truly individualized care.",
    flow: ["Genetic Profiling", "Data Analysis", "Treatment Matching", "Custom Therapy"]
  },
  {
    title: "Genetic Engineering",
    description: "Genetic engineers use optimized sequencing for precise gene editing. Fast computational analysis enables accurate identification of target sequences, improving the success rate of CRISPR and other editing techniques. This technology accelerates advancements in biotechnology, from disease-resistant crops to potential cures for genetic disorders.",
    flow: ["Sequence Mapping", "Target Selection", "Gene Editing", "Validation"]
  }
];

// ─── Use Cases Page ──────────────────────────────────────────────────────────
function UseCasePage({ onBack }) {
  return (
    <div className="usecase-root">
      <button
        className="menu-trigger codon-back-btn"
        onClick={onBack}
        title="Back"
        aria-label="Back to main"
      >
        <span className="back-arrow">←</span>
      </button>

      <div className="usecase-container">
        <header className="usecase-header">
          <h1 className="usecase-heading">DNA Sequencing Optimization</h1>
          <p className="usecase-subheading">Revolutionizing genetic analysis through advanced algorithms and computational efficiency</p>
        </header>

        <section className="usecase-section">
          {USE_CASES_DATA.map((useCase, index) => (
            <div key={index} className="usecase-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <h2 className="usecase-card-title">{useCase.title}</h2>
              <p className="usecase-card-description">{useCase.description}</p>
              <div className="usecase-flow-diagram">
                {useCase.flow.map((step, stepIndex) => (
                  <span key={stepIndex}>
                    {stepIndex > 0 && <span className="usecase-arrow">→</span>}
                    <span className="usecase-step">{step}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

// ─── Algorithm Visualizer Component ──────────────────────────────────────────
// ─── Algorithm Explanations Page ──────────────────────────────────────────────
function AlgorithmExplanationsPage({ onBack }) {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOptimize = async () => {
    const clean = sequence.toUpperCase().replace(/[^ATCG]/g, "");
    if (clean.length < 3) {
      setResult({ error: "Please enter a valid DNA sequence (at least 3 bases)." });
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setSubmitted(true);
    try {
      const data = await runOptimize(clean);
      setResult(data);
    } catch (error) {
      setResult({ error: "Failed to optimize sequence. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSequence("");
    setResult(null);
    setSubmitted(false);
  };

  const ALGO_KEYS = [
    { key: "Greedy", label: "Greedy Algorithm" },
    { key: "Divide and Conquer", label: "Divide & Conquer" },
    { key: "String Matching", label: "String Matching" },
    { key: "Hashing", label: "Hashing" },
    { key: "Sliding Window", label: "Sliding Window" },
    { key: "Branch and Bound", label: "Branch & Bound" },
  ];

  return (
    <div className="main-root codon-root">
      <button
        className="menu-trigger codon-back-btn"
        onClick={onBack}
        title="Back"
        aria-label="Back to main"
      >
        <span className="back-arrow">←</span>
      </button>

      <div className="codon-wrapper">
        <div className="codon-card">
          <div className="card-top-accent" />

          {/* ── Input section ── */}
          <div className="codon-header">
            <h1 className="card-title" style={{ fontSize: "22px" }}>
              DNA Sequencing Optimization
            </h1>
          </div>

          <div className="opt-input-section">
            <div className="dna-field">
              <label className="dna-label">Enter the DNA Sequence</label>
              <textarea
                className="dna-textarea"
                placeholder="e.g. ATGGCCTATCGAATGGCCTATCGA..."
                value={sequence}
                onChange={(e) => {
                  setSequence(e.target.value);
                  if (submitted) { setResult(null); setSubmitted(false); }
                }}
                spellCheck={false}
              />
              <div className="dna-meta">
                {sequence.replace(/[^ATCGatcg]/g, "").length} bases
              </div>
            </div>

            <div className="dna-actions" style={{ paddingBottom: "28px" }}>
              <button
                className="cta-btn"
                onClick={handleOptimize}
                disabled={!sequence.trim() || loading}
              >
                <span>{loading ? "Optimizing..." : "Optimize →"}</span>
              </button>
              {submitted && (
                <button className="dna-reset-btn" onClick={reset}>
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ── Results section (shown after submit) ── */}
          {submitted && (
            <div className="opt-results-section">
              <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)" }} />
              <div className="opt-results-label">Optimized DNA Sequence — Algorithm Results</div>

              {/* Error state */}
              {result?.error && (
                <div className="dna-output-box" style={{ minHeight: "80px" }}>
                  <span className="dna-error">{result.error}</span>
                </div>
              )}

              {/* Loading skeleton */}
              {loading && (
                <div className="opt-placeholder-grid">
                  {ALGO_KEYS.map(({ label }) => (
                    <div key={label} className="opt-placeholder-card">
                      <span className="opt-placeholder-inner">Running {label}…</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Results grid */}
              {result && !result.error && !loading && (
                <>
                  <div className="opt-grid">
                    {ALGO_KEYS.map(({ key, label }) => {
                      const algo = result.results?.find(r => r.algorithm === key) || {};
                      const seq = algo.output || "—";
                      const timeComplexity = algo.time_complexity || "—";
                      const spaceComplexity = algo.space_complexity || "—";
                      const length = typeof seq === "string" ? seq.length : 0;

                      return (
                        <div key={key} className="opt-algo-card">
                          <div className="opt-algo-name">{label}</div>
                          <div className="opt-algo-sequence">
                            {typeof seq === "string" ? seq : JSON.stringify(seq)}
                          </div>
                          <div className="opt-complexity-box">
                            <div className="opt-complexity-row">
                              <span className="opt-complexity-label">Time:</span>
                              <span className="opt-complexity-value">{timeComplexity}</span>
                            </div>
                            <div className="opt-complexity-row">
                              <span className="opt-complexity-label">Space:</span>
                              <span className="opt-complexity-value">{spaceComplexity}</span>
                            </div>
                          </div>
                          <div className="opt-algo-meta">
                            {length > 0 && (
                              <div className="opt-meta-pill">
                                Length <span>{length}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </>
              )}

              {/* Empty placeholders before any result */}
              {!result && !loading && (
                <div className="opt-placeholder-grid">
                  {ALGO_KEYS.map(({ label }) => (
                    <div key={label} className="opt-placeholder-card">
                      <span className="opt-placeholder-inner">{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="codon-footer" style={{ marginTop: "8px" }}>
            Six optimization algorithms · Comparative sequence analysis · Complexity analysis
          </div>
        </div>
      </div>


    </div>
  );
}


// ─── DAA Concept Explanation Page ────────────────────────────────────────────
function DAAExplanationPage({ onBack }) {
  return (
    <div className="main-root codon-root">
      <button className="menu-trigger codon-back-btn" onClick={onBack} title="Back" aria-label="Back to main">
        <span className="back-arrow">←</span>
      </button>

      <div className="codon-wrapper">
        <div className="codon-card">
          <div className="card-top-accent" />
          <div className="codon-header">
            <h1 className="card-title" style={{ fontSize: "22px" }}>
              DAA - Design and Analysis of Algorithms
            </h1>
          </div>

          <div style={{ padding: "20px", color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.8", fontSize: "14px" }}>
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ color: "#00e5ff", fontSize: "16px", marginBottom: "12px", fontWeight: "600" }}>Design and Analysis of Algorithms</h3>
              <p>
                DAA focuses on creating efficient algorithms and analyzing their performance. Below are six fundamental algorithmic paradigms used in computational biology and DNA sequencing optimization.
              </p>
            </div>

            {/* Greedy Algorithm */}
            <div style={{ marginBottom: "24px", backgroundColor: "rgba(0, 229, 255, 0.05)", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #00e5ff" }}>
              <h4 style={{ color: "#00e5ff", fontSize: "16px", marginBottom: "12px", fontWeight: "600" }}>1. Greedy Algorithm</h4>
              <p style={{ marginBottom: "8px" }}>Greedy algorithms make locally optimal choices at each step with the hope of finding a global optimum. They are simple and often efficient for optimization problems.</p>
              <p style={{ marginBottom: "8px" }}>In DNA sequencing, greedy approaches can be used for approximate sequence alignment or finding optimal paths through sequence graphs.</p>
              <p style={{ marginBottom: "8px" }}>The algorithm builds solutions incrementally, always choosing the best immediate option without considering future consequences.</p>
              <p style={{ marginBottom: "8px" }}>Common applications include Huffman coding for data compression and Kruskal's algorithm for minimum spanning trees.</p>
              <p style={{ marginBottom: "8px" }}>Greedy strategies work well when the problem has the greedy-choice property and optimal substructure.</p>
              <p style={{ marginBottom: "12px" }}>They are particularly useful for problems where exhaustive search would be computationally prohibitive.</p>
              <div style={{ backgroundColor: "rgba(0, 229, 255, 0.1)", padding: "12px", borderRadius: "4px", marginTop: "12px" }}>
                <strong style={{ color: "#00e5ff" }}>Complexity Analysis:</strong><br/>
                <strong>Time Complexity:</strong> O(n log n) to O(n²) depending on implementation<br/>
                <strong>Space Complexity:</strong> O(n) for storing intermediate results<br/>
                <strong>Advantages:</strong> Simple implementation, often fast in practice<br/>
                <strong>Limitations:</strong> May not always produce optimal solutions
              </div>
            </div>

            {/* Divide and Conquer */}
            <div style={{ marginBottom: "24px", backgroundColor: "rgba(0, 229, 255, 0.05)", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #00e5ff" }}>
              <h4 style={{ color: "#00e5ff", fontSize: "16px", marginBottom: "12px", fontWeight: "600" }}>2. Divide and Conquer</h4>
              <p style={{ marginBottom: "8px" }}>Divide and conquer algorithms break complex problems into smaller, more manageable subproblems, solve them recursively, and combine their solutions.</p>
              <p style={{ marginBottom: "8px" }}>This paradigm is fundamental to many efficient algorithms and forms the basis for algorithms like merge sort and quicksort.</p>
              <p style={{ marginBottom: "8px" }}>In bioinformatics, divide and conquer is used in sequence alignment algorithms and phylogenetic tree construction.</p>
              <p style={{ marginBottom: "8px" }}>The approach works by recursively dividing the problem until subproblems become simple enough to solve directly.</p>
              <p style={{ marginBottom: "8px" }}>Solutions to subproblems are then combined to form the solution to the original problem.</p>
              <p style={{ marginBottom: "12px" }}>This method is particularly effective for problems that can be naturally decomposed into independent subproblems.</p>
              <div style={{ backgroundColor: "rgba(0, 229, 255, 0.1)", padding: "12px", borderRadius: "4px", marginTop: "12px" }}>
                <strong style={{ color: "#00e5ff" }}>Complexity Analysis:</strong><br/>
                <strong>Time Complexity:</strong> Often O(n log n) due to recursive division<br/>
                <strong>Space Complexity:</strong> O(log n) for recursion stack, O(n) for auxiliary space<br/>
                <strong>Advantages:</strong> Natural parallelization, efficient for large datasets<br/>
                <strong>Limitations:</strong> Recursion depth limits, overhead of function calls
              </div>
            </div>

            {/* String Matching */}
            <div style={{ marginBottom: "24px", backgroundColor: "rgba(0, 229, 255, 0.05)", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #00e5ff" }}>
              <h4 style={{ color: "#00e5ff", fontSize: "16px", marginBottom: "12px", fontWeight: "600" }}>3. String Matching</h4>
              <p style={{ marginBottom: "8px" }}>String matching algorithms find occurrences of a pattern within a larger text, crucial for DNA sequence analysis and bioinformatics.</p>
              <p style={{ marginBottom: "8px" }}>The naive approach compares the pattern with every substring of the text, while optimized algorithms use preprocessing for efficiency.</p>
              <p style={{ marginBottom: "8px" }}>KMP (Knuth-Morris-Pratt) algorithm preprocesses the pattern to avoid unnecessary comparisons, achieving linear time.</p>
              <p style={{ marginBottom: "8px" }}>Boyer-Moore algorithm uses heuristics to skip sections of text, often performing better in practice.</p>
              <p style={{ marginBottom: "8px" }}>In genomics, these algorithms identify gene sequences, regulatory elements, and perform sequence alignment.</p>
              <p style={{ marginBottom: "12px" }}>Advanced variants handle approximate matching and multiple pattern searches for comprehensive analysis.</p>
              <div style={{ backgroundColor: "rgba(0, 229, 255, 0.1)", padding: "12px", borderRadius: "4px", marginTop: "12px" }}>
                <strong style={{ color: "#00e5ff" }}>Complexity Analysis:</strong><br/>
                <strong>Time Complexity:</strong> O(n + m) for KMP/Boyer-Moore, O((n-m+1) × m) for naive<br/>
                <strong>Space Complexity:</strong> O(m) for pattern preprocessing, O(1) additional space<br/>
                <strong>Advantages:</strong> Linear time performance, handles large genomic datasets<br/>
                <strong>Limitations:</strong> Preprocessing overhead, complex implementation
              </div>
            </div>

            {/* Hashing */}
            <div style={{ marginBottom: "24px", backgroundColor: "rgba(0, 229, 255, 0.05)", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #00e5ff" }}>
              <h4 style={{ color: "#00e5ff", fontSize: "16px", marginBottom: "12px", fontWeight: "600" }}>4. Hashing</h4>
              <p style={{ marginBottom: "8px" }}>Hashing transforms data into fixed-size values called hash codes, enabling fast data retrieval and comparison operations.</p>
              <p style={{ marginBottom: "8px" }}>Hash functions map variable-length inputs to fixed-size outputs, ideally with minimal collisions.</p>
              <p style={{ marginBottom: "8px" }}>In bioinformatics, hashing is used for sequence indexing, k-mer counting, and fast sequence similarity searches.</p>
              <p style={{ marginBottom: "8px" }}>Hash tables provide average O(1) lookup time, making them ideal for large-scale genomic data processing.</p>
              <p style={{ marginBottom: "8px" }}>Rolling hash functions enable efficient sliding window computations over DNA sequences.</p>
              <p style={{ marginBottom: "12px" }}>Cryptographic hash functions ensure data integrity, while non-cryptographic ones optimize performance.</p>
              <div style={{ backgroundColor: "rgba(0, 229, 255, 0.1)", padding: "12px", borderRadius: "4px", marginTop: "12px" }}>
                <strong style={{ color: "#00e5ff" }}>Complexity Analysis:</strong><br/>
                <strong>Time Complexity:</strong> O(1) average case for insertions/lookups, O(n) worst case<br/>
                <strong>Space Complexity:</strong> O(n) for hash table storage<br/>
                <strong>Advantages:</strong> Fast lookups, memory efficient for sparse data<br/>
                <strong>Limitations:</strong> Hash collisions, unpredictable worst-case performance
              </div>
            </div>

            {/* Sliding Window */}
            <div style={{ marginBottom: "24px", backgroundColor: "rgba(0, 229, 255, 0.05)", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #00e5ff" }}>
              <h4 style={{ color: "#00e5ff", fontSize: "16px", marginBottom: "12px", fontWeight: "600" }}>5. Sliding Window</h4>
              <p style={{ marginBottom: "8px" }}>Sliding window techniques maintain a subset of data items for processing, moving the window across the dataset to perform computations.</p>
              <p style={{ marginBottom: "8px" }}>This approach is particularly effective for problems requiring contiguous subarray or substring analysis.</p>
              <p style={{ marginBottom: "8px" }}>In DNA analysis, sliding windows identify motifs, calculate GC content, and detect sequence patterns.</p>
              <p style={{ marginBottom: "8px" }}>The technique maintains constant space complexity while achieving linear time performance.</p>
              <p style={{ marginBottom: "8px" }}>Two-pointer approaches often implement sliding windows, with one pointer expanding and another contracting the window.</p>
              <p style={{ marginBottom: "12px" }}>Applications include maximum sum subarrays, longest substrings, and real-time data stream processing.</p>
              <div style={{ backgroundColor: "rgba(0, 229, 255, 0.1)", padding: "12px", borderRadius: "4px", marginTop: "12px" }}>
                <strong style={{ color: "#00e5ff" }}>Complexity Analysis:</strong><br/>
                <strong>Time Complexity:</strong> O(n) as each element is processed constant time<br/>
                <strong>Space Complexity:</strong> O(1) or O(k) where k is window size<br/>
                <strong>Advantages:</strong> Memory efficient, linear time, simple implementation<br/>
                <strong>Limitations:</strong> Only works for contiguous data segments
              </div>
            </div>

            {/* Branch and Bound */}
            <div style={{ marginBottom: "24px", backgroundColor: "rgba(0, 229, 255, 0.05)", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #00e5ff" }}>
              <h4 style={{ color: "#00e5ff", fontSize: "16px", marginBottom: "12px", fontWeight: "600" }}>6. Branch and Bound</h4>
              <p style={{ marginBottom: "8px" }}>Branch and bound systematically explores solution spaces by pruning branches that cannot lead to optimal solutions.</p>
              <p style={{ marginBottom: "8px" }}>The algorithm uses bounding functions to eliminate suboptimal paths early in the search process.</p>
              <p style={{ marginBottom: "8px" }}>In computational biology, it's used for protein folding prediction and multiple sequence alignment.</p>
              <p style={{ marginBottom: "8px" }}>The method combines breadth-first search with pruning strategies to reduce computational complexity.</p>
              <p style={{ marginBottom: "8px" }}>Lower and upper bounds guide the search, ensuring only promising paths are explored thoroughly.</p>
              <p style={{ marginBottom: "12px" }}>This approach is particularly valuable for NP-hard problems where exhaustive search is infeasible.</p>
              <div style={{ backgroundColor: "rgba(0, 229, 255, 0.1)", padding: "12px", borderRadius: "4px", marginTop: "12px" }}>
                <strong style={{ color: "#00e5ff" }}>Complexity Analysis:</strong><br/>
                <strong>Time Complexity:</strong> Variable, often exponential but better than brute force<br/>
                <strong>Space Complexity:</strong> O(b^d) where b is branching factor, d is depth<br/>
                <strong>Advantages:</strong> Finds optimal solutions, prunes suboptimal paths<br/>
                <strong>Limitations:</strong> Memory intensive, requires good bounding functions
              </div>
            </div>
          </div>

          <div className="codon-footer" style={{ marginTop: "8px" }}>
            Understanding algorithm design and complexity analysis · Foundation for efficient computing
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder Page ─────────────────────────────────────────────────────────
function PlaceholderPage({ title, onBack }) {
  return (
    <div className="main-root">
      <div className="center-wrapper">
        <div className="main-card">
          <div className="card-top-accent" />
          <div className="card-body" style={{ gap: "16px" }}>
            <div style={{ fontSize: 48 }}>🚧</div>
            <h2 className="card-title" style={{ fontSize: "22px" }}>
              {title}
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>
              This module is not yet implemented. Stay tuned.
            </p>
            <button className="cta-btn" onClick={onBack}>
              <span>← Back to main</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Window ──────────────────────────────────────────────────────────────
function MainWindow({ onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="main-root">
      <button
        className="menu-trigger"
        onClick={() => setDrawerOpen(true)}
        title="Open menu"
        aria-label="Open navigation menu"
        aria-expanded={drawerOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <MenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
      />

      <div className="center-wrapper">
        <div className="main-card">
          <div className="card-top-accent" />
          <div className="card-body">
            <h1 className="card-title">DNA Sequencing Optimization</h1>
            <button
              className="cta-btn"
              onClick={() => onNavigate("Algorithm Explanations")}
            >
              <span>Optimizer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(null);

  if (page === "Optimizer") {
    return <AlgorithmExplanationsPage onBack={() => setPage(null)} />;
  }

  if (page === "DNA Codon–Amino Acid Table") {
    return <CodonTablePage onBack={() => setPage(null)} />;
  }

  if (page === "DNA Sequence to Amino Acids") {
    return <DNAToAminoPage onBack={() => setPage(null)} />;
  }

  if (page === "DNA Compression") {
    return <CompressionPage onBack={() => setPage(null)} />;
  }

  if (page === "DNA Mutation") {
    return <MutationPage onBack={() => setPage(null)} />;
  }

  if (page === "DAA Concept Explanation") {
    return <DAAExplanationPage onBack={() => setPage(null)} />;
  }

  if (page === "Real World Applications") {
    return <UseCasePage onBack={() => setPage(null)} />;
  }

  if (page) {
    return <PlaceholderPage title={page} onBack={() => setPage(null)} />;
  }

  return <MainWindow onNavigate={setPage} />;
}