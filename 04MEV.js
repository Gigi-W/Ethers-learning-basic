import { ethers, Interface } from "ethers";
import { PRIVATE_KEY, WS_URL } from "./config.js";

// 创建provider
const provider = new ethers.WebSocketProvider(WS_URL);
const network = provider.getNetwork();
network.then((res) =>
  console.log(
    `${new Date().toLocaleDateString()}: 连接到 chainId ${res.chainId}`
  )
);

// 创建钱包，用于发送抢跑交易
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const iface = new Interface(["function mint() external"]);

const main = async () => {
  // 监听pending的交易，获取详情，用于解码
  provider.on("pending", async (txHash) => {
    if (txHash) {
      const tx = await provider.getTransaction(txHash);
      if (
        tx.data.indexOf(iface.getFunction("mint").selector) !== -1 &&
        tx.from !== wallet.address
      ) {
        console.log(
          `${new Date().toLocaleDateString()}: 监听pending交易===${txHash}`
        );
        const parsedTx = iface.parseTransaction(tx);
        console.log("pending交易解码详情");
        console.log(parsedTx);
        console.log("raw transaction");
        console.log(tx);

        // 构建抢跑tx
        const txFrontRun = {
          to: tx.to,
          value: tx.value,
          data: tx.data,
          maxPriorityFeePerGas: (tx.maxPriorityFeePerGas * 12n) / 10n, // 给矿工的额外激励
          maxFeePerGas: (tx.maxFeePerGas * 12n) / 10n, // 每单位gas费用（包含基础网络和矿工激励）
          gasLimit: (tx.gasLimit * 2n) / 1n, // gas上限
        };

        const txRes = await wallet.sendTransaction(txFrontRun);
        await txRes.wait();
        console.log("front run 成功");
      }
    }
  });

  //   provider.on("error", () => {
  //     console.log("Unable to connect");
  //   });

  //   provider.on("close", async () => {
  //     console.log("Connect lost");
  //   });
};

main();
