
const hre = require("hardhat");

// Returns the Ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx ++;
  }
}

// Logs the memos stored on-chain from coffee purchases.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}


async function main() {
  //Get example accounts
const[owner,tipper1,tipper2,tipper3,owner1,owner2]=await hre.ethers.getSigners();
  //Get the contract deployed & deploy
const BuyMeACoffe=await hre.ethers.getContractFactory("BuyMeACoffee");
const buyMeACoffe=await BuyMeACoffe.deploy();
await buyMeACoffe.deployed();
console.log("BuyMeACoffee deployed ",buyMeACoffe.address)

  //Check balances before coffe purchases 
const addresses=[owner.address,tipper1.address,buyMeACoffe.address]
console.log("==start phase==");
await printBalances(addresses);

  //Buy the owner a few coffe 
const tip={value:hre.ethers.utils.parseEther("1")}
await buyMeACoffe.connect(tipper1).BuyCoffee("Ahmet","Drink a coffee from me ma bru",tip)
await buyMeACoffe.connect(tipper2).BuyCoffee("Mehmet","Drink a coffee from me ma bru",tip)
await buyMeACoffe.connect(tipper3).BuyCoffee("Kenan Abey","Drink a coffee from me ma bru",tip)

  //Check balances after the coffe purchases 
  console.log("==buycoffee phase==");
  await printBalances(addresses);
  //add extra account for withdrawal
  await buyMeACoffe.connect(owner).addAccount(owner1.address);
  await buyMeACoffe.connect(owner).addAccount(owner2.address);
  //Get owners
  const owners=await buyMeACoffe.connect(owner).getOwners();
  console.log("The accounts you can withdraw : ",owners)
  //Withdraw funds
  await buyMeACoffe.connect(owner).WithDrawTips(1)
  //Check balances after refund
  console.log("==Tip Withdrawal phase==");
  await printBalances(addresses);
  //Read all memos left for the owner 
  console.log("==Memo publish phase==")
  const memos=await buyMeACoffe.connect(tipper3).getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
