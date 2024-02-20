/* eslint-disable react/prop-types */


// import PatchAffairsForm from "../Home/core/Auth/Admin/AffairsPatchForm";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import getCurrentAffairs from "../../lib/getCurrentAffairs"
import Image from "next/image";

import CurrentaffairsId from "./CurrentaffairsId";
// import { SocialMedia } from "../../consstant/socialmedia";


export async function generateMetadata({ params: {id}} ){
  const affairDetails = await getCurrentAffairs(id)
  const removeHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  return{
    title: removeHtmlTags(affairDetails.topic),
    description: removeHtmlTags(affairDetails.description),
  };
}


async function BlogsPage({params: {id}}) {
 const affairDetails = await getCurrentAffairs(id)
 return (
    <>
      <div className=" py-[1rem] lg:py-[4rem]">
        <div className=" mx-4 ">
          <h1 className="mt-10 text-[1.3rem] font-[550] text-center">
            <span
              dangerouslySetInnerHTML={{
                __html: (affairDetails.topic),
              }}
            />
          </h1>
          <div className="md:mx-12 my-5">
            <Image
              width={500}
              height={500}
              alt={`${affairDetails.photo}`}
              src={`https://api.unchiudaanclasses.com/img/affairs/${affairDetails.photo}`}
              className="w-full mx-auto rounded-lg"
            />
          </div>
          {/* <SocialMedia /> */}

          <h1 className="text-center font-bold text-[2rem] md:text-[2.5rem] mb-6 ">
            Current Affairs {affairDetails.category}
          </h1>
          <p className="mt-4 text-justify text-lg">
            <span
              dangerouslySetInnerHTML={{
                __html: (affairDetails.description),
              }}
            />
          </p>
          <CurrentaffairsId/>
        </div>
      </div>
      <div className="flex justify-between mt-10 ">
        <span className="text-center text-md ">Share with Friends :</span>
        <span className="flex text-gray-400 justify-center space-x-4">
          <a className=" " href="" target="_blank" rel="noreferrer">
            <FaFacebook className="text-blue-500 w-7 h-7" />
          </a>

          <a className=" " href="" target="_blank" rel="noreferrer">
            <FaTwitter className="text-blue-400 w-7 h-7" />
          </a>

          <a className=" " href="" target="_blank" rel="noreferrer">
            <FaInstagram className="text-pink-500 w-7 h-7" />
          </a>

          <a className=" " href="" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-blue-600 w-7 h-7" />
          </a>
          <a className=" " href="" target="_blank" rel="noreferrer">
            <FaWhatsapp className="text-green-500 w-7 h-7" />
          </a>
        </span>
      </div>
     
    </>
  );
}

export default BlogsPage;
