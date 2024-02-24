/* eslint-disable react/prop-types */
"use client"
import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; // Import toast
import Link from "next/link";
import { useGetUserQuery } from "../redux/slices/userSlices";


function UserSettings() {
  const { data: userData, error, isLoading } = useGetUserQuery();
  // const [settingsData, setSettingsData] = useState({
    const [passwordData, setPasswordData] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  //   name: userData ? `${userData.firstname} ${userData.lastname}` : "",
  //   email: userData ? userData.email : "",
  //   phone: userData ? userData.phone : "",
  //   role: userData ? userData.role : "",
  //   googleLogIn: userData ? userData.googleLogIn : false,
  // });
  if (isLoading) {
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
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!userData) {
    return <div>No data available</div>;
  }
 

  const token = localStorage.getItem("jwt_token");

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettingsData({
      ...settingsData,
      [name]: value,
    });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/updateMe`,
        settingsData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Replace YOUR_AUTH_TOKEN_HERE with the actual token
          },
        }
      );

      if (response.status === 200) {

        toast.success("Settings updated successfully"); // Show success toast
      } else {

        toast.error("Error updating settings. Please try again."); // Show error toast
      }
    } catch (error) {

      toast.error("Error updating settings. Please try again."); // Show error toast
    }
  };


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/updateMyPassword`,
        {
          passwordCurrent: passwordData.currentPassword,
          password: passwordData.newPassword,
          email: userData.email,
          googleLogIn:userData.googleLogIn,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Replace YOUR_AUTH_TOKEN_HERE with the actual token
          },
        }
      );

      if (response.status === 200) {

        toast.success("Password updated successfully"); // Show success toast
      } else {

        toast.error("Error updating password. Please try again."); // Show error toast
      }
    } catch (error) {

      toast.error("Error updating password. Please try again."); // Show error toast
    }
  };

  return (
    <div className="bg-gray-200 p-4 sm:p-8 md:p-16 lg:p-32 flex-1 relative bg-gray-100 py-[4rem]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white max-w-screen-xl mx-auto min-h-screen rounded-3xl overflow-hidden shadow-md flex flex-col sm:flex-row">
        <div className="bg-[#55c57a] sm:w-1/4 p-4">
          <ul className="side-nav">
            <li className="mb-4 text-white font-bold pl-[1.3rem] cursor-pointer">
              Settings
            </li>
            <Link href="/studymaterials">
              <li className="mb-4 text-white font-bold pl-[1.3rem] cursor-pointer">
                Study Material
              </li>
            </Link>

            {userData.role === "admin" ? (
              <Link href="/adminpower">
                <li className="mb-4 text-white font-bold pl-[1.3rem] cursor-pointer">
                  Admin power
                </li>
              </Link>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="sm:w-3/4">
          <div className="user-view__form-container max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
            <h2 className="heading-secondary mt-8 mb-4 text-xl text-[#55c57a]">
              Your account settings
            </h2>
            <form onSubmit={handleSaveSettings}>
              <div className="mb-4">
                <label className="block">Name</label>
                <div className="flex items-center">
                  <FiUser className="text-gray-400 mr-2" />
                  <input
                    className="form__input border border-gray-300 p-2 rounded"
                    placeholder="Name"
                    name="name"
                    value={`${userData.firstname} ${userData.lastname}`}
                    onChange={handleSettingsChange}
                  />
                </div>
              </div>
              <div className="form__group mb-4">
                <label className="block">Email address</label>
                <div className="flex items-center">
                  <FiMail className="text-gray-400 mr-2" />
                  <input
                    className="form__input border border-gray-300 p-2 rounded"
                    placeholder="Email Address"
                    name="email"
                    value={userData.email}
                    onChange={handleSettingsChange}
                  />
                </div>
              </div>
              <div className="form__group mb-4">
                <label className="block">Phone Number</label>
                <div className="flex items-center">
                  <FiPhone className="text-gray-400 mr-2" />
                  <input
                    className="form__input border border-gray-300 p-2 rounded"
                    placeholder="Number"
                    name="phone"
                    value={userData.phone}
                    onChange={handleSettingsChange}
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-[#55c57a] hover:bg-[#449d66] text-white px-4 py-2 rounded transition duration-300 ease-in-out "
                >
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <hr className="my-8 " />
          <div className="user-view__form-container max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
            <h2 className="mt-8 mb-4 text-xl text-[#55c57a]">
              Password change
            </h2>
            <form onSubmit={handleSavePassword}>
              <div className="mb-4">
                <label className="block">Current Password</label>
                <div className="flex items-center">
                  <FiLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    className="form__input border border-gray-300 p-2 rounded"
                    placeholder="••••••••"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block">New Password</label>
                <div className="flex items-center">
                  <FiLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    className="form__input border border-gray-300 p-2 rounded"
                    placeholder="••••••••"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block">Confirm Password</label>
                <div className="flex items-center">
                  <FiLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    className="form__input border border-gray-300 p-2 rounded"
                    placeholder="••••••••"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-[#55c57a] hover:bg-[#449d66] text-white px-4 py-2 rounded transition duration-300 ease-in-out mb-[45px]"
                >
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
