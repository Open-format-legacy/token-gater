import { ExternalLinkIcon } from "@heroicons/react/outline";
import { Button } from "../components";
import { BLOCK_EXPLORER_URL } from "../helpers";
import useTranslation from "next-translate/useTranslation";
import { useConnectWallet } from "@web3-onboard/react";

export default function Header() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { t } = useTranslation("common");
  async function connectWallet() {
    await connect({});
  }
  async function disconnectWallet() {
    await disconnect({ label: "WalletConnect" });
  }
  return (
    <header className="w-full">
      <div className="flex items-center justify-end space-x-4">
        {wallet && wallet.accounts.length ? (
          <>
            <a
              target="_blank"
              rel="noreferrer"
              href={BLOCK_EXPLORER_URL(wallet.accounts[0].address)}
            >
              <div className="mx-2 flex hover:text-indigo-800">
                <span>
                  {wallet.accounts[0].address.slice(0, 4)}...
                  {wallet.accounts[0].address.slice(-4)}
                </span>
                <ExternalLinkIcon className="h-6 w-6" />
              </div>
            </a>

            <Button onClick={disconnectWallet}>
              {t("wallet.disconnect_button")}
            </Button>
          </>
        ) : (
          <Button onClick={connectWallet}>
            {connecting ? "connecting..." : "connect"}
          </Button>
        )}
      </div>
    </header>
  );
}
