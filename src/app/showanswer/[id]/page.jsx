"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import logo from "../../../../public/uchiudan.png";
import Image from "next/image";
import html2canvas from "html2canvas/dist/html2canvas";
import jsPDF from "jspdf";
import { saveAs } from 'file-saver';

export default function ShowAnswer() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loader, SetLoader] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/${id}`
        );
        setTest(response.data.data.test); // Assuming the response is in JSON format and contains the question data
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  //   console.log(test, "😀😀😀😀😀😀");
  const decodeHtmlEntities = (html) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };

  const downloadAnswers = async () => {
    SetLoader(true);

    // Get the total height of the content
    const capture = document.querySelector(".Answer-table");
    const totalHeight = capture.scrollHeight;

    // Create a new instance of jsPDF
    const pdf = new jsPDF("p", "mm", "a4", "true");

    const pageHeight = 1170; // Height of A4 page in mm
    let yOffset = 0;
    let currentPage = 0;

    while (yOffset < totalHeight) {
        // Use html2canvas to capture the content of each page
        const canvas = await html2canvas(capture, {
            windowHeight: totalHeight,
            y: yOffset,
        });

        // Calculate the width and height for the image based on the aspect ratio
        const imgWidth = 204; // Width of A4 page in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Convert canvas to PNG image data URL with reduced quality
        const imgData = canvas.toDataURL('image/jpeg', 0.6); // Adjust quality as needed

        // Add a new page to the PDF
        if (currentPage > 0) {
            pdf.addPage();
        }

        // Add the image to the PDF with a margin at the bottom
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

        // Move to the next portion of the content
        yOffset += pageHeight;
        currentPage++;
    }

    // Save the PDF
    const pdfData = pdf.output('blob');
    saveAs(pdfData, 'Answers.pdf');

    SetLoader(false);
};


  return (
    <>
      <div className=" py-[6rem]">
        <div className="mt-10 text-center">
          <button
            className=" transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-md "
            onClick={downloadAnswers}
            disabled={!(loader === false)}
          >
            {loader ? <span>Downloading</span> : <span>Download</span>}
          </button>
        </div>
        <div className="Answer-table lg:mx-[18%] mx-[2%]  ">
          {test && (
            <div>
              <div className="mb-[1.5rem] bg-[#ebd7d7] h-[150px] ">
                <Image
                  width={150}
                  height={150}
                  src={logo}
                  alt="unchiudaan"
                  className="w-[150px] height-[150px]"
                />
              </div>
              <div className="  bg-white shadow-md pb-8 px-8 rounded-md">
                <div className="mb-[1.5rem] rounded-xl p-5 ">
                  <span
                    className="text-center font-semibold text-3xl"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtmlEntities(test.name),
                    }}
                  />
                  <hr className="mt-[15px] h-1 rounded-xl border-none bg-black font-bold" />
                </div>

                <ul>
                  {test.data.map((item, index) => (
                    <div key={index}>
                      <h2 className="text-xl font-semibold mb-4">
                        {item.ques}
                      </h2>

                      <ul>
                        {item.options.map((option, idx) => (
                          <li key={idx} className="mb-2">
                            <div
                              className={`mb-5 ${
                                idx === parseInt(item.ans) ? "bg-green-200" : ""
                              } p-[5px] pl-[25px] rounded-xl relative`}
                            >
                              <span className="mr-2 font-bold">
                                {String.fromCharCode(65 + idx)}.
                              </span>{" "}
                              {/* Option numbering A, B, C, D */}
                              {option}
                              {idx === parseInt(item.ans) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 absolute top-1/2 -translate-y-1/2 right-2 text-green-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
