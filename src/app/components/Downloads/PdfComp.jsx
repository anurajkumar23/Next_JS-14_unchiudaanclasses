import { FaFileAlt } from "react-icons/fa";
import Link from "next/link";
// eslint-disable-next-line react/prop-types
function PdfComp({ title, date, id }) {
    const decodeHtmlEntities = (html) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };
  return (
    <Link href={`/pdfs/${id}`}>
      <div className="w-18 flex justify-between p-4 border border-2 rounded-lg">
        <div>
          <FaFileAlt className="w-12 h-12" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-md truncate overflow-hidden w-[7rem]">
          <span
            dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(title) }}
          />
          </h1>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
}

export default PdfComp;
