import { useState, useEffect } from 'react'
import { B, ph, phBtn } from '../tokens'

export default function PasskeyScreen({ onBack, onSuccess }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(t); setTimeout(onSuccess, 400); return 100 } return p + 2 }), 50)
    return () => clearInterval(t)
  }, [])

  const angle = (progress / 100) * 251 // circumference of r=40 circle ≈ 251

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '16px 0 32px', textAlign: 'center' }} className="slide-up">
      {/* Back */}
      <button onClick={onBack} style={{ ...ph, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: B.muted, fontSize: 13, cursor: 'pointer', marginBottom: 24 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        Back
      </button>

      <div style={{ padding: '0 22px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: B.muted, marginBottom: 6 }}>Passkey Authentication</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: B.text, marginBottom: 4 }}>Signing you in…</div>
        <div style={{ fontSize: 13, color: B.muted, marginBottom: 40 }}>Touch your fingerprint sensor or follow your device prompt</div>

        {/* Animated progress ring */}
        <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 32px' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r="40" fill="none" stroke={B.surf} strokeWidth="6" />
            <circle cx="60" cy="60" r="40" fill="none" stroke={B.accent} strokeWidth="6"
              strokeDasharray={`${angle} 251`} strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.1s linear' }} />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36,
          }}>🔑</div>
        </div>

        <div style={{ fontSize: 13, color: progress === 100 ? B.accent : B.muted, fontWeight: progress === 100 ? 700 : 400, transition: 'color 0.3s' }}>
          {progress === 100 ? '✓ Verified — welcome back!' : `Authenticating… ${progress}%`}
        </div>

        <div style={{ marginTop: 40 }}>
          <button onClick={onBack} style={{ ...phBtn('transparent'), color: B.muted, fontSize: 13 }}>
            Use a different method
          </button>
        </div>
      </div>
    </div>
  )
}
