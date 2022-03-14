import { ExternalLinkIcon } from "@heroicons/react/outline";
import { Button } from "../components";
import { useWalletStore } from "../stores";
import { BLOCK_EXPLORER_URL } from "../helpers";
import useTranslation from "next-translate/useTranslation";

export default function Header() {
  const { address, onboard, resetWallet } = useWalletStore();

  const { t } = useTranslation("common");

  async function connect() {
    try {
      if (onboard) {
        await onboard.walletSelect();
        await onboard.walletCheck();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleReset() {
    window.localStorage.removeItem("selectedWallet");
    resetWallet();

    await onboard.walletReset();
  }

  return (
    <header className="w-full">
      <div className="flex items-center justify-end">
        {address ? (
          <>
            <a
              target="_blank"
              rel="noreferrer"
              href={BLOCK_EXPLORER_URL(address)}
            >
              <div className="flex mx-2 hover:text-indigo-800">
                <span>
                  {address.slice(0, 4)}...{address.slice(-4)}
                </span>
                <ExternalLinkIcon className="h-6 w-6" />
              </div>
            </a>
            <Button onClick={handleReset}>
              {t("wallet.disconnect_button")}
            </Button>
          </>
        ) : (
          <Button onClick={connect}>{t("wallet.connect_button")}</Button>
        )}
      </div>
    </header>
  );
}
