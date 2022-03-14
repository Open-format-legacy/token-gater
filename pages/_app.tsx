import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useEffect } from "react";
import { Header } from "../components";
import { addNetwork, NETWORK_ID, readyToTransact } from "../helpers";
import { initOnboard } from "../services";
import { useWalletStore } from "../stores";

function MyApp({ Component, pageProps }: AppProps) {
  const {
    onboard,
    wallet,
    setAddress,
    setNetwork,
    setBalance,
    setWallet,
    setOnboard,
  } = useWalletStore();

  useEffect(() => {
    if (wallet?.provider) {
      addNetwork(NETWORK_ID);
    }
  }, [wallet]);

  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setNetwork,
      balance: setBalance,
      wallet: (wallet: any) => {
        if (wallet.provider) {
          setWallet(wallet);
          window.localStorage.setItem("selectedWallet", wallet.name);
        } else {
          setWallet();
        }
      },
    });

    setOnboard(onboard);
  }, []);

  useEffect(() => {
    const previouslySelectedWallet =
      window.localStorage.getItem("selectedWallet");

    if (previouslySelectedWallet && onboard) {
      readyToTransact(onboard, previouslySelectedWallet);
    }
  }, [onboard]);

  return (
    <div className="m-4">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
