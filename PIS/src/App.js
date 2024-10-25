import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ParametricInsurance from './contracts/ParametricInsurance.json';
import PolicyForm from './components/PolicyForm';
import PolicyList from './components/PolicyList';

/**
 * @function App
 * @description Main component for the Parametric Insurance dApp.
 * It handles blockchain interactions and manages the state of the application.
 */
function App() {
  const [web3, setWeb3] = useState(null); // State to store web3 instance
  const [account, setAccount] = useState(null); // State to store user account
  const [contract, setContract] = useState(null); // State to store contract instance
  const [policies, setPolicies] = useState([]); // State to store list of policyholders

  useEffect(() => {
    const init = async () => {
      // Initialize web3 instance and connect to the network
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts(); // Request user accounts from MetaMask
      const networkId = await web3.eth.net.getId(); // Get the current network ID
      const deployedNetwork = ParametricInsurance.networks[networkId]; // Get deployed network configuration
      const instance = new web3.eth.Contract(
        ParametricInsurance.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setWeb3(web3);
      setAccount(accounts[0]); // Set the first account as the user's account
      setContract(instance); // Set the contract instance
    };

    init();
  }, []);

  /**
   * @function purchasePolicy
   * @description Sends a transaction to the smart contract to purchase an insurance policy.
   */
  const purchasePolicy = async () => {
    await contract.methods.purchasePolicy().send({ from: account, value: web3.utils.toWei("0.1", "ether") });
    setPolicies([...policies, account]); // Update the list of policyholders
  };

  /**
   * @function requestWeatherUpdate
   * @description Sends a transaction to request weather data update from the oracle.
   */
  const requestWeatherUpdate = async () => {
    await contract.methods.requestWeatherUpdate().send({ from: account });
    // Additional logic to handle the response can be added here
  };

  return (
    <div className="App">
      <h1>Parametric Insurance dApp</h1>
      <PolicyForm purchasePolicy={purchasePolicy} /> {/* Component to purchase policy */}
      <button onClick={requestWeatherUpdate}>Request Weather Update</button> {/* Button to request weather update */}
      <PolicyList policies={policies} /> {/* Component to list policyholders */}
    </div>
  );
}

export default App;

