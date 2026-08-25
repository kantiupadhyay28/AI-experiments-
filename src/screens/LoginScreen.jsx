import { useState } from 'react'
import { B, ph, phBtn } from '../tokens'

export default function LoginScreen({ onPasskey, onFace, onSign }) {
  const [active, setActive] = useState(null)

  const methods = [
    { id: 'passkey', icon: '🔑', label: 'Passkey',        desc: 'Tap your device to verify',    action: onPasskey, color: B.accent },
    { id: 'face',    icon: '👁️', label: 'Face ID',         desc: 'Look at the camera',           action: onFace,    color: B.purple },
    { id: 'sign',    icon: '🤟', label: 'Sign Language',   desc: 'Show your registered sign',    action: onSign,    color: B.gold   },
  ]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', paddingBottom: 32 }} className="slide-up">
      {/* Bank header */}
      <div style={{ ...ph, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12, background: B.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, fontWeight: 900, color: '#fff',
          }}>A</div>
          <span style={{ fontSize: 15, fontWeight: 800, color: B.text, letterSpacing: '-0.3px' }}>Aark Bank</span>
        </div>
      </div>

      <div style={{ ...ph, marginBottom: 28 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: B.text, lineHeight: 1.2, marginBottom: 5 }}>
          Welcome back,<br />Riya 👋
        </div>
        <div style={{ fontSize: 13, color: B.muted }}>Choose how you'd like to sign in</div>
      </div>

      <div style={{ ...ph, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => { setActive(m.id); setTimeout(m.action, 180) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 16,
              background: active === m.id ? `${m.color}18` : B.surf,
              border: `1.5px solid ${active === m.id ? m.color : B.border}`,
              cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.18s', fontFamily: 'system-ui',
              width: '100%',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 14, flexShrink: 0,
              background: `${m.color}14`, border: `1.5px solid ${m.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
            }}>{m.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: B.text }}>{m.label}</div>
              <div style={{ fontSize: 12, color: B.muted, marginTop: 1 }}>{m.desc}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke={active === m.id ? m.color : B.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span style={{ fontSize: 12.5, color: B.muted }}>
          Trouble signing in?{' '}
          <span style={{ color: B.accent, fontWeight: 600 }}>Get help</span>
        </span>
      </div>

      {/* Accessibility note */}
      <div style={{
        margin: '24px 22px 0',
        padding: '12px 14px', borderRadius: 12,
        background: `${B.gold}0C`, border: `1px solid ${B.gold}20`,
        fontSize: 11.5, color: B.gold, lineHeight: 1.5,
      }}>
        🤟 <strong>All three methods have full feature parity.</strong> None is a reduced fallback.
      </div>
    </div>
  )
}
