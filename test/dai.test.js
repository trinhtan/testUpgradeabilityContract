const DAILogic1 = artifacts.require('DAILogic1');
const DAILogic2 = artifacts.require('DAILogic2');

const DAIProxy = artifacts.require('DAIProxy');
const DAIProxyAdmin = artifacts.require('DAIProxyAdmin');

contract('DAI Proxy', ([proxyAdmin, daiOwner, user, someuser]) => {
  it('DAI Proxy', async () => {
    // deploy DAILogic1
    let dai = await DAILogic1.new({ from: someuser });

    // deploy DAIProxyAdmin
    let daiProxyAdmin = await DAIProxyAdmin.new({ from: proxyAdmin });

    // Get bytes of initialize('DAI', 'DAI')
    let data = await dai.contract.methods.initialize('DAI', 'DAI').encodeABI();

    // deploy DAIProxy
    let daiProxy = await DAIProxy.new(dai.address, daiProxyAdmin.address, data, {
      from: daiOwner,
    });

    // create DAILogic1 instance at daiProxy.address
    let realDai = await DAILogic1.at(daiProxy.address);

    // Mint 1000 for user
    await realDai.mint(user, '1000', { from: daiOwner });

    // check user's balance = 1000
    assert.equal(await realDai.balanceOf(user), '1000');

    // deploy DAILogic2
    let daiLogic2 = await DAILogic2.new({ from: someuser });

    // upgrade daiProxy's implementation to daiLogic2
    await daiProxyAdmin.upgrade(daiProxy.address, daiLogic2.address);

    // mint 1000 for user
    await realDai.mint(user, '1000', { from: daiOwner });

    // check user's balance = 3000
    assert.equal(await realDai.balanceOf(user), '3000');
  });
});
