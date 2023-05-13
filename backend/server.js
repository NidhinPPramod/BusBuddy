import {app} from "./app.js"
import Razorpay from "razorpay"

export const instance = new Razorpay({
    key_id: process.env.RZR_API_KEY,
    key_secret: process.env.RZR_SECRET,
  });

app.listen(process.env.PORT,()=>{
    console.log(`Server Running Successfully on ${process.env.PORT}`);
})