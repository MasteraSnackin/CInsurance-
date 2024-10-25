
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IBlocksenseOracle
 * @dev Interface for a Blocksense Oracle contract.
 * This interface defines the functions that the oracle contract must implement.
 */
interface IBlocksenseOracle {
    /**
     * @dev Requests weather data from the oracle.
     * @return requestId A unique identifier for the data request.
     */
    function requestWeatherData() external returns (bytes32 requestId);

    /**
     * @dev Retrieves the weather data associated with a given requestId.
     * @param requestId The unique identifier for the data request.
     * @return The weather data as an unsigned integer.
     */
    function getWeatherData(bytes32 requestId) external view returns (uint256);
}
