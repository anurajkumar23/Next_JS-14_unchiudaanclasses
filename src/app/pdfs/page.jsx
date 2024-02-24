
import Pdfpage from "./components/Pdfpage";

export const metadata = {
  title: "Monthly PDFs / मासिक PDF",
  description:
    "Get Latest update Free/पैड PDFs of current Affairs",
    alternates:{
      canonical: `/pdfs`
    },
};

function Downloads() {
  return (
    <>
      <div className="mx-auto py-[7rem]">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center text-center">
            <span className="mr-2">All Current Affairs pdfs</span>
          </h1>
        </div>
        <Pdfpage />
      </div>
    </>
  );
}

export default Downloads;
