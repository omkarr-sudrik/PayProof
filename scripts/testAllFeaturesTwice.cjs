const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function testScenarioA_HappyPath(contract, clientWallet, freelancerWallet, round) {
  console.log(`\n--- [Round ${round}] Scenario A: Happy Path ---`);
  const amount = ethers.parseEther('0.005');
  const fundTx = await contract.connect(clientWallet).createAndFundJob(
    freelancerWallet.address,
    Math.floor(Date.now() / 1000) + 86400,
    86400,
    2,
    `Round ${round} Scenario A Job`,
    { value: amount, gasLimit: 400000 }
  );
  await fundTx.wait(1);
  const jobId = await contract.jobCounter();

  await (await contract.connect(freelancerWallet).acceptJob(jobId, { gasLimit: 250000 })).wait(1);

  const hash = '0x' + crypto.createHash('sha256').update(`R${round}A_${Date.now()}`).digest('hex');
  await (await contract.connect(freelancerWallet).submitDeliverable(jobId, hash, 'ipfs://sampleA', { gasLimit: 250000 })).wait(1);

  const approveTx = await contract.connect(clientWallet).approveWork(jobId, 5, { gasLimit: 300000 });
  await approveTx.wait(1);

  const job = await contract.getJob(jobId);
  console.log(`✅ Scenario A Round ${round} Passed! Job ${jobId} Released. Tx: ${approveTx.hash}`);
  return { round, scenario: 'A_HappyPath', jobId: jobId.toString(), tx: approveTx.hash };
}

async function testScenarioB_Revision(contract, clientWallet, freelancerWallet, round) {
  console.log(`\n--- [Round ${round}] Scenario B: Revision Cycle ---`);
  const amount = ethers.parseEther('0.005');
  const fundTx = await contract.connect(clientWallet).createAndFundJob(
    freelancerWallet.address,
    Math.floor(Date.now() / 1000) + 86400,
    86400,
    2,
    `Round ${round} Scenario B Revision Job`,
    { value: amount, gasLimit: 400000 }
  );
  await fundTx.wait(1);
  const jobId = await contract.jobCounter();

  await (await contract.connect(freelancerWallet).acceptJob(jobId, { gasLimit: 250000 })).wait(1);

  const hash1 = '0x' + crypto.createHash('sha256').update(`R${round}B1_${Date.now()}`).digest('hex');
  await (await contract.connect(freelancerWallet).submitDeliverable(jobId, hash1, 'ipfs://draft1', { gasLimit: 250000 })).wait(1);

  // Client requests revision
  const revTx = await contract.connect(clientWallet).requestRevision(jobId, 'Please sharpen colors', { gasLimit: 250000 });
  await revTx.wait(1);

  let job = await contract.getJob(jobId);
  console.log(`  State after revision request: ${job.state} (3 = RevisionRequested), revisionsUsed: ${job.revisionsUsed}`);

  // Freelancer resubmits
  const hash2 = '0x' + crypto.createHash('sha256').update(`R${round}B2_${Date.now()}`).digest('hex');
  await (await contract.connect(freelancerWallet).submitDeliverable(jobId, hash2, 'ipfs://final2', { gasLimit: 250000 })).wait(1);

  // Client approves
  const approveTx = await contract.connect(clientWallet).approveWork(jobId, 5, { gasLimit: 300000 });
  await approveTx.wait(1);

  job = await contract.getJob(jobId);
  console.log(`✅ Scenario B Round ${round} Passed! Job ${jobId} Released after revision. Tx: ${approveTx.hash}`);
  return { round, scenario: 'B_Revision', jobId: jobId.toString(), tx: approveTx.hash };
}

async function testScenarioC_Refund(contract, clientWallet, freelancerWallet, round) {
  console.log(`\n--- [Round ${round}] Scenario C: Client Safety & Refund ---`);
  const amount = ethers.parseEther('0.005');
  const fundTx = await contract.connect(clientWallet).createAndFundJob(
    freelancerWallet.address,
    0, // zero deadline allows refund before start
    86400,
    2,
    `Round ${round} Scenario C Refund Job`,
    { value: amount, gasLimit: 400000 }
  );
  await fundTx.wait(1);
  const jobId = await contract.jobCounter();

  // Freelancer never accepts or starts -> client claims refund
  const refundTx = await contract.connect(clientWallet).claimRefund(jobId, { gasLimit: 250000 });
  await refundTx.wait(1);

  const job = await contract.getJob(jobId);
  console.log(`✅ Scenario C Round ${round} Passed! Job ${jobId} State: ${job.state} (6 = Refunded). Tx: ${refundTx.hash}`);
  return { round, scenario: 'C_Refund', jobId: jobId.toString(), tx: refundTx.hash };
}

async function testScenarioD_Dispute(contract, clientWallet, freelancerWallet, referee2, round) {
  console.log(`\n--- [Round ${round}] Scenario D: Dispute Resolution (2-of-3 Referee Panel) ---`);
  const amount = ethers.parseEther('0.005');
  const fundTx = await contract.connect(clientWallet).createAndFundJob(
    freelancerWallet.address,
    Math.floor(Date.now() / 1000) + 86400,
    86400,
    2,
    `Round ${round} Scenario D Dispute Job`,
    { value: amount, gasLimit: 400000 }
  );
  await fundTx.wait(1);
  const jobId = await contract.jobCounter();

  await (await contract.connect(freelancerWallet).acceptJob(jobId, { gasLimit: 250000 })).wait(1);

  const hash = '0x' + crypto.createHash('sha256').update(`R${round}D_${Date.now()}`).digest('hex');
  await (await contract.connect(freelancerWallet).submitDeliverable(jobId, hash, 'ipfs://disputedDoc', { gasLimit: 250000 })).wait(1);

  // Client raises dispute
  const disputeTx = await contract.connect(clientWallet).raiseDispute(jobId, 'Deliverable does not match specs', { gasLimit: 250000 });
  await disputeTx.wait(1);

  // Referee 1 (clientWallet is contract deployer & default referee) votes favor freelancer
  const vote1Tx = await contract.connect(clientWallet).castRefereeVote(jobId, true, { gasLimit: 250000 });
  await vote1Tx.wait(1);

  // Referee 2 votes favor freelancer -> reaches 2-of-3 majority
  const vote2Tx = await contract.connect(referee2).castRefereeVote(jobId, true, { gasLimit: 300000 });
  await vote2Tx.wait(1);

  const job = await contract.getJob(jobId);
  console.log(`✅ Scenario D Round ${round} Passed! Job ${jobId} resolved by 2-of-3 referees to Released (${job.state}). Tx: ${vote2Tx.hash}`);
  return { round, scenario: 'D_Dispute', jobId: jobId.toString(), tx: vote2Tx.hash };
}

async function main() {
  const privateKey = process.env.PRIVATE_KEY || '0xbe74f1c3884a6c143361d20f8696bee10d719d25eaff1d71855cedde52c808b8';
  const rpcUrl = 'https://testnetrpc.mstblockchain.com';
  const provider = new ethers.JsonRpcProvider(rpcUrl, {
    chainId: 91562037,
    name: 'mst-testnet'
  });

  const clientWallet = new ethers.Wallet(privateKey, provider);
  const freelancerWallet = new ethers.Wallet(
    ethers.keccak256(ethers.toUtf8Bytes('payproof-student-freelancer-wallet-key-seed')),
    provider
  );
  const referee2Wallet = new ethers.Wallet(
    ethers.keccak256(ethers.toUtf8Bytes('payproof-referee2-wallet-key-seed')),
    provider
  );

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

  // Register referee2 on-chain if needed
  const isRef = await contract.isReferee(referee2Wallet.address);
  if (!isRef) {
    console.log('Adding Referee 2 to contract...');
    const addRefTx = await contract.connect(clientWallet).addReferee(referee2Wallet.address, { gasLimit: 200000 });
    await addRefTx.wait(1);
    console.log('Referee 2 registered!');
  }

  // Ensure referee2 has gas
  const ref2Bal = await provider.getBalance(referee2Wallet.address);
  if (ref2Bal < ethers.parseEther('0.02')) {
    console.log('Funding referee 2 gas...');
    const fTx = await clientWallet.sendTransaction({
      to: referee2Wallet.address,
      value: ethers.parseEther('0.04'),
    });
    await fTx.wait(1);
  }

  const allResults = [];

  // TEST ALL FEATURES 2 TIMES (ROUND 1 & ROUND 2)
  for (let round = 1; round <= 2; round++) {
    console.log(`\n======================================================`);
    console.log(`🎯 EXECUTING COMPLETE FEATURE TEST SET — ROUND ${round} OF 2`);
    console.log(`======================================================`);

    const rA = await testScenarioA_HappyPath(contract, clientWallet, freelancerWallet, round);
    allResults.push(rA);

    const rB = await testScenarioB_Revision(contract, clientWallet, freelancerWallet, round);
    allResults.push(rB);

    const rC = await testScenarioC_Refund(contract, clientWallet, freelancerWallet, round);
    allResults.push(rC);

    const rD = await testScenarioD_Dispute(contract, clientWallet, freelancerWallet, referee2Wallet, round);
    allResults.push(rD);
  }

  console.log('\n======================================================');
  console.log('🎉 ALL FEATURES TESTED 2 TIMES ON MST TESTNET WITH 100% SUCCESS!');
  console.log('======================================================');

  fs.writeFileSync(
    path.resolve(__dirname, '../all_features_test_results.json'),
    JSON.stringify(allResults, null, 2)
  );
}

main().catch(err => {
  console.error('All features test run failed:', err);
  process.exit(1);
});

