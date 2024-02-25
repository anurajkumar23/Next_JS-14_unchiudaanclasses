"use client";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa6";
import { toast } from "react-hot-toast";

export const SocialMedia = ({ url }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Copied successfully!");
  };

  return (
    <div className="flex justify-between mt-6 ">
      <span className="text-center text-md  ">Share with Friends :</span>
      <span className="flex text-gray-400 justify-center space-x-4">
        <a
          className=""
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook className="text-blue-500 w-7 h-7" />
        </a>

        <a
          className=""
          href={`https://twitter.com/intent/tweet?url=${url}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter className="text-blue-400 w-7 h-7" />
        </a>

        <a
          className=""
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="text-blue-600 w-7 h-7" />
        </a>

        <a
          className=""
          href={`https://api.whatsapp.com/send?text=${url}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp className="text-green-500 w-7 h-7" />
        </a>

        <a
          className=""
          href={`https://t.me/share/url?url=${url}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaTelegram className="text-blue-400 w-7 h-7" />
        </a>
        <span onClick={handleCopy}>
          <FaPaperclip className="text-blue-400 w-7 h-7 " />
        </span>
      </span>
    </div>
  );
};
