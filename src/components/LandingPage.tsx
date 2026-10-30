import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { MST_TESTNET, DEFAULT_CONTRACT_ADDRESS, getExplorerAddressUrl } from '../config/mstNetworks';

interface LandingPageProps {
  onStartOnboarding: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartOnboarding }) => {
  const [safePreviewLocked, setSafePreviewLocked] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#111215] font-sans selection:bg-[#0066CC] selection:text-white">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 h-[68px] px-6 md:px-12 bg-white/85 backdrop-blur-md border-b border-[#E2E4E9] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-[#0066CC] text-white flex items-center justify-center font-black text-lg shadow-sm">
            P
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-[18px] tracking-tight text-[#111215]">
                Pay<span className="text-[#0066CC]">Proof</span>
              </span>
              <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]">
                MST Testnet
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] hidden sm:block">
              Trust-First Smart Contract Escrow
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#64748B]">
          <a href="#the-problem" className="hover:text-[#111215] transition-colors">The Problem</a>
          <a href="#how-it-works" className="hover:text-[#111215] transition-colors">How It Works</a>
          <a href="#safe-locker" className="hover:text-[#111215] transition-colors">Safe Locker</a>
          <a href="#scenarios" className="hover:text-[#111215] transition-colors">Edge Cases</a>
          <a href="#mst-blockchain" className="hover:text-[#111215] transition-colors">MST Blockchain</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={getExplorerAddressUrl(DEFAULT_CONTRACT_ADDRESS)}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#F1F3F7] hover:bg-[#E2E4E9] text-[12px] font-mono text-[#475569] transition-colors"
          >
            <span>Verified Contract</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onStartOnboarding}
            className="h-[40px] px-5 rounded-[10px] bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold text-[13px] flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Open Safe Locker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1240px] mx-auto px-6 md:px-12 py-16 space-y-28">
        {/* HERO SECTION */}
        <section className="text-center pt-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2E4E9] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[12px] font-bold text-[#111215] tracking-wide uppercase">
              MST Blockchain Buildathon 2.0 • Round 2 MVP
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#111215] leading-[1.08] max-w-4xl mx-auto">
            Lock the money. <br className="hidden sm:block" />
            Prove the work. <br className="hidden sm:block" />
            <span className="text-[#0066CC]">Release instantly.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto font-normal leading-relaxed">
            A trust-first payment platform between student freelancers and campus clients.
            Payment is secured in a smart-contract safe locker first, work is proven second, and payout happens automatically.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-[16px] bg-white border border-[#E2E4E9] shadow-sm">
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Speed</div>
              <div className="text-xl font-extrabold text-[#111215] mt-0.5 tabular-nums">&lt; 1 Min</div>
              <div className="text-[12px] text-[#10B981] font-medium">Approval to Payout</div>
            </div>

            <div className="p-4 rounded-[16px] bg-white border border-[#E2E4E9] shadow-sm">
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Verifiable</div>
              <div className="text-xl font-extrabold text-[#111215] mt-0.5">100% On-Chain</div>
              <div className="text-[12px] text-[#0066CC] font-medium">MST Blockchain</div>
            </div>

            <div className="p-4 rounded-[16px] bg-white border border-[#E2E4E9] shadow-sm">
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Platform Fee</div>
              <div className="text-xl font-extrabold text-[#111215] mt-0.5 tabular-nums">2.5% Flat</div>
              <div className="text-[12px] text-[#64748B] font-medium">Zero Hidden Charges</div>
            </div>

            <div className="p-4 rounded-[16px] bg-white border border-[#E2E4E9] shadow-sm">
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Campus Target</div>
              <div className="text-xl font-extrabold text-[#111215] mt-0.5 tabular-nums">₹500 – ₹10K</div>
              <div className="text-[12px] text-[#F59E0B] font-medium">Student Micro-Gigs</div>
            </div>
          </div>

          {/* Hero Interactive Safe Demo Widget */}
          <div id="safe-locker" className="pt-6 max-w-xl mx-auto">
            <div className="p-6 rounded-[24px] bg-gradient-to-b from-[#ECEEF2] via-[#E2E5EC] to-[#D4D8E2] border-2 border-[#B8C0CC] shadow-xl text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${safePreviewLocked ? 'bg-[#10B981]' : 'bg-[#94A3B8]'}`} />
                  <span>{safePreviewLocked ? 'Safe Locker Locked (30.00 tMSTC)' : 'Safe Locker Opened (₹0 Locked)'}</span>
                </span>
                <button
                  onClick={() => setSafePreviewLocked(!safePreviewLocked)}
                  className="text-[12px] font-bold px-3 py-1 bg-white rounded-full border border-[#CBD5E1] text-[#0066CC] hover:bg-[#F8FAFC] transition-colors"
                >
                  {safePreviewLocked ? 'Simulate Unlock 🔓' : 'Simulate Lock 🔒'}
                </button>
              </div>

              <div className="rounded-[16px] bg-[#0F141C] p-5 border-2 border-[#334155] text-white">
                <div className="flex justify-between text-[11px] font-mono text-[#94A3B8]">
                  <span>MST ESCROW VAULT #01</span>
                  <span className="text-[#10B981]">{safePreviewLocked ? '🟢 ARMED' : '⚪ STANDBY'}</span>
                </div>
                <div className="text-[36px] font-extrabold tracking-tight tabular-nums mt-1">
                  {safePreviewLocked ? '₹3,000' : '₹0'}
                </div>
                <div className="text-[12px] font-mono text-[#38BDF8] pt-2 border-t border-[#1E293B] mt-2 flex justify-between">
                  <span>≈ {safePreviewLocked ? '30.00' : '0.00'} tMSTC on MST Testnet</span>
                  <span className="text-[#94A3B8]">Gas: Sponsored</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: THE INFORMAL FREELANCE TRAP */}
        <section id="the-problem" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[12px] font-bold text-[#EF4444] uppercase tracking-wider">
              01 • The Informal Freelance Trap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight">
              Why WhatsApp Deals Fail Students
            </h2>
            <p className="text-[15px] text-[#64748B] max-w-xl mx-auto">
              Students and campus clubs do deals over Instagram DMs and WhatsApp chats. When things go wrong, nobody is protected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold text-xl">
                🛑
              </div>
              <h3 className="text-lg font-bold text-[#111215]">Client Ghosting</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                Riya finishes a ₹3,000 fest logo. The client says "will pay tomorrow" and stops replying. Work is done, money never arrives.
              </p>
            </div>

            <div className="p-7 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold text-xl">
                📸
              </div>
              <h3 className="text-lg font-bold text-[#111215]">Fake UPI Screenshots</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                Clients send edited screenshots claiming "server busy, money will credit in 2 hours." The freelancer hands over raw project files and loses out.
              </p>
            </div>

            <div className="p-7 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold text-xl">
                🔒
              </div>
              <h3 className="text-lg font-bold text-[#111215]">Upfront Payment Fear</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                Clubs and startups are terrified of paying a student 100% upfront in case they fail exams, disappear, or fail to deliver on time.
              </p>
            </div>

            <div className="p-7 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold text-xl">
                📈
              </div>
              <h3 className="text-lg font-bold text-[#111215]">Endless Scope Creep</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                "Just one more small change" repeated 15 times without a revision limit or agreed acceptance criteria. Unpaid extra work for days.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOW PAYPROOF WORKS */}
        <section id="how-it-works" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[12px] font-bold text-[#0066CC] uppercase tracking-wider">
              02 • The Escrow Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight">
              How a PayProof Job Works
            </h2>
            <p className="text-[15px] text-[#64748B] max-w-xl mx-auto">
              Nobody has to trust anyone blindly. The smart contract holds the money and code enforces the rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-[#111215]">1. Post & Lock Escrow</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                Client sets title, criteria, and budget. Funds are locked into the MST smart contract before any student starts working.
              </p>
            </div>

            <div className="p-7 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-[#111215]">2. Accept & Deliver Proof</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                Freelancer verifies locked balance on MSTScan, does the work, and uploads the deliverable. Browser Web Crypto computes an immutable SHA-256 fingerprint.
              </p>
            </div>

            <div className="p-7 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-[#111215]">3. Review or Auto-Release</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                Client approves for instant 97.5% payout. If client goes silent, the 5-day anti-ghosting timer releases funds automatically!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: EDGE CASES */}
        <section id="scenarios" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[12px] font-bold text-[#10B981] uppercase tracking-wider">
              03 • Automated Protection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight">
              Every Edge Case Handled by Code
            </h2>
            <p className="text-[15px] text-[#64748B] max-w-xl mx-auto">
              From happy paths to silent clients and quality disagreements, the smart contract state machine guarantees fairness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold shrink-0">
                ✓
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">Scenario A • Happy Path</span>
                <h4 className="text-lg font-bold text-[#111215] mt-0.5">Client Approves Milestone</h4>
                <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                  Deliverable matches criteria. Client clicks approve, 97.5% net payout arrives in student wallet in seconds, and a Proof-of-Work badge is minted.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center font-bold shrink-0">
                ⏳
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider">Scenario B • Anti-Ghosting</span>
                <h4 className="text-lg font-bold text-[#111215] mt-0.5">Client Goes Silent</h4>
                <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                  Student submits work proof. If the client does not respond within 5 days, anyone can trigger autoRelease(), guaranteeing the student is never ghosted.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center font-bold shrink-0">
                ↩️
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#0066CC] uppercase tracking-wider">Scenario C • Client Safety</span>
                <h4 className="text-lg font-bold text-[#111215] mt-0.5">Student Never Starts</h4>
                <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                  If the freelancer never accepts or misses the starting deadline, the client reclaims 100% of their locked deposit with a single click.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold shrink-0">
                ⚖️
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#EF4444] uppercase tracking-wider">Scenario D • Fair Arbitration</span>
                <h4 className="text-lg font-bold text-[#111215] mt-0.5">2-of-3 Campus Referee Panel</h4>
                <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                  Disagreement over deliverable quality? 3 neutral campus referees inspect written criteria and cryptographic file hashes. 2-of-3 majority resolves the case.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: BUILT ON MST BLOCKCHAIN */}
        <section id="mst-blockchain" className="p-8 md:p-12 rounded-[28px] bg-[#0F141C] text-white border border-[#334155] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
            <div>
              <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-wider">
                DECENTRALIZED INFRASTRUCTURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">Built on MST Blockchain</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#1E293B] text-[12px] font-mono text-[#10B981] border border-[#334155]">
                Chain ID: {MST_TESTNET.chainIdDec}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1E293B] text-[12px] font-mono text-[#38BDF8] border border-[#334155]">
                BridgeKey Integrated
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-[13px] text-[#94A3B8]">
            <div className="space-y-1.5">
              <div className="font-bold text-white text-[15px]">Official BridgeKey Non-Custodial Wallet</div>
              <p>
                Native support for the BridgeKey wallet extension and direct signer. Sign escrow deposits and releases with high security.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-white text-[15px]">MSTScan Transparency</div>
              <p>
                Every transaction, job milestone, file fingerprint, and referee vote is recorded permanently on MSTScan for public verification.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-white text-[15px]">Soulbound Proof Badges</div>
              <p>
                Completed jobs mint non-transferable verified badges so students build a genuine, verifiable on-chain career portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* BIG BOTTOM CALL TO ACTION BUTTON */}
        <section className="text-center pt-8 pb-12 space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111215]">
              Ready to experience trust-first payments?
            </h2>
            <p className="text-[15px] text-[#64748B]">
              Step into the 5-question setup wizard, verify your campus identity, connect your BridgeKey wallet, and open your Safe Locker.
            </p>
          </div>

          {/* Prominent Apple-Style Interactive Next Button */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartOnboarding}
              className="h-[64px] px-10 rounded-[18px] bg-[#0066CC] hover:bg-[#0052A3] text-white font-extrabold text-[18px] inline-flex items-center gap-3 shadow-xl shadow-[#0066CC]/25 transition-all ring-4 ring-[#0066CC]/20"
            >
              <span>🚀 Launch Safe Locker & Start Onboarding</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>

          <p className="text-[12px] font-mono text-[#64748B]">
            BridgeKey Wallet • MST Testnet • Real On-Chain Payments
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E4E9] bg-white py-8 px-6 md:px-12 text-center text-[12px] text-[#64748B]">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#111215]">PayProof</span>
            <span>• Built for the MST Blockchain Buildathon 2.0</span>
          </div>
          <div className="font-mono">
            Contract: <a href={getExplorerAddressUrl(DEFAULT_CONTRACT_ADDRESS)} target="_blank" rel="noreferrer" className="text-[#0066CC] hover:underline">{DEFAULT_CONTRACT_ADDRESS.slice(0, 8)}...{DEFAULT_CONTRACT_ADDRESS.slice(-6)}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
