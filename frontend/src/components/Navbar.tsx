import React from 'react';
import { usePayProof } from '../context/PayProofStore';
import {
  Settings,
  Wallet,
  Users,
  Palette,
  Scale,
} from 'lucide-react';
import { MST_TESTNET } from '../config/mstNetworks';

export const Navbar: React.FC = () => {
  const { state, dispatch } = usePayProof();
  const { userProfile, activeRoleView, clientWalletRupees, freelancerWalletRupees, connectedAddress } = state;

  return (
    <header className="sticky top-0 z-30 h-[68px] px-6 md:px-12 bg-white/85 backdrop-blur-md border-b border-[#E2E4E9] flex items-center justify-between">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'LANDING' })}
          title="Return to Landing Page"
        >
          <div className="w-9 h-9 rounded-[10px] bg-[#0066CC] text-white flex items-center justify-center font-black text-lg shadow-sm shadow-[#0066CC]/30">
            P
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-[18px] tracking-tight text-[#111215]">
                Pay<span className="text-[#0066CC]">Proof</span>
              </span>
              <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]">
                v2.0
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] hidden sm:block">
              Lock money. Prove work. Release instantly.
            </span>
          </div>
        </div>

        {/* BridgeKey on MST Testnet Status Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F3F7] border border-[#E2E4E9] text-[11px] font-mono text-[#475569]">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-bold text-[#0066CC]">BridgeKey</span>
          <span className="text-[#94A3B8]">
            {connectedAddress ? `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}` : `(${MST_TESTNET.chainIdDec})`}
          </span>
        </div>
      </div>

      {/* 3-Role Segmented Switcher (Freelancer | Client | Referee) (Section 06) */}
      <div className="flex items-center p-1 bg-[#F1F3F7] rounded-[12px] border border-[#E2E4E9]">
        <button
          onClick={() => dispatch({ type: 'SET_ROLE_VIEW', payload: 'CLIENT' })}
          className={`px-3 py-1.5 rounded-[9px] text-[13px] font-semibold flex items-center gap-1.5 transition-all ${
            activeRoleView === 'CLIENT'
              ? 'bg-white text-[#111215] shadow-sm font-bold'
              : 'text-[#64748B] hover:text-[#111215]'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#0066CC]" />
          <span>Client</span>
        </button>

        <button
          onClick={() => dispatch({ type: 'SET_ROLE_VIEW', payload: 'FREELANCER' })}
          className={`px-3 py-1.5 rounded-[9px] text-[13px] font-semibold flex items-center gap-1.5 transition-all ${
            activeRoleView === 'FREELANCER'
              ? 'bg-white text-[#111215] shadow-sm font-bold'
              : 'text-[#64748B] hover:text-[#111215]'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-[#0066CC]" />
          <span>Freelancer</span>
        </button>

        <button
          onClick={() => dispatch({ type: 'SET_ROLE_VIEW', payload: 'REFEREE' })}
          className={`px-3 py-1.5 rounded-[9px] text-[13px] font-semibold flex items-center gap-1.5 transition-all ${
            activeRoleView === 'REFEREE'
              ? 'bg-white text-[#111215] shadow-sm font-bold'
              : 'text-[#64748B] hover:text-[#111215]'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-[#0066CC]" />
          <span>Referee</span>
        </button>
      </div>

      {/* Right Controls: Campus Badge, Wallet Balance & Retake Setup */}
      <div className="flex items-center gap-3">
        {/* Campus Identity Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0] text-[12px] font-bold text-[#065F46]">
          <span>🎓 {userProfile.identity.name || 'Kritika'}</span>
          <span className="text-[#047857] font-normal">• {userProfile.identity.college || 'VIT Pune'}</span>
        </div>

        {/* Live Wallet Balance */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white border border-[#E2E4E9] shadow-sm text-right">
          <Wallet className="w-4 h-4 text-[#0066CC] shrink-0" />
          <div>
            <div className="text-[12px] font-bold text-[#111215] tabular-nums">
              {activeRoleView === 'FREELANCER'
                ? `₹${freelancerWalletRupees.toLocaleString('en-IN')}`
                : `₹${clientWalletRupees.toLocaleString('en-IN')}`}
            </div>
            <div className="text-[10px] text-[#64748B] font-mono leading-none">
              {activeRoleView === 'FREELANCER'
                ? `Earned: ${(freelancerWalletRupees / 100).toFixed(2)} tMSTC`
                : `Balance: ${(clientWalletRupees / 100).toFixed(2)} tMSTC`}
            </div>
          </div>
        </div>

        {/* Retake Setup Pill (Section 06) */}
        <button
          onClick={() => dispatch({ type: 'RESET_TO_SETUP' })}
          title="Preferences & Retake Setup"
          className="p-2 rounded-[10px] border border-[#E2E4E9] bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#111215] transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
