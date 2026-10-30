import React from 'react';
import { usePayProof } from './context/PayProofStore';
import { LandingPage } from './components/LandingPage';
import { LoginWizard } from './components/LoginWizard';
import { Navbar } from './components/Navbar';
import { ExteriorSafeLocker } from './components/ExteriorSafeLocker';
import { WorkspaceStage } from './components/WorkspaceStage';
import { JudgeBar } from './components/JudgeBar';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { state, dispatch } = usePayProof();

  // 1. Apple-Style Interactive Landing Page
  if (state.currentView === 'LANDING') {
    return <LandingPage onStartOnboarding={() => dispatch({ type: 'SET_VIEW', payload: 'SETUP' })} />;
  }

  // 2. Question-by-Question Setup & BridgeKey Wallet Verification Wizard
  if (state.currentView === 'SETUP' || !state.isSetupCompleted) {
    return <LoginWizard onBackToLanding={() => dispatch({ type: 'SET_VIEW', payload: 'LANDING' })} />;
  }

  // 3. Main Safe Locker Workspace
  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#111215] flex flex-col font-sans">
      <Navbar />

      {/* Floating Action / Transaction Notification Toast */}
      <AnimatePresence>
        {state.lastActionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 max-w-md bg-[#0F141C] text-white p-4 rounded-[14px] border border-[#334155] shadow-xl flex items-center justify-between gap-3 text-[13px]"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
              <span>{state.lastActionMessage}</span>
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_ACTION_MESSAGE', payload: '' })}
              className="text-[#94A3B8] hover:text-white text-xs font-bold shrink-0"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container (Section 04: max-w-[1240px] mx-auto px-6 md:px-12 py-10) */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-6 md:px-12 py-8 pb-40">
        {/* Welcome Sub-Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E4E9] pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#111215] tracking-tight">
              {state.activeRoleView === 'CLIENT'
                ? 'Client Escrow & Gig Funding Hub'
                : state.activeRoleView === 'FREELANCER'
                ? 'Student Freelancer Proof Studio'
                : 'Campus Referee Arbitration Court'}
            </h1>
            <p className="text-[13px] text-[#64748B] mt-0.5">
              Connected BridgeKey identity:{' '}
              <span className="font-semibold text-[#111215]">{state.userProfile.identity.name}</span> (
              {state.userProfile.identity.college}) • Wallet:{' '}
              <span className="font-mono text-[#0066CC] font-bold">
                {state.connectedAddress.slice(0, 6)}...{state.connectedAddress.slice(-4)}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'LANDING' })}
              className="text-[12px] font-semibold text-[#64748B] hover:text-[#0066CC] px-2.5 py-1 bg-white border border-[#E2E4E9] rounded-[8px] transition-colors"
            >
              ← Landing Overview
            </button>

            <span className="text-[12px] font-medium text-[#64748B]">Active Job:</span>
            <select
              value={state.selectedJobId}
              onChange={e => dispatch({ type: 'SELECT_JOB', payload: e.target.value })}
              className="h-[36px] px-3 bg-white border border-[#E2E4E9] rounded-[8px] text-[12px] font-semibold text-[#111215] focus:outline-none focus:border-[#0066CC]"
            >
              {state.jobs.map(j => (
                <option key={j.id} value={j.id}>
                  {j.title} (₹{j.amountRupees} • {j.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Asymmetric Grid: Left 5 Cols (Exterior Safe Locker) | Right 7 Cols (Workspace Stage) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 sticky top-[88px]">
            <ExteriorSafeLocker />
          </div>

          <div className="lg:col-span-7">
            <WorkspaceStage />
          </div>
        </div>
      </main>

      {/* Persistent Judge On-Chain Verification Console (Section 22) */}
      <JudgeBar />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
