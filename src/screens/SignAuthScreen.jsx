import { useState, useEffect } from 'react'
import { B, ph, phBtn } from '../tokens'

export default function SignAuthScreen({ onBack, onSuccess }) {
  const [confidence, setConfidence] = useState(0)
  const [recognized, setRecognized] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setRecognized(true), 1400)
    const t2 = setInterval(() => setConfidence(c => {
      if (c >= 93) { clearInterval(t2); setTimeout(() => { setDone(true); setTimeout(onSuccess, 800) }, 400); return 93 }
      return c + 1.8
    }), 65)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

  const dots = [[30,42],[28,56],[42,36],[43,64],[62,38],[60,62],[50,28],[35,70],[65,70]]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', paddingBottom: 32 }} className="slide-up">
      <button onClick={onBack} style={{ padding: '0 22px', display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: B.muted, fontSize: 13, cursor: 'pointer', marginBottom: 14 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        Back
      </button>

      <div style={{ padding: '0 22px', marginBottom: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: B.text }}>Sign Language ID</div>
        <div style={{ fontSize: 12.5, color: B.muted }}>Show your registered greeting sign</div>
      </div>

      {/* Viewfinder */}
      <div style={{
        margin: '0 22px', borderRadius: 22, background: '#030C16',
        position: 'relative', overflow: 'hidden', aspectRatio: '1/1',
        border: `1px solid ${B.border}`,
      }}>
        {/* Hand guide */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 160, height: 160, borderRadius: 22,
          border: `2px dashed ${done ? B.success : B.gold}60`,
          transition: 'border-color 0.4s',
        }} />

        {/* Gesture display */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 68, lineHeight: 1,
          filter: `drop-shadow(0 0 22px ${B.gold}60)`,
        }}>👋</div>

        {/* Tracking dots */}
        {dots.map(([l, t], i) => (
          <div key={i} className="dot-beat" style={{
            position: 'absolute', width: 5, height: 5, borderRadius: '50%',
            background: done ? B.success : B.gold,
            top: `${t}%`, left: `${l}%`,
            transform: 'translate(-50%,-50%)',
            transition: 'background 0.4s',
            animationDelay: `${i * 0.12}s`,
          }} />
        ))}

        {/* Recognition badge */}
        {recognized && (
          <div className="fade-in" style={{
            position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
            background: `${B.gold}18`, border: `1px solid ${B.gold}45`,
            borderRadius: 20, padding: '5px 14px',
            fontSize: 11, color: B.gold, fontWeight: 700, whiteSpace: 'nowrap',
          }}>Greeting gesture — recognized ✓</div>
        )}

        {done && (
          <div className="fade-in" style={{
            position: 'absolute', inset: 0, background: `${B.success}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48,
          }}>✅</div>
        )}
      </div>

      {/* Confidence */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: B.muted }}>Recognition confidence</span>
          <span style={{ fontSize: 11, color: done ? B.success : B.gold, fontWeight: 700 }}>{Math.round(confidence)}%</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: '#0F2235' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: done ? B.success : B.gold,
            width: `${confidence}%`, transition: 'width 0.12s linear, background 0.4s',
          }} />
        </div>

        {!done && (
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button onClick={onBack} style={{
              flex: 1, padding: '11px', borderRadius: 13,
              background: B.surf, border: `1px solid ${B.border}`,
              fontSize: 13, color: B.muted, cursor: 'pointer', fontFamily: 'system-ui',
            }}>Try again</button>
            <button onClick={onSuccess} style={{
              flex: 1, padding: '11px', borderRadius: 13,
              background: B.gold, color: '#fff',
              fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'system-ui',
            }}>Sign in →</button>
          </div>
        )}

        {done && (
          <div className="fade-in" style={{ fontSize: 13, color: B.success, marginTop: 10, fontWeight: 700 }}>
            ✓ Identity verified — signing you in
          </div>
        )}
      </div>
    </div>
  )
}
