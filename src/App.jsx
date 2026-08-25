import { useState } from 'react'
import LoginScreen from './screens/LoginScreen'
import PasskeyScreen from './screens/PasskeyScreen'
import FaceScreen from './screens/FaceScreen'
import SignAuthScreen from './screens/SignAuthScreen'
import HomeScreen from './screens/HomeScreen'
import TransferScreen from './screens/TransferScreen'
import PinScreen from './screens/PinScreen'
import SuccessScreen from './screens/SuccessScreen'
import LandingPage from './LandingPage'

// Top-level router — all state lives here so screens can read/write freely
export default function App() {
  const [view, setView] = useState('landing') // landing | login | passkey | face | sign-auth | home | transfer | pin | success
  const [transferData, setTransferData] = useState({ recipient: 'Amit Kumar', amount: '' })

  const go = (screen) => setView(screen)

  // Phone chrome wrapper — every "app" screen sits inside this
  function Phone({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
           style={{ background: '#06101A' }}>
        <div style={{
          width: 375, minHeight: 680,
          borderRadius: 48, border: '5px solid #1A2C3E',
          background: '#08111C', overflow: 'hidden', position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
        }}>
          {/* Dynamic island */}
          <div style={{
            position: 'absolute', top: 12, left: '50%',
            transform: 'translateX(-50%)', width: 120, height: 30,
            background: '#030A14', borderRadius: 20, zIndex: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            paddingRight: 10, gap: 6,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0F1E2C' }} />
            <div style={{ width: 26, height: 10, borderRadius: 7, background: '#0F1E2C' }} />
          </div>
          {/* Status bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
            padding: '14px 22px 0', display: 'flex', justifyContent: 'space-between',
            fontSize: 11, fontWeight: 700, color: 'rgba(200,230,255,0.7)',
            fontFamily: 'system-ui',
          }}>
            <span>9:41</span><span>●●● ▌▌ ▊</span>
          </div>
          {/* Screen content */}
          <div style={{ paddingTop: 52 }}>{children}</div>
        </div>
      </div>
    )
  }

  if (view === 'landing') return <LandingPage onEnter={() => go('login')} />

  return (
    <Phone>
      {view === 'login'     && <LoginScreen     onPasskey={() => go('passkey')} onFace={() => go('face')} onSign={() => go('sign-auth')} />}
      {view === 'passkey'   && <PasskeyScreen   onBack={() => go('login')} onSuccess={() => go('home')} />}
      {view === 'face'      && <FaceScreen       onBack={() => go('login')} onSuccess={() => go('home')} />}
      {view === 'sign-auth' && <SignAuthScreen   onBack={() => go('login')} onSuccess={() => go('home')} />}
      {view === 'home'      && <HomeScreen       onSend={() => go('transfer')} />}
      {view === 'transfer'  && <TransferScreen   onBack={() => go('home')} onContinue={(amt) => { setTransferData(d => ({...d, amount: amt})); go('pin') }} />}
      {view === 'pin'       && <PinScreen        onBack={() => go('transfer')} onConfirm={() => go('success')} transferData={transferData} />}
      {view === 'success'   && <SuccessScreen    onDone={() => go('home')} transferData={transferData} />}
    </Phone>
  )
}
