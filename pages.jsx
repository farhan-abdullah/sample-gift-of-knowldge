
const { useState, useEffect, useRef, useContext } = React;
const { LangContext, T, IslamicPattern, AnimCounter, SectionHeader, BangladeshMap } = window;

// ─── DUAS ────────────────────────────────────────────────────────────────────
const DUAS = [
  {
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    transliteration: "Rabbi zidni 'ilma",
    meaning: 'My Lord, increase me in knowledge.',
    source: 'Quran 20:114',
  },
  {
    arabic: 'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي',
    transliteration: "Allahumma infa'ni bima 'allamtani",
    meaning: 'O Allah, benefit me with what You have taught me.',
    source: 'Hadith — Ibn Majah',
  },
  {
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    transliteration: "Rabbi ishrah li sadri wa yassir li amri",
    meaning: 'My Lord, expand my chest for me and ease my affairs.',
    source: 'Quran 20:25–26',
  },
  {
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا',
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an",
    meaning: 'O Allah, I ask You for beneficial knowledge.',
    source: 'Hadith — Ibn Majah',
  },
  {
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: "Hasbunallahu wa ni'mal wakil",
    meaning: 'Allah is sufficient for us, and He is the best Disposer of affairs.',
    source: 'Quran 3:173',
  },
];

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const { lang } = useContext(LangContext);
  const tx = T[lang];
  const [dua, setDua] = useState(null);
  const [duaIdx, setDuaIdx] = useState(0);

  const pickDua = () => {
    const next = (duaIdx + 1) % DUAS.length;
    setDuaIdx(next);
    setDua(DUAS[next]);
  };

  return (
    <div className="page-enter">
      {/* HERO — white, clean, typographic */}
      <section style={{
        minHeight: '100vh', background: '#fff', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
      }}>
        {/* Subtle gold rule lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--green)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '120px 24px 80px', maxWidth: 760 }}>
          <div style={{ fontSize: 32, fontFamily: 'Amiri, serif', color: 'var(--gold)', direction: 'rtl', marginBottom: 20, lineHeight: 1.4 }}>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          <div style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--brown-light)', marginBottom: 16 }}>Gift of Knowledge · সদকায়ে জারিয়া</div>
          <h1 style={{
            fontFamily: 'Hind Siliguri, sans-serif', fontSize: 'clamp(52px, 9vw, 96px)',
            color: 'var(--green)', fontWeight: 700, lineHeight: 1.0, marginBottom: 16,
          }}>জ্ঞানের উপহার</h1>
          <div style={{ width: 56, height: 2, background: 'var(--gold)', margin: '0 auto 24px' }} />
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'var(--brown-light)', marginBottom: 44, fontFamily: lang === 'bn' ? 'Hind Siliguri, sans-serif' : 'Playfair Display, serif', fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
            {tx.hero.subtitle}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => setPage('apply')} style={{ fontSize: 15, padding: '14px 32px' }}>
              {tx.hero.cta1}
            </button>
            <button className="btn btn-outline-g" onClick={() => setPage('about')} style={{ fontSize: 15, padding: '14px 32px' }}>
              {tx.hero.cta2}
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#fff', padding: '48px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center' }}>
            {[
              { val: 300, suf: '+', label: tx.stats.books },
              { val: 12, suf: '', label: tx.stats.districts },
              { val: 180, suf: '+', label: tx.stats.families },
            ].map((s, i) => (
              <div key={s.label} style={{ borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 52, fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>
                  <AnimCounter target={s.val} suffix={s.suf} />
                </div>
                <div style={{ fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--brown-light)', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionHeader label={tx.mission.label} heading={tx.mission.heading} />
              <p style={{ color: 'var(--brown-light)', fontSize: 16, lineHeight: 1.8, fontFamily: lang === 'bn' ? 'Hind Siliguri, sans-serif' : 'Inter, sans-serif' }}>
                {tx.mission.body}
              </p>
              <button className="btn btn-green" onClick={() => setPage('about')} style={{ marginTop: 28 }}>
                {lang === 'en' ? 'Our Story' : 'আমাদের গল্প'} →
              </button>
            </div>
            {/* Quote panel — white with gold border */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 48, textAlign: 'center', background: '#fff' }}>
              <div style={{ fontFamily: 'Amiri, serif', fontSize: 34, color: 'var(--green)', direction: 'rtl', lineHeight: 1.5, marginBottom: 20 }}>
                اِقْرَأْ بِاسْمِ رَبِّكَ
              </div>
              <div style={{ fontSize: 13, color: 'var(--brown-light)', fontStyle: 'italic' }}>
                "Read in the name of your Lord"
              </div>
              <div style={{ fontSize: 11, color: 'var(--gold)', marginTop: 4, fontWeight: 600 }}>Quran 96:1 — The first revelation</div>
              <div style={{ width: 40, height: 1, background: 'var(--border)', margin: '24px auto' }} />
              <div style={{ fontSize: 13, color: 'var(--brown-light)', lineHeight: 1.7 }}>
                "The best of charity is when a Muslim man acquires knowledge and then shares it with his Muslim brother."
              </div>
              <div style={{ fontSize: 11, color: 'var(--gold)', marginTop: 8, fontWeight: 600 }}>— Ibn Majah</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader label="What We Do" heading="Our Initiatives" center />
          <div className="grid-3">
            {[
              { icon: '📖', title: 'Book Distribution', desc: 'Free books sent to individuals across Bangladesh — students, scholars, and curious minds.' },
              { icon: '🕌', title: 'Quran Gifting', desc: 'Bulk distribution of Qurans to mosques, madrasas, and families in need.' },
              { icon: '📚', title: 'Community Libraries', desc: 'Building small libraries in villages and schools to create lasting knowledge infrastructure.' },
            ].map((p) => (
              <div key={p.title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, marginBottom: 10, color: 'var(--green)' }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--brown-light)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button className="btn btn-outline-g" onClick={() => setPage('projects')}>
              {lang === 'en' ? 'View All Projects' : 'সব প্রকল্প দেখুন'}
            </button>
          </div>
        </div>
      </section>

      {/* DUA SECTION */}
      <section className="section" style={{ background: 'var(--green)', position: 'relative', overflow: 'hidden' }}>
        <IslamicPattern />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 680, textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>{tx.dua.label}</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: '#fff', marginBottom: 8 }}>{tx.dua.heading}</h2>
          <div style={{ width: 40, height: 1, background: 'var(--gold)', margin: '16px auto 32px' }} />
          {dua ? (
            <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 6, padding: 40, marginBottom: 28 }}>
              <div style={{ fontFamily: 'Amiri, serif', fontSize: 38, color: 'var(--gold)', direction: 'rtl', lineHeight: 1.5, marginBottom: 20 }}>{dua.arabic}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', marginBottom: 8 }}>{dua.transliteration}</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 12 }}>{dua.meaning}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px' }}>{dua.source}</div>
            </div>
          ) : (
            <div style={{ marginBottom: 28, padding: '32px 0', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
              Press the button to receive a dua for your journey of knowledge.
            </div>
          )}
          <button className="btn btn-gold" onClick={pickDua} style={{ fontSize: 15 }}>
            {dua ? tx.dua.new : tx.dua.btn}
          </button>
        </div>
      </section>

      {/* SDG CALLOUT */}
      <section className="section-sm" style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--brown-light)', marginBottom: 16 }}>Aligned with UN Sustainable Development Goals</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { id: 'SDG 4', label: 'Quality Education', color: '#C5192D' },
              { id: 'SDG 10', label: 'Reduced Inequalities', color: '#DD1367' },
              { id: 'SDG 17', label: 'Partnerships', color: '#19486A' },
            ].map(s => (
              <div key={s.id} style={{ background: s.color, color: '#fff', padding: '8px 18px', borderRadius: 3, fontSize: 12, fontWeight: 600 }}>
                {s.id} · {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  const { lang } = useContext(LangContext);
  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      {/* Banner */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>About Us</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,5vw,52px)', color: 'var(--green)', maxWidth: 560 }}>Our story, mission & vision</h1>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginTop: 20 }} />
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <SectionHeader label="The Story" heading="Born from a love of knowledge" />
              <p style={{ color: 'var(--brown-light)', fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
                জ্ঞানের উপহার began with a simple belief: that every person deserves access to books — regardless of their economic condition. Founded by Farhan Abdullah from Italy, the initiative bridges the diaspora's care for Bangladesh with tangible, lasting action.
              </p>
              <p style={{ color: 'var(--brown-light)', fontSize: 16, lineHeight: 1.8 }}>
                What started as sending a few books to family in Bangladesh grew into a structured initiative reaching multiple districts, building community libraries, and distributing hundreds of Qurans to those who yearned for them.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '🕌', label: 'Mission', text: 'To make knowledge accessible to every Muslim in Bangladesh — through books, Qurans, and libraries — for the sake of Allah.' },
                { icon: '🌙', label: 'Vision', text: 'A Bangladesh where no one is denied learning due to poverty, and where knowledge flows freely as a sadaqah jariyah.' },
                { icon: '✦', label: 'Our Niyyat', text: 'Everything we do is fillah — for Allah alone. No commercial interest. No ego. Only sincerity.' },
              ].map(v => (
                <div key={v.label} className="card card-sm" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{v.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--green)', fontSize: 14, letterSpacing: '0.5px', marginBottom: 6 }}>{v.label}</div>
                    <p style={{ fontSize: 14, color: 'var(--brown-light)', lineHeight: 1.7 }}>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-sm" style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <SectionHeader label="Founder" heading="Farhan Abdullah" center />
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, background: 'var(--gold-pale)', border: '2px solid var(--gold)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontFamily: 'Amiri, serif', color: 'var(--green)' }}>ف</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 6 }}>Farhan Abdullah</h3>
            <div style={{ fontSize: 12, color: 'var(--brown-light)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>Founder · Italy</div>
            <p style={{ fontSize: 15, color: 'var(--brown-light)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>
              A Bangladeshi living in Italy, Farhan founded this initiative out of a deep desire to give back — not through wealth alone, but through the most enduring form of charity: knowledge. His work proves that diaspora love, when channelled with sincerity, can transform communities.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHeader label="Our Values" heading="What guides us" center />
          <div className="grid-4">
            {['Sincerity (Ikhlas)', 'Trust (Amanah)', 'Knowledge (Ilm)', 'Community (Ummah)'].map(v => (
              <div key={v} style={{ textAlign: 'center', padding: '24px 16px', border: '1px solid var(--border)', borderRadius: 6, background: '#fff' }}>
                <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '0 auto 16px' }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--green)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROJECTS PAGE ────────────────────────────────────────────────────────────
function ProjectsPage({ setPage }) {
  const projects = [
    { icon: '📖', title: 'Individual Book Distribution', tag: 'Active', desc: 'Books sent directly to individuals across Bangladesh — students, curious minds, and those who request them. Any genre: Islamic, science, literature, self-development.' },
    { icon: '🕌', title: 'Quran Distribution', tag: 'Active', desc: 'Bulk gifting of Qurans (with translation) to mosques, madrasas, households, and individuals who cannot afford one. Every copy is a gift of light.' },
    { icon: '📚', title: 'Community Libraries', tag: 'Growing', desc: 'Establishing small curated libraries in villages and schools — creating permanent knowledge infrastructure that serves generations.' },
    { icon: '🤲', title: "দু'আ হিফজ Project", tag: 'Active', desc: 'Distributing dua booklets and small Quran excerpts to help Muslims memorize essential supplications for daily life.' },
    { icon: '🇮🇹', title: 'Mini Library A2Z Italia', tag: 'Italy', desc: 'A growing Bengali library in Italy serving the diaspora community — bridging cultural roots with the land they now call home.' },
  ];
  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>Initiatives</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,5vw,52px)', color: 'var(--green)', maxWidth: 560 }}>Our projects across Bangladesh & beyond</h1>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginTop: 20 }} />
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {projects.map((p, i) => (
              <div key={p.title} className="card" style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'center' }}>
                <div style={{ fontSize: 44, textAlign: 'center' }}>{p.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'var(--brown)' }}>{p.title}</h3>
                    <span className="tag">{p.tag}</span>
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--brown-light)', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <button className="btn btn-gold" onClick={() => setPage('apply')}>Request a Book →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APPLY PAGE (multi-step form) ─────────────────────────────────────────────
function ApplyPage() {
  const { lang } = useContext(LangContext);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', district: '', phone: '', type: '', books: '', reason: '', heard: '' });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (submitted) return (
    <div className="page-enter" style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: 32 }}>
        <div className="success-check">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16l7 7 13-13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ fontFamily: 'Amiri, serif', fontSize: 28, color: 'var(--gold)', direction: 'rtl', marginBottom: 16 }}>جَزَاكَ اللَّهُ خَيْرًا</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--brown)', marginBottom: 12 }}>Jazakallahu Khairan!</h2>
        <p style={{ color: 'var(--brown-light)', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>Your request has been received. Our team reviews all applications with care. You will be contacted within 7–14 days, in sha Allah.</p>
        <div style={{ background: 'var(--gold-pale)', border: '1px solid var(--border)', borderRadius: 4, padding: '16px 24px', fontSize: 13, color: 'var(--brown-mid)', lineHeight: 1.6 }}>
          While you wait, consider sharing our initiative with someone who might benefit. Knowledge shared is sadaqah jariyah.
        </div>
      </div>
    </div>
  );

  const steps = ['Your Details', 'Book Request', 'Review'];
  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>Apply</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,5vw,48px)', color: '#fff', maxWidth: 560 }}>Request a book — it's free, always</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, maxWidth: 440, fontSize: 15 }}>All books are gifted as sadaqah. No payment, no obligation. Just a sincere love of knowledge.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 640 }}>
          {/* Step indicator */}
          <div className="steps">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div className="step-item">
                  <div className={`step-circle ${i + 1 < step ? 'step-done' : i + 1 === step ? 'step-active' : 'step-inactive'}`}>
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 13, color: i + 1 === step ? 'var(--brown)' : 'var(--brown-light)', fontWeight: i + 1 === step ? 600 : 400 }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className="step-line" />}
              </React.Fragment>
            ))}
          </div>

          <div className="card">
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 24 }}>Tell us about yourself</h3>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">District in Bangladesh *</label>
                  <select className="form-input form-select" value={form.district} onChange={e => set('district', e.target.value)}>
                    <option value="">Select your district...</option>
                    {['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh', 'Comilla', 'Narayanganj', 'Other'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+880..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Request Type *</label>
                  <select className="form-input form-select" value={form.type} onChange={e => set('type', e.target.value)}>
                    <option value="">Select type...</option>
                    <option>Book(s) for myself</option>
                    <option>Books for a school / library</option>
                    <option>Quran copy</option>
                    <option>Bulk donation for institution</option>
                  </select>
                </div>
                <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => { if (form.name && form.district && form.type) setStep(2); }}>
                  Continue →
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 24 }}>Tell us about the books</h3>
                <div className="form-group">
                  <label className="form-label">Which books are you looking for?</label>
                  <textarea className="form-input" value={form.books} onChange={e => set('books', e.target.value)} placeholder="Titles, genres, or topics you're interested in (Islamic, science, literature, children's books, etc.)" />
                </div>
                <div className="form-group">
                  <label className="form-label">Why do you want these books?</label>
                  <textarea className="form-input" value={form.reason} onChange={e => set('reason', e.target.value)} placeholder="Share your story — we love to understand the person behind each request." />
                </div>
                <div className="form-group">
                  <label className="form-label">How did you hear about us?</label>
                  <select className="form-input form-select" value={form.heard} onChange={e => set('heard', e.target.value)}>
                    <option value="">Select...</option>
                    <option>Facebook</option>
                    <option>Friend / Family</option>
                    <option>Mosque</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline-g" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-gold" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(3)}>Review →</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 24 }}>Review your request</h3>
                <div style={{ background: 'var(--cream-light)', border: '1px solid var(--border)', borderRadius: 4, padding: 24, marginBottom: 24 }}>
                  {[['Name', form.name], ['District', form.district], ['Phone', form.phone || '—'], ['Request Type', form.type], ['Books requested', form.books || '—'], ['Reason', form.reason || '—']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 14 }}>
                      <div style={{ color: 'var(--brown-light)', width: 120, flexShrink: 0 }}>{k}</div>
                      <div style={{ color: 'var(--brown)', fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: 'var(--brown-light)', lineHeight: 1.7, marginBottom: 20, padding: '12px 16px', background: 'rgba(201,168,76,0.08)', borderRadius: 4, borderLeft: '3px solid var(--gold)' }}>
                  By submitting, you agree that your information is used only to fulfill this book request. We do not share your data. آمانت.
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline-g" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn btn-gold" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setSubmitted(true)}>
                    Submit Request ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── IMPACT PAGE ──────────────────────────────────────────────────────────────
function ImpactPage() {
  const { lang } = useContext(LangContext);
  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>Impact</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,5vw,52px)', color: 'var(--green)', maxWidth: 560 }}>Every number is a life touched by knowledge</h1>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginTop: 20 }} />
        </div>
      </div>

      {/* Stats */}
      <section className="section-sm" style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
            {[
              { val: 300, suf: '+', label: 'Books Donated' },
              { val: 12, suf: '', label: 'Districts Reached' },
              { val: 180, suf: '+', label: 'Families Served' },
              { val: 3, suf: '', label: 'Libraries Built' },
            ].map(s => (
              <div key={s.label}>
                <div className="stat-num"><AnimCounter target={s.val} suffix={s.suf} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Stories */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <SectionHeader label="Reach" heading="Districts we've touched" />
              <BangladeshMap />
            </div>
            <div>
              <SectionHeader label="Stories" heading="Story of the month" />
              <div className="card" style={{ borderLeft: '3px solid var(--gold)' }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>April 2025 · Rajshahi</div>
                <p style={{ fontSize: 15, color: 'var(--brown-light)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 16 }}>
                  "I had been wanting to learn more about Islam for years but could not afford the books. When the Quran arrived at my door, I cried. For the first time in my life, I felt that someone cared about my knowledge. May Allah reward them."
                </p>
                <div style={{ fontSize: 13, color: 'var(--brown-light)', fontWeight: 500 }}>— Recipient, Rajshahi (name withheld)</div>
              </div>
              <div className="card card-sm" style={{ marginTop: 20, background: 'var(--gold-pale)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, color: 'var(--brown)', lineHeight: 1.7 }}>
                  <strong style={{ display: 'block', marginBottom: 8 }}>SDG 4 — Quality Education</strong>
                  Our work directly supports Target 4.6 (literacy) and 4.7 (knowledge for sustainable development) across 12 districts of Bangladesh.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── VOLUNTEERS PAGE ──────────────────────────────────────────────────────────
function VolunteersPage() {
  const [sent, setSent] = useState(false);
  const [vform, setVform] = useState({ name: '', location: '', skill: '', message: '' });
  const set = (k, v) => setVform(f => ({ ...f, [k]: v }));
  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>Join Us</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,5vw,52px)', color: 'var(--green)', maxWidth: 560 }}>Become a volunteer — earn sadaqah jariyah</h1>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginTop: 20 }} />
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <SectionHeader label="How to join" heading="What volunteers do" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { n: '01', t: 'Identify recipients', d: 'Help us find individuals, schools, or mosques in your area that would benefit from books.' },
                  { n: '02', t: 'Coordinate delivery', d: 'Assist with the logistics of getting books from our distribution points to recipients.' },
                  { n: '03', t: 'Share the mission', d: 'Spread the word on Facebook, at your mosque, or within your community.' },
                  { n: '04', t: 'Document impact', d: 'Photograph book handoffs (with consent) and share stories so we can inspire others.' },
                ].map(r => (
                  <div key={r.n} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 28, fontFamily: 'Playfair Display, serif', color: 'var(--gold)', fontWeight: 700, flexShrink: 0, lineHeight: 1 }}>{r.n}</div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--brown)', marginBottom: 4 }}>{r.t}</div>
                      <p style={{ fontSize: 14, color: 'var(--brown-light)', lineHeight: 1.6 }}>{r.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeader label="Apply" heading="Volunteer application" />
              {sent ? (
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>🤲</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 12 }}>Jazakallahu Khairan!</h3>
                  <p style={{ color: 'var(--brown-light)', fontSize: 15 }}>We'll be in touch soon, in sha Allah.</p>
                </div>
              ) : (
                <div className="card">
                  {[['name', 'Your Name', 'text', 'Full name'], ['location', 'Your Location', 'text', 'City, Country']].map(([k, l, t, p]) => (
                    <div key={k} className="form-group">
                      <label className="form-label">{l}</label>
                      <input type={t} className="form-input" value={vform[k]} onChange={e => set(k, e.target.value)} placeholder={p} />
                    </div>
                  ))}
                  <div className="form-group">
                    <label className="form-label">Your skills / how you can help</label>
                    <select className="form-input form-select" value={vform.skill} onChange={e => set('skill', e.target.value)}>
                      <option value="">Select...</option>
                      <option>Ground distribution (Bangladesh)</option>
                      <option>Social media & content</option>
                      <option>Translation (Bengali/English/Arabic)</option>
                      <option>Fundraising</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message (optional)</label>
                    <textarea className="form-input" value={vform.message} onChange={e => set('message', e.target.value)} placeholder="Tell us a bit about yourself and why you'd like to join..." />
                  </div>
                  <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSent(true)}>Submit Application</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── BLOG PAGE ────────────────────────────────────────────────────────────────
function BlogPage() {
  const posts = [
    { date: 'April 2025', tag: 'Update', title: 'Ramadan 1446: 80 books delivered across Rajshahi', excerpt: 'This Ramadan, we distributed 80 books and Qurans across 6 upazilas in Rajshahi division, reaching families who had never owned a personal Quran.' },
    { date: 'March 2025', tag: 'Story', title: 'How one book changed a teacher\'s classroom', excerpt: 'A primary school teacher in Mymensingh requested books for her students. Three months later, reading time is now the favourite part of the school day.' },
    { date: 'February 2025', tag: 'Knowledge', title: 'The psychology of reading: why books heal', excerpt: 'Research consistently shows that access to books in childhood is one of the strongest predictors of lifelong learning. We explore why our work matters beyond the spiritual.' },
    { date: 'January 2025', tag: 'Impact', title: 'Year in review: 2024 by the numbers', excerpt: 'Looking back at our first full year of operation — the districts we reached, the books we gifted, and the lessons we learned.' },
    { date: 'December 2024', tag: 'Update', title: 'Community library opens in Khulna', excerpt: 'After months of planning, our first dedicated community library shelf was installed in a mosque in Khulna, with 60 books available for free borrowing.' },
    { date: 'November 2024', tag: 'Story', title: "A student's prayer answered", excerpt: 'A university student wrote to us asking for books she couldn\'t afford. Within two weeks, she received a package that changed the course of her studies.' },
  ];
  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>Blog & News</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,5vw,52px)', color: 'var(--green)', maxWidth: 560 }}>Updates, stories & reflections</h1>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginTop: 20 }} />
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {posts.map(p => (
              <div key={p.title} className="card" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,77,58,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div className="img-placeholder" style={{ marginBottom: 20 }}>blog photo</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span className="tag">{p.tag}</span>
                  <span style={{ fontSize: 11, color: 'var(--brown-light)' }}>{p.date}</span>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--brown-light)', lineHeight: 1.7, flex: 1 }}>{p.excerpt}</p>
                <div style={{ marginTop: 16, fontSize: 13, color: 'var(--green)', fontWeight: 500 }}>Read more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>Contact</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,5vw,52px)', color: 'var(--green)', maxWidth: 560 }}>As-salamu alaikum — reach out</h1>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginTop: 20 }} />
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="grid-3">
            {[
              { icon: '📘', label: 'Facebook', val: 'জ্ঞানের উপহার', sub: 'Our primary channel', link: '#' },
              { icon: '✉️', label: 'Email', val: 'info@gyanerupohar.org', sub: 'For formal inquiries', link: 'mailto:info@gyanerupohar.org' },
              { icon: '🌍', label: 'Operated from', val: 'Italy + Bangladesh', sub: 'Diaspora-led initiative', link: null },
            ].map(c => (
              <div key={c.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--brown-light)', marginBottom: 6 }}>{c.label}</div>
                {c.link ? (
                  <a href={c.link} style={{ color: 'var(--green)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>{c.val}</a>
                ) : (
                  <div style={{ color: 'var(--green)', fontWeight: 600, fontSize: 15 }}>{c.val}</div>
                )}
                <div style={{ fontSize: 12, color: 'var(--brown-light)', marginTop: 4 }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, padding: '40px', background: '#fff', border: '1px solid var(--border)', borderRadius: 6, textAlign: 'center' }}>
            <div>
              <div style={{ fontFamily: 'Amiri, serif', fontSize: 36, color: 'var(--green)', direction: 'rtl', marginBottom: 16 }}>وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ</div>
              <div style={{ color: 'var(--brown-light)', fontSize: 14, fontStyle: 'italic' }}>Wa alaikum assalam wa rahmatullah</div>
              <div style={{ color: 'var(--brown-light)', fontSize: 12, marginTop: 8 }}>We respond to every message, in sha Allah. Allow 3–5 working days.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PRIVACY POLICY PAGE ──────────────────────────────────────────────────────
function PrivacyPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 600 }}>Legal</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,5vw,44px)', color: 'var(--green)', maxWidth: 560 }}>Privacy Policy</h1>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginTop: 20 }} />
          <p style={{ color: 'var(--brown-light)', marginTop: 14, fontSize: 14 }}>Last updated: April 2025 · Effective immediately</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {/* Intro */}
          <div style={{ background: 'rgba(26,77,58,0.04)', border: '1px solid var(--border)', borderLeft: '3px solid var(--gold)', borderRadius: 6, padding: '20px 24px', marginBottom: 40 }}>
            <p style={{ fontSize: 15, color: 'var(--brown)', lineHeight: 1.8 }}>
              জ্ঞানের উপহার (<em>Gift of Knowledge</em>) è un'iniziativa non commerciale gestita da volontari, fondata in Italia, che distribuisce libri e Corani in Bangladesh gratuitamente, per il bene di Allah. Questa politica spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati.
            </p>
          </div>

          {[
            {
              n: '1', title: 'Chi siamo / Who we are',
              body: `জ্ঞানের উপহার è un'iniziativa di beneficenza islamica (sadaqah jariyah) operante dall'Italia con attività in Bangladesh. Non siamo un'azienda registrata né un ente con fini di lucro. Tutto il lavoro è svolto volontariamente, li-llah.\n\nPer contatti: info@gyanerupohar.org`
            },
            {
              n: '2', title: 'Dati che raccogliamo / Data we collect',
              body: `Quando compili il modulo di richiesta libro o di volontariato, raccogliamo:\n\n• Nome completo\n• Distretto / indirizzo di consegna\n• Numero di telefono o WhatsApp (facoltativo)\n• Tipo di richiesta e titoli dei libri desiderati\n• Motivazione della richiesta\n• Come sei venuto a conoscenza di noi\n\nNon raccogliamo dati di pagamento (il servizio è gratuito), non utilizziamo cookie di profilazione, non installiamo tracker di terze parti.`
            },
            {
              n: '3', title: 'Come utilizziamo i dati / How we use your data',
              body: `I dati raccolti vengono utilizzati esclusivamente per:\n\n• Elaborare e consegnare la tua richiesta di libri\n• Coordinare i volontari per la distribuzione\n• Contattarti in merito allo stato della tua richiesta\n• Migliorare il nostro servizio (statistiche aggregate, senza identificazione personale)\n\nNon vendiamo, affittiamo né condividiamo i tuoi dati personali con terze parti a scopo commerciale.`
            },
            {
              n: '4', title: 'Base giuridica / Legal basis',
              body: `Il trattamento dei tuoi dati si basa sul tuo consenso esplicito, fornito al momento della compilazione del modulo, e sulla necessità di eseguire il servizio richiesto (consegna gratuita di libri). Ai sensi del GDPR (Regolamento UE 2016/679), hai il diritto di:\n\n• Accedere ai tuoi dati\n• Richiedere la rettifica o la cancellazione\n• Opporti al trattamento\n• Richiedere la portabilità dei dati\n\nPer esercitare questi diritti scrivi a: info@gyanerupohar.org`
            },
            {
              n: '5', title: 'Conservazione dei dati / Data retention',
              body: `I dati relativi alle richieste vengono conservati per il tempo necessario all'evasione della richiesta e per un massimo di 24 mesi successivi, al fine di gestire eventuali follow-up. Puoi richiedere la cancellazione anticipata in qualsiasi momento.`
            },
            {
              n: '6', title: 'Sicurezza / Security',
              body: `I dati sono conservati localmente nei sistemi dell'iniziativa e accessibili solo al personale autorizzato (admin e staff di distribuzione). Non utilizziamo database cloud pubblici. Adottiamo ragionevoli misure tecniche e organizzative per proteggere le informazioni.`
            },
            {
              n: '7', title: 'Cookie e tecnologie di tracciamento',
              body: `Questo sito web non utilizza cookie di profilazione né tracker pubblicitari. Nessun dato viene trasmesso a piattaforme di analytics di terze parti. L'unico dato conservato nel browser è lo stato della sessione (localStorage), che rimane sul tuo dispositivo e non viene trasmesso.`
            },
            {
              n: '8', title: 'Minori / Minors',
              body: `Il nostro servizio è aperto a tutti, inclusi studenti e famiglie. Non raccogliamo consapevolmente dati di minori di 13 anni senza il consenso di un genitore o tutore. Se ritieni che dati di un minore siano stati raccolti senza consenso, contattaci immediatamente.`
            },
            {
              n: '9', title: 'Modifiche alla policy / Changes',
              body: `Possiamo aggiornare questa policy di tanto in tanto. Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento. L'uso continuato del sito dopo le modifiche costituisce accettazione della nuova policy.`
            },
            {
              n: '10', title: 'Contatti / Contact',
              body: `Per qualsiasi domanda relativa alla privacy:\n\nEmail: info@gyanerupohar.org\nFacebook: জ্ঞানের উপহার\nOperativa da: Italia · Attività in: Bangladesh`
            },
          ].map(s => (
            <div key={s.n} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: 'var(--gold)', lineHeight: 1, flexShrink: 0, width: 32 }}>{s.n}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--green)', marginBottom: 12 }}>{s.title}</h3>
                  {s.body.split('\n\n').map((para, i) => (
                    <p key={i} style={{ fontSize: 14, color: 'var(--brown-light)', lineHeight: 1.85, marginBottom: 10, whiteSpace: 'pre-line' }}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* GDPR badge */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            {['GDPR Compliant', 'No Trackers', 'No Ads', 'Free Service', 'Amanah — آمانة'].map(b => (
              <span key={b} style={{ background: 'rgba(26,77,58,0.07)', border: '1px solid var(--border)', color: 'var(--green)', padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage, AboutPage, ProjectsPage, ApplyPage, ImpactPage, VolunteersPage, BlogPage, ContactPage, PrivacyPage, DUAS });
