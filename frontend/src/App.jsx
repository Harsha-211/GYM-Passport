import { useState } from 'react'
import CustomerDashboard from './components/CustomerDashboard.jsx'
import GymOwnerTerminal from './components/GymOwnerTerminal.jsx';

export default function App(){
  const [currentView, setCurrentView] = useState('customer');
  return(
    <div className='min-h-screen bg-slate-900 text-slate-100 font-sans'>
      {/* Centralized Navigation Bar */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-black tracking-wider text-emerald-400">🏋️‍♂️ GYM-PASSPORT</h1>
        <div className='space-x-4'>
          <button onClick={()=>setCurrentView('customer')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${currentView === 'customer' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
            Customer App
          </button>
          <button 
            onClick={() => setCurrentView('owner')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${currentView === 'owner' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 hover:bg-slate-600'}`}
          >
            Gym Counter Terminal
          </button>
        </div>
      </nav>
      {/* Dynamic Screen Container */}
      <main className="max-w-7xl mx-auto p-6">
        {currentView === 'customer' ? <CustomerDashboard /> : <GymOwnerTerminal />}
      </main>
    </div>
  )
}