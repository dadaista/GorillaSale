pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/token/MintableToken.sol";

/**
 * @title GorillaToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
contract GorillaToken is MintableToken {

  string public constant name = "Gorilla Token";
  string public constant symbol = "GR3";
  uint8 public constant decimals = 18;

}
