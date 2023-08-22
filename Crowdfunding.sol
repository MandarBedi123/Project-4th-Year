// SQDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding{
    address public owner;
    uint public goal;
    uint public raisedAmount;
    mapping(address => uint) public contributors;

    constructor(uint _goal){
        owner=msg.sender;
        goal= _goal;
    }

    modifier onlyOwner(){
        require (msg.sender==owner,"Only the owner can call this function. It is owner.");
        _;
    }

    function contribute() external payable{
        require(raisedAmount<goal, "Goal is already reached.");
        contributors[msg.sender]+=msg.value;
        raisedAmount+=msg.value;
    }

    function withdrawFunds() external onlyOwner{
        require(raisedAmount>=goal, "Goal is not reached yet.");
        payable(owner).transfer(address(this).balance);
    }
}