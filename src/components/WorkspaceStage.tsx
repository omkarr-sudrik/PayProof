import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  usePayProof,
  type EscrowJobRecord,
  type DeliverableInfo,
} from '../context/PayProofStore';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  UploadCloud,
  FileCheck,
  RotateCcw,
  Scale,
  Sparkles,
  Copy,
  Award,
} from 'lucide-react';

export const WorkspaceStage: React.FC = () => {
  const {
    state,
    dispatch,
    activeJob,
    executeContractCall,
  } = usePayProof();

  const isBeginner = state.userProfile.experienceMode === 'BEGINNER';
  const role = state.activeRoleView;

  // Form states for creating a new job
  const [jobTitle, setJobTitle] = useState<string>('College Fest Logo & Brand Kit');
  const [budgetRupees, setBudgetRupees] = useState<number>(state.userProfile.defaultBudgetRupees || 3000);
  const [isMilestoneSplit, setIsMilestoneSplit] = useState<boolean>(true);
  const [maxRevisions, setMaxRevisions] = useState<number>(2);
  const [autoReleaseDays, setAutoReleaseDays] = useState<number>(5);
  const [criteria, setCriteria] = useState<string>(
    '1. Deliver PNG + SVG vector files in 3 color variants\n2. Provide typography guidelines sheet\n3. All art 100% original student work'
  );

  // Freelancer upload & hash state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sampleFileName, setSampleFileName] = useState<string>('Fest_Logo_Final_Vector.svg');
  const [fileHash, setFileHash] = useState<string>('');
  const [isScanningHash, setIsScanningHash] = useState<boolean>(false);
  const [hashGeneratedTime, setHashGeneratedTime] = useState<string>('');

  // WhatsApp share link copy notification
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Auto-fill template pills
  const handleApplyTemplate = (type: 'LOGO' | 'REEL' | 'REACT' | 'TUTOR') => {
    if (type === 'LOGO') {
      setJobTitle('College Fest Logo & Brand Kit');
      setBudgetRupees(3000);
      setIsMilestoneSplit(true);
      setMaxRevisions(2);
      setAutoReleaseDays(5);
      setCriteria('1. Deliver PNG + SVG vector files in 3 color variants\n2. Provide typography guidelines sheet\n3. All art 100% original student work');
    } else if (type === 'REEL') {
      setJobTitle('Club Event Promo Reel Edit (9:16)');
      setBudgetRupees(2000);
      setIsMilestoneSplit(false);
      setMaxRevisions(1);
      setAutoReleaseDays(3);
      setCriteria('1. 9:16 vertical export 1080x1920 60fps\n2. Audio leveled with license-free music\n3. Motion graphics title card matching theme');
    } else if (type === 'REACT') {
      setJobTitle('Startup Landing Page in React');
      setBudgetRupees(6000);
      setIsMilestoneSplit(true);
      setMaxRevisions(3);
      setAutoReleaseDays(7);
      setCriteria('1. Responsive landing page with Tailwind CSS\n2. Clean GitHub repo with CI/CD\n3. Lighthouse performance score > 90');
    } else {
      setJobTitle('Placement Prep Notes & Tutoring (Data Structures)');
      setBudgetRupees(1200);
      setIsMilestoneSplit(false);
      setMaxRevisions(1);
      setAutoReleaseDays(3);
      setCriteria('1. 40 pages of handwritten & typed Tree/Graph notes\n2. 2 live 1-on-1 problem walkthrough sessions\n3. Practice question sheets with solutions');
    }
  };

  // Real Browser Web Crypto SHA-256 Fingerprint calculation (Section 14)
  const computeRealSHA256 = async (fileObj?: File | null, customText?: string) => {
    setIsScanningHash(true);
    let buffer: ArrayBuffer;
    if (fileObj) {
      buffer = await fileObj.arrayBuffer();
    } else {
      const text = customText || `PayProof_Student_Deliverable_${sampleFileName}_${Date.now()}`;
      const encoded = new TextEncoder().encode(text);
      buffer = encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength) as ArrayBuffer;
    }

    // Call window.crypto.subtle.digest
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    const hashHex =
      '0x' +
      Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    setTimeout(() => {
      setFileHash(hashHex);
      setIsScanningHash(false);
      setHashGeneratedTime(
        new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }) + ' IST'
      );
    }, 750);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSampleFileName(file.name);
      computeRealSHA256(file);
    }
  };

  const handleAttachSample = () => {
    setSelectedFile(null);
    setSampleFileName('Fest_Logo_Final_Vector.svg');
    computeRealSHA256(null, 'Fest_Logo_Final_Vector_SVG_Raw_Data_PayProof_Verified');
  };

  // Action Handlers
  const handleCreateAndFund = async () => {
    const mstAmount = (budgetRupees / 100).toFixed(4);

    // Call contract if connected
    const res = await executeContractCall(
      'createAndFundJob',
      [
        state.connectedAddress === state.jobs[0]?.freelancerAddress
          ? '0x255a8Ea5f82A9aE832C464EdA9d7C48A004964cF'
          : '0x255a8Ea5f82A9aE832C464EdA9d7C48A004964cF',
        Math.floor(Date.now() / 1000) + 86400 * 7,
        autoReleaseDays * 86400,
        maxRevisions,
        jobTitle,
      ],
      state.scaleOnChain1000x ? (budgetRupees / 100000).toString() : mstAmount
    );

    const newJob: EscrowJobRecord = {
      id: `JOB-${Date.now().toString().slice(-3)}`,
      title: jobTitle,
      category: state.userProfile.preferredCategory,
      clientAddress: state.connectedAddress,
      freelancerAddress: '0x255a8Ea5f82A9aE832C464EdA9d7C48A004964cF',
      amountRupees: budgetRupees,
      amountMSTC: Number(mstAmount),
      status: 'FUNDED',
      milestones: isMilestoneSplit
        ? [
            {
              title: 'Milestone 1: Concept Draft (40%)',
              percentage: 40,
              amountRupees: Math.round(budgetRupees * 0.4),
              completed: false,
            },
            {
              title: 'Milestone 2: Final Delivery (60%)',
              percentage: 60,
              amountRupees: Math.round(budgetRupees * 0.6),
              completed: false,
            },
          ]
        : [{ title: 'Full Final Delivery (100%)', percentage: 100, amountRupees: budgetRupees, completed: false }],
      acceptanceCriteria: criteria.split('\n').filter(Boolean),
      maxRevisions,
      revisionsLeft: maxRevisions,
      autoReleaseDays,
      reviewDeadline: null,
      deliverable: null,
      createdAt: Date.now(),
      lastTxHash: res.txHash,
    };

    dispatch({ type: 'CREATE_JOB', payload: newJob });
  };

  const handleAcceptJob = async () => {
    if (!activeJob) return;
    const res = await executeContractCall('acceptJob', [activeJob.onChainId || 1]);
    dispatch({ type: 'ACCEPT_JOB', payload: { jobId: activeJob.id, txHash: res.txHash } });
  };

  const handleSubmitDeliverable = async () => {
    if (!activeJob) return;
    const effectiveHash =
      fileHash || '0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
    const deliverable: DeliverableInfo = {
      fileName: selectedFile ? selectedFile.name : sampleFileName,
      fileSize: selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : '18.4 MB',
      fileHash: effectiveHash,
      submittedAt: Date.now(),
      uri: `ipfs://bafybeipayproof_${sampleFileName}`,
    };

    const res = await executeContractCall('submitDeliverable', [
      activeJob.onChainId || 1,
      effectiveHash,
      deliverable.uri,
    ]);

    dispatch({
      type: 'SUBMIT_DELIVERABLE',
      payload: { jobId: activeJob.id, deliverable, txHash: res.txHash },
    });
  };

  const handleApproveWork = async () => {
    if (!activeJob) return;
    const res = await executeContractCall('approveWork', [activeJob.onChainId || 1, 5]);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    dispatch({
      type: 'APPROVE_JOB',
      payload: { jobId: activeJob.id, rating: 5, txHash: res.txHash },
    });
  };

  const handleRequestRevision = async () => {
    if (!activeJob) return;
    const res = await executeContractCall('requestRevision', [
      activeJob.onChainId || 1,
      'Adjust font weights & export transparent SVG',
    ]);
    dispatch({
      type: 'REQUEST_REVISION',
      payload: { jobId: activeJob.id, reason: 'Adjust font weights & export transparent SVG', txHash: res.txHash },
    });
  };

  const handleClaimRefund = async () => {
    if (!activeJob) return;
    const res = await executeContractCall('claimRefund', [activeJob.onChainId || 1]);
    dispatch({ type: 'CLAIM_REFUND', payload: { jobId: activeJob.id, txHash: res.txHash } });
  };

  const handleRaiseDispute = async () => {
    if (!activeJob) return;
    const res = await executeContractCall('raiseDispute', [
      activeJob.onChainId || 1,
      'Work delivered diverges significantly from agreed criteria',
    ]);
    dispatch({
      type: 'RAISE_DISPUTE',
      payload: {
        jobId: activeJob.id,
        reason: 'Work delivered diverges significantly from agreed criteria',
        evidence: 'Screenshots of initial wireframes vs delivered vector files',
        txHash: res.txHash,
      },
    });
  };

  const handleCastVote = async (favorFreelancer: boolean) => {
    if (!activeJob) return;
    const res = await executeContractCall('castRefereeVote', [activeJob.onChainId || 1, favorFreelancer]);
    if (favorFreelancer) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    dispatch({
      type: 'CAST_REFEREE_VOTE',
      payload: {
        jobId: activeJob.id,
        favorFreelancer,
        voter: 'You — Campus Referee',
        txHash: res.txHash,
      },
    });
  };

  const handleFastForwardTimer = () => {
    if (!activeJob) return;
    dispatch({ type: 'FAST_FORWARD_TIMER', payload: { jobId: activeJob.id } });
  };

  const handleAutoReleaseClaim = async () => {
    if (!activeJob) return;
    const res = await executeContractCall('autoRelease', [activeJob.onChainId || 1]);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    dispatch({ type: 'AUTO_RELEASE', payload: { jobId: activeJob.id, txHash: res.txHash } });
  };

  // Determine current active workflow step (1, 2, or 3)
  let activeStep = 1;
  if (activeJob) {
    if (['FUNDED', 'IN_PROGRESS'].includes(activeJob.status)) activeStep = 2;
    else if (['SUBMITTED', 'REVISION_REQUESTED', 'DISPUTED'].includes(activeJob.status)) activeStep = 3;
    else if (activeJob.status === 'RELEASED') activeStep = 3;
  }

  // Fees breakdown
  const feeRupees = Math.round(budgetRupees * 0.025);
  const netPayoutRupees = budgetRupees - feeRupees;

  const currentJobFee = activeJob ? Math.round(activeJob.amountRupees * 0.025) : 75;
  const currentJobNet = activeJob ? activeJob.amountRupees - currentJobFee : 2925;

  const isTimerExpired = activeJob?.reviewDeadline && activeJob.reviewDeadline <= Date.now();

  return (
    <div className="space-y-6">
      {/* 3-Step Horizontal Story Ribbon Above Workspace (Section 10) */}
      <div className="px-6 py-4 rounded-[16px] bg-white border border-[#E2E4E9] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
              activeStep > 1
                ? 'bg-[#10B981] text-white'
                : activeStep === 1
                ? 'bg-[#0066CC] text-white'
                : 'bg-[#F1F3F7] text-[#64748B]'
            }`}
          >
            {activeStep > 1 ? '✓' : '1'}
          </div>
          <span
            className={`text-[13px] font-bold ${
              activeStep === 1 ? 'text-[#0066CC]' : activeStep > 1 ? 'text-[#10B981]' : 'text-[#64748B]'
            }`}
          >
            1. 🔒 Lock Money in Safe
          </span>
        </div>

        <div className="w-8 h-0.5 bg-[#E2E4E9] hidden sm:block" />

        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
              activeStep > 2
                ? 'bg-[#10B981] text-white'
                : activeStep === 2
                ? 'bg-[#0066CC] text-white'
                : 'bg-[#F1F3F7] text-[#64748B]'
            }`}
          >
            {activeStep > 2 ? '✓' : '2'}
          </div>
          <span
            className={`text-[13px] font-bold ${
              activeStep === 2 ? 'text-[#0066CC]' : activeStep > 2 ? 'text-[#10B981]' : 'text-[#64748B]'
            }`}
          >
            2. 🧬 Prove Work with Fingerprint
          </span>
        </div>

        <div className="w-8 h-0.5 bg-[#E2E4E9] hidden sm:block" />

        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
              activeJob?.status === 'RELEASED'
                ? 'bg-[#10B981] text-white'
                : activeStep === 3
                ? 'bg-[#0066CC] text-white'
                : 'bg-[#F1F3F7] text-[#64748B]'
            }`}
          >
            {activeJob?.status === 'RELEASED' ? '✓' : '3'}
          </div>
          <span
            className={`text-[13px] font-bold ${
              activeJob?.status === 'RELEASED'
                ? 'text-[#10B981]'
                : activeStep === 3
                ? 'text-[#0066CC]'
                : 'text-[#64748B]'
            }`}
          >
            3. ⚡ Instant Payout + Badge
          </span>
        </div>
      </div>

      {/* Role-Switch Prompt Helper Banner (Section 10 Protocol 02) */}
      {role === 'CLIENT' && activeJob?.status === 'FUNDED' && (
        <div className="p-4 rounded-[14px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between text-[13px] text-[#065F46] shadow-sm">
          <div className="flex items-center gap-2 font-medium">
            <span>✅ ₹{activeJob.amountRupees.toLocaleString('en-IN')} is now locked in the Safe! Want to act as the Student Freelancer next?</span>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_ROLE_VIEW', payload: 'FREELANCER' })}
            className="font-bold text-[#0066CC] hover:underline flex items-center gap-1 shrink-0 ml-2"
          >
            <span>Switch to 🎨 Freelancer View →</span>
          </button>
        </div>
      )}

      {role === 'FREELANCER' && activeJob?.status === 'SUBMITTED' && (
        <div className="p-4 rounded-[14px] bg-[#EBF4FF] border border-[#BFDBFE] flex items-center justify-between text-[13px] text-[#1E40AF] shadow-sm">
          <div className="flex items-center gap-2 font-medium">
            <span>🧬 Deliverable proof submitted! Want to test the client review & approval?</span>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_ROLE_VIEW', payload: 'CLIENT' })}
            className="font-bold text-[#0066CC] hover:underline flex items-center gap-1 shrink-0 ml-2"
          >
            <span>Switch to 🤝 Client View →</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          CLIENT VIEW (Section 11, 12, 13)
      ========================================================================= */}
      {role === 'CLIENT' && (
        <div className="space-y-6">
          {/* Active Job Client Review Card (if a job is SUBMITTED) */}
          {activeJob && activeJob.status === 'SUBMITTED' && (
            <div className="p-7 md:p-8 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-6 relative">
              {/* Floating NEXT STEP beacon */}
              <div className="absolute -top-3.5 left-8 bg-[#0066CC] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 animate-bounce">
                <span>👉 YOUR NEXT STEP</span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#0066CC] uppercase tracking-wider">
                    DELIVERABLE SUBMITTED FOR REVIEW
                  </span>
                  <h3 className="text-xl font-extrabold text-[#111215] mt-1">{activeJob.title}</h3>
                  <p className="text-[13px] text-[#64748B]">
                    Student delivered work proof. Inspect fingerprint and approve to release payment.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-[#111215] tabular-nums">
                    ₹{activeJob.amountRupees.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-[#64748B] font-mono">{activeJob.amountMSTC.toFixed(2)} tMSTC</div>
                </div>
              </div>

              {/* Delivered File & Hash Information */}
              {activeJob.deliverable && (
                <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#E2E4E9] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[14px] font-bold text-[#111215]">
                      <FileCheck className="w-5 h-5 text-[#10B981]" />
                      <span>{activeJob.deliverable.fileName}</span>
                      <span className="text-[12px] font-normal text-[#64748B]">({activeJob.deliverable.fileSize})</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                      🧬 Verified SHA-256
                    </span>
                  </div>

                  <div className="font-mono text-[11px] text-[#475569] bg-white p-2.5 rounded-[8px] border border-[#E2E4E9] break-all select-all">
                    {activeJob.deliverable.fileHash}
                  </div>
                </div>
              )}

              {/* Plain English Confirmation Summary (Section 10) */}
              <div className="bg-[#F8FAFC] p-3 rounded-[10px] border border-[#E2E4E9] text-[13px] text-[#475569]">
                Clicking Approve instantly pays ₹{currentJobNet.toLocaleString('en-IN')} to the student freelancer and mints their permanent on-chain Proof-of-Work badge.
              </div>

              {/* 3-Button Decision Architecture (Section 13) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleApproveWork}
                  className="h-[48px] px-6 rounded-[12px] bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all ring-4 ring-[#10B981]/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>✅ Approve & Release</span>
                </button>

                <button
                  onClick={handleRequestRevision}
                  disabled={activeJob.revisionsLeft <= 0}
                  className="h-[48px] px-4 rounded-[12px] bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E2E4E9] font-semibold text-[13px] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <RotateCcw className="w-4 h-4 text-[#F59E0B]" />
                  <span>🔄 Request Revision ({activeJob.revisionsLeft} Left)</span>
                </button>

                <button
                  onClick={handleRaiseDispute}
                  className="h-[48px] px-4 rounded-[12px] bg-white hover:bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA] font-semibold text-[13px] flex items-center justify-center gap-2 transition-all"
                >
                  <Scale className="w-4 h-4" />
                  <span>⚖️ Raise Dispute</span>
                </button>
              </div>
            </div>
          )}

          {/* Refund Path for activeJob if FUNDED (Scenario C) */}
          {activeJob && activeJob.status === 'FUNDED' && (
            <div className="p-4 rounded-[14px] bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between text-[13px] text-[#92400E]">
              <div>
                <span className="font-bold">Scenario C Client Safety:</span> If freelancer never starts or you cancel before work begins, you can reclaim 100% of the funds.
              </div>
              <button
                onClick={handleClaimRefund}
                className="font-bold px-3 py-1.5 bg-white border border-[#FCD34D] rounded-[8px] hover:bg-[#FEF3C7] transition-colors shrink-0 ml-2"
              >
                ↩️ Claim 100% Refund (₹{activeJob.amountRupees.toLocaleString('en-IN')})
              </button>
            </div>
          )}

          {/* Create & Lock a New Job Wizard Card */}
          <div className="p-7 md:p-8 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-6">
            <div>
              <span className="text-[11px] font-bold text-[#0066CC] uppercase tracking-wider">
                {isBeginner ? 'Step 1: Put Money in the Safe Locker' : 'Client Escrow Creation Wizard'}
              </span>
              <h2 className="text-xl font-extrabold text-[#111215] mt-1">Post a Micro-Gig & Lock Payment</h2>
              <p className="text-[13px] text-[#64748B]">
                Funds sit securely in the smart contract until deliverable proof is submitted and approved.
              </p>
            </div>

            {/* 4 Pre-Tuned 1-Click Template Pills (Section 11) */}
            <div>
              <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-2">
                1-Click Quick Templates
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleApplyTemplate('LOGO')}
                  className="p-3 text-left rounded-[12px] border border-[#E2E4E9] hover:border-[#0066CC] bg-[#F8FAFC] hover:bg-[#F0F7FF] transition-all text-[12px]"
                >
                  <div className="font-bold text-[#111215]">🎨 College Fest Logo & Brand Kit</div>
                  <div className="text-[#64748B]">₹3,000 • 2 Milestones (40% / 60%)</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyTemplate('REEL')}
                  className="p-3 text-left rounded-[12px] border border-[#E2E4E9] hover:border-[#0066CC] bg-[#F8FAFC] hover:bg-[#F0F7FF] transition-all text-[12px]"
                >
                  <div className="font-bold text-[#111215]">🎬 Club Event Promo Reel Edit</div>
                  <div className="text-[#64748B]">₹2,000 • 1 Milestone (100%)</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyTemplate('REACT')}
                  className="p-3 text-left rounded-[12px] border border-[#E2E4E9] hover:border-[#0066CC] bg-[#F8FAFC] hover:bg-[#F0F7FF] transition-all text-[12px]"
                >
                  <div className="font-bold text-[#111215]">💻 Startup Landing Page in React</div>
                  <div className="text-[#64748B]">₹6,000 • 2 Milestones</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyTemplate('TUTOR')}
                  className="p-3 text-left rounded-[12px] border border-[#E2E4E9] hover:border-[#0066CC] bg-[#F8FAFC] hover:bg-[#F0F7FF] transition-all text-[12px]"
                >
                  <div className="font-bold text-[#111215]">📝 Placement Prep Notes & Tutoring</div>
                  <div className="text-[#64748B]">₹1,200 • 1 Milestone</div>
                </button>
              </div>
            </div>

            {/* Form Fields with generous spacing (space-y-5) */}
            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  className="w-full h-[46px] px-4 rounded-[12px] border border-[#E2E4E9] text-[14px] font-medium focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                  Freelancer Account / Student Selection
                </label>
                <div className="w-full h-[46px] px-4 rounded-[12px] border border-[#E2E4E9] bg-[#F8FAFC] text-[14px] font-medium flex items-center justify-between text-[#111215]">
                  <div className="flex items-center gap-2 truncate">
                    <span>🎓 Kritika Sharma</span>
                    <span className="text-[#64748B] text-[12px] truncate">• Verified VIT Pune • 0x255...64cF</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0] shrink-0">
                    Pre-Selected
                  </span>
                </div>
              </div>

              {/* Budget Slider & Milestone Splitter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[12px] font-bold text-[#475569] uppercase tracking-wider">
                    Interactive Budget Slider
                  </label>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-[#111215] tabular-nums">
                      ₹{budgetRupees.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[12px] font-mono text-[#64748B] ml-2">
                      ({(budgetRupees / 100).toFixed(2)} tMSTC)
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={100}
                  value={budgetRupees}
                  onChange={e => setBudgetRupees(Number(e.target.value))}
                  className="w-full h-2 bg-[#E2E4E9] rounded-lg appearance-none cursor-pointer accent-[#0066CC]"
                />
                <div className="flex justify-between text-[11px] text-[#64748B] mt-1 tabular-nums font-mono">
                  <span>₹500</span>
                  <span>₹2,500</span>
                  <span>₹5,000</span>
                  <span>₹7,500</span>
                  <span>₹10,000</span>
                </div>
              </div>

              {/* Milestone Split Toggle */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-[13px] font-semibold text-[#475569]">Payment Release:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMilestoneSplit(false)}
                    className={`px-3 py-1.5 rounded-[8px] text-[12px] font-semibold border transition-all ${
                      !isMilestoneSplit
                        ? 'bg-[#0066CC] text-white border-[#0066CC]'
                        : 'bg-white text-[#475569] border-[#E2E4E9] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    Single Payment (100%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMilestoneSplit(true)}
                    className={`px-3 py-1.5 rounded-[8px] text-[12px] font-semibold border transition-all ${
                      isMilestoneSplit
                        ? 'bg-[#0066CC] text-white border-[#0066CC]'
                        : 'bg-white text-[#475569] border-[#E2E4E9] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    2 Milestones (40% Draft / 60% Final)
                  </button>
                </div>
              </div>

              {/* Scope-Creep Protection Rules (Revisions & Auto-Release Window) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                    Max Free Revisions
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setMaxRevisions(num)}
                        className={`flex-1 py-1.5 rounded-[8px] text-[13px] font-semibold border transition-all ${
                          maxRevisions === num
                            ? 'bg-[#0066CC] text-white border-[#0066CC]'
                            : 'bg-white text-[#475569] border-[#E2E4E9] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {num} {num === 1 ? 'Revision' : 'Revisions'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                    Auto-Release Window
                  </label>
                  <div className="flex gap-2">
                    {[3, 5, 7].map(days => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setAutoReleaseDays(days)}
                        className={`flex-1 py-1.5 rounded-[8px] text-[13px] font-semibold border transition-all ${
                          autoReleaseDays === days
                            ? 'bg-[#0066CC] text-white border-[#0066CC]'
                            : 'bg-white text-[#475569] border-[#E2E4E9] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {days} Days {days === 5 ? '★' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                  Clear Acceptance Criteria (Milestone Checklist)
                </label>
                <textarea
                  rows={3}
                  value={criteria}
                  onChange={e => setCriteria(e.target.value)}
                  className="w-full p-3 rounded-[12px] border border-[#E2E4E9] text-[13px] font-mono leading-relaxed focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                />
              </div>

              {/* Exact Fee Math & Financial Summary (Section 12) */}
              <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#E2E4E9] space-y-2">
                <div className="flex justify-between text-[13px] text-[#475569]">
                  <span>Job Escrow Deposit</span>
                  <span className="font-bold text-[#111215] tabular-nums">₹{budgetRupees.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[13px] text-[#475569]">
                  <span>PayProof Platform Fee (2.5%)</span>
                  <span className="text-[#64748B] tabular-nums">₹{feeRupees}</span>
                </div>
                <div className="flex justify-between text-[14px] font-bold text-[#111215] pt-2 border-t border-[#E2E4E9]">
                  <span>Net Payout to Student</span>
                  <span className="text-[#10B981] tabular-nums">₹{netPayoutRupees.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Plain-English Confirmation Summary (Section 10) */}
              <div className="bg-[#F8FAFC] p-3 rounded-[10px] border border-[#E2E4E9] text-[13px] text-[#475569]">
                Clicking this button moves ₹{budgetRupees.toLocaleString('en-IN')} into the PayProof Safe Locker. The freelancer can see the money is real, and you get 100% back if they never start.
              </div>

              {/* Lock Button */}
              <button
                onClick={handleCreateAndFund}
                className="w-full h-[48px] px-6 rounded-[12px] bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold text-[15px] flex items-center justify-center gap-2.5 shadow-sm transition-all ring-4 ring-[#0066CC]/15"
              >
                <span>🔒 Lock ₹{budgetRupees.toLocaleString('en-IN')} in Safe Locker</span>
              </button>

              {/* WhatsApp Share Link Card */}
              {activeJob && (
                <div className="p-4 rounded-[14px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between text-[13px] text-[#065F46]">
                  <div>
                    <span className="font-bold">WhatsApp Proof Deal Link:</span>
                    <span className="text-[12px] block text-[#047857]">Send to student over chat so they know escrow is funded</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Hey! I locked ₹${activeJob.amountRupees} in PayProof Safe Locker for "${activeJob.title}". On-Chain Proof: https://payproof.mst.app/job/${activeJob.id}`
                      );
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="font-bold px-3 py-1.5 bg-white border border-[#A7F3D0] rounded-[8px] hover:bg-[#D1FAE5] transition-colors flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied!' : '📲 Copy Deal Msg'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FREELANCER STUDIO (Section 14, 15)
      ========================================================================= */}
      {role === 'FREELANCER' && activeJob && (
        <div className="space-y-6">
          {/* Step 1: Verify Locked Funds Banner (Section 14.1) */}
          {activeJob.status === 'FUNDED' && (
            <div className="p-7 md:p-8 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-6 relative">
              {/* Floating NEXT STEP beacon */}
              <div className="absolute -top-3.5 left-8 bg-[#0066CC] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 animate-bounce">
                <span>👉 YOUR NEXT STEP</span>
              </div>

              {/* Emerald Assurance Banner */}
              <div className="p-4 rounded-[14px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-3 text-[#065F46]">
                <ShieldCheck className="w-6 h-6 text-[#10B981] shrink-0" />
                <div className="text-[14px] font-medium leading-relaxed">
                  <span className="font-bold">🔒 ₹{activeJob.amountRupees.toLocaleString('en-IN')} is Locked inside the Safe Locker on MST Blockchain!</span>
                  <span className="block text-[12px] text-[#047857] mt-0.5">
                    The client cannot take it back while you work. Safe opens when you deliver.
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#111215]">{activeJob.title}</h3>
                <div className="mt-3 space-y-1.5">
                  <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wider">Agreed Scope Criteria:</span>
                  <ul className="list-disc list-inside text-[13px] text-[#64748B] space-y-1">
                    {activeJob.acceptanceCriteria.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Plain-English Confirmation Summary (Section 10) */}
              <div className="bg-[#F8FAFC] p-3 rounded-[10px] border border-[#E2E4E9] text-[13px] text-[#475569]">
                Clicking Accept confirms you will deliver according to the criteria above. The client's money remains secured in the vault.
              </div>

              <button
                onClick={handleAcceptJob}
                className="w-full h-[48px] px-6 rounded-[12px] bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-[15px] flex items-center justify-center gap-2.5 shadow-sm transition-all ring-4 ring-[#10B981]/20"
              >
                <span>👍 Accept Job & Start Working</span>
              </button>
            </div>
          )}

          {/* Step 2 & 3: Deliverable Studio & SHA-256 Engine (Section 14.2 & 14.3) */}
          {(activeJob.status === 'IN_PROGRESS' || activeJob.status === 'REVISION_REQUESTED') && (
            <div className="p-7 md:p-8 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-6 relative">
              {/* Floating NEXT STEP beacon */}
              <div className="absolute -top-3.5 left-8 bg-[#0066CC] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 animate-bounce">
                <span>👉 YOUR NEXT STEP</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#0066CC] uppercase tracking-wider">
                  {isBeginner ? 'Step 2: Send Finished Work & Create Digital Fingerprint' : 'Cryptographic Proof Submission'}
                </span>
                <h3 className="text-xl font-extrabold text-[#111215] mt-1">{activeJob.title}</h3>
                <p className="text-[13px] text-[#64748B]">
                  Upload your completed deliverable. Browser Web Crypto generates an immutable SHA-256 hash.
                </p>
              </div>

              {/* Drag-and-Drop Dropzone with real file upload + 1-click sample button */}
              <div className="border-2 border-dashed border-[#94A3B8] hover:border-[#0066CC] rounded-[16px] p-8 text-center bg-[#F8FAFC] transition-colors relative overflow-hidden">
                {/* Horizontal laser line scan animation (Section 09) */}
                {isScanningHash && (
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-[#10B981] shadow-[0_0_12px_#10B981]"
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <UploadCloud className="w-10 h-10 text-[#0066CC] mx-auto mb-3" />
                <div className="font-bold text-[14px] text-[#111215] mb-1">
                  Drag and drop deliverable file, or click to browse
                </div>
                <p className="text-[12px] text-[#64748B] mb-4">
                  Supports SVG, PNG, MP4, PDF, ZIP (Any file format)
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-white border border-[#E2E4E9] hover:bg-[#F1F3F7] rounded-[10px] text-[13px] font-semibold text-[#111215] transition-colors shadow-sm">
                    <span>Choose File</span>
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>

                  <span className="text-[12px] text-[#94A3B8]">OR</span>

                  <button
                    type="button"
                    onClick={handleAttachSample}
                    className="px-4 py-2 bg-[#EBF4FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-[10px] text-[13px] font-semibold text-[#0066CC] transition-colors"
                  >
                    ⚡ Attach Sample File (Fest_Logo_Final_Vector.svg)
                  </button>
                </div>
              </div>

              {/* Display Calculated SHA-256 Fingerprint */}
              {fileHash && (
                <div className="p-4 rounded-[14px] bg-white border border-[#10B981] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-bold text-[#065F46] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#10B981]" />
                      <span>🧬 Tamper-Proof SHA-256 Fingerprint Generated</span>
                    </span>
                    <span className="text-[#64748B] font-mono">{hashGeneratedTime}</span>
                  </div>
                  <div className="font-mono text-[12px] text-[#111215] bg-[#F8FAFC] p-2.5 rounded-[8px] border border-[#E2E4E9] break-all select-all">
                    {fileHash}
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    File: <span className="font-medium text-[#111215]">{sampleFileName}</span>
                  </div>
                </div>
              )}

              {/* Plain-English Confirmation Summary (Section 10) */}
              <div className="bg-[#F8FAFC] p-3 rounded-[10px] border border-[#E2E4E9] text-[13px] text-[#475569]">
                Clicking Submit writes this file fingerprint to the blockchain and starts the client's 5-day review window. If they go silent, funds auto-release to you.
              </div>

              <button
                onClick={handleSubmitDeliverable}
                disabled={!fileHash && !selectedFile}
                className="w-full h-[48px] px-6 rounded-[12px] bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold text-[15px] flex items-center justify-center gap-2.5 shadow-sm transition-all disabled:opacity-50 ring-4 ring-[#0066CC]/15"
              >
                <span>🚀 Submit Work & Start 5-Day Protection Timer</span>
              </button>
            </div>
          )}

          {/* Section 15: Anti-Ghosting Timer & Scenario B Fast-Forward */}
          {activeJob.status === 'SUBMITTED' && (
            <div className="p-7 md:p-8 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider">
                    5-DAY CLIENT REVIEW WINDOW ACTIVE
                  </span>
                  <h3 className="text-xl font-extrabold text-[#111215] mt-1">{activeJob.title}</h3>
                  <p className="text-[13px] text-[#64748B]">
                    Client has 5 days to review your deliverable. Anti-ghosting guarantee protects you from silence.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-[#111215] tabular-nums">
                    ₹{currentJobNet.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-[#10B981] font-semibold">Protected Escrow</div>
                </div>
              </div>

              {/* Interactive Judge Time-Travel Button (Section 15) */}
              <div className="p-4 rounded-[14px] bg-[#FFFBEB] border border-[#FDE68A] space-y-3">
                <div className="flex items-center justify-between text-[13px] text-[#92400E]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#F59E0B]" />
                    <span>Scenario B Anti-Ghosting Fast-Forward</span>
                  </span>
                  <span className="text-[11px] text-[#B45309]">Judge & Evaluator Tool</span>
                </div>
                <p className="text-[12px] text-[#92400E] leading-relaxed">
                  In real life, freelancers get ghosted after delivering. PayProof enforces automatic payout if the client remains silent for 5 days.
                </p>
                <button
                  onClick={handleFastForwardTimer}
                  className="w-full py-2 px-4 bg-white border border-[#FCD34D] rounded-[10px] text-[13px] font-bold text-[#92400E] hover:bg-[#FEF3C7] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>⏩ Fast-Forward 5-Day Timer to 00:00:00 (Test Anti-Ghosting Auto-Payout)</span>
                </button>
              </div>

              {/* Claim Auto-Payout Button when timer expires */}
              {isTimerExpired && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <div className="bg-[#ECFDF5] p-3 rounded-[10px] border border-[#A7F3D0] text-[13px] text-[#065F46] font-medium">
                    ⚡ 5-Day Review window has ended with zero client response. Automatic release is now unlocked by code!
                  </div>
                  <button
                    onClick={handleAutoReleaseClaim}
                    className="w-full h-[48px] px-6 rounded-[12px] bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[15px] flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 transition-all ring-4 ring-[#10B981]/30"
                  >
                    <span>⚡ Client Went Silent — Claim Automatic ₹{currentJobNet.toLocaleString('en-IN')} Payout Now!</span>
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Proof-of-Work Badges Display */}
          {state.freelancerBadges.length > 0 && (
            <div className="p-7 md:p-8 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[16px] text-[#111215] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0066CC]" />
                    <span>Verified Proof-of-Work Badges</span>
                  </h4>
                  <p className="text-[12px] text-[#64748B]">
                    Non-transferable Soulbound records of completed student work on MST Blockchain.
                  </p>
                </div>
                <span className="text-[12px] font-bold text-[#0066CC] bg-[#EBF4FF] px-2.5 py-1 rounded-full">
                  {state.freelancerBadges.length} Minted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {state.freelancerBadges.map(b => (
                  <motion.div
                    key={b.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-[14px] border border-[#E2E4E9] bg-[#F8FAFC] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#0066CC] uppercase">{b.category}</span>
                      <span className="text-[11px] font-bold text-[#10B981]">★ {b.rating}.0 Rating</span>
                    </div>
                    <div className="font-bold text-[14px] text-[#111215]">{b.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1 border-t border-[#E2E4E9]">
                      <span className="tabular-nums">₹{b.amountRupees.toLocaleString('en-IN')}</span>
                      <span className="font-mono truncate max-w-[120px]">{b.hash}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          REFEREE COURTROOM (Section 16)
      ========================================================================= */}
      {role === 'REFEREE' && (
        <div className="p-7 md:p-8 rounded-[20px] bg-white border border-[#E2E4E9] shadow-sm space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#EF4444] uppercase tracking-wider">
                CAMPUS REFEREE ARBITRATION PANEL
              </span>
              <h3 className="text-xl font-extrabold text-[#111215] mt-1">Dispute Resolution Courtroom</h3>
              <p className="text-[13px] text-[#64748B]">
                2-of-3 majority vote inspects file fingerprints and written criteria to fairly release or refund funds.
              </p>
            </div>
            {state.jobs.filter(j => j.status === 'DISPUTED').length === 0 && (
              <button
                onClick={() => dispatch({ type: 'LOAD_SAMPLE_DISPUTE' })}
                className="px-3.5 py-1.5 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] border border-[#FECACA] rounded-[10px] text-[12px] font-bold transition-colors"
              >
                ⚡ Load Sample Disputed Job
              </button>
            )}
          </div>

          {activeJob && activeJob.status === 'DISPUTED' ? (
            <div className="space-y-6">
              {/* 2-Column Evidence Comparison Grid (Section 16) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Box: Agreed Scope at Lock Time */}
                <div className="p-5 rounded-[16px] bg-[#F8FAFC] border border-[#E2E4E9] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2E4E9] pb-2">
                    <span className="text-[12px] font-bold text-[#111215] uppercase tracking-wider">
                      Agreed Scope at Lock Time
                    </span>
                    <span className="text-[11px] text-[#64748B]">Original Contract</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#111215]">{activeJob.title}</div>
                  <div className="space-y-1.5 text-[12px] text-[#475569]">
                    <div className="font-semibold text-[#111215]">Acceptance Criteria:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {activeJob.acceptanceCriteria.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 text-[11px] text-[#64748B] border-t border-[#E2E4E9] flex justify-between">
                    <span>Revisions Limit: {activeJob.maxRevisions}</span>
                    <span className="font-bold text-[#111215]">Locked: ₹{activeJob.amountRupees.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Right Box: Cryptographic Proof of Delivery */}
                <div className="p-5 rounded-[16px] bg-[#F8FAFC] border border-[#E2E4E9] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2E4E9] pb-2">
                    <span className="text-[12px] font-bold text-[#111215] uppercase tracking-wider">
                      Cryptographic Proof of Delivery
                    </span>
                    <span className="text-[11px] text-[#10B981] font-bold">On-Chain Verified</span>
                  </div>
                  <div className="text-[13px] font-medium text-[#111215]">
                    {activeJob.deliverable?.fileName || 'Fest_Tickets_App_src.zip'}
                  </div>
                  <div className="space-y-1 text-[11px] text-[#64748B]">
                    <div>On-Chain SHA-256 Hash:</div>
                    <div className="font-mono text-[11px] text-[#111215] bg-white p-2 rounded border border-[#E2E4E9] break-all select-all">
                      {activeJob.deliverable?.fileHash || '0x8f2a63d917293a105bb99104fa2851cf26d91048b281f6a190b234cae981d392'}
                    </div>
                  </div>
                  <div className="pt-2 text-[11px] text-[#EF4444] border-t border-[#E2E4E9]">
                    Dispute Reason: {activeJob.disputeData?.reason || 'Criteria dispute'}
                  </div>
                </div>
              </div>

              {/* Bottom 3-Referee Voting Bar (Section 16) */}
              <div className="p-5 rounded-[16px] bg-[#0F141C] text-white border border-[#334155] space-y-4">
                <div className="text-[12px] font-mono text-[#38BDF8] uppercase tracking-wider flex items-center justify-between">
                  <span>3-Referee Decentralized Panel</span>
                  <span>2-of-3 Majority Rule</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
                  <div className="p-3 rounded-[10px] bg-[#1E293B] border border-[#334155]">
                    <div className="text-[#94A3B8]">Slot 1: Prof. Kulkarni</div>
                    <div className="font-bold text-[#10B981] mt-1">Voted: Pay Student ✓</div>
                  </div>

                  <div className="p-3 rounded-[10px] bg-[#1E293B] border border-[#334155]">
                    <div className="text-[#94A3B8]">Slot 2: Senior Mentor Aditi</div>
                    <div className="font-bold text-[#F59E0B] mt-1">Pending Review ⏳</div>
                  </div>

                  <div className="p-3 rounded-[10px] bg-[#1E293B] border border-[#0066CC] ring-1 ring-[#0066CC]">
                    <div className="text-[#38BDF8] font-bold">Slot 3: You — Campus Referee</div>
                    <div className="text-white font-bold mt-1">Casting Decisive Vote</div>
                  </div>
                </div>

                {/* 2 Decision Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleCastVote(true)}
                    className="h-[46px] rounded-[10px] bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>✅ Vote #2: Release ₹{activeJob.amountRupees.toLocaleString('en-IN')} to Student</span>
                  </button>

                  <button
                    onClick={() => handleCastVote(false)}
                    className="h-[46px] rounded-[10px] bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>↩️ Vote #2: Refund ₹{activeJob.amountRupees.toLocaleString('en-IN')} to Client</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#F8FAFC] rounded-[16px] border border-dashed border-[#CBD5E1]">
              <Scale className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
              <div className="font-bold text-[14px] text-[#111215]">No Disputed Jobs Active</div>
              <p className="text-[12px] text-[#64748B] mt-1 mb-4">
                All campus gigs are currently progressing smoothly without dispute.
              </p>
              <button
                onClick={() => dispatch({ type: 'LOAD_SAMPLE_DISPUTE' })}
                className="px-4 py-2 bg-[#0066CC] text-white font-semibold text-[13px] rounded-[10px] hover:bg-[#0052A3] transition-colors"
              >
                ⚡ Load Sample Disputed Job for Adjudication
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
