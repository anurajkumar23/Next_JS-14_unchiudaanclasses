"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useGetUserQuery } from "../../redux/slices/userSlices";
import he from "he";
import Image from "next/image";
import PatchNewsForm from "./PatchNewsForm"

const NewsId = () => {
  const { id } = useParams();
  const [news, setNews] = useState();
  const decodeHtmlEntities = (html) => {
    return he.decode(html);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.unchiudaanclasses.com/api/news/${id}`
        );
        setNews(response.data.data.news);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const { data: userData } = useGetUserQuery();
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

  if (!news) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
  

      {role && <PatchNewsForm details={news} />}
    </div>
  );
};

export default NewsId;
