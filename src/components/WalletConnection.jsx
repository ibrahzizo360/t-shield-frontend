// src/components/WalletConnect.js
import { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  // Check if MetaMask is installed
  const checkMetaMask = () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed. Please install it to continue.");
      return false;
    }
    return true;
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (!checkMetaMask()) return;

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      fetchBalance(accounts[0]);
    } catch (err) {
      setError("Failed to connect wallet.");
      console.error(err);
    }
  };

  // Fetch the account balance
  const fetchBalance = async (account) => {
    try {
      if (!window.ethereum) {
        setError("MetaMask is not available. Please install it to proceed.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balanceInWei = await provider.getBalance(account); // Fetch balance
      const balanceInEth = ethers.utils.formatEther(balanceInWei); // Convert to ETH
      setBalance(balanceInEth);
    } catch (err) {
      setError("Failed to fetch balance.");
      console.error(err);
    }
  };

  // Listen for account changes
  const listenForAccountChange = () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      setCurrentAccount(accounts[0]);
      fetchBalance(accounts[0]);
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className="text-3xl mb-10">MetaMask Wallet Connection</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {currentAccount ? (
        <div className="bg-gray-200 p-4 rounded-lg">
          <p>
            <strong>Connected Account:</strong> {currentAccount}
          </p>
          <p>
            <strong>Balance:</strong> {balance} ETH
          </p>
          <button
            className="bg-green-600 p-2 text-white rounded-full"
            onClick={connectWallet}
          >
            Reconnect Wallet
          </button>
        </div>
      ) : (
        <button
          className="bg-green-600 text-white p-2 rounded-full"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
      {listenForAccountChange()}
    </div>
  );
};

export default WalletConnect;
