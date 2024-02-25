"use client"
import React, { useEffect } from 'react';
const AdSenseUnit = ({ adClient }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={adClient}
    //   data-ad-slot={adSlot}
      data-ad-format="auto"
    />
  );
};
export default AdSenseUnit;