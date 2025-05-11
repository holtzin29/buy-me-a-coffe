// constants.js

// The address of the deployed contract on the specific network being used.
export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Example Address

// The Application Binary Interface (ABI) generated from contract compilation.
export const abi = [
  // Constructor definition
  {
    "inputs": [ { "internalType": "address", "name": "priceFeed", "type": "address" } ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  // Error definition
  {
    "inputs": [],
    "name": "FundMe__NotOwner",
    "type": "error"
  },
  // View function definition
  {
    "inputs": [],
    "name": "MINIMUM_USD",
    "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ],
    "stateMutability": "view",
    "type": "function"
  },
  // Transaction function definition
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ... many more function, event, and error definitions
];
