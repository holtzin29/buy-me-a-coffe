import { createWalletClient, custom, createPublicClient, parseEther, defineChain, formatEther} from "https://esm.sh/viem"
import { contractAddress, abi} from "./constants-js.js"
import { formatEther } from "viem"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const ethAmount = document.getElementById("ethAmount")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")

let walletClient
let publicClient
async function connect() {
   if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
        transport: custom(window.ethereum)
    })
    await walletClient.requestAddresses()
    connectButton.innerHTML = "Connected"
      
   }
   else {
    connectButton.innerHTML = "Install Metamask"
   }
}

async function fund() {
    console.log("Funding")
    const amount = ethAmount.value
    console.log(`Funding with ${amount}...`)

   if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
        transport: custom(window.ethereum)
    })
    const [connectedAccount] = await walletClient.requestAddresses()
    const currentChain = await getCurrentChain(walletClient)
    publicClient = createPublicClient({
        transport: custom(window.ethereum)
    })
    await publicContract.simulateContract({
        address: contractAddress,
        abi: abi,
        functionName: "fund",
        account: connectedAccount,
        chain: currentChain,
        value: parseEther(ethAmount)
    })
   }
   else {
    connectButton.innerHTML = "Install Metamask"
   }
}
async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        const balance = await publicClient.getBalance({
            address: contractAddress
        })
        console.log(formatEther(balance))
}
}
async function withdraw() {
    console.log("Withdrawing")
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        const [connectedAccount] = await walletClient.requestAddresses()
        const currentChain = await getCurrentChain(walletClient)
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        await publicClient.simulateContract({
            address: contractAddress,
            abi: abi,
            functionName: "withdraw",
            account: connectedAccount,
            chain: currentChain
        });
        const hash = await walletClient.writeContract(request)
        console.log(hash);
    } else {
        connectButton.innerHTML = "Install Metamask"
    }
}
async function getCurrentChain(client) {
    // Get the chain ID from the connected wallet client
    const chainId = await client.getChainId();
  
    // Define the chain parameters using viem's defineChain
    const currentChain = defineChain({
      id: chainId,
      name: "Local Devnet", // Provide a descriptive name (e.g., Anvil, Hardhat)
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: {
        // Use the RPC URL of your local node
        default: { http: ["http://localhost:8545"] },
        // public: { http: ["http://localhost:8545"] }, // Optional: specify public RPC if different
      },
      // Add other chain-specific details if needed (e.g., blockExplorers)
    });
    return currentChain;
  }

connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance 
withdrawButton.onclcik = withdraw
