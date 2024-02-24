"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { LogInSchema } from "../signup/formvalidator";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const initialValues = { email: "", password: "" };

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    errors,
    handleBlur,
    handleSubmit,
    values,
    isValid,
    handleChange,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: LogInSchema,
    onSubmit: async (values) => {
      try {
        await login({
          email: values.email,
          password: values.password,
        });
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const loginwithGoogle = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/google/callback`
    );
  };
  const login = async (userData) => {
    try {
      // if(localStorage.getItem("ally-supports-cache")){
      //   localStorage.removeItem("ally-supports-cache");
      //   localStorage.removeItem("persist:root");

      // }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        userData,
        { withCredentials: true }
      );

      const token = response.data.token;
      document.cookie = `jwt=${token}; max-age=${60 * 60 * 24 * 7}; path=/`;

      localStorage.setItem("jwt_token", token);
      const redirectUrl = localStorage.getItem("redirectUrl");

      if (response.status === 200) {
        toast.success("Login successful!");
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          router.push("/user"); // Redirect to /user on successful login
        }
        return response.data;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        <Link
          href="/signup"
          className="text-[#3856ea] font-semibold text-[18px]"
        >
          signup
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
      <button
        onClick={loginwithGoogle}
        className="w-full flex items-center mt-2 rounded-[9px] bg-white border-2 border-black hover:bg-gray-50 py-2 px-4 font-medium text-[#000814] duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:border-[#0F7A9D] relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        Login with Google
      </button>
      <br />
      <p className="text-center">OR</p>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex w-full flex-col gap-y-4"
      >
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
            Email Address <sup className="text-[#EF476F]">*</sup>
          </p>
          <input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="on"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-[0.5rem] p-[12px] bg-[#E6E6E6]"
          />
          {errors.email && touched.email && (
            <p className="text-[#b40e0e] font-semibold">{errors.email}</p>
          )}
        </label>

        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
            Password <sup className="text-[#EF476F]">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type
            name="password"
            id="password"
            autoComplete="off"
            placeholder="Your Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-[0.1rem] bg-[#E6E6E6] p-[12px] pr-12"
          />
          {errors.password && touched.password && (
            <p className="text-[#b40e0e] font-semibold">{errors.password}</p>
          )}
          <br />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link href="/forgotpassword">
            <p className="mt-1 ml-auto max-w-max text-xs text-[#47A5C5]">
              Forgot Password
            </p>
          </Link>
        </label>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-[#FFD60A] py-[9px] px-[12px] font-medium text-[#000814] duration-500 hover:scale-[1.1]"
          disabled={!isValid}
        >
          {isValid ? "Login" : "❌Login"}
        </button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default LoginForm;
