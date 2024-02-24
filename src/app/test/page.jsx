
/* eslint-disable no-unused-vars */
import React from "react";
import TestCard from "./components/TestCard"

export const metadata = {
  title: "Live Test / लाइव टेस्ट",
  description:
    "Get Live Test / लाइव टेस्ट of Current Affairs..",
    alternates:{
      canonical: `/test`
    },
};


// eslint-disable-next-line react/prop-types
function TestPage() {
  
  return (
    <div className="mx-auto py-[6rem]">
      <TestCard/>
    </div>
  );
}
export default TestPage;
