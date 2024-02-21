"use client"
import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useGetUserQuery } from "../../redux/slices/userSlices";

const PdfId = () => {
  const { data: userData} = useGetUserQuery();
  const { id } = useParams();
  const [pdfDetails, setPdfDetails] = useState(null);

  let role;

  if (userData) {
    if (userData.role === "admin") {
      role = true;
    } else {
      role = false;
    }
  } else {
    role = false;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.unchiudaanclasses.com/api/pdfs/${id}`
        );
        setPdfDetails(response.data.data.pdf);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  

  const formatUpdatedAtDate = () => {
    const updatedAtDate = new Date(pdfDetails.updatedAt);
    const day = updatedAtDate.getDate();
    const month = updatedAtDate.toLocaleString("default", { month: "long" });
    const year = updatedAtDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

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
  const decodeHtmlEntities = (html) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };
  
  return (
    <div>
      {/* {role ? <PDFPatchForm details={pdfDetails} /> : ""} */}
    </div>
  )
}

export default PdfId
