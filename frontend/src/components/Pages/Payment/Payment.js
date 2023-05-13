import React, { useEffect, useState } from "react";
import { AspectRatio, Image } from "@chakra-ui/react";
import upiqr from "upiqr";

function Payment() {
  const [qrImage, setQrImage] = useState("");

  useEffect(()=>{
    generateQr()

    return ()=>{
      setQrImage("")
    }
  },[])

  const generateQr = async () => {
    try {
      const timestamp = new Date().getTime().toString().substring(0, 12);
      const qr = await upiqr({
        payeeVPA: "mrpattupetty@paytm",
        payeeName: "NIDHIN P PRAMOD",
        amount: "5",
        transactionId: timestamp,
        transactionRef: timestamp,
      });
      setQrImage(qr.qr)
      console.log(timestamp);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <AspectRatio width="175px" height="175px" ratio={4 / 3}>
        <Image
          src={qrImage}
          alt="upi"
          objectFit="cover"
        />
      </AspectRatio>
    </div>
  );
}

export default Payment;
