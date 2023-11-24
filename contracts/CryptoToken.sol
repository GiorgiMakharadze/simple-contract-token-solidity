// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CryptoToken {
    address public minter;
    mapping(address => uint) public balances;

    event Sent(address indexed from, address indexed to, uint amount);
    event Burned(address indexed burner, uint amount);

    constructor() {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) public {
        require(msg.sender == minter, "Only minter can mint tokens");
        balances[receiver] += amount;
    }

    function send(address receiver, uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }

    function burn(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        emit Burned(msg.sender, amount);
    }
}
