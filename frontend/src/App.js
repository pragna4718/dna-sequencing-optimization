import { useState } from "react";
import "./App.css";
import { translateDNA } from "./services/api";

// ─── Menu Drawer ─────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { label: "Algorithm Explanations", icon: "⚙️" },
  { label: "DNA Sequence to Amino Acids", icon: "🧬" },
  { label: "DNA Compression", icon: "📦" },
  { label: "DNA Mutation", icon: "🔬" },
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
                          className={`dna-chip${result.aminos[i] === "STOP" ? " chip-stop" : result.aminos[i] === "Met" && i === 0 ? " chip-start" : ""}`}
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

  if (page === "DNA Codon–Amino Acid Table") {
    return <CodonTablePage onBack={() => setPage(null)} />;
  }

  if (page === "DNA Sequence to Amino Acids") {
    return <DNAToAminoPage onBack={() => setPage(null)} />;
  }

  if (page === "Real World Applications") {
    return <UseCasePage onBack={() => setPage(null)} />;
  }

  if (page) {
    return <PlaceholderPage title={page} onBack={() => setPage(null)} />;
  }

  return <MainWindow onNavigate={setPage} />;
}