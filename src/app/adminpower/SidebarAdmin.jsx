"use client"
import  { useState } from "react";
import TabBar from "./TabBar";
import FormNews from "./FormNews";
import FormTest from "./FormTest";
import FormCurrentAffairs from "./FormCurrentAffairs";
import FormPDF from "./FormPDF";

const SidebarAdmin = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="m-4 md:m-8 lg:m-12 xl:m-16 rounded-lg border-2 p-4">
      <div className="container mx-auto mt-5">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-5">
          {activeTab === "tab1" && <FormNews />}
          {activeTab === "tab2" && <FormCurrentAffairs />}
          {activeTab === "tab3" && <FormPDF />}
        </div>
      </div>
      <hr/>
      <div className="">
        <h1 className="text-center text-3xl mt-5 font-medium"> Test</h1>
      <FormTest/>
      </div>
      
    </div>
  );
};

export default SidebarAdmin;
