import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const [count, setCount] = useState(0);
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigate(event, path) {
    event.preventDefault();
    window.history.pushState({}, '', path);
    setRoute(path);
  }

  return (
    <main className="fixture-shell">
      <section className="fixture-card">
        <div className="status-row">
          <span className="status-dot" aria-hidden="true" />
          <span>Cached template fixture</span>
        </div>

        <p className="eyebrow">Interactive preview</p>
        <h1>Template Preview E2E A</h1>
        <p className="lede">
          A deterministic frontend-only surface for validating cached template previews.
        </p>

        <div className="interactive-grid">
          <section className="panel" aria-labelledby="counter-title">
            <p className="panel-label" id="counter-title">State check</p>
            <button type="button" className="count-button" onClick={() => setCount((value) => value + 1)}>
              Count: {count}
            </button>
            <p className="hint">Click to confirm client state updates visibly.</p>
          </section>

          <section className="panel" aria-labelledby="route-title">
            <p className="panel-label" id="route-title">Route check</p>
            <p className="current-route" aria-live="polite">
              Current route <code>{route}</code>
            </p>
            <nav aria-label="Fixture routes">
              <a href="/demo" onClick={(event) => navigate(event, '/demo')}>/demo</a>
              <a href="/other" onClick={(event) => navigate(event, '/other')}>/other</a>
            </nav>
          </section>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
