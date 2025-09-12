import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { firestore } from '../lib/firebaseAdmin';

export default function ProfilePage({ user, siteKey }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  let recaptchaRef = null;

  if (!user) return <div style={{ padding: 30 }}>Profile not found</div>;
const send = async (token) => {
    setLoading(true);
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: user.username, text, recaptchaToken: token })
    });
    const j = await res.json();
    setLoading(false);
    if (res.ok) setMsg({ type: 'success', text: 'Message sent!' });
    else setMsg({ type: 'error', text: j.error || 'Failed' });
    if (recaptchaRef && recaptchaRef.reset) recaptchaRef.reset();
    setText('');
  };
return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <div style={{ textAlign: 'center' }}>
        <img src={user.avatar_url || '/avatar-placeholder.png'} style={{ width: 96, height: 96, borderRadius: 48 }} />
        <h1>{user.name || user.username}</h1>
        <p>Send anonymous message</p>
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write your message..."
        rows={6}
        style={{ width: '100%', padding: 12 }}
      />
      <div style={{ marginTop: 12 }}>
        <ReCAPTCHA
          sitekey={siteKey}
          onChange={(token) => send(token)}
          ref={r => recaptchaRef = r}
        />
      </div>
      {loading && <p>Sending...</p>}
      {msg && <p style={{ color: msg.type === 'error' ? 'red' : 'green' }}>{msg.text}</p>}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const username = params.username;
  const users = await firestore.collection('users').where('username', '==', username).limit(1).get();

  if (users.empty) {
    return { props: { user: null, siteKey: process.env.RECAPTCHA_SITEKEY } };
  }
  const doc = users.docs[0].data();
  return {
    props: {
      user: {
        username: doc.username,
        name: doc.name || null,
        avatar_url: doc.avatar_url || null
      },
      siteKey: process.env.RECAPTCHA_SITEKEY
    }
  };
}
