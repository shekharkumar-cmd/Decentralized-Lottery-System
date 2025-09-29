const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const Lottery = await ethers.getContractFactory("Project");

  // Deploy the contract with ticket price set to 0.01 ETH
  const ticketPrice = ethers.utils.parseEther("0.01");
  const lottery = await Lottery.deploy(ticketPrice);

  await lottery.deployed();

  console.log("Decentralized Lottery System deployed to:", lottery.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
