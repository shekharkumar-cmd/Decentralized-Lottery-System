const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // <-- replace after deploy
const contractABI = [
  // Minimal ABI for the 3 core functions
  "function enterLottery() external payable",
  "function getPlayers() public view returns (address[])",
  "function pickWinner() public"
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    alert("Wallet connected!");
  } else {
    alert("Please install MetaMask!");
  }
}

async function enterLottery() {
  const ticketPriceEth = document.getElementById("ticketPrice").value;
  if (!ticketPriceEth) return alert("Enter ticket price in ETH!");

  const tx = await contract.enterLottery({
    value: ethers.utils.parseEther(ticketPriceEth.toString())
  });
  await tx.wait();
  alert("You have entered the lottery!");
}

async function getPlayers() {
  const players = await contract.getPlayers();
  const playersList = document.getElementById("playersList");
  playersList.innerHTML = "";
  players.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    playersList.appendChild(li);
  });
}

async function pickWinner() {
  try {
    const tx = await contract.pickWinner();
    await tx.wait();
    document.getElementById("winnerResult").innerText = "Winner has been picked!";
  } catch (err) {
    alert("Only the manager can pick the winner.");
  }
}

document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("enterLottery").onclick = enterLottery;
document.getElementById("getPlayers").onclick = getPlayers;
document.getElementById("pickWinner").onclick = pickWinner;




