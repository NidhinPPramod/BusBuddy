import express from "express"
import { checkout,paymentverification } from "../controllers/paymentController.js";

const router=express.Router()

router.route("/checkout",checkout).post(checkout)
router.route("/paymentverification",paymentverification).post(paymentverification)

export default router;