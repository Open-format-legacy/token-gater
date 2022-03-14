import { init } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";

const walletConnect = walletConnectModule();

export const initOnboard = init({
  wallets: [walletConnect],
  chains: [
    {
      id: "0x89",
      token: "MATIC",
      label: "Matic Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
  ],
});
