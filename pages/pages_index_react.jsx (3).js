import React, { useState, useEffect } from 'react';

// pages/index.js - صفحة رئيسية شبيهة بـ NGL (عربي، Responsive)
// تحديث: هيدر مُبسط على الموبايل مع Sidebar (قائمة جانبية) للمحتوى
// تستخدم Tailwind CSS.

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
    <div dir="rtl" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#e6f7ff] to-[#f7fdff] flex flex-col">

      {/* Mobile Sidebar overlay */}
      {/* backdrop */}
      <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpenMenu(false)} />

      {/* Sidebar */}
      <aside className={`fixed top-0 bottom-0 right-0 w-72 bg-white z-50 transform transition-transform ${openMenu ? 'translate-x-0' : 'translate-x-full'} shadow-lg`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7dd3fc] to-[#38bdf8] flex items-center justify-center text-white font-bold">ت</div>
            <div>
              <div className="font-semibold">تيلو</div>
              <div className="text-xs text-gray-400">صراحة بلا حدود</div>
            </div>
          </div>
          <button onClick={() => setOpenMenu(false)} className="px-2 py-1 rounded hover:bg-gray-100">إغلاق</button>
        </div>
        <nav className="p-4 space-y-3">
          <a href="/" className="block px-3 py-2 rounded hover:bg-gray-50">الرئيسية</a>
          <a href="/login" className="block px-3 py-2 rounded hover:bg-gray-50">تسجيل الدخول</a>
          <a href="/signup" className="block px-3 py-2 rounded hover:bg-gray-50">انشئ حسابك</a>
          <div className="mt-4 border-t pt-4">
            <div className="text-sm text-gray-500 mb-2">مزايا</div>
            <a className="block px-3 py-2 rounded hover:bg-gray-50">مجهول</a>
            <a className="block px-3 py-2 rounded hover:bg-gray-50">تحكم كامل</a>
            <a className="block px-3 py-2 rounded hover:bg-gray-50">آمن</a>
          </div>
        </nav>
      </aside>

      {/* Header */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#7dd3fc] to-[#38bdf8] flex items-center justify-center text-white font-extrabold shadow">ت</div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-extrabold text-gray-900">تيلو</h1>
            <p className="text-xs text-gray-500">صراحة بلا حدود</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <a href="/" className="text-sm text-gray-700 hover:text-gray-900">الرئيسية</a>
          <a href="/login" className="text-sm px-4 py-2 rounded-lg hover:bg-white/60 transition">تسجيل الدخول</a>
          <a href="/signup" className="text-sm px-5 py-2 bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] text-white rounded-lg shadow">انشئ حسابك</a>
        </nav>

        {/* Mobile compact controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setOpenMenu(true)} aria-label="فتح القائمة" className="p-2 rounded-md bg-white shadow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left */}
          <section className="p-4 md:p-6">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-tight">حان وقت الصراحة — احصل على رسائل صادقة ومباشرة</h2>
            <p className="text-gray-600 mb-6">شارك رابطك في البايو أو الستوري. تيلو يحمي الخصوصية ويمنحك مساحة صريحة للتعليقات والآراء.</p>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <a href="/login" className="inline-flex items-center justify-center px-6 py-3 bg-[#bfefff] text-[#0369a1] rounded-lg shadow-lg text-lg font-semibold">ابدأ الآن</a>

              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                <input
                  aria-label="preview username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^\u0621-\u064A0-9A-Za-z_-]/g, ''))}
                  className="px-3 py-2 border rounded-lg w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-[#bfefff] text-base"
                />
                <button onClick={copyLink} className="px-4 py-2 rounded-lg bg-white border shadow">نسخ الرابط</button>
                <button onClick={shareLink} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] text-white">مشاركة</button>
              </div>
            </div>

            {copied && <p className="mt-3 text-sm text-green-600">تم نسخ الرابط!</p>}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-white/60 rounded-lg shadow text-center">
                <h4 className="font-semibold">مجهول</h4>
                <p className="text-gray-600 text-sm">لا يظهر اسم المرسل.</p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg shadow text-center">
                <h4 className="font-semibold">تحكم</h4>
                <p className="text-gray-600 text-sm">حذف وحظر ومراجعة.</p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg shadow text-center">
                <h4 className="font-semibold">آمن</h4>
                <p className="text-gray-600 text-sm">reCAPTCHA وقيود لمنع السبام.</p>
              </div>
            </div>
          </section>

          {/* Right preview card */}
          <aside className="p-4 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-5 transform transition hover:scale-102">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7dd3fc] to-[#38bdf8] flex items-center justify-center text-white text-xl font-bold">س</div>
                  <div>
                    <div className="font-semibold text-gray-800">{username}</div>
                    <div className="text-sm text-gray-400">@{username}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <textarea placeholder="اكتب رسالتك..." rows={5} className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#bfefff] text-base" />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-400">مجهول</div>
                    <button className={`px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] shadow`}>{sending ? 'جاري الإرسال...' : 'إرسال'}</button>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">رابط المعاينة:</div>
                <div className="mt-1 break-all text-sm text-[#0369a1]">{profileLink}</div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button onClick={copyLink} className="px-3 py-2 border rounded-lg">نسخ</button>
                  <button onClick={shareLink} className="px-3 py-2 bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] text-white rounded-lg">مشاركة</button>
                </div>
              </div>

              <div className="absolute -bottom-4 left-4 bg-white/90 px-3 py-2 rounded-full shadow text-xs">شارك في الستوري</div>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <div>© {new Date().getFullYear()} Tello</div>
          <div className="mt-3 md:mt-0">الخصوصية · الشروط</div>
        </div>
      </footer>

      <style jsx>{`
        /* custom animations */
        @keyframes slow-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-slow-rotate { animation: slow-rotate 20s linear infinite; }
        @keyframes pulse { 0% { opacity: .1; transform: scale(1); } 50% { opacity: .25; transform: scale(1.02); } 100% { opacity: .1; transform: scale(1); } }
        .animate-pulse-slow { animation: pulse 6s ease-in-out infinite; }
        .scale-102 { transform: scale(1.02); }
        .transition-transform { transition: transform .25s ease, box-shadow .25s ease; }
      `}</style>
    </div>
  );
}
