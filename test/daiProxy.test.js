const DAI = artifacts.require('DAI');
const DAI_2 = artifacts.require('DAI_2');

const DAIProxy = artifacts.require('DAIProxy');
const DAIProxyAdmin = artifacts.require('DAIProxyAdmin');

contract('DAI Proxy', ([proxyAdmin, daiOwner, user, someuser]) => {
  it('DAI Proxy', async () => {
    // deploy DAI
    let dai = await DAI.new({ from: someuser });

    // deploy DAIProxyAdmin
    let daiProxyAdmin = await DAIProxyAdmin.new({ from: proxyAdmin });

    // Get bytes of initialize('DAI', 'DAI')
    let data = await dai.contract.methods.initialize('DAI', 'DAI').encodeABI();

    // deploy DAIProxy
    let daiProxy = await DAIProxy.new(dai.address, daiProxyAdmin.address, data, {
      from: daiOwner,
    });

    // create DAI instance at daiProxy.address
    let realDai = await DAI.at(daiProxy.address);

    // Mint 1000 for user
    await realDai.mint(user, '1000', { from: daiOwner });

    // check user's balance = 1000
    assert.equal(await realDai.balanceOf(user), '1000');

    // deploy DAI_2
    let dai_2 = await DAI_2.new({ from: someuser });

    // upgrade daiProxy's implementation to dai_2.address
    await daiProxyAdmin.upgrade(daiProxy.address, dai_2.address);

    // mint 1000 for user
    await realDai.mint(user, '1000', { from: daiOwner });

    // check user's balance = 3000
    assert.equal(await realDai.balanceOf(user), '3000');
  });
});
