const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

async function main() {
  const privateKey = process.env.PRIVATE_KEY || '0xbe74f1c3884a6c143361d20f8696bee10d719d25eaff1d71855cedde52c808b8';
  const rpcUrl = 'https://testnetrpc.mstblockchain.com';
  
  console.log('Connecting to MST Testnet RPC:', rpcUrl);
  const provider = new ethers.JsonRpcProvider(rpcUrl, {
    chainId: 91562037,
    name: 'mst-testnet'
  });

  const wallet = new ethers.Wallet(privateKey, provider);
  console.log('Deployer Wallet Address:', wallet.address);

  const balance = await provider.getBalance(wallet.address);
  console.log('Deployer Balance:', ethers.formatEther(balance), 'tMSTC');

  if (balance === 0n) {
    throw new Error('Wallet has 0 tMSTC balance! Cannot deploy.');
  }

  const contractArtifact = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../contracts/PayProofEscrow.json'), 'utf8')
  );

  console.log('Deploying PayProofEscrow to MST Testnet...');
  const factory = new ethers.ContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode,
    wallet
  );

  const contract = await factory.deploy({
    gasLimit: 3000000,
  });

  console.log('Deploy transaction broadcasted! Tx hash:', contract.deploymentTransaction().hash);
  console.log('Waiting for block confirmation...');
  
  const receipt = await contract.deploymentTransaction().wait(1);
  const contractAddress = await contract.getAddress();

  console.log('🎉 PayProofEscrow successfully deployed!');
  console.log('Contract Address:', contractAddress);
  console.log('Block Number:', receipt.blockNumber);
  console.log('Gas Used:', receipt.gasUsed.toString());
  console.log('MSTScan Explorer:', `https://testnet.mstscan.com/address/${contractAddress}`);

  const deployedInfo = {
    testnet: {
      address: contractAddress,
      deployTx: contract.deploymentTransaction().hash,
      deployedAt: new Date().toISOString(),
      deployer: wallet.address,
      chainId: 91562037,
    },
    mainnet: {
      address: '',
      chainId: 4646,
    }
  };

  fs.writeFileSync(
    path.resolve(__dirname, '../src/config/deployedAddresses.json'),
    JSON.stringify(deployedInfo, null, 2)
  );
  console.log('Saved deployment info to src/config/deployedAddresses.json');
}

main().catch(err => {
  console.error('Deployment error:', err);
  process.exit(1);
});

