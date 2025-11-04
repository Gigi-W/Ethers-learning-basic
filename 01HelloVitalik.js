// 查询 vitalik 在 vitalik.eth热钱包的 ETH 余额
import { ethers } from "ethers";
const INFURA_API_KEY = "";
const infura_url = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
const provider = new ethers.JsonRpcProvider(infura_url);

// const ETHERSCAN_API_KEY = "";
// const provider = new ethers.EtherscanProvider("mainnet", ETHERSCAN_API_KEY);

const main = async () => {
  const balance = await provider.getBalance("vitalik.eth");
  console.log(ethers.formatEther(balance), "balance");

  const network = await provider.getNetwork();
  console.log(network.toJSON());

  const blockNum = await provider.getBlockNumber();
  console.log(blockNum);
};
main();
