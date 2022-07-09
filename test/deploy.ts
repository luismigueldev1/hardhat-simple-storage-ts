import { assert } from "chai"
import { ethers } from "hardhat"

//types
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", () => {
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0 ", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        //assert
        assert.equal(currentValue.toString(), expectedValue)
        //expect
        //expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async () => {
        const expectedValue = "7"
        //update and wait for confirmation
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        //get current value
        const currentValue = await simpleStorage.retrieve()

        //assert
        assert.equal(currentValue.toString(), expectedValue)
        //expect
    })

    it("Should update the People Array when call addPerson function", async () => {
        //Data to add in addPerson function
        const person = {
            name: "Luis",
            favoriteNumber: "7",
        }

        //Making transaction
        const transactionResponse = await simpleStorage.addPerson(
            person.name,
            person.favoriteNumber
        )
        //waiting for confirmation
        await transactionResponse.wait(1)

        //get data from people array at position 0
        const { favoriteNumber, name } = await simpleStorage.people(0)

        //assert
        assert.equal(favoriteNumber.toString(), person.favoriteNumber)
        assert.equal(name, person.name)
    })
})
