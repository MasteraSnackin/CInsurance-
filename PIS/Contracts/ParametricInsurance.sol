// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IBlocksenseOracle.sol";

/**
 * @title ParametricInsurance
 * @dev A smart contract for managing parametric insurance policies.
 * The contract allows users to purchase policies and triggers payouts based on weather conditions.
 */
contract ParametricInsurance {
    // The address of the insurer (the creator of the contract)
    address public insurer;

    // The premium amount required to purchase a policy
    uint256 public premium;

    // The payout amount issued when a trigger condition is met
    uint256 public payoutAmount;

    // The rainfall threshold that triggers the payout
    uint256 public triggerCondition;

    // Mapping to keep track of policyholders
    mapping(address => bool) public policyholders;

    // Instance of the oracle interface
    IBlocksenseOracle public oracle;

    // Events for logging key actions
    event PolicyPurchased(address indexed policyholder, uint256 premium);
    event PayoutTriggered(address indexed policyholder, uint256 amount);
    event WeatherDataUpdated(uint256 rainfall);

    /**
     * @dev Constructor to initialize the contract with the oracle address and insurance details.
     * @param oracleAddress The address of the Blocksense oracle contract.
     * @param _premium The premium amount for purchasing a policy.
     * @param _payoutAmount The amount to be paid out in case of a trigger condition.
     * @param _triggerCondition The rainfall threshold for triggering a payout.
     */
    constructor(
        address oracleAddress,
        uint256 _premium,
        uint256 _payoutAmount,
        uint256 _triggerCondition
    ) {
        insurer = msg.sender;
        oracle = IBlocksenseOracle(oracleAddress);
        premium = _premium;
        payoutAmount = _payoutAmount;
        triggerCondition = _triggerCondition;
    }

    /**
     * @dev Purchase a policy by sending the exact premium amount.
     * The sender's address is recorded as a policyholder.
     */
    function purchasePolicy() external payable {
        require(msg.value == premium, "Incorrect premium amount");
        policyholders[msg.sender] = true;
        emit PolicyPurchased(msg.sender, premium);
    }

    /**
     * @dev Request an update of weather data from the oracle.
     * Triggers payouts if the retrieved data meets the trigger condition.
     */
    function requestWeatherUpdate() external {
        // Request weather data from the oracle
        bytes32 requestId = oracle.requestWeatherData();
        // Retrieve the weather data using the requestId
        uint256 rainfall = oracle.getWeatherData(requestId);
        emit WeatherDataUpdated(rainfall);

        // Check if the rainfall meets or exceeds the trigger condition
        if (rainfall >= triggerCondition) {
            triggerPayouts();
        }
    }

    /**
     * @dev Trigger payouts to all eligible policyholders.
     */
    function triggerPayouts() internal {
        // Iterate over all policyholders and send payouts
        for (address policyholder : policyholders) {
            if (policyholders[policyholder]) {
                payable(policyholder).transfer(payoutAmount);
                emit PayoutTriggered(policyholder, payoutAmount);
            }
        }
    }
}
