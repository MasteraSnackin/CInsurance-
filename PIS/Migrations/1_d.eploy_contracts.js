const ParametricInsurance = artifacts.require("ParametricInsurance");

module.exports = function (deployer) {
  // Define the premium, payout amounts, and trigger condition
  const premium = web3.utils.toWei("0.1", "ether"); // Premium for purchasing the policy
  const payoutAmount = web3.utils.toWei("1", "ether"); // Payout amount in case of trigger
  const triggerCondition = 100; // Example trigger condition for rainfall
  const oracleAddress = '0xYourOracleAddress'; // Replace with actual Blocksense oracle address

  // Deploy the ParametricInsurance contract with the specified parameters
  deployer.deploy(ParametricInsurance, oracleAddress, premium, payoutAmount, triggerCondition);
};
