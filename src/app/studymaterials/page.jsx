"use client"
import React, { useEffect, useState } from 'react'
import Studymaterialpage from "./studymaterialpage"
import { useGetUserQuery } from '../redux/slices/userSlices';


async function fetchData() {
  
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
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}


export default function page() {
  const { data: userDataFromQuery } = useGetUserQuery();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function fetchDataManually() {
      try {
        const userData = await fetchData();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    if (!userDataFromQuery) {
      fetchDataManually();
    } else {
      setUserData(userDataFromQuery);
    }
  }, [userDataFromQuery]);

  return (
    <div>
      <Studymaterialpage userData={userData}/>
    </div>
  )
}
