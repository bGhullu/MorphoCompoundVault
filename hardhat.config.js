require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")

require("dotenv").config()

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: { 
    compilers: [{ version: "0.8.13" }, { version: "0.8.4" }, { version: "0.8.16" },{version: "0.6.12"}] ,
    settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
},
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            forking: {
                url: MAINNET_RPC_URL,
                blockNumber:15796924,
                allowUnlimitedContractSize: true,
            },
        },
        localhost: {
            chainId: 31337,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
}
