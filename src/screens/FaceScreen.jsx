import { useState, useEffect } from 'react'
import { B, ph, phBtn } from '../tokens'

export default function FaceScreen({ onBack, onSuccess }) {
  const [confidence, setConfidence] = useState(0)
  const [liveness, setLiveness] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLiveness(true), 1800)
    const t2 = setInterval(() => setConfidence(c => {
      if (c >= 95) { clearInterval(t2); setTimeout(() => { setDone(true); setTimeout(onSuccess, 700) }, 300); return 95 }
      return c + 1.5
    }), 60)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

  const dots = [[38,36],[61,36],[50,51],[43,65],[57,65]]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', paddingBottom: 32 }} className="slide-up">
      <button onClick={onBack} style={{ padding: '0 22px', display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: B.muted, fontSize: 13, cursor: 'pointer', marginBottom: 14 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        Back
      </button>

      <div style={{ padding: '0 22px', marginBottom: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: B.text }}>Face ID</div>
        <div style={{ fontSize: 12.5, color: B.muted }}>Hold steady — look straight at the camera</div>
      </div>

      {/* Viewfinder */}
      <div style={{
        margin: '0 22px', borderRadius: 22, background: '#030C16',
        position: 'relative', overflow: 'hidden', aspectRatio: '1/1',
        border: `1px solid ${B.border}`,
      }}>
        {/* Face oval */}
        <div className="pulse-ring" style={{
          position: 'absolute', top: '44%', left: '50%',
          transform: 'translate(-50%, -54%)',
          width: 150, height: 188, borderRadius: '50%',
          border: `3px solid ${done ? B.success : B.purple}`,
          boxShadow: `0 0 28px ${done ? B.success : B.purple}30`,
          transition: 'border-color 0.4s, box-shadow 0.4s',
        }} />

        {/* Scan line */}
        <div className="scan-animate" style={{
          position: 'absolute', left: '18%', right: '18%', height: 2,
          background: `linear-gradient(90deg, transparent, ${B.purple}, transparent)`,
          opacity: 0.8,
        }} />

        {/* Landmark dots */}
        {dots.map(([l, t], i) => (
          <div key={i} className="dot-beat" style={{
            position: 'absolute', width: 6, height: 6, borderRadius: '50%',
            background: done ? B.success : B.purple,
            top: `${t}%`, left: `${l}%`,
            transform: 'translate(-50%,-50%)',
            transition: 'background 0.4s',
            animationDelay: `${i * 0.15}s`,
          }} />
        ))}

        {/* Liveness badge */}
        {liveness && (
          <div className="fade-in" style={{
            position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.78)', borderRadius: 20, padding: '5px 14px',
            fontSize: 11, color: B.purple, fontWeight: 700, whiteSpace: 'nowrap',
          }}>Liveness: Blink detected ✓</div>
        )}

        {/* Success overlay */}
        {done && (
          <div className="fade-in" style={{
            position: 'absolute', inset: 0, background: `${B.success}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48,
          }}>✅</div>
        )}
      </div>

      {/* Confidence */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: B.muted }}>Match confidence</span>
          <span style={{ fontSize: 11, color: done ? B.success : B.purple, fontWeight: 700 }}>{Math.round(confidence)}%</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: '#0F2235' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: done ? B.success : B.purple,
            width: `${confidence}%`, transition: 'width 0.12s linear, background 0.4s',
          }} />
        </div>
        <div style={{ fontSize: 11.5, color: B.muted, marginTop: 6 }}>
          {done ? '✓ Identity verified' : 'Verifying your identity…'}
        </div>
      </div>
    </div>
  )
}
