import { ethers } from "ethers";

// 1. BSC 主网公共 RPC（国内直连，稳定不超时，无需 API Key）
const bscRpcUrl = "https://bsc-dataseed.binance.org/";
const provider = new ethers.JsonRpcProvider(bscRpcUrl);

// 2. 替换成你的「币安 Web3 钱包 BSC 地址」（关键！复制自己的地址）
const YOUR_BINANCE_WEB3_BSC_ADDRESS =
  "0x764f306251c8dfd391fc85a6e059fdd054fd6ee2"; // 例：0x1234567890abcdef1234567890abcdef12345678

const main = async () => {
  try {
    // 3. 查询 BNB 余额（BSC 链原生资产，类似 ETH 在以太坊）
    const balanceInWei = await provider.getBalance(
      YOUR_BINANCE_WEB3_BSC_ADDRESS
    );

    // 4. 格式化：从 wei 转成 BNB（1 BNB = 10^18 wei，和 ETH 单位规则一样）
    const balanceInBnb = ethers.formatEther(balanceInWei);

    // 打印结果（保留6位小数，更易读）
    console.log("你的币安 Web3 钱包 BNB 余额：", balanceInBnb, "BNB");
  } catch (error) {
    console.error("查询失败，原因：", error.message);
  }
};

// 执行查询
main();
