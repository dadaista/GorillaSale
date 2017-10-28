pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/token/MintableToken.sol";

/**
 * @title GorillaToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
contract GorillaToken is MintableToken {

  string public constant name = "Gorilla Token";
  string public constant symbol = "GRL";
  uint8 public constant decimals = 4;

}