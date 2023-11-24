const dotenv = require("dotenv");
dotenv.config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  networks: {
    edgechain: {
      provider: () =>
        new HDWalletProvider(privateKey, `http://localhost:10002/`),
      network_id: "*",
      chain_id: 100,
    },
  },

  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.7.3",
    },
  },
};
