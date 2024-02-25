"use client";
import React from "react";

import axios from "axios";

import { useGetUserQuery } from "../../redux/slices/userSlices";
import he from "he";
import { FaDownload, FaFileAlt } from "react-icons/fa";
import Image from "next/image";
import PDFPatchForm from "./PDFPatchForm";
import { useParams, usePathname } from "next/navigation";
import { SocialMedia } from "../../components/Socialmedia/socialmedia";

const PdfId = ({ pdfDetails }) => {
  const { data: userData } = useGetUserQuery();
  const { id } = useParams();


  const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
const pageUrl = `${origin}`;
const pageFullUrl = pageUrl + usePathname();

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
      const downloadLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs/download-pdf/${id}`;

      const anchor = document.createElement("a");
      anchor.href = downloadLink;
      anchor.download = "Unchi_Uddan.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/createOrderId`,
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
            returnUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/NRRTWSD/unchiudan/pdf/${userData._id}/${id}`,
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
    return he.decode(html);
  };

  if (!pdfDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-3 p-4 overflow-y-auto">
          <h1 className="mt-10 text-[1.3rem] font-[550] text-center">
            Monthly Current Affairs PDF Download{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: decodeHtmlEntities(pdfDetails.name),
              }}
            />
          </h1>
          <div className="mx-6 my-12">
            <Image
              width={500}
              height={500}
              alt="meow"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/img/pdf/${pdfDetails.photo}`}
              className="w-full mx-auto rounded-lg"
            />
          </div>

          <div className="w-18 md:mx-12 p-4 border-2 mx-4 rounded-lg mt-16">
            <div className="flex justify-between space-x-3 h-[150px] md:h-[80px]">
              <FaFileAlt className="w-12 h-12" />
              <div className="text-center text-lg leading-[47px]">
                <span
                  dangerouslySetInnerHTML={{
                    __html: decodeHtmlEntities(pdfDetails.name),
                  }}
                />
                <span className="leading-[5px]">
                  Last Updated: {formatUpdatedAtDate()}
                </span>
              </div>
            </div>
            <a href="#">
              <div className="mt-6 flex w-fit hover:bg-teal-500 px-3 py-1 justify-between space-x-3 text-lg mx-auto rounded-full bg-teal-300 text-white">
                <FaDownload className="w-6 h-6" />
                <button onClick={handleDownload}>
                  {pdfDetails.status === "free" ? "Download" : "pay & Download"}
                </button>
              </div>
            </a>
          </div>
          <SocialMedia url={pageFullUrl}/>
          <h1 className="text-center font-bold text-[2rem] md:text-[2.5rem] mb-6">
            {pdfDetails.category} PDF download <br />
          </h1>
          <p className="mt-4 text-justify text-lg">
            <span
              dangerouslySetInnerHTML={{
                __html: decodeHtmlEntities(pdfDetails.description),
              }}
            />
          </p>
          <SocialMedia url={pageFullUrl}/>
        </div>
      </div>
      {role ? <PDFPatchForm details={pdfDetails} /> : ""}
    </div>
  );
};

export default PdfId;
