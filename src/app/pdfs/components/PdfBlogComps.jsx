import axios from "axios";
import Link from "next/link";
import { MdOutlineAccessTimeFilled, MdOutlineDelete } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

function BlogComps({
    date,
    title,
    updatedDate,
    id,
    status,
    category,
    userData,
    price,
    onDeleteSuccess,
  }) {
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
  
    const handleDeleteClick = async (event) => {
      event.preventDefault();
      event.stopPropagation();
  
      if (window.confirm("Are you sure you want to delete this item?")) {
        const token = localStorage.getItem("jwt_token");
        let loadingToast;
        try {
          loadingToast = toast.loading("Deleting PDF...");
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
  
          if (response.status === 200) {
            toast.dismiss(loadingToast);
            toast.success("Item deleted successfully");
            onDeleteSuccess();
          } else {
            toast.dismiss(loadingToast);
            console.error("Error deleting item:", response);
            toast.error("Error in deleting item");
          }
        } catch (error) {
          toast.dismiss(loadingToast);
          console.error("Error deleting item:", error);
          toast.error("Error in deleting item");
        }
      }
    };
  
    const decodeHtmlEntities = (html) => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = html;
      return textarea.value;
    };
  
    return (
      <div className="border border-2 bg-white p-4 rounded-xl shadow-lg transition duration-500 relative">
        {role ? (
          <button
            className="absolute top-0 right-0 text-red-600 cursor-pointer bg-red-500 rounded-full p-2"
            style={{ zIndex: 1 }}
            onClick={handleDeleteClick}
          >
            <MdOutlineDelete size={32} color="#fff" />
          </button>
        ) : (
          ""
        )}
        <Link href={`/pdfs/${id}`} className="w-full h-full">
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
                  {date}
                </p>
              </div>
            </div>
            <h3 className="heading-tertirary">
              <span>{category}</span>
            </h3>
          </div>
          <h1 className="mt-4 text-gray-800 text-lg font-bold cursor-pointer overflow-hidden mb-[1rem] truncate h-[30px]">
            <span
              dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(title) }}
            />
          </h1>
          <div className="flex justify-between mb-[15px] ">
            <h1 className="mt-4 text-gray-800 text-lg font-bold cursor-pointer">
              status: {status}
            </h1>
            {status === "free" ? (
              ""
            ) : (
              <h1 className="mt-4 text-gray-800 text-lg font-bold cursor-pointer ">
                price: {`₹ ${price}`}
              </h1>
            )}
          </div>
          <div className="card__data">
            <h1 className="text-gray-800 text-lg font-bold cursor-pointer overflow-hidden">
              <MdOutlineAccessTimeFilled className="card__icon" />
            </h1>
            <p className="text-lg">updated at: {updatedDate}</p>
          </div>
          <div className="my-2 mx-6 flex justify-between"></div>
          <button className="mt-4 text-md hover-bg-indigo-600 w-full text-white bg-indigo-400 py-1 px-3 rounded-xl hover:shadow-xl">
            Read More
          </button>
        </Link>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }

  export default BlogComps;