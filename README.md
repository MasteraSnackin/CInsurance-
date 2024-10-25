# CInsurance-


How the Application Works
The application is designed to provide weather-based insurance using Ethereum smart contracts. Here's how each part of the system works:
1. Frontend (PIS)
The frontend of the DApp is built with ReactJS and uses MetaMask to allow users to connect their Ethereum wallet and interact with smart contracts. When the user accesses the DApp:
They can connect their wallet via MetaMask.
They can initiate a new insurance contract, pay a premium, or submit a claim.
MetaMask is used to sign transactions that interact with the deployed smart contracts.
The frontend communicates with the Ethereum blockchain to create contracts and verify claims.
2. Smart Contracts (weather-surety-solutions-main)
The smart contracts are written in Solidity and handle the core logic for insurance:
Insurance.sol: This is the core contract for managing insurance policies, premiums, and claims.
The contract allows users to buy weather insurance for specific conditions (e.g., heavy rain).
When a claim is submitted, the contract verifies the conditions (using an oracle or API) and automatically pays out if the criteria are met.
Deployment: The contracts are deployed to the Ethereum blockchain using Truffle. The migration scripts in the migrations/ folder manage the deployment process.
3. Backend Verifier (JsonJqVerifierServer-main)
The backend verifier server could be used to handle external data verification, such as retrieving weather data to verify insurance claims. This server could use APIs (e.g., weather APIs) to gather the necessary data and communicate with the smart contracts to trigger payouts if conditions are met.
4. Wallet Integration (MetaMask)
MetaMask is used to connect the user’s wallet to the Ethereum blockchain.
It allows the user to approve transactions such as paying insurance premiums and submitting claims.
The smart contracts require interaction with the user’s wallet to ensure that they are authorized to perform actions like creating contracts or receiving payouts.


Prerequisites
Ensure you have the following installed:
Node.js: Required for running the frontend and backend servers.
Truffle: Required for compiling, testing, and deploying smart contracts.
Ganache: Local Ethereum blockchain for development.
MetaMask: Browser extension for interacting with the Ethereum blockchain.
Solidity: For compiling smart contracts.

Step-by-Step Setup Instructions
1. Clone the Repository
First, clone the repository to your local machine and navigate into the project directory:
bash
Copy code
git clone https://github.com/your-repository-name.git
cd your-repository-name

2. Frontend Setup (PIS)
The frontend is built using ReactJS, and it requires the installation of Node.js dependencies.
Navigate to the frontend directory and install the dependencies:
bash
Copy code
cd PIS
npm install

To start the frontend in development mode, use:
bash
Copy code
npm start

This will start the app on http://localhost:3000. Make sure your MetaMask wallet is configured to connect to the correct Ethereum network (e.g., local Ganache network or a testnet like Ropsten).

3. Compile and Deploy Smart Contracts (weather-surety-solutions-main)
Navigate to the contract directory:
bash
Copy code
cd weather-surety-solutions-main

Install the required dependencies for Truffle (if not already installed):
bash
Copy code
npm install -g truffle

Compile the smart contracts:
bash
Copy code
truffle compile

Make sure you have Ganache running locally at http://127.0.0.1:7545, then deploy the contracts to the local Ethereum network:
bash
Copy code
truffle migrate --network development

This will deploy the contracts to your local blockchain and display the contract addresses.

4. Backend Setup (Optional - JsonJqVerifierServer-main)
If the backend verifier is required for checking external weather data, navigate to the verifier server folder:
bash
Copy code
cd JsonJqVerifierServer-main
npm install

Start the backend server:
bash
Copy code
node server.js

This server could interact with external APIs (like weather APIs) to verify the conditions for insurance claims and trigger smart contract functions accordingly.

5. MetaMask Configuration
Make sure MetaMask is installed and configured to connect to your desired Ethereum network. For local development, add your local blockchain to MetaMask:
Network Name: Ganache
RPC URL: http://127.0.0.1:7545
Chain ID: 1337 (Ganache default)
Ensure that your MetaMask wallet is funded with some test Ether to interact with the DApp.

Interacting with the Application
Connect MetaMask: When you open the DApp (http://localhost:3000), MetaMask will prompt you to connect your wallet. Ensure you are on the correct network (e.g., Ganache for local development).
Create Insurance Policy: Select or input insurance conditions (e.g., weather-based insurance for rain). Submit the premium payment through MetaMask.
Claim Insurance: If an event occurs (like rain), submit a claim. The contract will verify the event through the backend or an oracle, and if conditions are met, a payout will be triggered to your wallet.

Scripts
scripts/deploy.js: A script to automate the deployment of smart contracts.
weather-surety-solutions-main/migrations/: Migration scripts used by Truffle to deploy the contracts.
