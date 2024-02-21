"use client";
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ResultData } from "./ResultData";
import logo from "../../../../public/uchiudan.png";
import html2canvas from "html2canvas/dist/html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { useGetUserQuery } from "../../redux/slices/userSlices";

export default function ResultPage() {
  const { data: userData} = useGetUserQuery();
  const { id } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [resultHeading, setResultHeading] = useState("");
  const [loader, SetLoader] = useState(false);

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

  const downloadPDF = () => {
    const capture = document.querySelector(".result-table");
    SetLoader(true);

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4", "true");
      const pdfWidth = pdf.internal.pageSize.getWidth(); // You can adjust the scaling factor as needed
      const pdfHeight = pdf.internal.pageSize.getHeight(); // You can adjust the scaling factor as needed
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      SetLoader(false);
      pdf.save("Results.pdf");
    });
  };

  function decodeHtmlEntities(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    // Remove HTML tags using a regular expression
    var plainText = txt.value.replace(/<[^>]*>/g, "");
    return plainText;
  }

  const decodedHeading = decodeHtmlEntities(resultHeading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.unchiudaanclasses.com/api/test/${id}`
        );
        const { name, result } = response.data.data.test;

        const sortedResults = [...result].sort((a, b) => {
          if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
          } else {
            // If percentages are the same, sort based on submittime
            return new Date(a.submittime) - new Date(b.submittime);
          }
        });
        const mappedResults = sortedResults.map((userResults, index) => {
          const {
            username,
            userphone,
            totalQuestions,
            correct,
            score,
            notattempt,
            submittime,
            negativemarks,
            district,
            percentage,
          } = userResults;

          const rank = index + 1;
          const incorrect = totalQuestions - correct - notattempt;
          const maskedPhoneNumber = userphone.replace(/.(?=.{4})/g, "X");

          return {
            username,
            userphone,
            totalQuestions,
            correct,
            score,
            notattempt,
            submittime,
            negativemarks,
            district,
            percentage,
            rank,
            incorrect,
            maskedPhoneNumber,
          };
        });
        setResultData(mappedResults);
        setFilteredResults(mappedResults);
        setResultHeading(name);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = resultData.filter(
      (userResults) =>
        userResults.username.toLowerCase().includes(lowerCaseQuery) ||
        userResults.district.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredResults(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-black-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="">Error: {error}</div>;
  }

  return (
    <div className="pt-[6rem] ">
      <div className="m-4 flex items-center">
        <input
          type="text"
          placeholder="Search by name or district"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2"
        />
        <button onClick={handleSearch} className="ml-2 bg-gray-300 p-2">
          Search
        </button>
      </div>
      <div className="text-center">
        {role ? (
          <button
            className="transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-md "
            onClick={downloadPDF}
            disabled={!(loader === false)}
          >
            {loader ? <span>Downloading</span> : <span>Download</span>}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="w-full px-[2%]  mb-[3rem]">
        <div className="overflow-x-auto ">
          <table className="result-table opacity-90 ">
          <thead className="">
              <tr className="bg-gray-300 text-center ">
                <td
                  className=" bg-gradient-to-r from-indigo-700 to-purple-700 mx-auto px-6 py-3 border-b border border-black text-white uppercase font-semibold"
                  colSpan="20"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Image
                      width={500}
                      height={500}
                      src={logo}
                      alt="unchiudaanclasses"
                      className="w-20 h-20"
                    />
                    <div>
                      <span className="flex justify-center text-3xl">
                        ऊँची उड़ान
                      </span>
                      <span className="lowercase">
                        www.unchiudaanclasses.com
                      </span>
                    </div>
                  </div>
                  <br />
                  <span className="font-bold">{decodedHeading} </span>
                </td>
              </tr>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 border-b border border-black">Rank</th>
                <th className="px-6 py-3 border-b border border-black">Name</th>
                <th className="px-6 py-3 border-b border border-black">
                  District
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Phone no
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Total Ques.
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Correct Ans.
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Wrong Ans.
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Not attempt
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Negative Marks
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Obtained Marks
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Percentage (%)
                </th>
                <th className="px-6 py-3 border-b border border-black">
                  Submit Time (seconds)
                </th>
              </tr>
            </thead>
            <tbody>
              <ResultData results={filteredResults} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}