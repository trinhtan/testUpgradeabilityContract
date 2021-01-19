pragma solidity >=0.6.0 <0.8.0;

import "./proxy/TransparentUpgradeableProxy.sol";

contract DAIProxy is TransparentUpgradeableProxy {

  constructor (address _logic, address admin_, bytes memory _data) public TransparentUpgradeableProxy(_logic, admin_, _data) {
  }
}
