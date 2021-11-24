pragma solidity >=0.6.0 <0.8.0;

import "./token/ERC20/ERC20Upgradeable.sol";
import "./proxy/Initializable.sol";
import "./access/OwnableUpgradeable.sol";

contract DAILogic1 is ERC20Upgradeable, OwnableUpgradeable {
    function initialize(string memory name_, string memory symbol_)
        public
        initializer
    {
        __ERC20_init(name_, symbol_);
        __Ownable_init();
    }

    function mint(address recipient, uint256 amount) public onlyOwner {
        _mint(recipient, amount);
    }
}
