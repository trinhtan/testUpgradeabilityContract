pragma solidity >=0.6.0 <0.8.0;
import './DummyImplementation.sol';

contract DummyImplementationV2 is DummyImplementation {
  function migrate(uint256 newVal) public payable {
    value = newVal;
  }

  function version() public pure override returns (string memory) {
    return "V2";
  }
}