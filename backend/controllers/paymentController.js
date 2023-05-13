import { instance } from "../server.js";
import crypto from "crypto";
import { db } from "../firebase/config.js";
import { doc, setDoc } from "firebase/firestore";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  global.uid = req.body.uid;
  const order = await instance.orders.create(options);
  res.status(200).json({ success: true, order });
};

export const paymentverification = async (req, res) => {
  console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZR_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    //Database here
    const collRefid = "userDetails";
    const Paymentdetails = {
      isPayed: true,
      razorpay_payment_id:razorpay_payment_id,
      razorpay_order_id:razorpay_order_id,
      razorpay_signature:razorpay_signature,
    };
    await setDoc(doc(db, collRefid, global.uid), {
      Paymentdetails},{merge:true}
    );
    res.redirect("http://localhost:3000/account");
  } else {
    res.status(400).json({ success: false });
  }
};
