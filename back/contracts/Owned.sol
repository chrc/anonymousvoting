pragma solidity ^0.5.0;


contract Owned {
    address public owner;

    /* Initialise contract creator as owner */
    constructor () public {
        owner = msg.sender;
    }

    /* Function to dictate that only the designated owner can call a function */
    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    /* Transfer ownership of this contract to someone else */
    function transferOwnership(address newOwner) onlyOwner() public {
        owner = newOwner;
    }
}
