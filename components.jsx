
const { useState, useEffect, useRef, useContext, createContext } = React;

// ─── Language Context & Translations ────────────────────────────────────────
const LangContext = createContext({ lang: 'en', toggle: () => {} });

const T = {
  en: {
    nav: ['Home', 'About', 'Books', 'Apply', 'Impact', 'Stories', 'Blog', 'Contact'],
    navKeys: ['home', 'about', 'books', 'apply', 'impact', 'stories', 'blog', 'contact'],
    langSwitch: 'বাংলা',
    hero: {
      eyebrow: 'Gift of Knowledge',
      title: 'জ্ঞানের উপহার',
      subtitle: 'One book · One mind · One change',
      cta1: 'Request a Book',
      cta2: 'Learn More',
    },
    stats: { books: 'Books Donated', districts: 'Districts Reached', families: 'Families Served' },
    mission: {
      label: 'Our Mission',
      heading: 'Knowledge is the greatest sadaqah jariyah',
      body: 'জ্ঞানের উপহার distributes books and Qurans to individuals, schools, and libraries across Bangladesh — free of charge, for the sake of Allah. Founded in Italy, rooted in Bangladesh, driven by love of knowledge.',
    },
    dua: {
      label: 'Dua for You',
      heading: 'Receive a dua',
      btn: 'Gift me a dua',
      new: 'Another dua',
    },
    footer: {
      tagline: 'Spreading knowledge for the sake of Allah.',
      rights: '© 2025 জ্ঞানের উপহার · Gift of Knowledge',
      iqra: 'اِقْرَأْ — Read',
    }
  },
  bn: {
    nav: ['হোম', 'আমাদের সম্পর্কে', 'বইসমূহ', 'আবেদন করুন', 'প্রভাব', 'গল্পসমূহ', 'ব্লগ', 'যোগাযোগ'],
    navKeys: ['home', 'about', 'books', 'apply', 'impact', 'stories', 'blog', 'contact'],
    langSwitch: 'EN',
    hero: {
      eyebrow: 'Gift of Knowledge',
      title: 'জ্ঞানের উপহার',
      subtitle: 'একটি বই · একটি মন · একটি পরিবর্তন',
      cta1: 'বই চাই',
      cta2: 'আরও জানুন',
    },
    stats: { books: 'বই বিতরণ', districts: 'জেলা পৌঁছেছি', families: 'পরিবার সেবা' },
    mission: {
      label: 'আমাদের লক্ষ্য',
      heading: 'জ্ঞান হলো সর্বোত্তম সদকায়ে জারিয়া',
      body: 'জ্ঞানের উপহার বাংলাদেশজুড়ে ব্যক্তি, স্কুল ও পাঠাগারে বিনামূল্যে বই ও কোরআন বিতরণ করে — শুধুমাত্র আল্লাহর সন্তুষ্টির জন্য। ইটালি থেকে পরিচালিত, বাংলাদেশের মাটিতে প্রোথিত, জ্ঞানের ভালোবাসায় পরিচালিত।',
    },
    dua: {
      label: 'আপনার জন্য দু\'আ',
      heading: 'একটি দু\'আ গ্রহণ করুন',
      btn: 'দু\'আ পাঠান',
      new: 'আরেকটি দু\'আ',
    },
    footer: {
      tagline: 'আল্লাহর সন্তুষ্টির জন্য জ্ঞান ছড়িয়ে দিচ্ছি।',
      rights: '© ২০২৫ জ্ঞানের উপহার',
      iqra: 'اِقْرَأْ — পড়ো',
    }
  }
};

// ─── Islamic Geometric Pattern ───────────────────────────────────────────────
const STAR = "50,18 54.9,37.1 72.4,27.6 62.9,45.1 82,50 62.9,54.9 72.4,72.4 54.9,62.9 50,82 45.1,62.9 27.6,72.4 37.1,54.9 18,50 37.1,45.1 27.6,27.6 45.1,37.1";

function IslamicPattern({ opacity = 1, stroke = "rgba(201,168,76,0.22)", size = 90 }) {
  const id = `ip-${size}`;
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', display: 'var(--pattern-display, block)' }} aria-hidden="true">
      <defs>
        <pattern id={id} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="0.9" opacity={opacity}>
            <polygon points={STAR} transform={`scale(${size/100})`} />
            <polygon points={STAR} transform={`scale(${size/100}) translate(-100,0)`} />
            <polygon points={STAR} transform={`scale(${size/100}) translate(100,0)`} />
            <polygon points={STAR} transform={`scale(${size/100}) translate(0,-100)`} />
            <polygon points={STAR} transform={`scale(${size/100}) translate(0,100)`} />
            <polygon points={STAR} transform={`scale(${size/100}) translate(-100,-100)`} />
            <polygon points={STAR} transform={`scale(${size/100}) translate(100,-100)`} />
            <polygon points={STAR} transform={`scale(${size/100}) translate(-100,100)`} />
            <polygon points={STAR} transform={`scale(${size/100}) translate(100,100)`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimCounter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = target / 60;
      const tick = () => {
        start += step;
        if (start >= target) { setVal(target); return; }
        setVal(Math.floor(start));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({ page, setPage }) {
  const { lang, toggle } = useContext(LangContext);
  const tx = T[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    transition: 'all 0.3s ease',
    background: scrolled ? 'rgba(26,77,58,0.97)' : 'rgba(26,77,58,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
    boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
  };

  return (
    <nav style={navStyle}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <div
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <div style={{
            width: 36, height: 36, background: 'var(--gold)', borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontFamily: 'Amiri, serif', color: 'var(--brown)', fontWeight: 700
          }}>ج</div>
          <div>
            <div style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 600, lineHeight: 1.1 }}>জ্ঞানের উপহার</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Gift of Knowledge</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }} className="desktop-nav">
          {tx.navKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: page === key ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                fontSize: 13, fontWeight: 500, padding: '6px 10px', borderRadius: 3,
                fontFamily: lang === 'bn' ? 'Hind Siliguri, sans-serif' : 'Inter, sans-serif',
                transition: 'color 0.2s',
                borderBottom: page === key ? '1.5px solid var(--gold)' : '1.5px solid transparent',
              }}
            >{tx.nav[i]}</button>
          ))}
          <button
            onClick={toggle}
            style={{
              background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
              color: 'var(--gold)', fontSize: 12, padding: '5px 12px', borderRadius: 3,
              cursor: 'pointer', fontFamily: 'Hind Siliguri, sans-serif', fontWeight: 600,
              marginLeft: 8,
            }}
          >{tx.langSwitch}</button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(m => !m)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 8 }}
          className="hamburger"
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen
              ? <><line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
              : <><line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(20,55,40,0.98)', padding: '16px 24px 24px', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
          {tx.navKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => { setPage(key); setMenuOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                color: page === key ? 'var(--gold)' : 'rgba(255,255,255,0.8)',
                fontSize: 16, padding: '12px 0', borderBottom: '1px solid rgba(201,168,76,0.1)',
                fontFamily: lang === 'bn' ? 'Hind Siliguri, sans-serif' : 'Inter, sans-serif',
              }}
            >{tx.nav[i]}</button>
          ))}
          <button onClick={toggle} style={{ marginTop: 16, background: 'rgba(201,168,76,0.15)', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '8px 16px', borderRadius: 3, cursor: 'pointer', fontFamily: 'Hind Siliguri, sans-serif' }}>{tx.langSwitch}</button>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const { lang } = useContext(LangContext);
  const tx = T[lang];
  return (
    <footer style={{ background: 'var(--green)', color: 'rgba(255,255,255,0.75)', padding: '56px 0 32px', marginTop: 'auto' }}>
      <IslamicPattern opacity={0.5} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>জ্ঞানের উপহার</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 220 }}>{tx.footer.tagline}</p>
            <div style={{ marginTop: 16, fontSize: 22, fontFamily: 'Amiri, serif', color: 'var(--gold)', direction: 'rtl' }}>اِقْرَأْ</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>— Read / পড়ো</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Pages</div>
            {['home','about','books','apply','impact','stories','sdg','contact'].map((k, i) => (
              <button key={k} onClick={() => setPage(k)} style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 13, padding: '4px 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter,sans-serif' }}>{tx.nav[tx.navKeys.indexOf(k)]}</button>
            ))}
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
            <p style={{ fontSize: 13, lineHeight: 1.8 }}>
              <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Facebook: জ্ঞানের উপহার</a><br />
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>info@gyanerupohar.org</span><br />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Operated from Italy · Bangladesh</span>
            </p>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Aligned with</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['SDG 4', 'SDG 10', 'SDG 17'].map(s => (
                <span key={s} style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', padding: '4px 10px', borderRadius: 2, fontSize: 11, fontWeight: 600 }}>{s}</span>
              ))}
            </div>
            <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              <span>Sadaqah Jariyah — not a business</span><br />
              <span>আমানত · Your data is safe</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{tx.footer.rights}</span>
          <button onClick={() => setPage('privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter,sans-serif', textDecoration: 'underline' }}>Privacy Policy</button>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>·</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>No trackers · GDPR</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ label, heading, sub, center = false }) {
  const style = center ? { textAlign: 'center', marginBottom: 48 } : { marginBottom: 48 };
  return (
    <div style={style}>
      {label && <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 12 }}>{label}</div>}
      <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--brown)', fontWeight: 700, maxWidth: center ? 620 : 560, margin: center ? '0 auto 16px' : '0 0 16px' }}>{heading}</h2>
      <div className={center ? 'gold-line-c' : 'gold-line'} style={{ marginBottom: sub ? 20 : 0 }} />
      {sub && <p style={{ color: 'var(--brown-light)', fontSize: 16, lineHeight: 1.7, maxWidth: center ? 560 : 480, margin: center ? '20px auto 0' : '20px 0 0' }}>{sub}</p>}
    </div>
  );
}

// ─── Bangladesh Map ───────────────────────────────────────────────────────────
const BD_DIVISIONS = [
  { name: 'Rangpur', x: 82, y: 44, reached: true },
  { name: 'Mymensingh', x: 148, y: 100, reached: true },
  { name: 'Sylhet', x: 218, y: 80, reached: false },
  { name: 'Rajshahi', x: 52, y: 140, reached: true },
  { name: 'Dhaka', x: 152, y: 150, reached: true },
  { name: 'Khulna', x: 72, y: 228, reached: true },
  { name: 'Barisal', x: 152, y: 240, reached: false },
  { name: 'Chittagong', x: 230, y: 205, reached: true },
];

function BangladeshMap() {
  const [hovered, setHovered] = useState(null);
  const outline = "M 68,8 L 92,5 L 132,18 L 172,12 L 212,32 L 252,58 L 268,102 L 272,148 L 258,185 L 235,220 L 215,268 L 188,290 L 158,300 L 126,285 L 100,258 L 82,232 L 68,212 L 48,198 L 28,168 L 32,132 L 42,98 L 52,62 L 68,8 Z";

  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox="0 0 300 310" style={{ width: '100%', maxWidth: 340, display: 'block', margin: '0 auto' }}>
        <path d={outline} fill="rgba(26,77,58,0.08)" stroke="var(--green)" strokeWidth="1.5" />
        {BD_DIVISIONS.map((div) => (
          <g key={div.name} onMouseEnter={() => setHovered(div.name)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <circle
              cx={div.x} cy={div.y} r={hovered === div.name ? 12 : 8}
              fill={div.reached ? 'var(--green)' : 'var(--cream)'}
              stroke={div.reached ? 'var(--gold)' : 'var(--brown-light)'}
              strokeWidth="1.5"
              style={{ transition: 'r 0.2s ease' }}
            />
            {div.reached && (
              <circle cx={div.x} cy={div.y} r={14}
                fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.4"
              />
            )}
            <text x={div.x} y={div.y + (hovered === div.name ? 26 : 22)}
              textAnchor="middle" fill="var(--brown)" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="500"
            >{div.name}</text>
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--brown-light)' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--green)', border: '1.5px solid var(--gold)' }} />
          Reached
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--brown-light)' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--cream)', border: '1.5px solid var(--brown-light)' }} />
          Planned
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LangContext, T, IslamicPattern, AnimCounter, Header, Footer, SectionHeader, BangladeshMap });
