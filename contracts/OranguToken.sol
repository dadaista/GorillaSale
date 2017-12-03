pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/token/CappedToken.sol";

/**
 * @title OranguToken
 * @dev Very simple ERC20 Token, capped and minted.
 * It is meant to be used in a crowdsale contract.
 */
contract OranguToken is CappedToken {

  string  public constant name            = "OranguToken";
  string  public constant symbol          = "OR1";
  uint8   public constant decimals        = 15;
  uint256 public constant max_supply      = 10000 * 10**15;

  function OranguToken() CappedToken(max_supply) public  {} 


}