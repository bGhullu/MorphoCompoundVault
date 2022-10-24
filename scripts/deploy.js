const { ethers, getNamedAccounts, network } = require("hardhat")
const { getWeth, AMOUNT } = require("../scripts/getWeth.js")
const { moveBlocks } = require("../utils/move-blocks")

const weth =  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const mcWeth = "0x676E1B7d5856f4f69e10399685e17c2299370E95"


async function main() {
    await getWeth()
    const {deployer} = await getNamedAccounts()
    const Stoa = await ethers.getContractFactory("StoaMorphoCompoundVault")
    const stoa = await Stoa.deploy()
    await stoa.deployed()
    await approveErc20(weth, mcWeth,AMOUNT,deployer)
    console.log("Depositing WETH...")
    await stoa.deposit(AMOUNT)
    console.log("Deposited")
    await stoa.claimRewards()
    console.log("Rewards Claimed")
    await stoa.withdraw(AMOUNT)
    console.log("Withdraw Success!")   
}

async function approveErc20(erc20Address, spenderAddress, amount, signer) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, signer)
    txResponse = await erc20Token.approve(spenderAddress, amount)
    await txResponse.wait(1)
    console.log("Approved!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
