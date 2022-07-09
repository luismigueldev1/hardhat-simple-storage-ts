import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"
import "hardhat-gas-reporter"
import "@typechain/hardhat"
import "solidity-coverage"
import "dotenv/config"
import "./tasks"

/* Constants */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https//eth-rinkeby.com/"
const RYNKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: Thanks hardhat
            chainId: 31337,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [RYNKEBY_PRIVATE_KEY],
            chainId: 4,
        },
    },
    solidity: "0.8.9",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        currency: "USD",
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
}

export default config
