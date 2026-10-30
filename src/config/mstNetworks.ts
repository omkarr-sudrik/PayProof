// MST Blockchain Configuration & Network Constants
import deployedAddresses from './deployedAddresses.json';

export interface NetworkConfig {
  chainIdDec: number;
  chainIdHex: string;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
  faucetUrl?: string;
}

export const MST_TESTNET: NetworkConfig = {
  chainIdDec: 91562037,
  chainIdHex: '0x5752035', // 91562037 in hex
  chainName: 'MST Testnet',
  rpcUrls: ['https://testnetrpc.mstblockchain.com'],
  nativeCurrency: {
    name: 'Test MSTC',
    symbol: 'tMSTC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://testnet.mstscan.com'],
  faucetUrl: 'https://faucet.mstblockchain.com',
};

export const MST_MAINNET: NetworkConfig = {
  chainIdDec: 4646,
  chainIdHex: '0x1226',
  chainName: 'MST Mainnet',
  rpcUrls: ['https://mariorpc.mstblockchain.com/'],
  nativeCurrency: {
    name: 'MSTC',
    symbol: 'MSTC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://mstscan.com'],
};

export const DEFAULT_CONTRACT_ADDRESS = deployedAddresses.testnet.address || '0x952e9740D84Aeed6f70bB9F5a365fa9Be68B13b6';

export const getExplorerTxUrl = (txHash: string, network: 'testnet' | 'mainnet' = 'testnet') => {
  const base = network === 'mainnet' ? MST_MAINNET.blockExplorerUrls[0] : MST_TESTNET.blockExplorerUrls[0];
  return `${base}/tx/${txHash}`;
};

export const getExplorerAddressUrl = (address: string, network: 'testnet' | 'mainnet' = 'testnet') => {
  const base = network === 'mainnet' ? MST_MAINNET.blockExplorerUrls[0] : MST_TESTNET.blockExplorerUrls[0];
  return `${base}/address/${address}`;
};

// Fallback Private Key provided by the user for deterministic signing in testing / browser without BridgeKey
export const FALLBACK_DEMO_SIGNER_KEY = '0xbe74f1c3884a6c143361d20f8696bee10d719d25eaff1d71855cedde52c808b8';
export const FALLBACK_CLIENT_ADDRESS = '0x975c2809cc84a9c539AcACaAc643977627EeE7e7';
export const DEFAULT_STUDENT_FREELANCER_ADDRESS = '0x255a8Ea5f82A9aE832C464EdA9d7C48A004964cF';

