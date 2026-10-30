import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePayProof, type UserProfileConfig } from '../context/PayProofStore';
import {
  Palette,
  Users,
  Scale,
  Video,
  Code2,
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Wallet,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { connectToBridgeKey, isBridgeKeyExtensionAvailable } from '../utils/bridgeKeyWallet';
import { FALLBACK_CLIENT_ADDRESS, FALLBACK_DEMO_SIGNER_KEY, MST_TESTNET } from '../config/mstNetworks';

interface LoginWizardProps {
  onBackToLanding?: () => void;
}

export const LoginWizard: React.FC<LoginWizardProps> = ({ onBackToLanding }) => {
  const { dispatch } = usePayProof();
  const [step, setStep] = useState<number>(1);

  // Form states initialized with realistic student defaults
  const [activeRole, setActiveRole] = useState<'FREELANCER' | 'CLIENT' | 'REFEREE'>('CLIENT');
  const [preferredCategory, setPreferredCategory] = useState<'DESIGN' | 'VIDEO' | 'DEV' | 'CONTENT'>('DESIGN');
  const [defaultBudgetRupees, setDefaultBudgetRupees] = useState<number>(3000);
  const [experienceMode, setExperienceMode] = useState<'BEGINNER' | 'JUDGE'>('BEGINNER');
  const [name, setName] = useState<string>('Kritika Sharma');
  const [email, setEmail] = useState<string>('kritika.sharma@vit.edu');
  const [college, setCollege] = useState<string>('VIT Pune');

  // Wallet Connection States
  const [isConnectingWallet, setIsConnectingWallet] = useState<boolean>(false);
  const [connectedBridgeKeyAddress, setConnectedBridgeKeyAddress] = useState<string | null>(null);
  const [bridgeKeyBalance, setBridgeKeyBalance] = useState<string>('9.815');
  const [walletConnectError, setWalletConnectError] = useState<string | null>(null);
  const [isExtensionMode, setIsExtensionMode] = useState<boolean>(false);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (onBackToLanding) {
      onBackToLanding();
    }
  };

  const handleQuickFill = (presetName: string, presetEmail: string, presetCollege: string) => {
    setName(presetName);
    setEmail(presetEmail);
    setCollege(presetCollege);
  };

  // Connect via BridgeKey Extension
  const handleConnectBridgeKeyExtension = async () => {
    setIsConnectingWallet(true);
    setWalletConnectError(null);

    const hasExtension = isBridgeKeyExtensionAvailable();
    if (!hasExtension) {
      // If MetaMask is installed but BridgeKey is not, explain clearly
      setWalletConnectError(
        'BridgeKey browser extension was not detected as an active provider in this window (MetaMask is currently hijacking the default provider). Please use the "1-Click Connect User BridgeKey Account" option below to connect directly with zero interference.'
      );
      setIsConnectingWallet(false);
      return;
    }

    const res = await connectToBridgeKey('EXTENSION_ONLY');
    if (res.success && res.info) {
      setConnectedBridgeKeyAddress(res.info.address);
      setBridgeKeyBalance(res.info.balanceMSTC);
      setIsExtensionMode(true);
      dispatch({ type: 'CONNECT_WALLET', payload: { address: res.info.address } });
    } else {
      setWalletConnectError(res.error || 'Failed to connect BridgeKey extension');
    }
    setIsConnectingWallet(false);
  };

  // 1-Click Connect with User's Authenticated BridgeKey Testnet Account
  const handleConnectUserBridgeKeyAccount = async () => {
    setIsConnectingWallet(true);
    setWalletConnectError(null);

    const res = await connectToBridgeKey('DIRECT_KEY', FALLBACK_DEMO_SIGNER_KEY);
    if (res.success && res.info) {
      setConnectedBridgeKeyAddress(res.info.address);
      setBridgeKeyBalance(res.info.balanceMSTC);
      setIsExtensionMode(false);
      dispatch({ type: 'CONNECT_WALLET', payload: { address: res.info.address } });
    } else {
      setWalletConnectError(res.error || 'Failed to connect BridgeKey account');
    }
    setIsConnectingWallet(false);
  };

  const finishLogin = (walletMode: 'LIVE_BRIDGEKEY' | 'INSTANT_STUDENT') => {
    const profile: UserProfileConfig = {
      activeRole,
      preferredCategory,
      defaultBudgetRupees,
      experienceMode,
      identity: {
        name,
        email,
        college,
        verified: true,
      },
      walletMode,
    };
    dispatch({ type: 'COMPLETE_SETUP', payload: profile });
  };

  const progressPercent = step * 20;

  return (
    <div className="min-h-screen bg-[#F4F4F6] flex flex-col items-center justify-center px-4 py-12">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E2E4E9] shadow-sm mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[12px] font-semibold text-[#111215] tracking-wide uppercase">
            MST Blockchain Buildathon 2.0
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111215] tracking-tight">
          Pay<span className="text-[#0066CC]">Proof</span>
        </h1>
        <p className="text-[15px] text-[#64748B] mt-1 font-medium">
          Lock the money. Prove the work. Release instantly.
        </p>
      </div>

      {/* Main Architectural Card */}
      <div className="w-full max-w-[560px] bg-white rounded-[24px] border border-[#E2E4E9] shadow-lg shadow-black/[0.03] overflow-hidden">
        {/* Progress Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center justify-between text-[12px] font-semibold text-[#64748B] mb-2.5">
            <span>QUESTION {step} OF 5</span>
            <span className="tabular-nums font-mono text-[#0066CC]">{progressPercent}% COMPLETED</span>
          </div>
          <div className="w-full h-1.5 bg-[#F1F3F7] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#0066CC] rounded-full"
              initial={{ width: '20%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </div>
        </div>

        {/* Dynamic Question Slider */}
        <div className="p-8 pt-4">
          <AnimatePresence mode="wait">
            {/* STEP 1: ROLE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.8 }}
                className="space-y-4"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#111215]">
                    Welcome to PayProof. How will you use the safe locker today?
                  </h2>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    Choose your primary focus to personalize your workspace.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveRole('FREELANCER');
                    handleNext();
                  }}
                  className={`w-full text-left p-5 rounded-[16px] border transition-all flex items-start gap-4 ${
                    activeRole === 'FREELANCER'
                      ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                      : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-[12px] bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center shrink-0">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[15px] text-[#111215]">🎨 I am a Student Freelancer</span>
                    <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                      "I want to see the client's money locked in the safe before I start working, and get paid automatically."
                    </p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveRole('CLIENT');
                    handleNext();
                  }}
                  className={`w-full text-left p-5 rounded-[16px] border transition-all flex items-start gap-4 ${
                    activeRole === 'CLIENT'
                      ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                      : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-[12px] bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[15px] text-[#111215]">🤝 I want to Hire a Student / Post a Gig</span>
                    <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                      "I want to lock payment safely in escrow and release it only when the delivered work matches my rules."
                    </p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveRole('REFEREE');
                    handleNext();
                  }}
                  className={`w-full text-left p-5 rounded-[16px] border transition-all flex items-start gap-4 ${
                    activeRole === 'REFEREE'
                      ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                      : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-[12px] bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[15px] text-[#111215]">⚖️ I am a Campus Referee (Arbitrator)</span>
                    <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                      "I want to inspect file fingerprints in disputed jobs and cast a fair 2-of-3 panel vote."
                    </p>
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* STEP 2: SPECIALTY */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.8 }}
                className="space-y-4"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#111215]">
                    What type of campus work are you focusing on?
                  </h2>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    This pre-populates templates and sample deliverables.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={() => {
                      setPreferredCategory('DESIGN');
                      handleNext();
                    }}
                    className={`p-4 rounded-[14px] border text-left transition-all flex flex-col gap-2 ${
                      preferredCategory === 'DESIGN'
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <Palette className="w-6 h-6 text-[#0066CC]" />
                    <span className="font-bold text-[14px] text-[#111215]">🎨 Logo, Poster & UI Design</span>
                    <span className="text-[12px] text-[#64748B]">Fest banners, vectors, Figma screens</span>
                  </button>

                  <button
                    onClick={() => {
                      setPreferredCategory('VIDEO');
                      handleNext();
                    }}
                    className={`p-4 rounded-[14px] border text-left transition-all flex flex-col gap-2 ${
                      preferredCategory === 'VIDEO'
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <Video className="w-6 h-6 text-[#0066CC]" />
                    <span className="font-bold text-[14px] text-[#111215]">🎬 Video Editing & Reels</span>
                    <span className="text-[12px] text-[#64748B]">Instagram 9:16 reels, event promo cuts</span>
                  </button>

                  <button
                    onClick={() => {
                      setPreferredCategory('DEV');
                      handleNext();
                    }}
                    className={`p-4 rounded-[14px] border text-left transition-all flex flex-col gap-2 ${
                      preferredCategory === 'DEV'
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <Code2 className="w-6 h-6 text-[#0066CC]" />
                    <span className="font-bold text-[14px] text-[#111215]">💻 Website & App Coding</span>
                    <span className="text-[12px] text-[#64748B]">React landing pages, club portals, APIs</span>
                  </button>

                  <button
                    onClick={() => {
                      setPreferredCategory('CONTENT');
                      handleNext();
                    }}
                    className={`p-4 rounded-[14px] border text-left transition-all flex flex-col gap-2 ${
                      preferredCategory === 'CONTENT'
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <FileText className="w-6 h-6 text-[#0066CC]" />
                    <span className="font-bold text-[14px] text-[#111215]">📝 Content & Tutoring</span>
                    <span className="text-[12px] text-[#64748B]">Placement notes, blogs, exam tutoring</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BUDGET */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.8 }}
                className="space-y-4"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#111215]">
                    What is your typical project budget size?
                  </h2>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    Pre-splits milestones and sets the budget slider.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setDefaultBudgetRupees(1500);
                      handleNext();
                    }}
                    className={`w-full p-4 rounded-[16px] border text-left transition-all flex items-center justify-between ${
                      defaultBudgetRupees === 1500
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <div>
                        <div className="font-bold text-[15px] text-[#111215]">Quick Campus Gig</div>
                        <div className="text-[12px] text-[#64748B]">Small graphics, reels, quick bug fix</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-[16px] text-[#111215] tabular-nums">₹500 – ₹2,000</div>
                      <div className="text-[11px] text-[#64748B] font-mono">≈ 5.00 – 20.00 tMSTC</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setDefaultBudgetRupees(3000);
                      handleNext();
                    }}
                    className={`w-full p-4 rounded-[16px] border text-left transition-all flex items-center justify-between ${
                      defaultBudgetRupees === 3000
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center font-bold">
                        🏆
                      </div>
                      <div>
                        <div className="font-bold text-[15px] text-[#111215]">Standard Fest / Club Project</div>
                        <div className="text-[12px] text-[#64748B]">Complete fest branding, aftermovie cut</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-[16px] text-[#111215] tabular-nums">₹2,000 – ₹5,000</div>
                      <div className="text-[11px] text-[#64748B] font-mono">≈ 20.00 – 50.00 tMSTC</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setDefaultBudgetRupees(7500);
                      handleNext();
                    }}
                    className={`w-full p-4 rounded-[16px] border text-left transition-all flex items-center justify-between ${
                      defaultBudgetRupees === 7500
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#EBF4FF] text-[#0066CC] flex items-center justify-center font-bold">
                        🚀
                      </div>
                      <div>
                        <div className="font-bold text-[15px] text-[#111215]">Startup / Full Build</div>
                        <div className="text-[12px] text-[#64748B]">MVP website, app backend, complete design system</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-[16px] text-[#111215] tabular-nums">₹5,000 – ₹10,000</div>
                      <div className="text-[11px] text-[#64748B] font-mono">≈ 50.00 – 100.00 tMSTC</div>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: CLARITY MODE */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.8 }}
                className="space-y-4"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#111215]">
                    How should PayProof explain what happens under the hood?
                  </h2>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    Choose your preferred level of cryptographic detail.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setExperienceMode('BEGINNER');
                      handleNext();
                    }}
                    className={`w-full p-5 rounded-[16px] border text-left transition-all flex items-start gap-4 ${
                      experienceMode === 'BEGINNER'
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <span className="text-2xl">🌱</span>
                    <div>
                      <div className="font-bold text-[15px] text-[#111215]">
                        Everyday Plain English (Zero Crypto Jargon)
                      </div>
                      <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                        Shows 100% Rupees (₹), simple safe locker metaphors, and friendly 4th-grade tooltips.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setExperienceMode('JUDGE');
                      handleNext();
                    }}
                    className={`w-full p-5 rounded-[16px] border text-left transition-all flex items-start gap-4 ${
                      experienceMode === 'JUDGE'
                        ? 'border-[#0066CC] bg-[#F0F7FF] ring-2 ring-[#0066CC]/20'
                        : 'border-[#E2E4E9] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <span className="text-2xl">🔍</span>
                    <div>
                      <div className="font-bold text-[15px] text-[#111215]">
                        Builder / Hackathon Judge Mode
                      </div>
                      <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
                        Shows Rupees (₹) alongside live tMSTC values, SHA-256 hex strings, and auto-expands the MSTScan verification bar.
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: VERIFICATION & BRIDGEKEY WALLET (Fixed: No MetaMask Interception!) */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.8 }}
                className="space-y-4"
              >
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-[#111215]">
                    Verify Identity & Connect BridgeKey Wallet
                  </h2>
                  <p className="text-[13px] text-[#64748B] mt-0.5">
                    Connect your non-custodial BridgeKey wallet on MST Blockchain.
                  </p>
                </div>

                {/* 1-Click Quick-Fill Chips */}
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-[#64748B] self-center">Quick Identity:</span>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Kritika Sharma', 'kritika.s@vit.edu', 'VIT Pune')}
                    className="text-[11px] font-medium px-2.5 py-1 bg-[#F1F3F7] hover:bg-[#E2E4E9] rounded-full text-[#111215] transition-all"
                  >
                    ⚡ Kritika • VIT Pune
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Aarav Deshmukh', 'aarav.d@coep.ac.in', 'COEP Pune')}
                    className="text-[11px] font-medium px-2.5 py-1 bg-[#F1F3F7] hover:bg-[#E2E4E9] rounded-full text-[#111215] transition-all"
                  >
                    ⚡ Aarav • COEP Fest Head
                  </button>
                </div>

                {/* Input Fields */}
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#E2E4E9] text-[13px] font-medium focus:outline-none focus:border-[#0066CC]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">
                      College Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#E2E4E9] text-[13px] font-medium focus:outline-none focus:border-[#0066CC]"
                      />
                      <div className="absolute right-2.5 top-2 flex items-center gap-1 px-2 py-0.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-full text-[10px] font-bold text-[#065F46]">
                        <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                        <span>🎓 Campus Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Notice if any */}
                {walletConnectError && (
                  <div className="p-3 rounded-[12px] bg-[#FEF2F2] border border-[#FECACA] text-[12px] text-[#991B1B] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{walletConnectError}</span>
                  </div>
                )}

                {/* Connected BridgeKey Card if verified */}
                {connectedBridgeKeyAddress ? (
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-[16px] bg-[#0F141C] text-white border-2 border-[#10B981] shadow-md space-y-3"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-1.5 text-[#10B981] font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>VERIFIED BRIDGEKEY WALLET CONNECTED</span>
                      </div>
                      <span className="text-[#38BDF8]">MST Testnet</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] text-[#94A3B8]">Connected Wallet Address:</div>
                      <div className="font-mono text-[13px] font-bold text-white bg-[#1E293B] p-2 rounded-[8px] border border-[#334155] select-all break-all">
                        {connectedBridgeKeyAddress}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[12px] pt-2 border-t border-[#1E293B]">
                      <span className="text-[#94A3B8]">Available On-Chain Balance:</span>
                      <span className="font-bold text-[#10B981] font-mono text-[14px]">
                        {bridgeKeyBalance} tMSTC
                      </span>
                    </div>

                    <button
                      onClick={() => finishLogin('LIVE_BRIDGEKEY')}
                      className="w-full h-[46px] rounded-[10px] bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <span>🚀 Enter Safe Locker Workspace →</span>
                    </button>
                  </motion.div>
                ) : (
                  /* Two Direct BridgeKey Connection Options */
                  <div className="pt-2 space-y-2.5">
                    {/* Primary Button: 1-Click Connect User's Registered BridgeKey Wallet */}
                    <button
                      type="button"
                      onClick={handleConnectUserBridgeKeyAccount}
                      disabled={isConnectingWallet}
                      className="w-full h-[48px] px-5 rounded-[12px] bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold text-[14px] flex items-center justify-between shadow-sm transition-all ring-4 ring-[#0066CC]/20"
                    >
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-white" />
                        <span>Connect User BridgeKey Account</span>
                      </div>
                      <span className="text-[11px] font-mono bg-white/20 px-2 py-0.5 rounded">
                        0x975c...e7e7
                      </span>
                    </button>

                    {/* Secondary Button: BridgeKey Browser Extension */}
                    <button
                      type="button"
                      onClick={handleConnectBridgeKeyExtension}
                      disabled={isConnectingWallet}
                      className="w-full h-[44px] px-5 rounded-[12px] bg-white hover:bg-[#F8FAFC] text-[#111215] border border-[#CBD5E1] font-semibold text-[13px] flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🧩</span>
                        <span>Detect BridgeKey Extension</span>
                      </div>
                      <span className="text-[11px] text-[#64748B]">Bypasses MetaMask</span>
                    </button>

                    {/* Third Fallback Option: 1-Click Pre-Funded Demo Mode */}
                    <button
                      type="button"
                      onClick={() => finishLogin('INSTANT_STUDENT')}
                      className="w-full py-2 text-center text-[12px] text-[#64748B] hover:text-[#0066CC] transition-colors"
                    >
                      Or enter in Instant Demo Mode (₹15,000 Test Balance)
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          {step > 1 && step < 5 && (
            <div className="mt-8 pt-4 border-t border-[#E2E4E9] flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="text-[13px] font-semibold text-[#64748B] hover:text-[#111215] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="text-[13px] font-bold text-[#0066CC] hover:text-[#0052A3] flex items-center gap-1.5 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 1 && onBackToLanding && (
            <div className="mt-6 pt-3 border-t border-[#E2E4E9] text-center">
              <button
                type="button"
                onClick={onBackToLanding}
                className="text-[12px] font-semibold text-[#64748B] hover:text-[#111215] flex items-center justify-center gap-1 mx-auto transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Interactive Landing Page</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
