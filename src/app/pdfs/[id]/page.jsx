/* eslint-disable react/prop-types */

import { FaDownload, FaFileAlt } from "react-icons/fa";
import Image from "next/image";
// import { SocialMedia } from "../../consstant/socialmedia";
// import PDFPatchForm from "../../components/Home/core/Auth/Admin/PDFPatchForm";
import getPdfId from "../../lib/getPdfId";
import he from "he";
// import PdfButton from "./PdfButton";
import PdfId from "./PdfId";

const decodeHtmlEntities = (html) => {
  return he.decode(html);
};

export async function generateMetadata({ params: {id}} ){
  const pdfDetails = await getPdfId(id);
  const decodeAndRemoveHtml = (html) => {
    // Decode HTML entities
    const decodedHtml = he.decode(html);
    // Remove HTML tags
    const plainText = decodedHtml.replace(/<[^>]*>?/gm, '');
    return plainText;
  };
  return{
    title: decodeAndRemoveHtml(pdfDetails.name),
    description: decodeAndRemoveHtml(pdfDetails.description),
  };
}


async function DownloadPage({ params: { id } }) {
  const pdfDetails = await getPdfId(id);
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
    <div className="mx-auto py-[3rem]">
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
              src={`https://api.unchiudaanclasses.com/img/pdf/${pdfDetails.photo}`}
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
                {/* <span className="leading-[5px]">
                  Last Updated: {formatUpdatedAtDate()}
                </span> */}
              </div>
            </div>
            <a href="#">
              <div className="mt-6 flex w-fit hover:bg-teal-500 px-3 py-1 justify-between space-x-3 text-lg mx-auto rounded-full bg-teal-300 text-white">
                <FaDownload className="w-6 h-6" />
                <button onClick="{handleDownload}">
                  {pdfDetails.status === "free" ? "Download" : "pay & Download"}
                </button>
              </div>
            </a>
          </div>
          {/* <SocialMedia /> */}
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
          {/* <SocialMedia /> */}
        </div>
      </div>
      <PdfId/>
    </div>
  );
}

export default DownloadPage;
