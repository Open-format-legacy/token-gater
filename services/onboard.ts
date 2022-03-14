import Onboard from "bnc-onboard";

const networkId = parseInt(process.env.NEXT_PUBLIC_NETWORK_ID || "80001", 10);
const networkName = process.env.NEXT_PUBLIC_NETWORK_NAME || "mumbai";
const dappId = process.env.NEXT_PUBLIC_BNC_API_KEY;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

export default function initOnboard(subscriptions: any) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    networkName,
    darkMode: false,
    subscriptions,
    walletSelect: {
      wallets: [{ walletName: "metamask" }],
    },
    walletCheck: [
      { checkName: "connect" },
      { checkName: "accounts" },
      { checkName: "network" },
    ],
  });
}
