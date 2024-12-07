const { Coinbase, ServerSigner, Wallet } = require("@coinbase/coinbase-sdk");
const PREDICTION_MARKET_ABI = require("../contracts/PredictionMarket.abi");
const Market = require("../models/market.model");

class CoinbaseService {
  constructor() {
    this.initialize();
  }

  async createPredictionMarket(
    walletId,
    contractAddress,
    title,
    description,
    resolutionDate,
    oracle
  ) {
    try {
      const wallet = await Wallet.create({
        networkId: Coinbase.networks.BaseSepolia,
        id: walletId,
      });

      const contractInvocation = await wallet.invokeContract({
        contractAddress,
        method: "createMarket",
        args: {
          _title: title,
          _description: description,
          _resolutionDate: Math.floor(
            new Date(resolutionDate).getTime() / 1000
          ),
          _oracle: oracle,
        },
        abi: PREDICTION_MARKET_ABI,
      });

      // Wait for transaction confirmation
      await contractInvocation.wait();

      // Get market count to determine the new market ID
      const marketCount = await this.readContract(
        contractAddress,
        "marketCount",
        {},
        PREDICTION_MARKET_ABI
      );

      // Create market in database
      const market = new Market({
        marketId: Number(marketCount) - 1, // Subtract 1 since count is incremented after creation
        title,
        description,
        resolutionDate: new Date(resolutionDate),
        oracle,
        creator: wallet.addresses[0].id,
        contractAddress,
      });

      await market.save();

      return {
        transactionHash: contractInvocation.hash,
        market: market,
      };
    } catch (error) {
      console.error("Failed to create prediction market:", error);
      throw error;
    }
  }

  async getMarketInfo(contractAddress, marketId) {
    try {
      const result = await this.readContract(
        contractAddress,
        "getMarketInfo",
        { _marketId: marketId },
        PREDICTION_MARKET_ABI
      );

      return {
        totalPool: result.totalPool.toString(),
        yesPool: result.yesPool.toString(),
        noPool: result.noPool.toString(),
        timeRemaining: result.timeRemaining.toString(),
      };
    } catch (error) {
      console.error("Failed to get market info:", error);
      throw error;
    }
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
