import { B, ph } from '../tokens'

export default function HomeScreen({ onSend }) {
  const txns = [
    { name: 'Swiggy',    icon: '🍕', sub: 'Food delivery',    amt: '−₹ 340',    neg: true },
    { name: 'Salary',    icon: '🏢', sub: 'Employer transfer', amt: '+₹ 45,000', neg: false },
    { name: 'Metro Card',icon: '🚇', sub: 'Top-up',           amt: '−₹ 200',    neg: true },
    { name: 'Netflix',   icon: '📺', sub: 'Subscription',     amt: '−₹ 649',    neg: true },
  ]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', paddingBottom: 32 }} className="slide-up">
      {/* Header */}
      <div style={{ ...ph, marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: B.muted }}>Good morning</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: B.text, letterSpacing: '-0.4px' }}>Riya Sharma</div>
      </div>

      {/* Balance card */}
      <div style={{
        margin: '0 22px 18px',
        borderRadius: 20,
        background: 'linear-gradient(140deg, #1DB898, #0E7A63)',
        padding: '18px 20px',
        boxShadow: `0 12px 40px ${B.accent}30`,
      }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginBottom: 2 }}>TOTAL BALANCE</div>
        <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: '-0.8px' }}>₹ 2,84,391.50</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>SAVINGS ACCOUNT</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>•••• •••• 4829</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: 'rgba(255,255,255,0.45)' }}>A</div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ ...ph, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[
            { icon: '↗', label: 'Send 🤟', action: onSend, accent: true },
            { icon: '↙', label: 'Receive' },
            { icon: '💳', label: 'Pay' },
            { icon: '⋯', label: 'More' },
          ].map((a, i) => (
            <button key={i} onClick={a.action} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              background: 'none', border: 'none', cursor: a.action ? 'pointer' : 'default',
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 16,
                background: a.accent ? `${B.accent}20` : B.surf,
                border: `1.5px solid ${a.accent ? B.accent : B.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, color: a.accent ? B.accent : B.text,
                transition: 'transform 0.15s',
              }}>{a.icon}</div>
              <div style={{ fontSize: 10.5, color: a.accent ? B.accent : B.muted, fontWeight: a.accent ? 700 : 400 }}>{a.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div style={{ ...ph }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: B.muted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>Recent Transactions</div>
        {txns.map(t => (
          <div key={t.name} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0', borderBottom: `1px solid ${B.border}`,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12, background: B.surf,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>{t.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: B.text }}>{t.name}</div>
              <div style={{ fontSize: 11, color: B.muted }}>{t.sub}</div>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: t.neg ? B.red : B.success }}>{t.amt}</div>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div style={{
        margin: '20px 22px 0', padding: '12px 14px', borderRadius: 13,
        background: `${B.gold}0C`, border: `1px solid ${B.gold}20`,
        fontSize: 11.5, color: B.gold, lineHeight: 1.55,
      }}>
        🤟 Tap <strong>Send</strong> to try the sign-language transfer flow
      </div>
    </div>
  )
}
