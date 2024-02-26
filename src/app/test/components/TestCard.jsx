"use client";
import TestComp from "./testcomponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserQuery } from "../../redux/slices/userSlices";

async function fetchUserData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/success`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
}

export default function TestCard() {
  const { data: userDataFromQuery } = useGetUserQuery();
  const [userData, setUserData] = useState(null);
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = userDataFromQuery || (await fetchUserData());
        setUserData(userData);
        // Fetch tests data based on userData if needed
        // Update tests, totalPages, or other state variables accordingly
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchData();
  }, [userDataFromQuery]);
  
  
  console.log("🚀 ~ TestCard ~ userData:", userData)
  useEffect(() => {
    const deleteExpiredTests = async () => {
      // Check if userData is defined and has a property named 'test'
      if (userData && userData.test) {
        for (const item of userData.test) {
          if (Date.now() >= item.mainend) {
            try {
              const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userData._id}/test/delete/${item._id}`
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
    let apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/test?&page=${page}&limit=${postsPerPage}`;

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
  );
}
