import React, { useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { usePayProof } from '../context/PayProofStore';
import { getExplorerAddressUrl } from '../config/mstNetworks';
import {
  Lock,
  Unlock,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
} from 'lucide-react';

export const ExteriorSafeLocker: React.FC = () => {
  const { state, dispatch, derivedLockerRupees, derivedLockerMSTC, activeJob } = usePayProof();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Smooth numerical spring counter for Rupee balance (Section 09: stiffness 120, damping 20)
  const springRupees = useSpring(0, { stiffness: 120, damping: 20 });
  const [displayRupees, setDisplayRupees] = useState<number>(0);

  useEffect(() => {
    springRupees.set(derivedLockerRupees);
  }, [derivedLockerRupees, springRupees]);

  useEffect(() => {
    const unsubscribe = springRupees.on('change', v => {
      setDisplayRupees(Math.round(v));
    });
    return () => unsubscribe();
  }, [springRupees]);

  // Determine current safe locker visual state
  const isLocked = derivedLockerRupees > 0;
  const isDisputed = state.jobs.some(j => j.status === 'DISPUTED');
  const isSubmittedReview = activeJob?.status === 'SUBMITTED' && (activeJob?.reviewDeadline ?? 0) > Date.now();
  const isLockingPending = state.vaultTransitionState === 'BOLTING' || state.vaultTransitionState === 'ROTATING_DIAL';

  // Live countdown string for review timer if submitted
  const [timerString, setTimerString] = useState<string>('04d 23h 59m 54s');
  useEffect(() => {
    if (!activeJob?.reviewDeadline) return;
    const interval = setInterval(() => {
      const diff = activeJob.reviewDeadline! - Date.now();
      if (diff <= 0) {
        setTimerString('00d 00h 00m 00s (Expired)');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTimerString(
          `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeJob?.reviewDeadline]);

  // Rotary Dial Angle
  let dialRotation = 0;
  if (isLockingPending) dialRotation = 240;
  else if (isLocked) dialRotation = 180;
  else dialRotation = 0;

  return (
    <div className="w-full">
      {/* Outer Safe Chassis & Brushed Metal Bevel */}
      <div className="rounded-[28px] p-6 bg-gradient-to-b from-[#ECEEF2] via-[#E2E5EC] to-[#D4D8E2] border-2 border-[#B8C0CC] shadow-xl relative">
        {/* Inner Recessed Door Frame */}
        <div className="rounded-[20px] p-6 bg-gradient-to-br from-[#F7F8FA] to-[#E6E9F0] border border-[#C5CCD6] relative overflow-hidden shadow-inner">
          {/* 4 Corner Hex-Screw Dots */}
          <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-[#B0B7C3] border border-[#94A3B8] shadow-inner flex items-center justify-center">
            <div className="w-1 h-0.5 bg-[#64748B]" />
          </div>
          <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#B0B7C3] border border-[#94A3B8] shadow-inner flex items-center justify-center">
            <div className="w-1 h-0.5 bg-[#64748B]" />
          </div>
          <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-[#B0B7C3] border border-[#94A3B8] shadow-inner flex items-center justify-center">
            <div className="w-1 h-0.5 bg-[#64748B]" />
          </div>
          <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-[#B0B7C3] border border-[#94A3B8] shadow-inner flex items-center justify-center">
            <div className="w-1 h-0.5 bg-[#64748B]" />
          </div>

          {/* Three Mechanical Steel Locking Bolts (Right Edge) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
            {[1, 2, 3].map(boltIndex => (
              <motion.div
                key={boltIndex}
                className="w-8 h-4 rounded-r-md bg-gradient-to-b from-[#94A3B8] via-[#E2E8F0] to-[#64748B] border border-[#475569] shadow-md relative"
                animate={{
                  x: isLocked ? 16 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 26,
                  delay: isLocked ? boltIndex * 0.08 : 0,
                }}
              >
                {/* Metallic bevel shine */}
                <div className="absolute top-0.5 left-0.5 right-0.5 h-1 bg-white/40 rounded-sm" />
              </motion.div>
            ))}
          </div>

          {/* Crimson Double-Lock Clamp Overlay (Dispute State) */}
          <AnimatePresence>
            {isDisputed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#EF4444]/10 border-2 border-[#EF4444] rounded-[20px] pointer-events-none z-30 flex items-center justify-center"
              >
                <div className="bg-[#EF4444] text-white px-4 py-2 rounded-full font-bold text-[12px] flex items-center gap-2 shadow-lg">
                  <ShieldAlert className="w-4 h-4" />
                  <span>DOUBLE-LOCK CLAMP ENGAGED • 2-OF-3 PANEL ACTIVE</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recessed OLED Digital Balance Window (Top Half) */}
          <div className="rounded-[14px] bg-[#0F141C] p-5 border-2 border-[#334155] shadow-2xl relative overflow-hidden mb-6">
            {/* Subtle OLED scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

            {/* Top Status Row */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider mb-3 relative z-10">
              <div className="flex items-center gap-2">
                {isDisputed ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-ping" />
                    <span className="text-[#EF4444] font-bold">⚖️ FROZEN FOR 3 REFEREES</span>
                  </>
                ) : isSubmittedReview ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
                    <span className="text-[#F59E0B] font-bold">⏳ 5-DAY TIMER RUNNING</span>
                  </>
                ) : isLocked ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-[#10B981] font-bold">🟢 SAFE LOCKED & ARMED</span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
                    <span className="text-[#94A3B8] font-bold">⚪ SAFE UNLOCKED • READY</span>
                  </>
                )}
              </div>
              <span className="text-[#64748B]">MST ESCROW VAULT #01</span>
            </div>

            {/* Center Primary Tabular Numeral Readout */}
            <div className="relative z-10 my-2">
              <div className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-0.5">
                Total Escrow Locked
              </div>
              <div className="text-[34px] font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-2">
                <span>₹{displayRupees.toLocaleString('en-IN')}</span>
                {isLockingPending && (
                  <span className="text-[12px] font-normal text-[#10B981] animate-pulse">Bolting...</span>
                )}
              </div>
            </div>

            {/* Subtitle Readout with tMSTC equivalent & MSTScan */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1E293B] relative z-10 text-[12px]">
              <div className="font-mono text-[#38BDF8]">
                ≈ {derivedLockerMSTC.toFixed(2)} tMSTC on MST Testnet
              </div>
              <a
                href={getExplorerAddressUrl(state.testnetContractAddress)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#94A3B8] hover:text-white bg-[#1E293B] hover:bg-[#334155] px-2.5 py-1 rounded-md transition-colors"
              >
                <span>Verify on MSTScan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Live Timer Countdown Banner if review window is active */}
            {isSubmittedReview && (
              <div className="mt-3 pt-2.5 border-t border-[#1E293B] flex items-center justify-between text-[11px] font-mono text-[#F59E0B]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Auto-Release Countdown:</span>
                </div>
                <span className="font-bold tabular-nums">{timerString}</span>
              </div>
            )}
          </div>

          {/* Mechanical Rotary Combination Dial & Spoke Handle (Bottom Half) */}
          <div className="py-4 flex flex-col items-center justify-center relative">
            <div className="relative flex items-center justify-center">
              {/* Perimeter Tick Marks Ring */}
              <div className="w-[140px] h-[140px] rounded-full border-2 border-dashed border-[#CBD5E1] absolute pointer-events-none" />

              {/* Rotary Aluminum Dial */}
              <motion.div
                className="w-[110px] h-[110px] rounded-full border-4 border-[#94A3B8] bg-gradient-to-tr from-[#CBD5E1] via-[#E2E8F0] to-[#F8FAFC] shadow-xl flex items-center justify-center relative cursor-default"
                animate={{ rotate: dialRotation }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 1.1 }}
              >
                {/* 3-Spoke Vault Handle */}
                <div className="absolute w-[80px] h-[8px] bg-gradient-to-r from-[#64748B] via-[#E2E8F0] to-[#64748B] rounded-full shadow" />
                <div className="absolute w-[8px] h-[80px] bg-gradient-to-b from-[#64748B] via-[#E2E8F0] to-[#64748B] rounded-full shadow" />
                <div className="absolute w-[80px] h-[8px] bg-gradient-to-r from-[#64748B] via-[#E2E8F0] to-[#64748B] rounded-full shadow rotate-45" />

                {/* Center Hub */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#475569] to-[#1E293B] border-2 border-[#E2E8F0] shadow-md flex items-center justify-center z-10">
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-[#10B981]" />
                  ) : (
                    <Unlock className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Dial Label */}
            <div className="mt-4 text-center">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wider">
                {isLocked ? 'Hardware Escrow Bolted (180°)' : 'Safe Vault Standby (0°)'}
              </span>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                {state.liveTxPending
                  ? state.pendingTxText
                  : isLocked
                    ? 'Funds mathematically locked until cryptographic proof or approval'
                    : 'Ready to receive next job milestone deposit'}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Locker Inspection Drawer (Section 08 footer) */}
        <div className="mt-4">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="w-full py-2.5 px-4 bg-white/70 hover:bg-white rounded-[12px] border border-[#CBD5E1] text-[12px] font-semibold text-[#334155] flex items-center justify-between transition-colors shadow-sm"
          >
            <span className="flex items-center gap-1.5">
              <span>🔍 Inspect Inside Locker</span>
              <span className="text-[11px] text-[#64748B]">({state.jobs.length} total jobs)</span>
            </span>
            {drawerOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2 bg-white rounded-[14px] border border-[#CBD5E1] p-4 text-[12px] shadow-sm space-y-3"
              >
                <div className="font-bold text-[#111215] flex items-center justify-between border-b border-[#E2E4E9] pb-2">
                  <span>Current Locked Jobs Breakdown</span>
                  <span className="tabular-nums font-mono text-[#0066CC]">₹{derivedLockerRupees.toLocaleString('en-IN')} Total</span>
                </div>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {state.jobs.map(job => (
                    <div
                      key={job.id}
                      onClick={() => dispatch({ type: 'SELECT_JOB', payload: job.id })}
                      className={`p-2.5 rounded-[10px] border flex items-center justify-between cursor-pointer transition-colors ${state.selectedJobId === job.id
                          ? 'border-[#0066CC] bg-[#F0F7FF]'
                          : 'border-[#E2E4E9] hover:bg-[#F8FAFC]'
                        }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-[#111215] truncate">{job.title}</div>
                        <div className="text-[11px] text-[#64748B]">
                          ID: {job.id} • Status: <span className="font-mono text-[#0066CC]">{job.status}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-[#111215] tabular-nums">₹{job.amountRupees.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-[#64748B] font-mono">{job.amountMSTC.toFixed(2)} tMSTC</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
