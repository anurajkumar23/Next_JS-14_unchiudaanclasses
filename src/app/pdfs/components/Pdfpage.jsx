"use client"
import Sidebar_pdf from "../../components/Sidebar/Sidebar_pdf";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogComps from "./PdfBlogComps";
import { useGetUserQuery } from "../../redux/slices/userSlices";


const Pdfpage = () => {
  const { data: userData} = useGetUserQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [pdfs, setPdfs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [filter, setFilter] = useState(false);
   
  
    const togglefilter = () => {
      setFilter(!filter);
    };
  
    const fetchData = (page, category, status) => {
      let apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs?page=${page}&limit=${postsPerPage}`;
  
      if (category) {
        apiUrl += `&category=${category}`;
      }
  
      if (status !== null) {
        apiUrl += `&status=${status}`;
      }
  
      axios
        .get(apiUrl)
        .then((response) => {
          const { pdf } = response.data.data;
          const { totallength } = response.data;
          setPdfs(pdf);
          setTotalPages(Math.ceil(parseInt(totallength) / postsPerPage));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    useEffect(() => {
      let apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs`;
  
      if (selectedCategory !== null) {
        apiUrl += `/?category=${selectedCategory}`;
      }
  
      if (selectedStatus !== null) {
        apiUrl += `${selectedCategory ? "&" : "/"}status=${selectedStatus}`;
      }
  
      axios
        .get(apiUrl)
        .then((response) => {
          setPdfs(response.data.data.pdf);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [selectedCategory, selectedStatus]);
  
    useEffect(() => {
      fetchData(currentPage, selectedCategory, selectedStatus);
    }, [selectedCategory, selectedStatus, currentPage, postsPerPage]);
  
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
  
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
      setCurrentPage(1);
    };
  
    const handleSelectedStatusChange = (status) => {
      setSelectedStatus(status);
      setCurrentPage(1);
    };
  
    const handleLimitChange = (event) => {
      const newLimit = parseInt(event.target.value, 10);
      setPostsPerPage(newLimit);
      setCurrentPage(1);
    };
    const handleDeleteSuccess = () => {
      fetchData(currentPage, selectedCategory, selectedStatus); // Fetch data again after successful deletion
    };
  return (
    <div>
      <div className="p-2 md:hidden">
            <div className="flex items-center">
              <button
                onClick={togglefilter}
                className="text-black hover:text-gray-300 focus:outline-none"
              >
                {filter ? (
                  <RiCloseFill className="text-2xl" />
                ) : (
                  <RiMenu3Fill className="text-2xl" />
                )}
              </button>
              {!filter && (
                <button
                  onClick={togglefilter}
                  className="ml-2 px-3 py-1 text-gray-600 text-sm bg-gray-200 hover:bg-gray-300 focus:outline-none rounded"
                >
                  View more
                </button>
              )}
            </div>
        </div>

        <div className="flex">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mx-10 md:mx-0 ${
              filter ? "hidden" : "block"
            }`}
          >
            {pdfs.length === 0 ? (
              <div className="items-center justify-center ">
                <p className="text-center  text-gray-500">No PDFs available.</p>
              </div>
            ) : (
              pdfs.map((pdf) => {
                const createdAt = new Date(pdf.createdAt);
                const updatedAt = new Date(pdf.updatedAt);
                {
                  /* createdAt.setDate(createdAt.getDate() + 1); */
                }
                const formattedDate = createdAt.toLocaleString("default", {
                  day: "numeric",
                  month: "long",
                });
                const updatedDate = updatedAt.toLocaleString("default", {
                  day: "numeric",
                  month: "long",
                });
              
                return (
                  <BlogComps
                    key={pdf._id}
                    date={formattedDate}
                    title={pdf.name}
                    updatedDate={updatedDate}
                    id={pdf._id}
                    status={pdf.status}
                    category={pdf.category}
                    price={pdf.price}
                    userData={userData}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                );
              })
            )}
          </div>
          <div
            className={`z-1 flex-1 ${
              filter ? "block" : "hidden"
            } lg:flex sm:block`}
          >
            <Sidebar_pdf
              setSelectedCategory={handleCategoryChange}
              setSelectedStatus={handleSelectedStatusChange}
              togglefilter={togglefilter}
            />
          </div>
        </div>
        <div className="flex justify-center my-4">
          <div className="flex items-center mr-4">
            <span className="mr-2">Show:</span>
            <select value={postsPerPage} onChange={handleLimitChange}>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value={60}>60</option>
            </select>
          </div>
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
    </div>
  )
}

export default Pdfpage
