type Wallet = {
  provider: ethers.providers.ExternalProvider;
};

type Contracts = {
  nft: {
    address: string;
    abi: ethers.ContractInterface;
  };
};

type ContractName = "nft";
