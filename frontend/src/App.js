import { useState } from "react";
import "./App.css";

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

  if (page) {
    return <PlaceholderPage title={page} onBack={() => setPage(null)} />;
  }

  return <MainWindow onNavigate={setPage} />;
}