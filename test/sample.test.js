const SampleProxy = artifacts.require('SampleProxy');
const SampleLogic2 = artifacts.require('SampleLogic2');
const SampleLogic = artifacts.require('SampleLogic');

contract('Sample', ([owner, user, someuser]) => {
  it('SampleProxy test', async () => {
    // deploy SampleLogic
    let sampleLogic = await SampleLogic.new({ from: someuser });

    // get selector of initialize() function
    let data = sampleLogic.contract.methods.initialize().encodeABI();

    // deploy SampleProxy
    let sampleProxy = await SampleProxy.new(sampleLogic.address, data, { from: owner });

    // create SampleLogic instance at SampleProxy's address
    let realSampleLogic = await SampleLogic.at(sampleProxy.address);

    // check owner
    assert.equal(await realSampleLogic.owner(), owner);

    // mint for user 1000
    await realSampleLogic.mint(user, '1000', { from: owner });

    // check user's balance
    assert.equal(await realSampleLogic.balances(user), '1000');

    // deploy SampleLogic2
    let sampleLogic_2 = await SampleLogic2.new({ from: someuser });

    data = sampleLogic_2.contract.methods.mint(user, '1000').encodeABI();

    // upgrade _implementation of Proxy to SampleLogic2's address and mint to user 2000
    await sampleProxy.upgradeToAndCall(sampleLogic_2.address, data);

    // check user's balance
    assert.equal(await realSampleLogic.balances(user), '3000');
  });
});
