/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client"
import React from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../redux/slices/userSlices";
import ErrorPage from "../Errorpage";
import SidebarAdmin from "./SidebarAdmin"

export default function page() {
  // Fetching user data to determine if the user is an admin
  const { data: userData } = useGetUserQuery();
  let role;

  if (userData) {
    role = userData.role === "admin";
  } else {
    role = false;
  }

  // State to store the total number of users
  const [totalUsers, setTotalUsers] = useState(0);

  // Function to fetch the total number of users
  const fetchTotalUsers = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const { results } = response.data;
      setTotalUsers(results);
    } catch (error) {
      console.error("Error fetching total users:", error);
      toast.error("Error fetching total users");
    }
  };

  // useEffect hook to fetch total users on component mount
  useEffect(() => {
    fetchTotalUsers();
  }, []);

  // Function to handle deletion of news items
  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem("jwt_token");
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/news/autodelete`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status === 200) {
          // The news item was deleted successfully
          toast.success("News item deleted successfully");
          // You may want to reload the page or update the news list here
        } else {
          console.error("Error deleting news item:", response);
          toast.error("Error deleting news item");
        }
      } catch (error) {
        console.error("Error deleting news item:", error);
        toast.error("Error deleting news item");
      }
    }
  };

  return (
    <>
      {role && (
        <div className="pt-[8rem]">
          <div className="flex flex-col md:flex-row items-center mb-20 md:w-1/3 md:mx-auto">
            <span className="text-center mb-8 md:mb-0 md:mr-4">
              ❗❗ Delete News that are older than 90 Days ❗❗
              <br />
              <button
                className="bg-[#e10707] text-white rounded p-2"
                onClick={handleDeleteClick}
              >
                Delete News
              </button>
            </span>
            <span className="text-center mb-8 md:mb-0 md:order-2 md:mr-8">
              <strong>Total Users 🧑</strong>
              <br />
              <p className="bg-[#06ca06] text-white rounded px-2 py-2 inline-block">
                {totalUsers}
              </p>
            </span>
          </div>
          <SidebarAdmin />
        </div>

      )}

      {!role && <ErrorPage />}
    </>
  );
};

// export default page;


// import React from 'react'

// export default function page() {
//   return (
//     <div>
      
//     </div>
//   )
// }
