import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { initOnboard } from "../services";
import { useConnectWallet, useWallets } from "@web3-onboard/react";

function MyApp({ Component, pageProps }: AppProps) {
  const connectedWallets = useWallets();

  const [onboard, setOnboard] = useState();

  useEffect(() => {
    setOnboard(initOnboard);
  }, []);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
