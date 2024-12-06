// src/controllers/wallet.controller.js
const CoinbaseService = require("../services/coinbase.service");
const Wallet = require("../models/wallet.model");

const coinbaseService = new CoinbaseService();

exports.createWallet = async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from request

    // Check if user already has a wallet
    const existingWallet = await Wallet.findOne({ userId });
    if (existingWallet) {
      return res.status(200).json({
        success: true,
        data: existingWallet,
        message: "Existing wallet found",
      });
    }

    // Create new wallet if none exists
    console.log("Creating CDP wallet...");
    const cdpWallet = await coinbaseService.createWallet();
    console.log("CDP wallet created:", cdpWallet);

    const wallet = await Wallet.create({
      userId: userId,
      address: cdpWallet.addresses[0].id,
      networkId: cdpWallet.model.network_id,
      walletId: cdpWallet.model.id,
    });

    console.log("Wallet saved to DB:", wallet);

    res.status(201).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// Add a new endpoint to get user's wallet
exports.getUserWallet = async (req, res) => {
  try {
    const { userId } = req.params;

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: "No wallet found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.signTransaction = async (req, res) => {
  try {
    const { walletAddress, transaction } = req.body;

    // Verify wallet exists
    const wallet = await Wallet.findOne({ address: walletAddress });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: "Wallet not found",
      });
    }

    // Sign transaction
    const signedTransaction = await coinbaseService.signTransaction(
      wallet,
      transaction
    );

    res.status(200).json({
      success: true,
      data: signedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
