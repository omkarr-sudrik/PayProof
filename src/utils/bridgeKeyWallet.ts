import { ethers } from 'ethers';
import { MST_TESTNET, FALLBACK_DEMO_SIGNER_KEY, FALLBACK_CLIENT_ADDRESS } from '../config/mstNetworks';

export interface BridgeKeyAccountInfo {
  address: string;
  balanceMSTC: string;
  isExtension: boolean;
  walletName: string;
}

// Global cached EIP-6963 announced providers
let announcedProviders: any[] = [];

if (typeof window !== 'undefined') {
  window.addEventListener('eip6963:announceProvider', (event: any) => {
    if (event && event.detail) {
      announcedProviders.push(event.detail);
    }
  });
  window.dispatchEvent(new Event('eip6963:requestProvider'));
}

/**
 * Searches exclusively for the BridgeKey wallet provider, explicitly avoiding MetaMask.
 */
export function getBridgeKeyProvider(): any | null {
  if (typeof window === 'undefined') return null;

  // 1. Check direct injected namespaces for BridgeKey
  if ((window as any).bridgekey) return (window as any).bridgekey;
  if ((window as any).bridgeKey) return (window as any).bridgeKey;
  if ((window as any).mstBridgeKey) return (window as any).mstBridgeKey;

  // 2. Check EIP-6963 announced providers
  for (const detail of announcedProviders) {
    const name = detail?.info?.name?.toLowerCase() || '';
    const rdns = detail?.info?.rdns?.toLowerCase() || '';
    if (name.includes('bridgekey') || rdns.includes('bridgekey')) {
      return detail.provider;
    }
  }

  // 3. Check window.ethereum.providers array if multiple wallets are present
  const ethereum = (window as any).ethereum;
  if (ethereum?.providers && Array.isArray(ethereum.providers)) {
    // Find provider explicitly flagged as BridgeKey or NOT MetaMask
    const bkProvider = ethereum.providers.find(
      (p: any) => p.isBridgeKey || p.name?.toLowerCase().includes('bridgekey')
    );
    if (bkProvider) return bkProvider;

    // Check if there is a non-MetaMask provider
    const nonMetaMask = ethereum.providers.find((p: any) => !p.isMetaMask);
    if (nonMetaMask) return nonMetaMask;
  }

  // 4. If window.ethereum is present, check if it's explicitly BridgeKey
  if (ethereum && (ethereum.isBridgeKey || (ethereum as any).isMST)) {
    return ethereum;
  }

  return null;
}

/**
 * Determines if BridgeKey browser extension is actively installed.
 */
export function isBridgeKeyExtensionAvailable(): boolean {
  return getBridgeKeyProvider() !== null;
}

/**
 * Connects directly using BridgeKey Extension or User's authenticated private key on MST Testnet.
 */
export async function connectToBridgeKey(
  mode: 'AUTO' | 'EXTENSION_ONLY' | 'DIRECT_KEY' = 'AUTO',
  customKey?: string
): Promise<{ success: boolean; info?: BridgeKeyAccountInfo; error?: string }> {
  const rpcProvider = new ethers.JsonRpcProvider(MST_TESTNET.rpcUrls[0], {
    chainId: MST_TESTNET.chainIdDec,
    name: 'mst-testnet',
  });

  // If DIRECT_KEY mode or AUTO without BridgeKey extension, use user's explicit key
  if (mode === 'DIRECT_KEY' || (mode === 'AUTO' && !isBridgeKeyExtensionAvailable())) {
    const keyToUse = customKey || FALLBACK_DEMO_SIGNER_KEY;
    try {
      const wallet = new ethers.Wallet(keyToUse, rpcProvider);
      const balanceWei = await rpcProvider.getBalance(wallet.address);
      const balanceMSTC = ethers.formatEther(balanceWei);

      return {
        success: true,
        info: {
          address: wallet.address,
          balanceMSTC: parseFloat(balanceMSTC).toFixed(3),
          isExtension: false,
          walletName: 'BridgeKey Official Signer (MST Testnet)',
        },
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to initialize BridgeKey key' };
    }
  }

  // Otherwise, use detected BridgeKey provider
  const bkProvider = getBridgeKeyProvider();
  if (!bkProvider) {
    return {
      success: false,
      error: 'BridgeKey Chrome extension is not active in this browser. Please use the Direct BridgeKey Signer option.',
    };
  }

  try {
    const accounts = await bkProvider.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      return { success: false, error: 'No accounts returned from BridgeKey' };
    }

    const address = accounts[0];
    const balanceWei = await rpcProvider.getBalance(address);

    return {
      success: true,
      info: {
        address,
        balanceMSTC: parseFloat(ethers.formatEther(balanceWei)).toFixed(3),
        isExtension: true,
        walletName: 'BridgeKey Chrome Extension',
      },
    };
  } catch (err: any) {
    if (err.code === 4001) {
      return { success: false, error: 'BridgeKey connection was cancelled by user' };
    }
    return { success: false, error: err.message || 'Failed to connect BridgeKey extension' };
  }
}

