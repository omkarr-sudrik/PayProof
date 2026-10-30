import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePayProof } from '../context/PayProofStore';
import { PAYPROOF_ESCROW_SOURCE } from '../config/payProofContract';
import { getExplorerTxUrl, getExplorerAddressUrl } from '../config/mstNetworks';
import {
  Terminal,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Code,
  Play,
  Copy,
  Check,
  X,
  FileCode,
} from 'lucide-react';

export const JudgeBar: React.FC = () => {
  const { state, dispatch, executeContractCall } = usePayProof();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showSourceModal, setShowSourceModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [runningScenario, setRunningScenario] = useState<string | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PAYPROOF_ESCROW_SOURCE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // 1-Click 4-Scenario Simulators (Section 22)
  const runScenarioA = async () => {
    setRunningScenario('A');
    dispatch({ type: 'SET_ROLE_VIEW', payload: 'CLIENT' });
    const resFund = await executeContractCall('createAndFundJob', [
      '0x255a8Ea5f82A9aE832C464EdA9d7C48A004964cF',
      Math.floor(Date.now() / 1000) + 86400 * 7,
      5 * 86400,
      2,
      'Scenario A: College Fest Logo & Brand Kit',
    ], '0.01');

    const newJobId = `JOB-SCEN-A-${Date.now().toString().slice(-3)}`;
    dispatch({
      type: 'CREATE_JOB',
      payload: {
        id: newJobId,
        title: 'Scenario A: College Fest Logo & Brand Kit',
        category: 'DESIGN',
        clientAddress: state.connectedAddress,
        freelancerAddress: '0x255a8Ea5f82A9aE832C464EdA9d7C48A004964cF',
        amountRupees: 3000,
        amountMSTC: 30.0,
        status: 'FUNDED',
        milestones: [
          { title: 'Concept Draft (40%)', percentage: 40, amountRupees: 1200, completed: false },
          { title: 'Final Delivery (60%)', percentage: 60, amountRupees: 1800, completed: false },
        ],
        acceptanceCriteria: ['Deliver PNG + SVG vector files', 'Original student design'],
        maxRevisions: 2,
        revisionsLeft: 2,
        autoReleaseDays: 5,
        reviewDeadline: null,
        deliverable: null,
        createdAt: Date.now(),
        lastTxHash: resFund.txHash,
      },
    });

    // Accept
    dispatch({ type: 'SET_ROLE_VIEW', payload: 'FREELANCER' });
    const resAccept = await executeContractCall('acceptJob', [1]);
    dispatch({ type: 'ACCEPT_JOB', payload: { jobId: newJobId, txHash: resAccept.txHash } });

    // Submit Deliverable
    const sampleHash = '0x' + Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('');
    const resSubmit = await executeContractCall('submitDeliverable', [1, sampleHash, 'ipfs://sample_deliverable.svg']);
    dispatch({
      type: 'SUBMIT_DELIVERABLE',
      payload: {
        jobId: newJobId,
        deliverable: {
          fileName: 'Fest_Logo_Final_Vector.svg',
          fileSize: '3.4 MB',
          fileHash: sampleHash,
          submittedAt: Date.now(),
          uri: 'ipfs://sample_deliverable.svg',
        },
        txHash: resSubmit.txHash,
      },
    });

    // Client Approves -> Instant Payout
    dispatch({ type: 'SET_ROLE_VIEW', payload: 'CLIENT' });
    const resApprove = await executeContractCall('approveWork', [1, 5]);
    dispatch({ type: 'APPROVE_JOB', payload: { jobId: newJobId, rating: 5, txHash: resApprove.txHash } });

    setRunningScenario(null);
  };

  const runScenarioB = async () => {
    setRunningScenario('B');
    dispatch({ type: 'SET_ROLE_VIEW', payload: 'FREELANCER' });
    const targetJob = state.jobs.find(j => j.status === 'SUBMITTED') || state.jobs[0];
    if (targetJob) {
      dispatch({ type: 'FAST_FORWARD_TIMER', payload: { jobId: targetJob.id } });
      const resAuto = await executeContractCall('autoRelease', [targetJob.onChainId || 1]);
      dispatch({ type: 'AUTO_RELEASE', payload: { jobId: targetJob.id, txHash: resAuto.txHash } });
    }
    setRunningScenario(null);
  };

  const runScenarioC = async () => {
    setRunningScenario('C');
    dispatch({ type: 'SET_ROLE_VIEW', payload: 'CLIENT' });
    const targetJob = state.jobs.find(j => j.status === 'FUNDED') || state.jobs[0];
    if (targetJob) {
      const resRefund = await executeContractCall('claimRefund', [targetJob.onChainId || 1]);
      dispatch({ type: 'CLAIM_REFUND', payload: { jobId: targetJob.id, txHash: resRefund.txHash } });
    }
    setRunningScenario(null);
  };

  const runScenarioD = async () => {
    setRunningScenario('D');
    dispatch({ type: 'LOAD_SAMPLE_DISPUTE' });
    dispatch({ type: 'SET_ROLE_VIEW', payload: 'REFEREE' });
    setRunningScenario(null);
  };

  return (
    <>
      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F141C] text-white border-t border-[#334155] shadow-2xl">
        {/* Top Header / Bar Toggle */}
        <div className="px-6 py-2.5 flex items-center justify-between text-[12px] font-mono border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[#38BDF8]">
              <Terminal className="w-4 h-4" />
              <span className="font-bold">MST BUILDATHON 2.0 ON-CHAIN VERIFICATION CONSOLE</span>
            </div>
            <span className="text-[#64748B]">|</span>
            <span className="text-[#94A3B8]">
              Network: <span className="text-[#10B981] font-bold">MST Testnet (91562037)</span>
            </span>
            <span className="text-[#64748B]">|</span>
            <span className="text-[#94A3B8]">
              Contract: <span className="font-mono text-white">{state.testnetContractAddress.slice(0, 8)}...{state.testnetContractAddress.slice(-6)}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSourceModal(true)}
              className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#334155] text-[#38BDF8] rounded-[6px] transition-colors flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5" />
              <span>📄 View Solidity Source</span>
            </button>

            <a
              href={getExplorerAddressUrl(state.testnetContractAddress)}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#334155] text-white rounded-[6px] transition-colors flex items-center gap-1.5"
            >
              <span>View on MSTScan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#94A3B8] hover:text-white p-1 rounded transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Console Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 py-4 space-y-4 max-h-[320px] overflow-y-auto"
            >
              {/* 1-Click 4-Scenario Simulator Buttons */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-2 uppercase tracking-wider">
                  <span>1-Click 4-Scenario Edge-Case Simulators for Evaluators</span>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-[#38BDF8]">
                      <input
                        type="checkbox"
                        checked={state.scaleOnChain1000x}
                        onChange={e => dispatch({ type: 'TOGGLE_SCALE_ON_CHAIN', payload: e.target.checked })}
                        className="rounded accent-[#0066CC]"
                      />
                      <span>Scale On-Chain Value (1000x) if low faucet</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  <button
                    onClick={runScenarioA}
                    disabled={!!runningScenario}
                    className="p-2.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-left border border-[#334155] transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#10B981]">
                      <Play className="w-3 h-3 fill-current" />
                      <span>▶ Scenario A: Happy Path</span>
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5 font-mono">
                      Lock ₹3,000 → Hash → Payout + Badge
                    </div>
                  </button>

                  <button
                    onClick={runScenarioB}
                    disabled={!!runningScenario}
                    className="p-2.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-left border border-[#334155] transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#F59E0B]">
                      <Play className="w-3 h-3 fill-current" />
                      <span>▶ Scenario B: Anti-Ghosting</span>
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5 font-mono">
                      Fast-Forward 5 Days → Auto Payout
                    </div>
                  </button>

                  <button
                    onClick={runScenarioC}
                    disabled={!!runningScenario}
                    className="p-2.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-left border border-[#334155] transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#38BDF8]">
                      <Play className="w-3 h-3 fill-current" />
                      <span>▶ Scenario C: Client Safety</span>
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5 font-mono">
                      Student Never Starts → 100% Refund
                    </div>
                  </button>

                  <button
                    onClick={runScenarioD}
                    disabled={!!runningScenario}
                    className="p-2.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-left border border-[#334155] transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#EF4444]">
                      <Play className="w-3 h-3 fill-current" />
                      <span>▶ Scenario D: Referee Court</span>
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5 font-mono">
                      Raise Dispute → 2-of-3 Panel Vote
                    </div>
                  </button>
                </div>
              </div>

              {/* Real-Time Transaction Receipt Log */}
              <div>
                <div className="text-[11px] font-mono text-[#94A3B8] mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>Real-Time Verifiable On-Chain Transaction Receipts</span>
                  <span>{state.txLogs.length} Transactions Logged</span>
                </div>

                <div className="bg-[#05080E] rounded-[10px] border border-[#1E293B] p-2.5 max-h-[120px] overflow-y-auto space-y-1.5 font-mono text-[11px]">
                  {state.txLogs.map(log => (
                    <div key={log.id} className="flex items-center justify-between text-[#94A3B8] hover:text-white">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[#10B981]">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                        <span className="text-[#38BDF8] font-bold">{log.functionName}</span>
                        {log.rupeeDelta !== 0 && (
                          <span className={log.rupeeDelta > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                            {log.rupeeDelta > 0 ? `+₹${log.rupeeDelta}` : `-₹${Math.abs(log.rupeeDelta)}`}
                          </span>
                        )}
                        <span className="text-[#64748B]">Job: {log.jobId || 'N/A'}</span>
                      </div>

                      <a
                        href={getExplorerTxUrl(log.txHash)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#64748B] hover:text-[#38BDF8] shrink-0 ml-2 flex items-center gap-1"
                      >
                        <span>{log.txHash.slice(0, 10)}...{log.txHash.slice(-6)}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Solidity Source Code Modal */}
      <AnimatePresence>
        {showSourceModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0F141C] text-white border border-[#334155] rounded-[20px] max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileCode className="w-5 h-5 text-[#38BDF8]" />
                  <div>
                    <h3 className="font-bold text-[15px]">PayProofEscrow.sol</h3>
                    <p className="text-[12px] text-[#64748B] font-mono">
                      Solidity ^0.8.20 • Deployed at {state.testnetContractAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] rounded-[8px] text-[12px] font-mono flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied Source!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={() => setShowSourceModal(false)}
                    className="p-1.5 text-[#94A3B8] hover:text-white rounded-[8px] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-5 overflow-y-auto flex-1 bg-[#05080E] font-mono text-[12px] leading-relaxed">
                <pre className="text-[#E2E8F0] whitespace-pre-wrap">{PAYPROOF_ESCROW_SOURCE}</pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
