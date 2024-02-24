"use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
import { useGetUserQuery } from "../../redux/slices/userSlices";
import PatchNewsForm from "./PatchNewsForm"

const NewsIds = ({news}) => {
  // const { id } = useParams();
  // const [news, setNews] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.unchiudaanclasses.com/api/news/${id}`
  //       );
  //       setNews(response.data.data.news);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

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
  return (
    <div>
      {role && <PatchNewsForm details={news} />}
    </div>
  );
};

export default NewsIds;
