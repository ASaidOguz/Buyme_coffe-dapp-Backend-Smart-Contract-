require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
//Most of the objects here are predefined so in according to the video 
//we made couple of mistakes  for example "goerli object" we made the input as account 
// and it gave us error as ---->null(reading'sendTransaction')...
const GOERLI_URL=process.env.GOERLI_URL;
const PRIVATE_KEY =process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:GOERLI_URL,
      accounts:[PRIVATE_KEY]
    }
  }
};
