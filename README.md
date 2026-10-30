# 🔐 PayProof — Trust-First Smart Contract Escrow Platform

> **"Lock the money. Prove the work. Release instantly."**  
> Built for the **MST Blockchain Buildathon 2.0 (Round 2 MVP)**  
> Designed for student freelancers in India: micro-gigs (₹500 to ₹10,000) protected by cryptographic smart-contract escrow on MST Blockchain.

---

## 🏆 MST Blockchain Buildathon 2.0 Deployment & On-Chain Verification

| Specification | Value |
| :--- | :--- |
| **Network Name** | MST Testnet |
| **Chain ID (Decimal)** | `91562037` |
| **Chain ID (Hex)** | `0x5752035` |
| **Currency Symbol** | `tMSTC` |
| **RPC Endpoint** | `https://testnetrpc.mstblockchain.com` |
| **Deployed Contract Address** | [`0x952e9740D84Aeed6f70bB9F5a365fa9Be68B13b6`](https://testnet.mstscan.com/address/0x952e9740D84Aeed6f70bB9F5a365fa9Be68B13b6) |
| **Contract Deployment Tx Hash** | [`0x1182a4888404cda36527ca3d9c22c9fed11a94ac760853540b0b7f43682f4137`](https://testnet.mstscan.com/tx/0x1182a4888404cda36527ca3d9c22c9fed11a94ac760853540b0b7f43682f4137) |
| **Deployer Wallet** | `0x975c2809cc84a9c539AcACaAc643977627EeE7e7` |
| **Solidity Version** | `^0.8.20` (Compiled with optimizer 200 runs and `--via-ir`) |

---

## ⚡ Strictly Verified On-Chain Payment Transactions (Tested 3 Times)

As required, real payments on MST Testnet were strictly executed and verified 3 times:

| Test Run | Amount | Milestone / Job ID | Fund Escrow Tx Hash | Payout Release Tx Hash | Final State |
| :---: | :---: | :---: | :--- | :--- | :---: |
| **Payment #1** | 0.01 tMSTC | Job #1 | [`0x12d93288...9a01`](https://testnet.mstscan.com/tx/0x12d93288c85d47aa449b64343800983a89853311c6490a67de9f62009cdd9a01) | [`0xf0659167...92`](https://testnet.mstscan.com/tx/0xf06591678acd1f4d454c04208eb4a686cfda93a83bc45115763e3a0719b0cc92) | **Released (5)** |
| **Payment #2** | 0.02 tMSTC | Job #2 | [`0xdaa4ef45...4f81`](https://testnet.mstscan.com/tx/0xdaa4ef4570d5f8eae64294b451344c66b905a955cb0f4108bb6b8d2bb37c4f81) | [`0x37e46129...b111`](https://testnet.mstscan.com/tx/0x37e461294f37752042db1275f4012320d567c194d0a993fc7ab68c77f658b111) | **Released (5)** |
| **Payment #3** | 0.03 tMSTC | Job #3 | [`0x54355ae2...cc72`](https://testnet.mstscan.com/tx/0x54355ae29cdd0e3b19538b222f6ebcf6b97796de98aabf2fd8d63d9409cbcc72) | [`0x37d72090...d91d`](https://testnet.mstscan.com/tx/0x37d72090b42b83575f63e52c9ea7b3537254d82bdcbfa16692bf866da995d91d) | **Released (5)** |

*Every test transferred 97.5% net payout to the student freelancer address (`0x255a8Ea5f82A9aE832C464EdA9d7C48A004964cF`) and 2.5% platform fee to the contract deployer!*

---

## 🎯 Whole Feature Set Tested 2 Times On MST Testnet

All 4 critical real-world protection scenarios were executed and confirmed twice across separate rounds on the live blockchain:

### Round 1:
1. **Scenario A (Happy Path):** Job #4 created, deliverable submitted with SHA-256 fingerprint, approved & paid out instantly.  
   - Approval Tx: [`0x24d0a78f20cba4f7fdbefe1759d59bd99dcb9721d028a328735f48952c478432`](https://testnet.mstscan.com/tx/0x24d0a78f20cba4f7fdbefe1759d59bd99dcb9721d028a328735f48952c478432)
2. **Scenario B (Revision Cycle):** Job #5 created, client requested revision, freelancer resubmitted new deliverable, client approved.  
   - Approval Tx: [`0x1f7df486f045dd6839ee17a94fb76089d7dfa00198123d4682d529eed2cab8b8`](https://testnet.mstscan.com/tx/0x1f7df486f045dd6839ee17a94fb76089d7dfa00198123d4682d529eed2cab8b8)
3. **Scenario C (Client Safety / Refund):** Job #6 created, freelancer never started, client claimed 100% refund.  
   - Refund Tx: [`0x177c5befa9b26d84d79c830266033336cc5f15d77bb385051180e4df4e31b45b`](https://testnet.mstscan.com/tx/0x177c5befa9b26d84d79c830266033336cc5f15d77bb385051180e4df4e31b45b)
4. **Scenario D (2-of-3 Referee Court):** Job #7 disputed, Referee 1 & Referee 2 voted -> 2-of-3 majority released escrow.  
   - Resolution Tx: [`0x8b19bde838f4988519710d1b1e479545ba9acde3b64697c231b98e5ddb5deb8f`](https://testnet.mstscan.com/tx/0x8b19bde838f4988519710d1b1e479545ba9acde3b64697c231b98e5ddb5deb8f)

### Round 2:
1. **Scenario A (Happy Path):** Job #8 created & released.  
   - Approval Tx: [`0x0b823084005d13f046bdbe19f7acd40551682071ffc10b592aa9797b0c7884f9`](https://testnet.mstscan.com/tx/0x0b823084005d13f046bdbe19f7acd40551682071ffc10b592aa9797b0c7884f9)
2. **Scenario B (Revision Cycle):** Job #9 revision & final approval.  
   - Approval Tx: [`0x48c727071fb808a25a75c3fbc9c9d4ac8c80cec8748cd687d3c044656e5e6474`](https://testnet.mstscan.com/tx/0x48c727071fb808a25a75c3fbc9c9d4ac8c80cec8748cd687d3c044656e5e6474)
3. **Scenario C (Client Safety / Refund):** Job #10 refund claimed.  
   - Refund Tx: [`0xe4cac6ed74aafd1d19ad9395e3c77cfea648b9801ab91a49f01ecd218f7f8a6a`](https://testnet.mstscan.com/tx/0xe4cac6ed74aafd1d19ad9395e3c77cfea648b9801ab91a49f01ecd218f7f8a6a)
4. **Scenario D (2-of-3 Referee Court):** Job #11 resolved by 2-of-3 majority.  
   - Resolution Tx: [`0x04287bac65118f470320c202afb33e9b8e5baba057e152444360eb468ad50646`](https://testnet.mstscan.com/tx/0x04287bac65118f470320c202afb33e9b8e5baba057e152444360eb468ad50646)

---

## 🎨 UI Architecture & Aesthetic Features

- **Anti-AI Industrial Aesthetic**: Inspired by Apple, Teenage Engineering, and Wise. Built on daylight `#F4F4F6` canvas, pure white `#FFFFFF` cards, brushed anodized steel textures, and functional signals:
  - Action Blue (`#0066CC`)
  - Vault Emerald (`#10B981`)
  - Countdown Amber (`#F59E0B`)
  - Dispute Crimson (`#EF4444`)
- **Exterior Safe Locker (`<ExteriorSafeLocker />`)**: Left 5 columns of 12-col grid featuring:
  - 3 mechanical steel locking bolts animated with Framer Motion spring physics (`translateX(16px)` when locked, `0px` when open).
  - Recessed OLED digital balance window with live pulsing status LED dot, giant tabular numerals (`useSpring`), and exact `tMSTC` equivalent.
  - 110px rotary vault combination dial with tick marks and 3-spoke vault handle rotating on every deposit or payout.
  - 6 visual sync states: `STANDBY`, `LOCKING_IN_PROGRESS`, `ARMED_AND_LOCKED`, `REVIEW_COUNTDOWN`, `FROZEN_DISPUTE`, `UNLOCKING_PAYOUT`.
  - Interactive locker inspection drawer.
- **5-Step Animated Login Wizard (`<LoginWizard />`)**: Single architectural card with progress bar, scale pulses, and question transitions (`mode="wait"`).
- **"Don't Make Me Think" Guided UX**:
  - Single pulsing `👉 YOUR NEXT STEP` beacon above active action card.
  - Automatic 1-click role switch banners.
  - 3-step horizontal progress ribbon.
  - Plain-English confirmation summary before every action.
- **Persistent Judge Verification Console (`<JudgeBar />`)**:
  - Pinned at bottom of viewport.
  - Live MST Testnet & Mainnet contract inputs with MSTScan links.
  - 1-click 4-Scenario edge-case simulator buttons.
  - Real-time verifiable transaction receipt log with clickable explorer links.
  - View Solidity source code modal.

---

## 📁 Clean Directory Architecture (`frontend`, `backend`, `contracts`)

The project is organized into 3 decoupled directories:

```
├── contracts/                     # Smart contracts & artifacts
│   ├── PayProofEscrow.sol         # Solidity ^0.8.20 escrow contract
│   └── PayProofEscrow.json        # Compiled ABI & EVM Bytecode
│
├── backend/                       # Express server & test automation
│   ├── server.cjs                 # Express API querying live MST Testnet
│   ├── package.json               # Backend dependencies
│   └── scripts/                   # Automated on-chain verification suites
│       ├── compile.cjs            # solc compiler with viaIR & 200 runs
│       ├── deploy.cjs             # Deploys contract to MST Testnet
│       ├── testOnChainPayments.cjs# 3x real on-chain payment cycles
│       ├── testAllFeaturesTwice.cjs# 2x test rounds for all 4 scenarios
│       └── testFrontendE2E.cjs    # E2E simulated full-stack test suite
│
├── frontend/                      # React 18 + Vite + Tailwind + Framer Motion
│   ├── package.json               # Frontend dependencies & scripts
│   ├── vite.config.ts             # Vite configuration
│   ├── tailwind.config.js         # Design token configuration
│   ├── index.html                 # Entry HTML
│   └── src/
│       ├── components/
│       │   ├── LandingPage.tsx    # Apple-style interactive scroll landing page
│       │   ├── LoginWizard.tsx    # 5-step onboarding & BridgeKey wallet connect
│       │   ├── ExteriorSafeLocker.tsx # Mechanical animated visual escrow safe
│       │   ├── WorkspaceStage.tsx # Gig lifecycle management & deliverable verification
│       │   ├── JudgeBar.tsx       # Bottom MSTScan verification & bytecodes
│       │   └── Navbar.tsx         # Role switcher & campus identity
│       ├── context/
│       │   └── PayProofStore.tsx  # Global state & real testnet RPC executor
│       ├── utils/
│       │   ├── bridgeKeyWallet.ts # BridgeKey provider isolation & zero-MetaMask intercept
│       │   └── cryptoHash.ts      # Web Crypto SHA-256 deliverable hashing
│       └── config/
│           ├── mstNetworks.ts     # MST Testnet (91562037) & Mainnet (4646) config
│           └── payProofContract.ts# Contract ABI & embedded source
│
└── package.json                   # Root orchestrator with unified npm scripts
```

---

## 🍎 Apple-Style Interactive Landing Page & User Flow

1. **Interactive Scroll Landing Page (`LandingPage.tsx`)**:
   - Hero section with live animated statistics (0% fraud rate, 1.2s release speed, ₹0 advance disputes).
   - Dynamic hardware preview mockup illustrating the mechanical Safe Locker and real-time review countdown.
   - Comprehensive comparative teardown: **"The WhatsApp Freelance Trap vs. PayProof Escrow"** (ghosting, fake UPI screenshots, infinite revision blackmail).
   - Interactive 6-step visual timeline explaining how escrow works from deposit to instant release.
   - 4-panel edge-case protection showcase covering revisions, client silence auto-release, 100% cancellation refunds, and 2-of-3 referee court.
   - Prominent **"Launch Safe Locker Workspace"** bottom button seamlessly directing users to the 5-step onboarding wizard.

2. **5-Step Onboarding Questionnaire (`LoginWizard.tsx`)**:
   - Step 1: Role selection (Student Freelancer, Campus Client, Hackathon Referee).
   - Step 2: Micro-gig Category (Graphic Design, Video Editing, Web & App Development, Content Writing).
   - Step 3: Default Budget & Payout preference with auto 2.5% fee breakdown.
   - Step 4: UI Mode (Beginner Friendly vs. Builder / Hackathon Judge Mode).
   - Step 5: Campus Email verification and BridgeKey wallet connection.

3. **BridgeKey Non-Custodial Wallet Integration (`bridgeKeyWallet.ts`)**:
   - **MetaMask Interception Fix**: Detects and binds specifically to the BridgeKey provider (checking `window.bridgekey`, EIP-6963 provider announcements, and filtering out MetaMask in multi-provider environments).
   - **Direct Keystore Signer**: Includes 1-click connection for user account `0x975c2809cc84a9c539AcACaAc643977627EeE7e7` using ethers.js `Wallet` on MST Testnet (`91562037`).
   - **Real On-Chain Transactions**: All state modifications generate live on-chain transactions on MST Testnet with verifiable explorer links.

---

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript (Strict Mode), Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Ethers.js v6
- **Smart Contracts**: Solidity `^0.8.20` (`PayProofEscrow.sol`), Checks-Effects-Interactions (CEI) & Reentrancy Mutex
- **Networks**: MST Testnet (Chain ID `91562037`), MST Mainnet (Chain ID `4646`), BridgeKey Wallet

---

## 🚀 Getting Started & NPM Scripts

From the repository root, you can run all services and verification suites:

### 1. Run Development Server (Frontend)
```bash
npm run dev
```
Open `http://localhost:5173` to explore the Apple-style landing page, onboarding wizard, and escrow workspace.

### 2. Run Backend API Server
```bash
npm run server
```
Runs the Express backend on `http://localhost:4000` with live endpoints for `/api/health`, `/api/vault-summary`, and `/api/job/:id`.

### 3. Run Strict On-Chain Payment Tests (3 Cycles on MST Testnet)
```bash
npm run test:onchain
```
Executes 3 independent funding, deliverable submission, and instant payout cycles with real tMSTC on MST Testnet.

### 4. Run Complete Feature Test Suite (2 Rounds on MST Testnet)
```bash
npm run test:features
```
Executes 2 full rounds of all 4 escrow protection scenarios on MST Testnet:
- Scenario A: Happy Path instant payout
- Scenario B: Formal revision request & resubmission
- Scenario C: Client cancellation & 100% refund
- Scenario D: 2-of-3 Referee dispute arbitration

### 5. Run Full-Stack E2E Test Suite (2 Iterations)
```bash
npm run test:e2e
```

### 6. Build Frontend for Production
```bash
npm run build
# Or build within frontend directory:
npm --prefix frontend run build
```
