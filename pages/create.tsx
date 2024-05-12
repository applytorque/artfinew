import React, { useState, useEffect } from 'react';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { ConnectButton, useWalletKit, WalletKitProvider } from '@mysten/wallet-kit';
import { formatAddress } from '@mysten/sui.js/utils';

// Constants
const VESTING_PACKAGE_ID = '0x...';  // Replace with your package object ID
const VESTING_MODULE = 'linea_vesting::linear_vesting';
const FULLNODE_URL = getFullnodeUrl('testnet');

// Create a SuiClient instance
const client = new SuiClient({ url: FULLNODE_URL });

const CreateVesting: React.FC = () => {
  const [walletId, setWalletId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [start, setStart] = useState<number>(Date.now());
  const [duration, setDuration] = useState<number>(86400000); // 1 day in milliseconds

  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();

  useEffect(() => {
    if (currentAccount?.address) {
      setRecipient(currentAccount.address);
    }
  }, [currentAccount]);

  const handleCreateVestingWallet = async () => {
    if (!currentAccount) {
      setStatus('Please connect your wallet.');
      return;
    }

    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${VESTING_PACKAGE_ID}::${VESTING_MODULE}::entry_new`,
        arguments: [
          tx.pure(token),
          tx.pure(start),
          tx.pure(duration),
          tx.pure(currentAccount.address),
        ],
      });
      const result = await signAndExecuteTransactionBlock({ transactionBlock: tx });
      setWalletId(result.digest); // assuming digest is the wallet ID
      setStatus('Vesting wallet created successfully!');
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  const handleCheckVestingStatus = async () => {
    if (!currentAccount) {
      setStatus('Please connect your wallet.');
      return;
    }

    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${VESTING_PACKAGE_ID}::${VESTING_MODULE}::vesting_status`,
        arguments: [tx.pure(walletId)],
      });
      const result = await signAndExecuteTransactionBlock({ transactionBlock: tx });
      setStatus(`Vesting Status: ${result}`);
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  const handleClaimVestedTokens = async () => {
    if (!currentAccount) {
      setStatus('Please connect your wallet.');
      return;
    }

    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${VESTING_PACKAGE_ID}::${VESTING_MODULE}::entry_claim`,
        arguments: [tx.pure(walletId)],
      });
      const result = await signAndExecuteTransactionBlock({ transactionBlock: tx });
      setStatus(`Claimed Vested Tokens: ${result}`);
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  const handleDestroyZeroBalanceWallet = async () => {
    if (!currentAccount) {
      setStatus('Please connect your wallet.');
      return;
    }

    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${VESTING_PACKAGE_ID}::${VESTING_MODULE}::entry_destroy_zero`,
        arguments: [tx.pure(walletId)],
      });
      const result = await signAndExecuteTransactionBlock({ transactionBlock: tx });
      setStatus(`Destroyed Wallet: ${result}`);
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <WalletKitProvider>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create Vesting Wallet</h1>
        <ConnectButton
          connectText={'Connect Wallet'}
          connectedText={`Connected: ${formatAddress(currentAccount?.address ?? '')}`}
        />

        {currentAccount && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Token:
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Start Date (timestamp):
                <input
                  type="number"
                  value={start}
                  onChange={(e) => setStart(Number(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Duration (ms):
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Recipient Address:
                <input
                  type="text"
                  value={currentAccount.address}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                />
              </label>
            </div>
            <button
              onClick={handleCreateVestingWallet}
              className="mb-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Vesting Wallet
            </button>

            <h2 className="text-xl font-semibold mb-4">Check Vesting Status</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Wallet ID:
                <input
                  type="text"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <button
              onClick={handleCheckVestingStatus}
              className="mb-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Check Status
            </button>

            <h2 className="text-xl font-semibold mb-4">Claim Vested Tokens</h2>
            <button
              onClick={handleClaimVestedTokens}
              className="mb-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Claim Tokens
            </button>

            <h2 className="text-xl font-semibold mb-4">Destroy Zero Balance Wallet</h2>
            <button
              onClick={handleDestroyZeroBalanceWallet}
              className="mb-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Destroy Wallet
            </button>
          </>
        )}

        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-medium">Status</h3>
          <p className="text-gray-700">{status}</p>
        </div>
      </div>
    </WalletKitProvider>
  );
};

export default CreateVesting;

function setRecipient(address: string) {
  throw new Error('Function not implemented.');
}
