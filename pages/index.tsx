import type { NextPage } from "next";
import { callContract } from "../helpers";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import classNames from "classnames";

const Home: NextPage = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [onSuccess, setSuccess] = useState(false);
  const [onError, setError] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    handleContractCall();
  }, [wallet, connect]);

  async function connectWallet() {
    await connect({ autoSelect: "walletConnect" });
  }
  async function disconnectWallet() {
    await disconnect({ label: "WalletConnect" });
  }

  async function handleContractCall() {
    if (wallet?.provider) {
      callContract({
        name: "nft",
        provider: wallet?.provider,
        cb: async (contract) => {
          try {
            const balance = await contract.balanceOf(
              wallet?.accounts[0].address
            );
            if (balance > ethers.BigNumber.from("0")) {
              setSuccess(true);
            } else {
              setSuccess(false);
              setError(true);
            }
            await disconnectWallet();
            setTimeout(() => {
              connectWallet();
              setSuccess(false);
              setError(false);
            }, 5000);
          } catch {
            setError(true);
            await disconnectWallet();
            setTimeout(() => {
              connectWallet();
              setError(false);
            }, 5000);
          }
        },
      });
    }
  }

  return (
    <div
      className={classNames({
        "bg-red-700": onError,
        "bg-green-700": onSuccess,
      })}
    >
      <header className="w-full">
        <div className="flex h-screen items-center justify-center">
          {onSuccess && <p>Welcome🔥</p>}
          {onError && <p>ACCESS DENIED! 🚫</p>}
        </div>
      </header>
    </div>
  );
};

export default Home;
