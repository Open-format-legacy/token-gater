import type { NextPage } from "next";
import { Button } from "../components";
import { callContract } from "../helpers";
import { useWalletStore } from "../stores";

const Home: NextPage = () => {
  const { wallet, onboard } = useWalletStore();

  async function handleContractCall() {
    callContract({
      name: "nft",
      provider: wallet?.provider,
      cb: async (contract) => {
        await onboard.walletCheck();
      },
    });
  }
  return (
    <div
      className="bg-cover"
      style={{
        backgroundImage: "url('images/background.png')",
        minHeight: "100vh",
      }}
    >
      <div className="relative z-10 py-5">Web3 base.</div>
      {wallet?.provider && (
        <Button onClick={handleContractCall}>Call Contract</Button>
      )}
    </div>
  );
};

export default Home;
