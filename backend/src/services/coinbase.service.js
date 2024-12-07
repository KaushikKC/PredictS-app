const { Coinbase, ServerSigner, Wallet } = require("@coinbase/coinbase-sdk");

class CoinbaseService {
  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      Coinbase.configureFromJson({
        filePath: process.env.CDP_API_KEY_PATH,
      });
      Coinbase.useServerSigner = true;
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

  async getWalletBalance(walletId) {
    try {
      // Create a new CDP wallet instance using the stored walletId
      const cdpWallet = await Wallet.create({
        networkId: Coinbase.networks.BaseSepolia,
        id: walletId,
      });

      // Get the balance using the CDP wallet instance
      const balance = await cdpWallet.getBalance(Coinbase.assets.Eth);
      const usdcBalance = await cdpWallet.getBalance(Coinbase.assets.Usdc);

      return {
        address: cdpWallet.addresses[0].id,
        balances: {
          ETH: balance,
          USDC: usdcBalance,
        },
      };
    } catch (error) {
      console.error("Failed to get wallet balance:", error);
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
