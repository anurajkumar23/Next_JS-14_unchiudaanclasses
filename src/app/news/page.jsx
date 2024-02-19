"use client"
/* eslint-disable react/prop-types */
import NewsComp from "./components/NewsComp";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Helmet } from "react-helmet-async";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

function News({ userData }) {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const canonicalUrl = window.location.href;
  const handleNewsDelete = () => {
    fetchData(currentPage); // Trigger a re-fetch of data after deletion
  };
  const fetchData = (page) => {
    let apiUrl = `https://api.unchiudaanclasses.com/api/news?&page=${page}&limit=${postsPerPage}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const { totallength } = response.data;

        setNews(response.data.data.news);
        setTotalPages(Math.ceil(parseInt(totallength) / postsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, postsPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePostsPerPageChange = (value) => {
    setPostsPerPage(value);
    setCurrentPage(1); // Reset page number to 1 when limit changes
  };
  return (
    <div className="mx-[10%] pt-[6rem] ">
      {/* <Helmet>
        <title>News / Blog</title>

        <meta
          name="description"
          content="Current Affairs for UPSC, BPSC,बिहार दारोगा,SI,BSSC,Railway,JSSC, SSC, BANKING, Defence,और अन्य Government Job Examinations के लिए ऊँची उड़ान वेबसाइट को join करें।"
          data-rh="true"
        />
        <meta
          name="keywords"
          content="unchi udan classes, unchiudaanclasses, uchiudaan classes,uchiudan,Unchiudaan classes,ऊँची उड़ान classes,
  Daily Current Affairs,Unchiudaan Current Affairs, Current Affairs for UPSC, BPSC,बिहार दारोगा,SI,BSSC,Railway,JSSC, SSC, BANKING, Defence,और अन्य Government Job Examinations"
          data-rh="true"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Unchiudaan - News / Blog" />
        <meta
          property="og:description"
          content="Current Affairs for UPSC, BPSC,बिहार दारोगा,SI,BSSC,Railway,JSSC, SSC, BANKING, Defence,और अन्य Government Job Examinations के लिए ऊँची उड़ान वेबसाइट को join करें।"
        />
        <meta
          property="og:image"
          content="https://unchiudaanclasses.com/uchiudan.png"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Unchiudaan - News / Blog" />
        <meta
          name="twitter:description"
          content="Current Affairs for UPSC, BPSC,बिहार दारोगा,SI,BSSC,Railway,JSSC, SSC, BANKING, Defence,और अन्य Government Job Examinations के लिए ऊँची उड़ान वेबसाइट को join करें।"
        />
        <meta
          name="twitter:image"
          content="https://unchiudaanclasses.com/uchiudan.png"
        />

        <meta name="author" content="Anuraj kumar, ishu singh, @ImKKingshuk" />
      </Helmet> */}

      <div className="container mx-auto px-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center text-center">
          <span className="mr-2">Daily News</span>
          <span className="text-green-500 text-lg lg:text-xl">
            नवीनतम घटनाओं के साथ अपडेट रहें
          </span>
        </h1>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md"
            onClick={() =>
              scroll.scrollTo(window.innerHeight, { smooth: true, offset: -50 })
            }
          >
            View All News ↓
          </button>
        </div>
      </div>

      <div className="">
        <NewsComp
          newsItems={news}
          userData={userData}
          onNewsDelete={handleNewsDelete}
        />
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`
            px-4 py-2 mx-2 rounded-full
            ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }
          `}
        >
          <i className="fas fa-chevron-left mr-2"></i> Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`
            px-4 py-2 mx-2 rounded-full
            ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }
          `}
        >
          Next <i className="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
      <div className="text-center text-gray-500">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex justify-center mt-4">
        <div className="mr-2">Show:</div>
        <select
          value={postsPerPage}
          onChange={(e) => handlePostsPerPageChange(e.target.value)}
          className="px-2 py-1 border rounded-md"
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="60">60</option>
        </select>
      </div>
    </div>
  );
}

export default News;