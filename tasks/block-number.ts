import { task } from "hardhat/config"

task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const currentBlockNumber = await hre.ethers.provider.getBlockNumber()
        console.log("Current block number: ", currentBlockNumber)
    }
)

export default task
