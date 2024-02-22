"use client"
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetUserQuery } from '../../redux/slices/userSlices';

const NewsId = () => {
  const { data: userData} = useGetUserQuery();
    const { id } = useParams();
    const [news, setNews] = useState(null);
  
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

  return (
    <div>
    
      {role && <PatchNewsForm details={news} />}
    </div>
  )
}

export default NewsId
