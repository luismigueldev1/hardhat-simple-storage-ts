import { ethers, run, network } from "hardhat"

const NETWORKS_CHAINS_ID = {
    hardhat: 31337,
    rinkeby: 4,
}

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract..")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log("Deployed Contract: ", simpleStorage.address)

    if (
        network.config.chainId === NETWORKS_CHAINS_ID.rinkeby &&
        process.env.ETHERSCAN_API_KEY
    ) {
        console.log("Waiting for block confirmation...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    //get current value
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    //update current value
    const transactionResponse = await simpleStorage.store("7")
    await transactionResponse.wait(1)

    //get updated value
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

async function verify(contractAddress: string, args: any[]) {
    console.log("Verifying Contract...")

    try {
        await run("verify:verify", {
            address: contractAddress,
            contructorArguments: args,
        })
    } catch (error: any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
