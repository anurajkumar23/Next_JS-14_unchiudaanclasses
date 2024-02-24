/* eslint-disable react/prop-types */


// import { SocialMedia } from "../../consstant/socialmedia";
// import PDFPatchForm from "../../components/Home/core/Auth/Admin/PDFPatchForm";
import getPdfId from "../../lib/getPdfId";
import he from "he";
// import PdfButton from "./PdfButton";
import PdfId from "./PdfId";



export async function generateMetadata({ params: { id } }) {
  const pdfDetails = await getPdfId(id);
  const decodeAndRemoveHtml = (html) => {
    // Decode HTML entities
    const decodedHtml = he.decode(html);
    // Remove HTML tags
    const plainText = decodedHtml.replace(/<[^>]*>?/gm, "");
    return plainText;
  };
  return {
    title: decodeAndRemoveHtml(pdfDetails.name),
    description: decodeAndRemoveHtml(pdfDetails.description),
    alternates:{
        canonical: `/pdfs/${id}`
      },
      openGraph: {
        images: `${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/img/pdf/${pdfDetails.photo}`,
        width: 900,
        height: 450,
      },
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
      <PdfId pdfDetails={pdfDetails} />
    </div>
  );
}

export default DownloadPage;
