// src/routes/wallet.routes.js
const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

router.post("/create", walletController.createWallet);
router.get("/user/:userId", walletController.getUserWallet);

module.exports = router;
