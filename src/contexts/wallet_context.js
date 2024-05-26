import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
// import Web3 from "web3";

const WalletContext = createContext();

export function useWallet() {
  return useContext(WalletContext);
}

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState("");
  const [changed, setChanged] = useState(false);
  const connectWallet = useCallback(async () => {
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setWallet(accounts[0]);
        ethereum.on("accountsChanged", function (accounts) {
          setWallet(accounts[0]);
          setChanged(true);
          console.log("Account changed to", accounts[0]);
        });
      } else {
        console.error("MetaMask not detected");
      }
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  const walletContextValue = {
    wallet,
    setWallet,
    changed,
    setChanged,
  };

  return (
    <WalletContext.Provider value={walletContextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default React.memo(WalletProvider);