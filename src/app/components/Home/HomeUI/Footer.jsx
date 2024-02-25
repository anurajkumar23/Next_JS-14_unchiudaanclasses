import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp
} from "react-icons/fa";
import Link from "next/link";
function Footer() {
  return (
    <>
      <div className="mx-auto  ">
        <strong className="block text-center text-lg font-bold text-gray-900 sm:text-3xl ">
          सारे Updates पाने के लिए Subscribe करें
        </strong>
        <Link href="https://t.me/UnchiudaanClasses">
          <div className="mt-6 flex w-fit hover:bg-blue-700 px-3 py-1 justify-between space-x-3 text-lg mx-auto rounded-full bg-blue-500 text-white">
            <FaTelegramPlane className="w-7 h-7" />
            <span>Subscribe</span>
          </div>
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32 mx-[10%]">
        <div className="mx-auto max-w-sm lg:max-w-none">
          <p className="mt-4 text-justify text-gray-500 lg:text-left lg:text-lg ">
            Unchiudaan शिक्षा से संबंधित अनुभवी युवाओं की समर्पित टीम है जो
            Website और Telegram page के माध्यम से प्रतियोगी परीक्षाओं की तैयारी
            कर रहे विद्यार्थियों को समसामयिक विषयों पर आधारित महत्वपूर्ण Study
            Material उपलब्ध कराता है।
          </p>

          <div className="mt-6 flex justify-center gap-6 lg:justify-start">
            <Link className=" " href="https://www.facebook.com/groups/936910043329539/?ref=share" target="_blank" rel="noreferrer">
              <FaFacebook className="text-blue-500 w-7 h-7" />
            </Link>
            <Link className="" href="https://whatsapp.com/channel/0029Va4aeIXHgZWdVRD0GA0k" target="_blank" rel="noreferrer">
              <FaWhatsapp className="text-green-500 w-7 h-7" />
            </Link>

            <Link className=" " href="https://whatsapp.com/channel/0029Va4aeIXHgZWdVRD0GA0k" target="_blank" rel="noreferrer">
              <FaTwitter className="text-blue-400 w-7 h-7" />
            </Link>

            <Link className=" " href="https://whatsapp.com/channel/0029Va4aeIXHgZWdVRD0GA0k" target="_blank" rel="noreferrer">
              <FaInstagram className="text-pink-500 w-7 h-7" />
            </Link>

            <Link className=" " href="https://whatsapp.com/channel/0029Va4aeIXHgZWdVRD0GA0k" target="_blank" rel="noreferrer">
              <FaLinkedin className="text-blue-600 w-7 h-7" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
          <div>
            <strong className="font-medium text-gray-900"> Services </strong>

            <ul className="mt-6 space-y-1">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/currentaffairs"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Current Affairs
                </Link>
              </li>
              <li>
                <Link
                  href="/pdfs"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  PDFs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <strong className="font-medium text-gray-900"> About </strong>

            <ul className="mt-6 space-y-1">
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/AboutUs"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/terms_conditions"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/disclaimer"
                >
                  Disclaimer
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/privacypolicy"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <strong className="font-medium text-gray-900"> Support </strong>

            <ul className="mt-6 space-y-1">
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/faqs"
                >
                  FAQs
                </a>
              </li>
              <li>
                <Link
                  href="/DevTeam"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Website Creating Team
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-gray-100 pt-8 text-center">
        <p className=" text-lg text-black">
          © <span className="font-[500]">ऊँची उड़ान</span> 2023. All rights
          reserved.
        </p>
        <p>
          Designed & Developed by {""}
          <Link href="/DevTeam" className="text-blue-500">
            Meow Coders
          </Link>
        </p>
      </div>
    </>
  );
}

export default Footer;
