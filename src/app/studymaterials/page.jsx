"use client"
import React from 'react'
import Studymaterialpage from "./studymaterialpage"
import { useGetUserQuery } from '../redux/slices/userSlices';


export default function page() {
    const { data: userData} = useGetUserQuery();

  return (
    <div>
      <Studymaterialpage userData={userData}/>
    </div>
  )
}
