"use client";
import PdfComp from "./PdfComp";
import Link from "next/link";
import { useGetLastestPDFQuery } from "../../redux/slices/pdfApi";

export default function HomePdf() {
  const { data: pdfs, error, isLoading } = useGetLastestPDFQuery();
  console.log("🚀 ~ HomePdf ~ pdfs:", pdfs);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pdfs) {
    return <div>No data available</div>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-center text-[1.5rem] md:text-[2rem] mb-4 ">
        Download Monthly PDF
      </h1>
      <p className="text-justify text-md mb-16 md:mx-[6rem]">
        Current Affairs for BPSC, UPPSC, MPPSC, JPSC, BSSC, RPSC, SSC, और अन्य
        Competitive और Government Job Examinations के लिए पूरे महीने में अपडेट
        किये गए प्रश्नों के PDF आपको मासिक तौर पर प्राप्त होगा।
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-[58px]">
        {pdfs.map((pdf) => {
          const createdAt = new Date(pdf.createdAt);
          const formattedDate = createdAt.toLocaleString("default", {
            day: "numeric",
            month: "long",
          });

          return (
            <PdfComp
              key={pdf._id}
              date={formattedDate}
              title={pdf.name}
              imageSrc={pdf.photo}
              id={pdf._id}
            />
          );
        })}
      </div>
      <Link href="/pdfs">
        <div className="text-center hover:bg-purple-700 mt-6 text-xl mx-auto  font-semibold w-fit  px-5 py-1 bg-purple-500 text-white rounded-xl hover:shadow-xl ">
          View More
        </div>
      </Link>
    </div>
  );
}
