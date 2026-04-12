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

  if (page) {
    return (
      <PlaceholderPage
        title={page}
        onBack={() => setPage(null)}
      />
    );
  }

  return <MainWindow onNavigate={setPage} />;
}