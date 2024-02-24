"use client"
import Link from "next/link";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";


function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  let hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  let amOrPm = "AM";
  if (hour >= 12) {
    amOrPm = "PM";
    hour -= 12;
  }
  if (hour === 0) {
    hour = 12;
  }

  return `${day} - ${month} - ${year} ${hour}:${minute}:${second} ${amOrPm}`;
}

function testComp({ testsItems,userData, onTestsDelete }) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [block, setBlock] = useState(false);

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

  const isWithin48Hours = (createdAt) => {
    const now = new Date();
    const newsDate = new Date(createdAt);
    const timeDifference = now - newsDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    return hoursDifference <= 48;
  };

  const handleDeleteClick = async (event, testsId) => {
    event.preventDefault();
    event.stopPropagation();

    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = localStorage.getItem("jwt_token");
      let loadingToast;
      try {
        loadingToast = toast.loading("Deleting Test..."); // Display loading toast
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/${testsId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          toast.dismiss(loadingToast);
          // Perform any additional actions you need here
          // console.log("Tests item deleted successfully");
          toast.success("Tests item deleted successfully");
          if (typeof onTestsDelete === "function") {
            onTestsDelete();
          }
        } else {
          toast.dismiss(loadingToast);
          console.error("Error deleting Tests item:", response);
          toast.error("Error deleting Tests item");
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        console.error("Error deleting Tests item:", error);
        toast.error("Error deleting Tests item");
      }
    }
  };
  const decodeHtmlEntities = (html) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };

    function formatDateFromTimestamp(timestamp) {
        // Create a new Date object using the provided timestamp
        var currentDate = new Date(timestamp);
    
        // Get the day, month, and year components from the Date object
        var day = currentDate.getDate();
        var month = currentDate.toLocaleString('default', { month: 'short' }); // Get the month name in short format
        var year = currentDate.getFullYear();
    
        // Concatenate the components into the desired format
        var formattedDate = day + ' ' + month + ' ' + year;
    
        // Return the formatted date
        return formattedDate;
    }

  return (
    <div className="flex flex-col items-center justify-center">
      {testsItems.length === 0 ? (
        <p className="text-center text-gray-500">No news items available.</p>
      ) : (
        testsItems.map((test) => {
          const createdAt = new Date(test.createdAt);
          const formattedDate = createdAt.toLocaleString("default", {
            day: "numeric",
            month: "long",
          });

          const isRecent = isWithin48Hours(test.createdAt);

          const decodedName = decodeHtmlEntities(test.name);

          const starttime = formatTimestamp(test.mainstart);
          const endtime = formatTimestamp(test.mainend);

          const oneMinuteAfterEnd = test.mainend + 60000; // One minute after end

          const showResultButton =
            Date.now() >= oneMinuteAfterEnd ? (
              <Link href={`/result/${test._id}`}>
                <button className="mt-4 text-md w-full text-white bg-indigo-400 py-1 px-3 rounded-xl">
                  Show Result
                </button>
              </Link>
            ) : null;

          return (
            <div
              key={test._id}
              className="block w-full md:w-[80%] lg:w-[100%] xl:w-[100%] mb-8"
            >
              <div className="relative flex flex-col md:flex-row md:space-x-5 my-6 md:space-y-0 rounded-xl shadow-lg max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                {role ? (
                  <button
                    className="absolute top-0 right-0 text-red-600 cursor-pointer bg-red-500 rounded-full p-2"
                    style={{ zIndex: 1 }}
                    onClick={(event) => handleDeleteClick(event, test._id)}
                  >
                    <MdOutlineDelete size={32} color="#fff" />
                  </button>
                ) : (
                  ""
                )}
                <div className="w-full md:w-1/3 bg-white">
                  <Image
                  width={500}
                  height={500}
                    className="w-full h-[200px] object-cover rounded-xl"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/img/usertest/${
                      test.photo
                    }`}
                    alt={`logo`}
                  />
                </div>
                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                  <div className="flex justify-between items-center">
                    <div className="bg-gray-200 px-3 py-1 rounded-full text-xs flex font-medium text-gray-800 space-x-3">
                      {formattedDate}
                      {isRecent && (
                        <div className="bg-green-400 text-white text-xs px-2 rounded-full ml-[20px]">
                          New
                        </div>
                      )}
                    </div>
                  </div>
                  <h3
                    className="font-black text-gray-800 md:text-2xl text-xl "
                    dangerouslySetInnerHTML={{ __html: decodedName }}
                  />
                  <p className=" text-gray-800 md:text-base text-[20px]">
                    <strong>Start At:</strong> {starttime}
                  </p>
                  <p className=" text-gray-800 md:text-base text-[20px]">
                    <strong>End At:</strong> {endtime}
                  </p>
                  <strong>
                    *Result will declare after one minutes Test End{" "}
                  </strong>
                  <Link
                    href={userData ? `/test/${test._id}` : "/login"}
                    onClick={() => {
                      function stripHtmlTags(html) {
                        // Create a new div element
                        var doc = new DOMParser().parseFromString(html, 'text/html');
                        var text = doc.body.textContent || "";
                    
                        // Return the text content without HTML tags
                        return text;
                    }
                    const textContent = stripHtmlTags(decodedName);
                    const time = formatDateFromTimestamp(test.mainstart)

                      localStorage.setItem("testname", textContent);
                      localStorage.setItem("testdate", time);
                      
                    }}
                  >
                    <button
                      disabled={
                        block ||
                        Date.now() >= test.mainend ||
                        Date.now() < test.mainstart
                      }
                      className={`mt-4 text-md w-full text-white bg-indigo-400 py-1 px-3 rounded-xl`}
                    >
                      {block || Date.now() >= test.mainend
                        ? "Test Ended"
                        : Date.now() < test.mainstart
                        ? "Test Not Started"
                        : "Start Test"}
                    </button>
                  </Link>
                  {showResultButton}
                  {role ? (
                    <Link href={`/showanswer/${test._id}`}>
                      <button className="mt-4 text-md w-full text-white bg-indigo-400 py-1 px-3 rounded-xl">
                        Show Answer
                      </button>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default testComp;
