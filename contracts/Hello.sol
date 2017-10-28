pragma solidity ^0.4.11;

contract Hello{
    uint public state=0;
	function hello(){
		state = state + 1;
	}
}