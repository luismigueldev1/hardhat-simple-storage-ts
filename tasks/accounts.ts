import { task } from "hardhat/config"

task("accounts", "Prints the accounts ").setAction(async (taskArgs, hre) => {
    const signers = await hre.ethers.getSigners()
    const accounts = []
    for (const signer of signers) {
        const balance = hre.ethers.utils.formatEther(await signer.getBalance())
        accounts.push({
            address: signer.address,
            balance,
        })

        console.log(accounts)
    }
})

export default task
