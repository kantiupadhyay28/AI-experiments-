import { B } from './tokens'

export default function LandingPage({ onEnter }) {
  return (
    <div style={{
      minHeight: '100vh', background: '#06101A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
        .landing-head { font-family: 'DM Serif Display', Georgia, serif; }
      `}</style>

      {/* Bank logo */}
      <div style={{
        width: 72, height: 72, borderRadius: 22, background: B.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 34, fontWeight: 900, color: '#fff', marginBottom: 32,
        boxShadow: `0 0 60px ${B.accent}35`,
      }}>A</div>

      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: B.accent, marginBottom: 16,
      }}>AI Experiment · Banking UX</div>

      <h1 className="landing-head" style={{
        fontSize: 'clamp(32px, 6vw, 58px)', lineHeight: 1.1,
        color: '#E4EEF8', maxWidth: 540, marginBottom: 20,
      }}>
        Banking that speaks every language,{' '}
        <em style={{ color: B.accent }}>including sign.</em>
      </h1>

      <p style={{
        fontSize: 16, color: '#5A7898', lineHeight: 1.75,
        maxWidth: 440, marginBottom: 48,
      }}>
        An interactive prototype exploring multimodal UX — sign language,
        face detection, and passkey authentication for an inclusive mobile
        banking experience.
      </p>

      {/* Feature pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
        {[
          { icon: '🤟', label: 'Sign Language Input' },
          { icon: '👁️', label: 'Face Detection' },
          { icon: '🔑', label: 'Passkey Auth' },
          { icon: '♿', label: 'Inclusive Design' },
        ].map(f => (
          <div key={f.label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 100,
            background: 'rgba(24,200,156,0.08)',
            border: '1px solid rgba(24,200,156,0.18)',
            fontSize: 13, color: '#8BCBBC',
          }}>
            <span>{f.icon}</span> {f.label}
          </div>
        ))}
      </div>

      <button onClick={onEnter} style={{
        padding: '16px 40px', borderRadius: 100,
        background: B.accent, color: '#fff',
        fontSize: 16, fontWeight: 700, border: 'none',
        cursor: 'pointer', letterSpacing: '-0.2px',
        boxShadow: `0 8px 32px ${B.accent}40`,
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 40px ${B.accent}50` }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 32px ${B.accent}40` }}
      >
        Open the app →
      </button>

      <div style={{ marginTop: 20, fontSize: 12, color: '#2A4060' }}>
        Prototype only · No real data · No server calls
      </div>

      {/* Disability spectrum note */}
      <div style={{
        marginTop: 64, maxWidth: 500,
        padding: '20px 24px', borderRadius: 16,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: B.gold, marginBottom: 8 }}>
          Design Intent
        </div>
        <p style={{ fontSize: 13, color: '#4A6680', lineHeight: 1.7 }}>
          Designed for the <strong style={{ color: '#8BCBBC' }}>permanent → temporary → situational</strong> disability spectrum.
          Every input in this app — amount, PIN, search — can be completed through sign language.
          No feature is gated behind a single input mode.
        </p>
      </div>
    </div>
  )
}
