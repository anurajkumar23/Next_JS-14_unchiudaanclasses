/* eslint-disable react/prop-types */
import Link from "next/link";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import Image from "next/image";

function BlogComp({ date, title, id, category, updatedDate , set_no }) {
  const decodeHtmlEntities = (html) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };
  return (
    <Link href={`/currentaffairs/${id}`}>
      <div className="border border-2 bg-white p-4 rounded-xl shadow-lg transition duration-500 ">
        <div className="card__header">
          <div className="card__picture">
            <div className="card__picture-overlay">&nbsp;</div>
            <div className="relative">
              <Image
               width={500}
               height={500}
                className="w-full rounded-xl"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/img/affairs/uchiudan.png`}
                alt="Blog Cover"
              />
              <p className="absolute top-0 bg-[#ffef39] text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
              Set No: {set_no}
              </p>
            </div>
          </div>
          <h3 className="heading-tertirary ">
            <span>{category}</span>
          </h3>
        </div>

        <h1 className="mt-4 text-gray-800 text-lg font-bold cursor-pointer overflow-hidden mb-[1rem] truncate h-[30px]">
          <span
            dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(title) }}
          />
        
        </h1>

        <div className="card__data flex mb-[1rem]">
          <h1 className=" text-gray-800 text-lg font-bold cursor-pointer overflow-hidden">
            <p>
              <MdOutlineAccessTimeFilled className="card__icon" />
            </p>
          </h1>
          <p className="text-xl">updated at: {updatedDate}</p>
        </div>

        <Link
          href={`/currentaffairs/${id}`}
          className="mt-4 text-md hover:bg-indigo-600 w-full text-white bg-indigo-400 py-1 px-3 rounded-xl hover:shadow-xl"
        >
          Read More
        </Link>
      </div>
    </Link>
  );
}

export default BlogComp;
