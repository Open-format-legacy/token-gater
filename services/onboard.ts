import { init } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";

const walletConnect = walletConnectModule({
  qrcodeModalOptions: {
    mobileLinks: [],
  },
});

export const initOnboard = init({
  wallets: [walletConnect],
  chains: [
    {
      id: "0x89",
      token: "MATIC",
      label: "Matic Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
    {
      id: "0x13881",
      token: "MATIC",
      label: "Polygon Mumbai",
      rpcUrl: "https://rpc-mumbai.maticvigil.com/",
    },
  ],
});
