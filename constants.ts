import NFTAbi from "./abis/nft.json";

export const contracts: Contracts = {
  nft: {
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "0x",
    abi: NFTAbi.abi,
  },
};
