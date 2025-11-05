// 查询 vitalik 在 vitalik.eth热钱包的 ETH 余额
import { ethers } from "ethers";
import { INFURA_MAINNET_URL } from "./config";

const provider = new ethers.JsonRpcProvider(INFURA_MAINNET_URL);

const main = async () => {
  const balance = await provider.getBalance("vitalik.eth");
  console.log(ethers.formatEther(balance), "balance");

  const network = await provider.getNetwork();
  console.log(network.toJSON());

  const blockNum = await provider.getBlockNumber();
  console.log(blockNum);
};
main();
