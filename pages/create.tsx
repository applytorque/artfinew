import React, { useState, useEffect } from 'react';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { ConnectButton, useWalletKit, WalletKitProvider } from '@mysten/wallet-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

// Constants
const VESTING_PACKAGE_ID = '0x884d99970a4c88de9c77bbe5912e959f35937e0d8c4a48b76d34a1f5473b145e';  // Replace with your package object ID
const VESTING_MODULE = 'linea_vesting::linear_vesting';
const FULLNODE_URL = getFullnodeUrl('devnet');


const keypair = new Ed25519Keypair();
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
tx.mergeCoins('0xe19739da1a701eadc21683c5b127e62b553e833e8a15a4f292f4f48b4afea3f2', [
	'0x127a8975134a4824d9288722c4ee4fc824cd22502ab4ad9f6617f3ba19229c1b',
]);
const result = await client.signAndExecuteTransactionBlock({
	signer: keypair,
	transactionBlock: tx,
});
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
tx.mergeCoins('0xe19739da1a701eadc21683c5b127e62b553e833e8a15a4f292f4f48b4afea3f2', [
	'0x127a8975134a4824d9288722c4ee4fc824cd22502ab4ad9f6617f3ba19229c1b',
]);
const result = await client.signAndExecuteTransactionBlock({
	signer: keypair,
	transactionBlock: tx,
});
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
tx.mergeCoins('0xe19739da1a701eadc21683c5b127e62b553e833e8a15a4f292f4f48b4afea3f2', [
	'0x127a8975134a4824d9288722c4ee4fc824cd22502ab4ad9f6617f3ba19229c1b',
]);
const result = await client.signAndExecuteTransactionBlock({
	signer: keypair,
	transactionBlock: tx,
});
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
tx.mergeCoins('0xe19739da1a701eadc21683c5b127e62b553e833e8a15a4f292f4f48b4afea3f2', [
	'0x127a8975134a4824d9288722c4ee4fc824cd22502ab4ad9f6617f3ba19229c1b',
]);
const result = await client.signAndExecuteTransactionBlock({
	signer: keypair,
	transactionBlock: tx,
});
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
  // Implement the function logic here
  // For example:
  // set the recipient state variable
  // setRecipientState(address);
}
