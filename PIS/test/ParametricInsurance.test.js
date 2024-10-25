const ParametricInsurance = artifacts.require("ParametricInsurance");

contract("ParametricInsurance", accounts => {
  it("should allow a user to purchase a policy", async () => {
    const instance = await ParametricInsurance.deployed();
    await instance.purchasePolicy({ from: accounts[1], value: web3.utils.toWei("0.1", "ether") });
    const isPolicyholder = await instance.policyholders(accounts[1]);
    assert.isTrue(isPolicyholder); // Assert that the account is now a policyholder
  });

  it("should trigger payouts under the right conditions", async () => {
    // Simulate oracle providing data
    // Ensure the contract logic handles the oracle data correctly
    // Note: This test needs to be expanded with proper oracle simulation
  });
});
