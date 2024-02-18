"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { LiveTest } from "./LiveTest";
import { useParams } from "next/navigation";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export function StartTest({ userData }) {
  const [liveTest, setLiveTest] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [allow, setAllow] = useState(false);
  const { id } = useParams();
  const [newdata,setNewData]=useState(null)
  const [open,setOpen]=useState(true)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.unchiudaanclasses.com/api/test/${id}`);
   
        if(Date.now() >= response.data.data.test.mainend){
          
          setOpen(false)
        }
        
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchData();
  }, [id, setOpen]);




  // Retrieve data from local storage when the component mounts
  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const storedSelectedDistrict = localStorage.getItem("selectedDistrict");

    // If data exists in local storage, set the state with the retrieved values
    if (storedPhoneNumber && storedSelectedDistrict) {
      setPhoneNumber(storedPhoneNumber);
      setSelectedDistrict(storedSelectedDistrict);
    }
  }, []);


 


  const handleStartTest = async () => {
    const userid = userData.user._id;
    let existingTest = [];
  
    try {
      if (!userData.user.googleLogIn) {
        const token = localStorage.getItem("jwt_token");
        const response = await fetch(
          `https://api.unchiudaanclasses.com/api/user/authenticated`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
  
        if (response.ok) {
          const userData = await response.json();
          existingTest = userData.user.test || [];
          setNewData(userData)
          
        } else {
          console.error("Error checking authentication:", response.statusText);
        }
      } else {
        const response = await axios.get(`https://api.unchiudaanclasses.com/api/user/${userid}`);
        if (response.data.data.user && response.data.data.user.test) {
          const userData = response.data.data
          setNewData(userData)
          existingTest = response.data.data.user.test;
        }
      }
  
      // Check if the user has already submitted the test
      const access = existingTest.some((item) => {
        return item.test_id.toString() === id && item.isSubmit === true;
      });

  
      if (!access) {
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("selectedDistrict", selectedDistrict);
        // Set liveTest state to true to start the test
        setLiveTest(true);
      } else {
        setAllow(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  return (
    <>
      {open ? (
        allow ? (
          <div className="py-[8rem] text-center">
            You already gave the test
            <br />
          </div>
        ) : (
          <>
            {liveTest ? (
              <LiveTest userData={newdata} />
            ) : (
              <div className="mx-auto py-24 flex justify-center items-center">
                <div className="w-96 bg-white rounded-lg p-6 shadow-md">
                  <div className="text-2xl font-bold mb-4">
                    {localStorage.getItem("testname")}
                  </div>
                  <div className="text-gray-500 text-sm mb-4">
                    {localStorage.getItem("testdate")}
                  </div>
                  <form className="grid gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="number" className="text-sm text-gray-600">
                        Phone Number
                      </label>
                      <input
                        id="number"
                        type="text"
                        required={true}
                        placeholder="Enter your Phone number"
                        className="border border-gray-300 p-2 rounded-md"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="districts"
                        className="text-sm text-gray-600"
                      >
                        Districts
                      </label>
                      <input
                        id="districts"
                        type="text"
                        required={true}
                        placeholder="Enter your District name"
                        className="border border-gray-300 p-2 rounded-md"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                      />
                    </div>
                  </form>
                  <div className="flex justify-between mt-6">
                    <Link href="/test">
                      <button className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400">
                        Cancel
                      </button>
                    </Link>
                    <button
                      onClick={handleStartTest}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )
      ) : (
        <div className="pt-[10rem] text-center mb-[5rem]">Opps! Test Ended 😟. <br/>Donot try to be oversmart😎.</div>
      )}
    </>
  );
  
}
