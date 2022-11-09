import express from "express";
import {
  getAccountStatus,
  getAccountBalance,
  stripeSessionId,
  createConnectAccount,
  stripeSuccess
} from "../controllers/stripe";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);
router.post("/stripe-session-id", requireSignin, stripeSessionId);
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;
