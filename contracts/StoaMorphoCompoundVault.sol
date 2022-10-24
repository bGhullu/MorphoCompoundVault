// SPDX-License-Identifier: GNU AGPLv3
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {ISupplyVault} from "./interfaces/ISupplyVault.sol";
import {ISupplyHarvestVault} from "./interfaces/ISupplyHarvestVault.sol";

contract StoaMorphoCompoundVault {
    // Token address
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    // Vault Token address
    address private constant mcWETH =
        0x676E1B7d5856f4f69e10399685e17c2299370E95;

    function fund() public payable {}

    function deposit(uint256 _amount) external {
        IERC20(WETH).approve(mcWETH, _amount);
        ISupplyVault(mcWETH).deposit(_amount, msg.sender);
    }

    function claimRewards() external {
        ISupplyVault(WETH).claimRewards(address(this));
    }

    function withdraw(uint256 _amount) external {
        IERC20(mcWETH).approve(address(this), _amount);
        ISupplyVault(mcWETH).withdraw(
            _amount,
            address(this), // the address of the receiver of the funds withdrawn
            address(this) // the address of the user you want to withdraw from (they must have approved this contract to spend their tokens)
        );
    }
}
