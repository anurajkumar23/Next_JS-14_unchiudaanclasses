"use client"
import TestComp from "./testcomponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserQuery } from "../../redux/slices/userSlices";

export default function TestCard() {
  const { data: userData} = useGetUserQuery();
 
    const [tests, setTests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
      const deleteExpiredTests = async () => {
        // Check if userData is defined and has a property named 'test'
        if (userData && userData.test) {
          for (const item of userData.test) {
            if (Date.now() >= item.mainend) {
              try {
                const response = await axios.delete(
                  `https://api.unchiudaanclasses.com/api/user/${userData._id}/test/delete/${item._id}`
                );
                // console.log("Object deleted successfully:", response.data);
              } catch (error) {
                console.error("Error deleting object:", error);
                // Handle error scenarios
              }
            }
          }
        }
      };
    
      deleteExpiredTests();
    }, [userData]);
    
    
  
    const handleTestsDelete = () => {
      fetchData(currentPage); // Trigger a re-fetch of data after deletion
    };
    const fetchData = (page) => {
      let apiUrl = `https://api.unchiudaanclasses.com/api/test?&page=${page}&limit=${postsPerPage}`;
  
      axios
        .get(apiUrl)
        .then((response) => {
          const { totallength } = response.data;
  
          setTests(response.data.data.tests);
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
    <div>
      <div>
        <TestComp
          testsItems={tests}
          userData={userData}
          onTestsDelete={handleTestsDelete}
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
  )
}
