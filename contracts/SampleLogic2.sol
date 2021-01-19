pragma solidity >=0.6.0 <0.8.0;

contract SampleLogic2 {

    address public owner;
    bool public initialized;
    mapping(address => uint256) public balances;

    modifier initializer() {
        require(!initialized, "Initializable: contract is already initialized");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor () public {
    }

    function initialize() public initializer {
        owner = msg.sender;
        initialized = true;
    }

    function mint(address _recipient, uint256 _amount) public onlyOwner {
        balances[_recipient] = balances[_recipient] + _amount * 2;
    }
}