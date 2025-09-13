import React, { useState, useEffect } from 'react';

// pages/index.js - نسخة بدون Tailwind، CSS مدمج داخل الملف.
// يحافظ على نفس المحتوى والوظائف: sidebar للموبايل، نسخ/مشاركة الرابط، preview، تأثيرات بسيطة.

export default function Home() {
  const [username, setUsername] = useState('اسم_الشخص');
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');
  const [sending, setSending] = useState(false);
  const [openMenu, setOpenMenu] = useState(false); // sidebar state

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  const profileLink = origin ? `${origin}/${encodeURIComponent(username)}` : `/${encodeURIComponent(username)}`;

  async function copyLink() {
    try {
      if (!navigator.clipboard) return;
      await navigator.clipboard.writeText(profileLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  }

  function shareLink() {
    if (navigator.share) {
      navigator.share({ title: 'رابط تيلو', url: profileLink }).catch(() => {});
    } else {
      copyLink();
      alert('تم نسخ الرابط. الصقه في الستوري أو البايو.');
    }
  }

  return (
    <div dir="rtl" className="page-root">
      {/* backdrop for sidebar */}
      <div
        className={`backdrop ${openMenu ? 'open' : ''}`}
        onClick={() => setOpenMenu(false)}
        aria-hidden={!openMenu}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${openMenu ? 'open' : ''}`} role="dialog" aria-hidden={!openMenu}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="logo">ت</div>
            <div>
              <div className="brand-title">تيلو</div>
              <div className="brand-sub">صراحة بلا حدود</div>
            </div>
          </div>
          <button className="btn small" onClick={() => setOpenMenu(false)}>إغلاق</button>
        </div>

        <nav className="sidebar-nav">
          <a href="/" className="nav-link">الرئيسية</a>
          <a href="/login" className="nav-link">تسجيل الدخول</a>
          <a href="/signup" className="nav-link">انشئ حسابك</a>

          <div className="sidebar-section">
            <div className="section-title">مزايا</div>
            <a className="nav-link">مجهول</a>
            <a className="nav-link">تحكم كامل</a>
            <a className="nav-link">آمن</a>
          </div>
        </nav>
      </aside>

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">ت</div>
          <div className="site-info">
            <div className="site-title">تيلو</div>
            <div className="site-sub">صراحة بلا حدود</div>
          </div>
        </div>

        <nav className="desktop-nav">
          <a href="/" className="nav-main">الرئيسية</a>
          <a href="/login" className="btn ghost">تسجيل الدخول</a>
          <a href="/signup" className="btn primary">انشئ حسابك</a>
        </nav>

        <div className="mobile-controls">
          <button onClick={() => setOpenMenu(true)} aria-label="فتح القائمة" className="hamburger">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="main">
        <div className="container">
          {/* Left */}
          <section className="left">
            <h2 className="hero-title">حان وقت الصراحة — احصل على رسائل صادقة ومباشرة</h2>
            <p className="hero-sub">شارك رابطك في البايو أو الستوري. تيلو يحمي الخصوصية ويمنحك مساحة صريحة للتعليقات والآراء.</p>

            <div className="controls">
              <a href="/login" className="btn-cta">ابدأ الآن</a>

              <div className="input-row">
                <input
                  aria-label="preview username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^\u0621-\u064A0-9A-Za-z_-]/g, ''))}
                  className="input"
                />
                <button onClick={copyLink} className="btn white">نسخ الرابط</button>
                <button onClick={shareLink} className="btn gradient">مشاركة</button>
              </div>
            </div>

            {copied && <p className="copied-msg">تم نسخ الرابط!</p>}

            <div className="features">
              <div className="feature">
                <h4>مجهول</h4>
                <p>لا يظهر اسم المرسل.</p>
              </div>
              <div className="feature">
                <h4>تحكم</h4>
                <p>حذف وحظر ومراجعة.</p>
              </div>
              <div className="feature">
                <h4>آمن</h4>
                <p>reCAPTCHA وقيود لمنع السبام.</p>
              </div>
            </div>
          </section>

          {/* Right */}
          <aside className="right">
            <div className="preview-card">
              <div className="card-top">
                <div className="avatar">س</div>
                <div className="user-info">
                  <div className="username">{username}</div>
                  <div className="handle">@{username}</div>
                </div>
              </div>

              <div className="card-body">
                <textarea placeholder="اكتب رسالتك..." rows={5} className="textarea" />
                <div className="send-row">
                  <div className="note">مجهول</div>
                  <button className={`btn gradient ${sending ? 'disabled' : ''}`}>{sending ? 'جاري الإرسال...' : 'إرسال'}</button>
                </div>

                <div className="preview-link-label">رابط المعاينة:</div>
                <div className="preview-link">{profileLink}</div>

                <div className="card-actions">
                  <button onClick={copyLink} className="btn white">نسخ</button>
                  <button onClick={shareLink} className="btn gradient">مشاركة</button>
                </div>
              </div>
            </div>

            <div className="story-badge">شارك في الستوري</div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} Tello</div>
          <div className="footer-links">الخصوصية · الشروط</div>
        </div>
      </footer>

      <style jsx>{`
        :root{
          --sky-1: #e6f7ff;
          --sky-2: #f7fdff;
          --accent-1: #7dd3fc;
          --accent-2: #38bdf8;
          --cta-from: #7dd3fc;
          --cta-to: #38bdf8;
          --teal-1: #bfefff;
          --deep: #0369a1;
          --card-bg: #ffffff;
        }

        /* page root */
        .page-root{
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          background: linear-gradient(180deg, var(--sky-1), var(--sky-2));
          min-height: 100vh;
          color: #0f172a;
          position: relative;
          overflow-x: hidden;
        }

        /* backdrop */
        .backdrop{
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 40;
          opacity: 0;
          pointer-events: none;
          transition: opacity .25s ease;
        }
        .backdrop.open{
          opacity: 1;
          pointer-events: auto;
        }

        /* Sidebar */
        .sidebar{
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          width: 280px;
          background: var(--card-bg);
          z-index: 50;
          transform: translateX(110%);
          transition: transform .28s cubic-bezier(.2,.9,.2,1);
          box-shadow: 0 10px 30px rgba(2,6,23,0.12);
          display: flex;
          flex-direction: column;
        }
        .sidebar.open{
          transform: translateX(0);
        }
        .sidebar-header{
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand{ display:flex; gap:12px; align-items:center; }
        .logo{ width:40px; height:40px; border-radius:999px; display:flex; align-items:center; justify-content:center; color:white; font-weight:700;
          background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
        }
        .brand-title{ font-weight:700; }
        .brand-sub{ font-size:12px; color:#64748b; }

        .sidebar-nav{ padding:16px; display:flex; flex-direction:column; gap:8px; }
        .nav-link{ display:block; padding:8px 10px; border-radius:8px; color:#0f172a; text-decoration:none; }
        .nav-link:hover{ background:#f8fafc; }

        .sidebar-section{ margin-top:12px; border-top:1px solid #f1f5f9; padding-top:12px; }

        /* Header */
        .header{
          z-index:10;
          position:relative;
          max-width:1100px;
          margin:0 auto;
          padding:16px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }
        .header-left{ display:flex; gap:12px; align-items:center; }
        .logo-circle{ width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; color:white; font-weight:800;
          background: linear-gradient(135deg, var(--cta-from), var(--cta-to));
          box-shadow: 0 8px 24px rgba(56,189,248,0.18);
        }
        .site-info{ display:none; } /* hide on small screens, shown on desktop via media query */
        .site-title{ font-weight:800; }
        .site-sub{ font-size:12px; color:#64748b; }

        .desktop-nav{ display:none; gap:12px; align-items:center; }
        .nav-main{ color:#0f172a; text-decoration:none; margin-right:8px; }
        .btn{ padding:10px 14px; border-radius:10px; font-weight:600; cursor:pointer; border:0; }
        .btn.ghost{ background:transparent; border:1px solid rgba(15,23,42,0.06); }
        .btn.small{ padding:6px 8px; font-size:14px; }
        .btn.primary{ background: linear-gradient(90deg,var(--cta-from),var(--cta-to)); color:white; }
        .btn.white{ background:white; color:#0f172a; border:1px solid #e6eef6; }
        .btn.gradient{ background: linear-gradient(90deg,var(--cta-from),var(--cta-to)); color:white; border:0; }

        .hamburger{ background:white; border-radius:8px; padding:8px; border:0; box-shadow: 0 6px 18px rgba(2,6,23,0.08); }

        /* Main area */
        .main{ z-index:5; padding:18px 16px 40px; display:flex; justify-content:center; }
        .container{ max-width:1100px; width:100%; display:grid; grid-template-columns: 1fr; gap:24px; align-items:start; }
        .left{ padding:6px; }
        .right{ padding:6px; display:flex; justify-content:center; }

        .hero-title{ font-size:20px; margin:4px 0 10px; font-weight:800; color:#0f172a; }
        .hero-sub{ color:#475569; margin-bottom:14px; }

        .controls{ display:flex; flex-direction:column; gap:12px; }
        .btn-cta{ display:inline-block; padding:12px 22px; background: linear-gradient(90deg,var(--cta-from),var(--cta-to)); color:white; border-radius:12px; text-decoration:none; font-weight:700; box-shadow: 0 12px 30px rgba(7,89,133,0.08); }

        .input-row{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:6px; }
        .input{ padding:10px 12px; border-radius:10px; border:1px solid #dbeafe; min-width:180px; width:220px; font-size:15px; }

        .copied-msg{ color:#059669; margin-top:6px; }

        .features{ display:grid; grid-template-columns: 1fr; gap:10px; margin-top:12px; }
        .feature{ background: rgba(255,255,255,0.6); padding:12px; border-radius:10px; text-align:center; box-shadow: 0 6px 18px rgba(2,6,23,0.04); }
        .feature h4{ margin:0 0 6px; }

        /* preview card */
        .preview-card{ background: var(--card-bg); border-radius:18px; padding:14px; width:100%; box-shadow: 0 12px 36px rgba(2,6,23,0.08); }
        .card-top{ display:flex; gap:12px; align-items:center; }
        .avatar{ width:52px; height:52px; border-radius:12px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg,var(--cta-from),var(--cta-to)); color:white; font-weight:700; }
        .username{ font-weight:700; color:#0f172a; }
        .handle{ color:#64748b; font-size:13px; }

        .card-body{ margin-top:12px; }
        .textarea{ width:100%; padding:10px; border-radius:12px; border:1px solid #e6f6ff; min-height:100px; font-size:15px; resize:vertical; }
        .send-row{ display:flex; align-items:center; justify-content:space-between; margin-top:10px; gap:12px; }
        .note{ color:#64748b; font-size:12px; }

        .preview-link-label{ margin-top:12px; color:#64748b; font-size:12px; }
        .preview-link{ margin-top:6px; color:var(--deep); word-break:break-all; }

        .card-actions{ display:flex; gap:10px; margin-top:12px; }

        .story-badge{ display:inline-block; margin-top:12px; background: rgba(255,255,255,0.95); padding:8px 12px; border-radius:999px; box-shadow: 0 6px 18px rgba(2,6,23,0.06); font-size:12px; position:relative; left:0; }

        /* Footer */
        .footer{ border-top:1px solid #e6eef6; margin-top:30px; background:transparent; padding:18px 0; }
        .footer-inner{ max-width:1100px; margin:0 auto; padding:0 16px; display:flex; justify-content:space-between; align-items:center; }

        /* responsive */
        @media (min-width: 768px){
          .container{ grid-template-columns: 1fr 420px; }
          .site-info{ display:block; }
          .desktop-nav{ display:flex; }
          .mobile-controls{ display:none; }
          .input{ width:260px; }
          .features{ grid-template-columns: repeat(3,1fr); }
        }

        @media (max-width: 480px){
          .logo-circle{ width:40px; height:40px; border-radius:10px; }
          .header{ padding:12px; }
          .hero-title{ font-size:18px; }
          .input{ width:140px; }
          .preview-card{ padding:12px; }
        }

        /* animations */
        @keyframes slow-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0% { opacity: .1; transform: scale(1); } 50% { opacity: .25; transform: scale(1.02); } 100% { opacity: .1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
