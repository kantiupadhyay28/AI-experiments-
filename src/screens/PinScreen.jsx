import { useState } from 'react'
import { B, ph, phBtn } from '../tokens'

const SIGN_NUMS = { 0:'⭕', 1:'☝️', 2:'✌️', 3:'🤟', 4:'🖖', 5:'🖐️', 6:'🤙', 7:'🤘', 8:'🤞', 9:'👌' }
const trackDots = [[28,48],[32,62],[46,38],[44,68],[62,42],[60,66],[50,28],[36,72],[64,72]]

export default function PinScreen({ onBack, onConfirm, transferData }) {
  const [signMode, setSignMode] = useState(false)
  const [pin, setPin] = useState([])
  const [detecting, setDetecting] = useState(false)
  const [detectedDigit, setDetectedDigit] = useState(null)

  function pressKey(k) {
    if (k === '⌫') {
      setPin(p => p.slice(0, -1))
    } else if (pin.length < 6) {
      const next = [...pin, k]
      setPin(next)
      if (next.length === 6) setTimeout(onConfirm, 400)
    }
  }

  function simulateSign(digit) {
    if (pin.length >= 6) return
    setDetecting(true)
    setDetectedDigit(null)
    setTimeout(() => {
      setDetectedDigit(digit)
      setTimeout(() => {
        setPin(p => {
          const next = [...p, String(digit)]
          if (next.length === 6) setTimeout(onConfirm, 500)
          return next.length <= 6 ? next : p
        })
        setDetecting(false)
        setDetectedDigit(null)
      }, 800)
    }, 900)
  }

  const amount = transferData?.amount
  const formatted = amount ? `₹ ${parseInt(amount).toLocaleString('en-IN')}` : ''
  const signDigits = [1,2,3,4,5,6,7,8,9,0]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', paddingBottom: 24 }} className="slide-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 22px', marginBottom: 14 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: B.muted, cursor: 'pointer', padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: B.text }}>Confirm with PIN</div>
          {formatted && <div style={{ fontSize: 11.5, color: B.muted }}>Authorising transfer of {formatted}</div>}
        </div>
      </div>

      {/* PIN dots */}
      <div style={{ padding: '10px 22px 16px', display: 'flex', justifyContent: 'center', gap: 14 }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{
            width: 14, height: 14, borderRadius: '50%',
            background: i < pin.length ? B.purple : 'transparent',
            border: `2px solid ${i < pin.length ? B.purple : B.muted}`,
            transition: 'background 0.15s, border-color 0.15s',
            boxShadow: i < pin.length ? `0 0 8px ${B.purple}60` : 'none',
          }} />
        ))}
      </div>

      {/* Mode toggle */}
      <div style={{ padding: '0 22px', marginBottom: 12 }}>
        <div style={{ display: 'flex', borderRadius: 12, border: `1px solid ${B.border}`, overflow: 'hidden', background: B.surf }}>
          {[['⌨️  Keypad', false], ['🤟  Sign Language', true]].map(([label, mode]) => (
            <button key={label} onClick={() => setSignMode(mode)} style={{
              flex: 1, padding: '9px 0', fontSize: 12, fontWeight: 700,
              background: signMode === mode ? (mode ? B.purple : B.accent) : 'transparent',
              color: signMode === mode ? '#fff' : B.muted,
              border: 'none', cursor: 'pointer', fontFamily: 'system-ui', transition: 'all 0.18s',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {signMode ? (
        <div style={{ padding: '0 22px' }}>
          {/* Camera view */}
          <div style={{ borderRadius: 18, background: '#030C16', position: 'relative', overflow: 'hidden', height: 160, border: `1px solid ${B.border}`, marginBottom: 10 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 100, height: 100, borderRadius: 16, border: `2px dashed ${detecting ? B.purple : B.border}`, transition: 'border-color 0.3s' }} />

            {detectedDigit !== null ? (
              <div className="fade-in" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 48, lineHeight: 1, filter: `drop-shadow(0 0 20px ${B.purple}70)` }}>
                {SIGN_NUMS[detectedDigit]}
              </div>
            ) : (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 14, color: B.muted, textAlign: 'center', lineHeight: 1.5 }}>
                {detecting ? '🔍 Detecting…' : 'Tap a digit below\nto simulate sign'}
              </div>
            )}

            {detecting && trackDots.map(([l, t], i) => (
              <div key={i} className="dot-beat" style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: B.purple, top: `${t}%`, left: `${l}%`, transform: 'translate(-50%,-50%)', animationDelay: `${i * 0.1}s` }} />
            ))}

            {detectedDigit !== null && (
              <div style={{ position: 'absolute', top: 8, right: 8, background: `${B.purple}20`, border: `1px solid ${B.purple}50`, borderRadius: 10, padding: '2px 10px', fontSize: 11, color: B.purple, fontWeight: 800 }}>
                ● ✓
              </div>
            )}
          </div>

          <div style={{ fontSize: 11, color: B.muted, marginBottom: 8, textAlign: 'center' }}>
            Tap a digit to simulate showing that sign gesture:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {signDigits.map(d => (
              <button key={d} onClick={() => simulateSign(d)} disabled={detecting || pin.length >= 6} style={{
                height: 46, borderRadius: 10, fontSize: 20,
                background: B.surf, border: `1px solid ${B.border}`,
                cursor: detecting || pin.length >= 6 ? 'default' : 'pointer',
                opacity: detecting || pin.length >= 6 ? 0.5 : 1,
                transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{SIGN_NUMS[d]}</button>
            ))}
          </div>
          <div style={{ fontSize: 10.5, color: B.dim, marginTop: 6, textAlign: 'center' }}>
            Hold 1s to confirm · open palm to erase
          </div>
        </div>
      ) : (
        <div style={{ padding: '0 22px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
            {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k, i) => (
              <button key={i}
                onClick={() => k !== '' && pressKey(String(k))}
                disabled={k === ''}
                style={{
                  height: 52, borderRadius: 12, background: B.surf,
                  border: `1px solid ${k === '' ? 'transparent' : B.border}`,
                  fontSize: 18, fontWeight: 700,
                  color: k === '⌫' ? B.muted : B.text,
                  cursor: k === '' ? 'default' : 'pointer',
                  fontFamily: 'system-ui', transition: 'background 0.1s',
                  opacity: k === '' ? 0 : 1,
                }}>{k}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '16px 22px 0', fontSize: 11, color: B.dim, textAlign: 'center' }}>
        🔒 Your PIN is never stored in plain text
      </div>
    </div>
  )
}
