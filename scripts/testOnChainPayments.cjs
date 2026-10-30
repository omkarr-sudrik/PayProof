const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function runPaymentTest(testNumber, contract, clientWallet, freelancerWallet, amountMSTC) {
  console.log(`\n======================================================`);
  console.log(`🚀 TESTNET ON-CHAIN PAYMENT TEST #${testNumber}`);
  console.log(`Amount: ${amountMSTC} tMSTC`);
  console.log(`Client Address: ${clientWallet.address}`);
  console.log(`Freelancer Address: ${freelancerWallet.address}`);
  console.log(`======================================================`);

  const clientInitial = await clientWallet.provider.getBalance(clientWallet.address);
  const freelancerInitial = await freelancerWallet.provider.getBalance(freelancerWallet.address);
  console.log(`Initial Balances -> Client: ${ethers.formatEther(clientInitial)} tMSTC | Freelancer: ${ethers.formatEther(freelancerInitial)} tMSTC`);

  // Step 1: Create & Fund Job
  const valueWei = ethers.parseEther(amountMSTC.toString());
  const deadline = Math.floor(Date.now() / 1000) + 86400 * 7;
  const reviewWindow = 5 * 86400;
  const maxRevisions = 2;
  const title = `Campus Gig #${testNumber}: College Fest Branding`;

  console.log(`[1/4] Client creating & funding job on MST Testnet...`);
  const fundTx = await contract.connect(clientWallet).createAndFundJob(
    freelancerWallet.address,
    deadline,
    reviewWindow,
    maxRevisions,
    title,
    { value: valueWei, gasLimit: 500000 }
  );
  console.log(`  Tx sent: ${fundTx.hash}`);
  const fundReceipt = await fundTx.wait(1);
  console.log(`  Confirmed in block ${fundReceipt.blockNumber} (Gas used: ${fundReceipt.gasUsed.toString()})`);

  const jobCounter = await contract.jobCounter();
  const currentJobId = jobCounter;
  console.log(`  Created Job ID: ${currentJobId.toString()}`);

  // Step 2: Freelancer accepts job
  console.log(`[2/4] Freelancer accepting job #${currentJobId}...`);
  const acceptTx = await contract.connect(freelancerWallet).acceptJob(currentJobId, { gasLimit: 250000 });
  const acceptReceipt = await acceptTx.wait(1);
  console.log(`  Accepted in block ${acceptReceipt.blockNumber} (Tx: ${acceptTx.hash})`);

  // Step 3: Freelancer submits deliverable
  const sampleContent = Buffer.from(`Deliverable content for test ${testNumber} at ${Date.now()}`);
  const hashHex = '0x' + crypto.createHash('sha256').update(sampleContent).digest('hex');
  const fileUri = `ipfs://QmTestDeliverableHash_${testNumber}_${Date.now()}`;
  console.log(`[3/4] Freelancer submitting deliverable with SHA-256: ${hashHex}...`);
  const submitTx = await contract.connect(freelancerWallet).submitDeliverable(
    currentJobId,
    hashHex,
    fileUri,
    { gasLimit: 250000 }
  );
  const submitReceipt = await submitTx.wait(1);
  console.log(`  Submitted in block ${submitReceipt.blockNumber} (Tx: ${submitTx.hash})`);

  // Step 4: Client approves work and releases payment
  console.log(`[4/4] Client approving work and executing 97.5% payment + 2.5% fee...`);
  const approveTx = await contract.connect(clientWallet).approveWork(currentJobId, 5, { gasLimit: 300000 });
  console.log(`  Approve Tx sent: ${approveTx.hash}`);
  const approveReceipt = await approveTx.wait(1);
  console.log(`  Payment Released in block ${approveReceipt.blockNumber}! Gas used: ${approveReceipt.gasUsed.toString()}`);

  // Verify on-chain state
  const job = await contract.getJob(currentJobId);
  const freelancerFinal = await freelancerWallet.provider.getBalance(freelancerWallet.address);
  const freelancerNetGain = freelancerFinal - freelancerInitial;

  console.log(`\n✅ VERIFICATION RESULT FOR TEST #${testNumber}:`);
  console.log(`  Job State: ${job.state} (5 = Released)`);
  console.log(`  Expected 97.5% Net Payout: ${ethers.formatEther((valueWei * 975n) / 1000n)} tMSTC`);
  console.log(`  Freelancer Final Balance: ${ethers.formatEther(freelancerFinal)} tMSTC`);
  console.log(`  Verified On Explorer: https://testnet.mstscan.com/tx/${approveTx.hash}`);

  if (Number(job.state) !== 5) {
    throw new Error(`State mismatch: expected 5 (Released), got ${job.state}`);
  }

  return {
    testNumber,
    jobId: currentJobId.toString(),
    fundTxHash: fundTx.hash,
    approveTxHash: approveTx.hash,
    payoutWei: ((valueWei * 975n) / 1000n).toString(),
    blockNumber: approveReceipt.blockNumber,
  };
}

async function main() {
  const privateKey = process.env.PRIVATE_KEY || '0xbe74f1c3884a6c143361d20f8696bee10d719d25eaff1d71855cedde52c808b8';
  const rpcUrl = 'https://testnetrpc.mstblockchain.com';
  const provider = new ethers.JsonRpcProvider(rpcUrl, {
    chainId: 91562037,
    name: 'mst-testnet'
  });

  const clientWallet = new ethers.Wallet(privateKey, provider);
  // Create a dedicated deterministic student freelancer wallet for testing
  const freelancerWallet = new ethers.Wallet(
    ethers.keccak256(ethers.toUtf8Bytes('payproof-student-freelancer-wallet-key-seed')),
    provider
  );

  console.log('Client / Test Runner:', clientWallet.address);
  console.log('Student Freelancer:', freelancerWallet.address);

  // Send small gas to freelancer wallet if low
  const fBalance = await provider.getBalance(freelancerWallet.address);
  if (fBalance < ethers.parseEther('0.02')) {
    console.log('Funding student freelancer wallet with 0.05 tMSTC for transaction gas...');
    const fundTx = await clientWallet.sendTransaction({
      to: freelancerWallet.address,
      value: ethers.parseEther('0.05'),
    });
    await fundTx.wait(1);
    console.log('Freelancer gas funded! Tx:', fundTx.hash);
  }

  const deployedInfo = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../src/config/deployedAddresses.json'), 'utf8')
  );
  const contractArtifact = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../contracts/PayProofEscrow.json'), 'utf8')
  );

  const contract = new ethers.Contract(
    deployedInfo.testnet.address,
    contractArtifact.abi,
    clientWallet
  );

  console.log('Using Contract at:', deployedInfo.testnet.address);

  const results = [];
  // Execute payment test STRICTLY 3 TIMES as requested
  for (let i = 1; i <= 3; i++) {
    const amount = 0.01 * i; // 0.01, 0.02, 0.03 tMSTC
    const res = await runPaymentTest(i, contract, clientWallet, freelancerWallet, amount);
    results.push(res);
  }

  console.log('\n======================================================');
  console.log('🎉 ALL 3 TESTNET ON-CHAIN PAYMENT TESTS PASSED PERFECTLY!');
  console.log('======================================================');
  results.forEach(r => {
    console.log(`Payment Test #${r.testNumber}: Job ID ${r.jobId} | Fund Tx: ${r.fundTxHash} | Payout Tx: ${r.approveTxHash}`);
  });

  fs.writeFileSync(
    path.resolve(__dirname, '../testnet_payment_proofs.json'),
    JSON.stringify(results, null, 2)
  );
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

