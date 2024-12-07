// src/services/coinbase.service.js
const { Coinbase, ServerSigner, Wallet } = require("@coinbase/coinbase-sdk");
// require('dotenv').config({ path: '../../.env' });
class CoinbaseService { 
  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      // Initialize CDP SDK
      Coinbase.configureFromJson({
        filePath: process.env.CDP_API_KEY_PATH,
      });

      // Enable Server-Signer
      Coinbase.useServerSigner = true;

      // Verify Server-Signer
      await this.verifyServerSigner();
    } catch (error) {
      console.error("Coinbase SDK initialization failed:", error);
      throw error;
    }
  }

  async verifyServerSigner() {
    try {
      const serverSigner = await ServerSigner.getDefault();
      if (!serverSigner) {
        throw new Error("Server-Signer not found");
      }
      this.serverSigner = serverSigner;
      return serverSigner;
    } catch (error) {
      console.error("Server-Signer verification failed:", error);
      throw error;
    }
  }

  async createWallet() {
    try {
      const wallet = await Wallet.create({
        networkId: Coinbase.networks.BaseSepolia,
      });
      return wallet;
    } catch (error) {
      console.error("Wallet creation failed:", error);
      throw error;
    }
  }

  async signTransaction(wallet, transaction) {
    try {
      return await wallet.sign(transaction);
    } catch (error) {
      console.error("Transaction signing failed:", error);
      throw error;
    }
  }
}

module.exports = CoinbaseService;
