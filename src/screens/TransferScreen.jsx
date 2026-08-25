import { useState } from 'react'
import { B, ph, phBtn } from '../tokens'

const SIGN_NUMS = { 0:'⭕', 1:'☝️', 2:'✌️', 3:'🤟', 4:'🖖', 5:'🖐️', 6:'🤙', 7:'🤘', 8:'🤞', 9:'👌' }
const trackDots = [[32,44],[30,57],[44,38],[45,62],[62,40],[60,62],[50,30],[36,68],[64,68]]

export default function TransferScreen({ onBack, onContinue }) {
  const [signMode, setSignMode] = useState(false)
  const [amount, setAmount] = useState('')
  const [detecting, setDetecting] = useState(false)
  const [detectedDigit, setDetectedDigit] = useState(null)

  function pressKey(k) {
    if (k === '⌫') setAmount(a => a.slice(0, -1))
    else if (amount.length < 8) setAmount(a => a + k)
  }

  function simulateSign(digit) {
    setDetecting(true)
    setDetectedDigit(null)
    setTimeout(() => {
      setDetectedDigit(digit)
      setTimeout(() => {
        setAmount(a => a.length < 8 ? a + digit : a)
        setDetecting(false)
        setDetectedDigit(null)
      }, 800)
    }, 900)
  }

  const signDigits = [1,2,3,4,5,6,7,8,9,0]
  const formatted = amount ? `₹ ${Number(amount).toLocaleString('en-IN')}` : '₹ 0'
  const canContinue = amount.length > 0 && Number(amount) > 0

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', paddingBottom: 24 }} className="slide-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 22px', marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: B.muted, cursor: 'pointer', padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: B.muted }}>Transfer to</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1E3A5C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: B.text, fontWeight: 700 }}>A</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: B.text }}>Amit Kumar</div>
              <div style={{ fontSize: 11, color: B.muted }}>HDFC •••• 9201</div>
            </div>
          </div>
        </div>
      </div>

      {/* Amount display */}
      <div style={{ background: B.surf, borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}`, padding: '14px 22px', marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: B.muted, marginBottom: 3 }}>Amount</div>
        <div style={{ fontSize: 32, fontWeight: 900, color: canContinue ? B.text : B.muted, letterSpacing: '-1px', transition: 'color 0.2s' }}>
          {amount ? `₹ ${parseInt(amount).toLocaleString('en-IN')}` : '₹ 0'}
          <span style={{ opacity: 0.3 }}>|</span>
        </div>
      </div>

      {/* Mode toggle */}
      <div style={{ padding: '0 22px', marginBottom: 12 }}>
        <div style={{ display: 'flex', borderRadius: 12, border: `1px solid ${B.border}`, overflow: 'hidden', background: B.surf }}>
          {[['⌨️  Keypad', false], ['🤟  Sign Language', true]].map(([label, mode]) => (
            <button key={label} onClick={() => setSignMode(mode)} style={{
              flex: 1, padding: '9px 0', fontSize: 12, fontWeight: 700,
              background: signMode === mode ? (mode ? B.gold : B.accent) : 'transparent',
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
            {/* Hand guide */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 100, height: 100, borderRadius: 16, border: `2px dashed ${detecting ? B.gold : B.border}`, transition: 'border-color 0.3s' }} />

            {/* Detected gesture */}
            {detectedDigit !== null ? (
              <div className="fade-in" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 48, lineHeight: 1, filter: `drop-shadow(0 0 20px ${B.gold}70)` }}>
                {SIGN_NUMS[detectedDigit]}
              </div>
            ) : (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 14, color: B.muted, textAlign: 'center', lineHeight: 1.5 }}>
                {detecting ? '🔍 Detecting…' : 'Tap a digit below\nto simulate sign'}
              </div>
            )}

            {/* Tracking dots */}
            {detecting && trackDots.map(([l, t], i) => (
              <div key={i} className="dot-beat" style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: B.gold, top: `${t}%`, left: `${l}%`, transform: 'translate(-50%,-50%)', animationDelay: `${i * 0.1}s` }} />
            ))}

            {detectedDigit !== null && (
              <div style={{ position: 'absolute', top: 8, right: 8, background: `${B.gold}20`, border: `1px solid ${B.gold}50`, borderRadius: 10, padding: '2px 10px', fontSize: 11, color: B.gold, fontWeight: 800 }}>
                Digit: {detectedDigit} ✓
              </div>
            )}
          </div>

          {/* Sign digit buttons */}
          <div style={{ fontSize: 11, color: B.muted, marginBottom: 8, textAlign: 'center' }}>
            Tap a digit to simulate showing that sign gesture:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {signDigits.map(d => (
              <button key={d} onClick={() => simulateSign(d)} disabled={detecting} style={{
                height: 46, borderRadius: 10, fontSize: 20,
                background: B.surf, border: `1px solid ${B.border}`,
                cursor: detecting ? 'default' : 'pointer', opacity: detecting ? 0.5 : 1,
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
            {[1,2,3,4,5,6,7,8,9,'.', 0,'⌫'].map((k, i) => (
              <button key={i} onClick={() => pressKey(String(k))} style={{
                height: 52, borderRadius: 12, background: k === '⌫' ? B.surf : B.surf,
                border: `1px solid ${B.border}`, fontSize: 18,
                fontWeight: 700, color: k === '⌫' ? B.muted : B.text,
                cursor: 'pointer', fontFamily: 'system-ui', transition: 'background 0.1s',
              }}>{k}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '14px 22px 0' }}>
        <button onClick={() => canContinue && onContinue(amount)} style={{
          display: 'block', width: '100%', padding: '15px',
          borderRadius: 16, background: canContinue ? B.accent : B.surf,
          color: canContinue ? '#fff' : B.muted,
          fontSize: 15, fontWeight: 700, textAlign: 'center',
          border: 'none', cursor: canContinue ? 'pointer' : 'default',
          transition: 'all 0.2s', fontFamily: 'system-ui',
        }}>
          {canContinue ? `Continue — ${formatted}` : 'Enter an amount'}
        </button>
      </div>
    </div>
  )
}
