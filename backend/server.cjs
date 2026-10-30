const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const RPC_URL = 'https://testnetrpc.mstblockchain.com';
const CHAIN_ID = 91562037;
const CONTRACT_ADDRESS = '0x952e9740D84Aeed6f70bB9F5a365fa9Be68B13b6';
const USER_WALLET = '0x975c2809cc84a9c539AcACaAc643977627EeE7e7';
const USER_KEY = '0xbe74f1c3884a6c143361d20f8696bee10d719d25eaff1d71855cedde52c808b8';

const provider = new ethers.JsonRpcProvider(RPC_URL, {
  chainId: CHAIN_ID,
  name: 'mst-testnet',
});

const contractArtifact = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../contracts/PayProofEscrow.json'), 'utf8')
);

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, provider);
const signer = new ethers.Wallet(USER_KEY, provider);

app.get('/api/health', async (req, res) => {
  try {
    const blockNumber = await provider.getBlockNumber();
    const balance = await provider.getBalance(USER_WALLET);
    res.json({
      status: 'healthy',
      network: 'MST Testnet',
      chainId: CHAIN_ID,
      blockNumber,
      contractAddress: CONTRACT_ADDRESS,
      userWallet: USER_WALLET,
      userBalanceMSTC: ethers.formatEther(balance),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/api/vault-summary', async (req, res) => {
  try {
    const summary = await contract.getVaultSummary();
    const vaultBalance = await provider.getBalance(CONTRACT_ADDRESS);
    res.json({
      totalLockedWei: summary[0].toString(),
      totalLockedMSTC: ethers.formatEther(summary[0]),
      activeJobCount: Number(summary[1]),
      totalReleasedMSTC: ethers.formatEther(summary[2]),
      contractBalanceMSTC: ethers.formatEther(vaultBalance),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/api/job/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await contract.getJob(jobId);
    res.json({
      id: job.id.toString(),
      client: job.client,
      freelancer: job.freelancer,
      amountMSTC: ethers.formatEther(job.amount),
      state: Number(job.state),
      title: job.title,
      fileHash: job.fileHash,
      reviewDeadline: Number(job.reviewDeadline),
      revisionsUsed: Number(job.revisionsUsed),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`PayProof MST Backend API running on port ${PORT}`);
  console.log(`Connected to MST Testnet Contract: ${CONTRACT_ADDRESS}`);
});

