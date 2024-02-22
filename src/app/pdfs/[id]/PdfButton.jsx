"use client";
import React, { useEffect, useState } from "react";

import { useGetUserQuery } from "../../redux/slices/userSlices";
import { useParams } from "next/navigation";

function PdfButton({pdfDetails}) {
  const { id } = useParams();
  
  // const [pdfDetails, setPdfDetails] = useState(null);
  const { data: userData } = useGetUserQuery();
  console.log(id,"🎉🎉🎉🎉🎉")

  const handleDownload = async () => {
    if (!userData) {
      localStorage.setItem("redirectUrl", window.location.href);
      window.location.href = "/login";
      return;
    }
    const alreadybuy = userData.pdfs.includes(pdfDetails._id);

    if (pdfDetails.status === "free" || alreadybuy) {
      const downloadLink = `https://api.unchiudaanclasses.com/api/pdfs/download-pdf/${id}`;

      const anchor = document.createElement("a");
      anchor.href = downloadLink;
      anchor.download = "Unchi_Uddan.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      try {
        const res = await axios.post(
          `https://api.unchiudaanclasses.com/api/payment/createOrderId`,
          {
            name: userData.firstname,
            email: userData.email,
            phone: userData.phone,
            amount: pdfDetails.price,
            pdfid: pdfDetails._id,
          }
        );

        // eslint-disable-next-line no-undef
        const cashfree = Cashfree({ mode: "sandbox" });

        cashfree
          .checkout({
            paymentSessionId: res.data.paymentSessionId,
            returnUrl: `https://api.unchiudaanclasses.com/api/payment/NRRTWSD/unchiudan/pdf/${userData._id}/${id}`,
            // returnUrl: `https://www.youtube.com/`,
            // redirectTarget: "_blank",
          })
          .then(() => {
            console.log("on-going redirection");
          })
          .catch((error) => {
            console.error("Checkout error:", error);
          });
      } catch (error) {
        console.error("Checkout error:", error);
      }
    }
  };
  return (
    <div>
      <button onClick={handleDownload}>
        {pdfDetails.status === "free" ? "Download" : "pay & Download"}
      </button>
    </div>
  );
}

export default PdfButton;
