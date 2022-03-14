async function readyToTransact(onboard: any, previouslySelectedWallet: any) {
  if (onboard) {
    await onboard.walletSelect(previouslySelectedWallet);
    await onboard.walletCheck();
  }
}

export { readyToTransact };
