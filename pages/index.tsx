import type { NextPage } from "next";
import { callContract } from "../helpers";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Confetti from "react-confetti";

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
              //setSuccess(false);
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
      <div className="flex h-screen items-center justify-center">
        {onSuccess && <h1 className="text-9xl font-bold">Welcome🔥</h1>}
        {onError && <h1 className="text-9xl font-bold">ACCESS DENIED! 🚫</h1>}
      </div>
      {onSuccess && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.5}
          numberOfPieces={500}
        />
      )}
    </div>
  );
};

export default Home;
