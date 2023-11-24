// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract cytriccoin is ERC20("cytriccoin", "CT") {
    constructor() {
        _mint(msg.sender, 1000*10**18);
    }
}