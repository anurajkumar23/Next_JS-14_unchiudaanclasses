"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { useState } from 'react';
import { useEffect } from 'react';



export default function provider({children}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Provider store={store}>
   
      {children}
      
    </Provider>
  )
}