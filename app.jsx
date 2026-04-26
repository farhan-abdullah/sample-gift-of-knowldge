
const { useState, useEffect } = React;
const {
  LangContext, T, Header, Footer,
  HomePage, AboutPage, ProjectsPage, ApplyPage,
  ImpactPage, VolunteersPage, BlogPage, ContactPage
} = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#c9a84c",
  "primaryColor": "#1a4d3a",
  "bgColor": "#ffffff",
  "patternOpacity": "none"
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState('home');
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // Handle tweaks panel protocol
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
  };

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const toggle = () => setLang(l => l === 'en' ? 'bn' : 'en');

  const pageMap = { home: HomePage, about: AboutPage, projects: ProjectsPage, apply: ApplyPage, impact: ImpactPage, volunteers: VolunteersPage, blog: BlogPage, contact: ContactPage };
  const PageComponent = pageMap[page] || HomePage;

  // Apply CSS variable tweaks
  useEffect(() => {
    document.documentElement.style.setProperty('--gold', tweaks.accentColor);
    document.documentElement.style.setProperty('--green', tweaks.primaryColor);
    document.documentElement.style.setProperty('--cream-light', tweaks.bgColor);
    document.documentElement.style.setProperty('--cream', tweaks.bgColor);
    // Pattern opacity
    const opacityMap = { none: '0', subtle: '1', visible: '2' };
    document.documentElement.style.setProperty('--pattern-display', tweaks.patternOpacity === 'none' ? 'none' : 'block');
  }, [tweaks]);

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header page={page} setPage={setPage} />
        <main style={{ flex: 1 }}>
          <PageComponent setPage={setPage} />
        </main>
        <Footer setPage={setPage} />

        {/* ── Tweaks Panel ─────────────────────────────────── */}
        {tweaksOpen && (
          <div style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 999,
            background: '#fff', borderRadius: 8, padding: 24, width: 280,
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)', border: '1px solid rgba(201,168,76,0.25)',
            fontFamily: 'Inter, sans-serif',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a4d3a', letterSpacing: '0.5px' }}>Tweaks</div>
              <button onClick={() => { setTweaksOpen(false); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#999', lineHeight: 1 }}>×</button>
            </div>

            {/* Color: Accent */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>Accent Color</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['#c9a84c', '#b8965a', '#a07840', '#d4a96a', '#8fae8f'].map(c => (
                  <div key={c} onClick={() => setTweak('accentColor', c)}
                    style={{ width: 28, height: 28, borderRadius: 4, background: c, cursor: 'pointer', border: tweaks.accentColor === c ? '2px solid #333' : '2px solid transparent', transition: 'transform 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''} />
                ))}
              </div>
            </div>

            {/* Color: Primary */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>Primary Green</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['#1a4d3a', '#1e5c44', '#2d6a4f', '#234d35', '#183d2e'].map(c => (
                  <div key={c} onClick={() => setTweak('primaryColor', c)}
                    style={{ width: 28, height: 28, borderRadius: 4, background: c, cursor: 'pointer', border: tweaks.primaryColor === c ? '2px solid #c9a84c' : '2px solid transparent', transition: 'transform 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''} />
                ))}
              </div>
            </div>

            {/* Background tone */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>Background Tone</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { label: 'Cream', val: '#fdfaf4' },
                  { label: 'Ivory', val: '#f5ede0' },
                  { label: 'White', val: '#ffffff' },
                ].map(o => (
                  <button key={o.label} onClick={() => setTweak('bgColor', o.val)}
                    style={{
                      flex: 1, padding: '7px 4px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontWeight: 500,
                      background: o.val, border: tweaks.bgColor === o.val ? '2px solid #1a4d3a' : '1.5px solid #ddd',
                      color: '#2e1a0a', fontFamily: 'Inter, sans-serif',
                    }}>{o.label}</button>
                ))}
              </div>
            </div>

            {/* Pattern density */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>Islamic Pattern</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['none', 'subtle', 'visible'].map(v => (
                  <button key={v} onClick={() => setTweak('patternOpacity', v)}
                    style={{
                      flex: 1, padding: '7px 4px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontWeight: 500,
                      background: tweaks.patternOpacity === v ? '#1a4d3a' : '#f5f5f5',
                      color: tweaks.patternOpacity === v ? '#fff' : '#555',
                      border: 'none', fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
                    }}>{v}</button>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: 16, borderTop: '1px solid #f0f0f0', fontSize: 11, color: '#aaa', textAlign: 'center' }}>
              Changes apply live to all pages
            </div>
          </div>
        )}
      </div>
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
