// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

//abi  Application Binary Interface --------- very Important 
//Deployed to Goerli at this address:"0x1eE1bb2a264e7E168c4a0818ca81deC8fCB1fc5D"
contract BuyMeACoffee {
    //Event to emit when new memo created! 
    event NewMemo(
         address indexed from,
         uint256 timestamp,
         string name,
         string message
         );

    //Memo struct

    struct Memo{
         address from;
         uint256 timestamp;
         string name;
         string message;


    }
    uint counter=0;
    //Address of owners in map
    address payable[]owners;
    //List of all memos received from friends 
    Memo[]memos;
    //addres of the contract deployer;
    address payable owner;
    //Deploy logic
    constructor(){
        owner=payable(msg.sender);
    }
    //A function for adding account that can be send to balance.
    function addAccount(address  payable _newowner)public {
     require(msg.sender==owner && owners.length<5);
     
     owners.push(_newowner);
    }
/*
 * @dev buy coffe for the contract owner;
 * @param _name coffe buyer name ;
 * @param message coffe buyers message;
*/
    function BuyCoffee(string memory _name,string memory _message) public payable{
       require(msg.value>0,"Cant buy a coffe with 0 eth");
       //add new memo to memos 
       memos.push(Memo(
              msg.sender,
              block.timestamp,
              _name,
              _message
       ));
       emit NewMemo(
         msg.sender,
              block.timestamp,
              _name,
              _message
       );
    }
    /** 
     * @dev send the entire balance stored in this to owner 
    */
   
    
    function WithDrawTips(uint _id)public{
          if(owners.length>0) {
               require(owners[_id].send(address(this).balance));}
                require(owner.send(address(this).balance));
    }
    /** 
     * @dev retrieve all memos received and stored in blockchain
    */
    function getMemos()public view returns(Memo[]memory){
         return memos;
    }

    function getOwners() public  view returns( address payable[]memory)  {
          return owners;
    }
}


/* 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
   0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
   0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB,
   0x617F2E2fD72FD9D5503197092aC168c91465E7f2,
   0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678 
   */