import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { Header } from "../components";
import { initOnboard } from "../services";
import { useConnectWallet, useWallets } from "@web3-onboard/react";

function MyApp({ Component, pageProps }: AppProps) {
  const connectedWallets = useWallets();
  const [{ wallet }, connect] = useConnectWallet();
  const [onboard, setOnboard] = useState();

  useEffect(() => {
    setOnboard(initOnboard);
  }, []);
  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets")
    );

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({ autoSelect: previouslyConnectedWallets[0] });
      }
      setWalletFromLocalStorage();
    }
  }, [onboard, connect]);

  return (
    <div className="m-4">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
