pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/token/MintableToken.sol";

/**
 * @title GorillaToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
contract GorillaToken is MintableToken {

  string public constant name = "Orangu6";
  string public constant symbol = "GR6";
  uint8 public constant decimals = 15;

}
