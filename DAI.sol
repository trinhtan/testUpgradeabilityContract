pragma solidity >=0.6.0 <0.8.0;

import "./ERC20.sol";
import "./Ownable.sol";

contract DAI is ERC20, Ownable {
    
    constructor (string memory name_, string memory symbol_) ERC20(name_, symbol_) public {
        _mint(msg.sender, 1000);
    }
    
    function mint(address _receiver, uint256 _amount) public onlyOwner {
        _mint(_receiver, _amount);
    }
}