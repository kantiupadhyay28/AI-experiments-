import { useEffect, useState } from 'react'
import { B } from '../tokens'

export default function SuccessScreen({ onDone, transferData }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  const amount = transferData?.amount
  const formatted = amount ? `₹ ${parseInt(amount).toLocaleString('en-IN')}` : '₹ —'
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '32px 22px', textAlign: 'center', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className="slide-up">

      {/* Check animation */}
      <div style={{
        width: 88, height: 88, borderRadius: '50%',
        background: `${B.success}18`,
        border: `2px solid ${B.success}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 44, marginBottom: 20,
        transform: show ? 'scale(1)' : 'scale(0.5)',
        opacity: show ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s',
        boxShadow: `0 0 40px ${B.success}25`,
      }}>✅</div>

      <div style={{
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.35s 0.15s, transform 0.35s 0.15s',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: B.success, marginBottom: 6 }}>Transfer Successful</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: B.text, letterSpacing: '-1px', marginBottom: 4 }}>{formatted}</div>
        <div style={{ fontSize: 13, color: B.muted, marginBottom: 28 }}>Sent to Amit Kumar · HDFC •••• 9201</div>

        {/* Receipt card */}
        <div style={{
          background: B.surf, border: `1px solid ${B.border}`, borderRadius: 18,
          padding: '16px 18px', marginBottom: 28, textAlign: 'left',
        }}>
          {[
            ['From', 'Riya Sharma · SBI •••• 4829'],
            ['To', 'Amit Kumar · HDFC •••• 9201'],
            ['Amount', formatted],
            ['Date', `${dateStr}, ${timeStr}`],
            ['Reference', `TXN${Math.floor(Math.random() * 9e8 + 1e8)}`],
            ['Status', '✓ Completed'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${B.border}` }}>
              <span style={{ fontSize: 11.5, color: B.muted }}>{label}</span>
              <span style={{ fontSize: 11.5, color: label === 'Status' ? B.success : B.text, fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Auth note */}
        <div style={{
          background: `${B.gold}0C`, border: `1px solid ${B.gold}20`,
          borderRadius: 12, padding: '10px 14px', marginBottom: 24,
          fontSize: 11.5, color: B.gold, lineHeight: 1.55, textAlign: 'left',
        }}>
          🤟 Transfer confirmed with sign language PIN — inclusive authentication powered by gesture recognition
        </div>

        <button onClick={onDone} style={{
          display: 'block', width: '100%', padding: '15px',
          borderRadius: 16, background: B.accent,
          color: '#fff', fontSize: 15, fontWeight: 700,
          border: 'none', cursor: 'pointer', fontFamily: 'system-ui',
        }}>Back to Home</button>
      </div>
    </div>
  )
}
